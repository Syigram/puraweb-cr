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

// Mapeo de Plan IDs estandarizados a Stripe Price IDs
const PLAN_PRICES = {
  [PLAN_IDS.BASIC]: 'price_1SUE0bFA0Fkjjug3eDCGxI4G',
  [PLAN_IDS.PROFESSIONAL]: 'price_1SUE2DFA0Fkjjug3euWqaW5c',
  [PLAN_IDS.BUSINESS]: 'price_1SUE32FA0Fkjjug3khKfal6N'
};

// Precios en centavos CRC
const PLAN_AMOUNTS = {
  [PLAN_IDS.BASIC]: 6000000,      // 60,000 CRC
  [PLAN_IDS.PROFESSIONAL]: 10000000, // 100,000 CRC
  [PLAN_IDS.BUSINESS]: 15000000   // 150,000 CRC
};

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
      const { planId, paymentMode, email, name, projectName } = body;
      
      // Usar planId estandarizado, con fallback a basic
      const normalizedPlanId = planId || PLAN_IDS.BASIC;
      const priceId = PLAN_PRICES[normalizedPlanId] || PLAN_PRICES[PLAN_IDS.BASIC];
      
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
            projectName: projectName || '',
            email: userEmail,
            userName: userName
          }
        });

        return Response.json({
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
          subscriptionId: subscription.id
        });

      } else {
        // One-time payment (50%)
        const fullAmount = PLAN_AMOUNTS[normalizedPlanId];
        const chargeAmount = Math.round(fullAmount * 0.5); // 50%

        const paymentIntent = await stripe.paymentIntents.create({
          amount: chargeAmount,
          currency: 'crc',
          customer: customerId,
          automatic_payment_methods: { enabled: true },
          metadata: {
            planId: normalizedPlanId,
            paymentMode: PAYMENT_MODES.ONETIME,
            type: 'down_payment_50_percent',
            email: userEmail,
            name: userName,
            projectName: projectName || ''
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

    // Cancelar suscripción
    if (action === 'cancelSubscription') {
      const user = await base44.auth.me();
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { subscriptionId } = body;
      if (!subscriptionId) {
        return Response.json({ error: "Subscription ID is required" }, { status: 400 });
      }

      // Verificar que la suscripción pertenece al usuario
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const customer = await stripe.customers.retrieve(subscription.customer);
      
      if (customer.email !== user.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Cancelar al final del período
      const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      });

      return Response.json({
        status: 'canceled',
        cancel_at: canceledSubscription.cancel_at,
        current_period_end: canceledSubscription.current_period_end
      });
    }

    // Obtener suscripciones del usuario
    if (action === 'getUserSubscriptions') {
      const user = await base44.auth.me();
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length === 0) {
        return Response.json({ subscriptions: [] });
      }

      const customerId = customers.data[0].id;
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.default_payment_method']
      });

      return Response.json({
        subscriptions: subscriptions.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          planId: sub.metadata.planId,
          projectName: sub.metadata.projectName,
          currentPeriodEnd: sub.current_period_end,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
          cancelAt: sub.cancel_at,
          created: sub.created,
          amount: sub.items.data[0]?.price?.unit_amount || 0,
          currency: sub.items.data[0]?.price?.currency || 'crc'
        }))
      });
    }

    return Response.json({ error: "Action not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});