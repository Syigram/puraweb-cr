import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@^14.0.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

// Constantes estandarizadas para tipos de pago
const PAYMENT_MODES = {
  SUBSCRIPTION: 'subscription',
  ONETIME: 'onetime'
};

const PLAN_IDS = {
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  BUSINESS: 'business'
};

// Configuración de respaldo (fallback) si la entidad PlanConfig está vacía.
// La fuente de verdad es la entidad PlanConfig administrable desde el panel.
const FALLBACK_PLANS = {
  [PLAN_IDS.BASIC]: { stripe_price_id: 'price_1Tkc6uFA0Fkjjug3yvYaw5nb', total_price_crc: 100000, deposit_percentage: 0.5 },
  [PLAN_IDS.PROFESSIONAL]: { stripe_price_id: 'price_1Tkc7aFA0Fkjjug3tckUSNUv', total_price_crc: 150000, deposit_percentage: 0.5 },
  [PLAN_IDS.BUSINESS]: { stripe_price_id: 'price_1Tkc7yFA0Fkjjug3a1cEZpz3', total_price_crc: 350000, deposit_percentage: 0.5 }
};

// Obtiene la configuración de un plan desde la base de datos (PlanConfig),
// con respaldo a los valores por defecto si no existe.
async function getPlanConfig(base44, planId) {
  const normalizedId = planId || PLAN_IDS.BASIC;
  try {
    const configs = await base44.asServiceRole.entities.PlanConfig.filter({ plan_id: normalizedId });
    if (configs.length > 0) {
      const c = configs[0];
      return {
        stripe_price_id: c.stripe_price_id,
        total_price_crc: c.total_price_crc,
        deposit_percentage: typeof c.deposit_percentage === 'number' ? c.deposit_percentage : 0.5
      };
    }
  } catch (e) {
    console.log(`⚠️ Could not load PlanConfig for ${normalizedId}, using fallback: ${e.message}`);
  }
  return FALLBACK_PLANS[normalizedId] || FALLBACK_PLANS[PLAN_IDS.BASIC];
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();
    
    // Support both path-based routing (direct) and body-action routing (invoke SDK)
    let body = {};
    try {
      if (req.method === "POST") {
        body = await req.json();
      }
    } catch (e) {
      // ignore json parse error for empty body
    }
    
    const action = body.action || path;

    if (action === 'getConfig' || action === 'getStripeConfig') {
      return Response.json({ 
        publishableKey: Deno.env.get("STRIPE_PUBLISHABLE_KEY") 
      });
    }

    if (action === 'createPaymentIntent') {
      const { planId, paymentMode, email, name } = body;
      
      // Usar planId estandarizado, con fallback a basic
      const normalizedPlanId = planId || PLAN_IDS.BASIC;
      // Cargar configuración dinámica del plan (precio, price_id, % depósito) desde PlanConfig
      const planConfig = await getPlanConfig(base44, normalizedPlanId);
      const priceId = planConfig.stripe_price_id;
      
      // 1. Find or Create Customer
      let customerId;
      const user = await base44.auth.me().catch(() => null);
      const userEmail = user?.email || email;
      const userName = user?.full_name || name || "Guest Customer";

      if (!userEmail) {
        return Response.json({ error: "Email is required" }, { status: 400 });
      }

      const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: userEmail,
          name: userName,
          metadata: {
            userId: user?.id || 'guest'
          }
        });
        customerId = customer.id;
      }

      // 2. Handle Subscription vs One-time usando constantes estandarizadas
      if (paymentMode === PAYMENT_MODES.SUBSCRIPTION) {
        // Get subscription name from body or generate default
        const subscriptionName = body.subscriptionName || null;
        
        // Create a subscription
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent'],
          metadata: {
            planId: normalizedPlanId,
            paymentMode: PAYMENT_MODES.SUBSCRIPTION,
            subscriptionName: subscriptionName
          }
        });

        return Response.json({
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
          subscriptionId: subscription.id
        });

      } else {
        // One-time payment: depósito según deposit_percentage configurado
        // total_price_crc está en colones; Stripe usa la unidad mínima (centavos) => x100
        const fullAmount = Math.round(planConfig.total_price_crc * 100);
        const depositPercentage = planConfig.deposit_percentage;
        const chargeAmount = Math.round(fullAmount * depositPercentage);

        const paymentIntent = await stripe.paymentIntents.create({
          amount: chargeAmount,
          currency: 'crc',
          customer: customerId,
          automatic_payment_methods: { enabled: true },
          metadata: {
            planId: normalizedPlanId,
            paymentMode: PAYMENT_MODES.ONETIME,
            type: `down_payment_${Math.round(depositPercentage * 100)}_percent`,
            email: userEmail,
            name: userName
          }
        });

        return Response.json({
          clientSecret: paymentIntent.client_secret,
          id: paymentIntent.id
        });
      }
    }

    // Verificar estado del pago
    if (action === 'verifyPayment') {
      const { paymentIntentId } = body;
      
      if (!paymentIntentId) {
        return Response.json({ error: "Payment Intent ID is required" }, { status: 400 });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      return Response.json({
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata
      });
    }

    // Obtener suscripciones activas del usuario desde Stripe
    if (action === 'getSubscriptions') {
      const user = await base44.auth.me().catch(() => null);
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Buscar cliente por email
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length === 0) {
        return Response.json({ subscriptions: [] });
      }

      const customerId = customers.data[0].id;

      // Obtener suscripciones activas del cliente
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all', // Incluye active, canceled, past_due, etc.
        expand: ['data.items.data.price']
      });

      // Mapear price_id a plan_id dinámicamente desde PlanConfig (con fallback)
      const PRICE_TO_PLAN = {};
      try {
        const allConfigs = await base44.asServiceRole.entities.PlanConfig.list();
        for (const c of allConfigs) {
          if (c.stripe_price_id) PRICE_TO_PLAN[c.stripe_price_id] = c.plan_id;
        }
      } catch (e) {
        console.log(`⚠️ Could not load PlanConfig list: ${e.message}`);
      }
      for (const [pid, cfg] of Object.entries(FALLBACK_PLANS)) {
        if (!PRICE_TO_PLAN[cfg.stripe_price_id]) PRICE_TO_PLAN[cfg.stripe_price_id] = pid;
      }

      const formattedSubscriptions = subscriptions.data.map(sub => {
        const priceId = sub.items.data[0]?.price?.id;
        const planId = PRICE_TO_PLAN[priceId] || sub.metadata?.planId || 'unknown';
        
        return {
          stripe_subscription_id: sub.id,
          stripe_customer_id: customerId,
          plan_id: planId,
          subscription_status: sub.cancel_at_period_end ? 'canceled' : sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          amount: sub.items.data[0]?.price?.unit_amount || 0,
          currency: sub.items.data[0]?.price?.currency || 'crc',
          subscription_name: sub.metadata?.subscriptionName || null,
          created: new Date(sub.created * 1000).toISOString()
        };
      });

      return Response.json({ subscriptions: formattedSubscriptions });
    }

    // Resumir suscripción incompleta - obtener client secret del payment intent pendiente
    if (action === 'resumeIncompleteSubscription') {
      const { subscriptionId } = body;
      
      if (!subscriptionId) {
        return Response.json({ error: "Subscription ID is required" }, { status: 400 });
      }

      const user = await base44.auth.me().catch(() => null);
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Obtener la suscripción con el invoice expandido
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice.payment_intent']
      });

      // Verificar que la suscripción pertenece al usuario
      const customer = await stripe.customers.retrieve(subscription.customer);
      if (customer.email !== user.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Verificar que la suscripción está incompleta
      if (subscription.status !== 'incomplete') {
        return Response.json({ 
          error: "Subscription is not incomplete", 
          status: subscription.status 
        }, { status: 400 });
      }

      // Obtener el client secret del payment intent
      const paymentIntent = subscription.latest_invoice?.payment_intent;
      if (!paymentIntent?.client_secret) {
        return Response.json({ error: "No payment intent found" }, { status: 400 });
      }

      return Response.json({
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id
      });
    }

    // Obtener URL de pago para suscripción incompleta
    if (action === 'getSubscriptionPaymentUrl') {
      const { subscriptionId } = body;
      
      if (!subscriptionId) {
        return Response.json({ error: "Subscription ID is required" }, { status: 400 });
      }

      const user = await base44.auth.me().catch(() => null);
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Obtener la suscripción
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice']
      });

      // Verificar que la suscripción pertenece al usuario
      const customer = await stripe.customers.retrieve(subscription.customer);
      if (customer.email !== user.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Obtener la URL de pago del invoice
      if (subscription.latest_invoice?.hosted_invoice_url) {
        return Response.json({ url: subscription.latest_invoice.hosted_invoice_url });
      }

      // Si no hay URL de invoice, crear una sesión de checkout
      const session = await stripe.checkout.sessions.create({
        customer: subscription.customer,
        mode: 'setup',
        payment_method_types: ['card'],
        success_url: `${Deno.env.get("APP_URL") || "https://app.base44.com"}/UserDashboard?payment=success`,
        cancel_url: `${Deno.env.get("APP_URL") || "https://app.base44.com"}/UserDashboard?payment=canceled`,
        metadata: {
          subscriptionId: subscriptionId
        }
      });

      return Response.json({ url: session.url });
    }

    // Cancelar suscripción
    if (action === 'cancelSubscription') {
      const { subscriptionId } = body;
      
      if (!subscriptionId) {
        return Response.json({ error: "Subscription ID is required" }, { status: 400 });
      }

      // Verificar que el usuario está autenticado
      const user = await base44.auth.me().catch(() => null);
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Obtener la suscripción para verificar el estado
      const currentSubscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      // Verificar que la suscripción pertenece al usuario
      const customer = await stripe.customers.retrieve(currentSubscription.customer);
      if (customer.email !== user.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      let subscription;
      
      // Si la suscripción está incompleta, cancelar inmediatamente
      if (currentSubscription.status === 'incomplete') {
        subscription = await stripe.subscriptions.cancel(subscriptionId);
      } else {
        // Si está activa, cancelar al final del período actual
        subscription = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true
        });
      }
      
      return Response.json({
        success: true,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodEnd: subscription.current_period_end 
          ? new Date(subscription.current_period_end * 1000).toISOString() 
          : null
      });
    }

    return Response.json({ error: "Action not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});