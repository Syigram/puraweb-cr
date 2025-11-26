import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@^14.0.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

// Constantes estandarizadas (duplicadas aquí porque backend no puede importar de components)
const PAYMENT_MODES = {
  SUBSCRIPTION: 'subscription',
  ONETIME: 'onetime'
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELED: 'canceled'
};

// Mapeo de Price IDs a Plan IDs estandarizados
const PRICE_TO_PLAN = {
  'price_1SUE0bFA0Fkjjug3eDCGxI4G': 'basic',
  'price_1SUE2DFA0Fkjjug3euWqaW5c': 'professional',
  'price_1SUE32FA0Fkjjug3khKfal6N': 'business'
};

// Montos de planes en centavos para determinar plan por monto
// Suscripción: monto completo, Pago único: 50%
const PLAN_AMOUNTS = {
  basic: { subscription: 6000000, onetime: 3000000 },
  professional: { subscription: 10000000, onetime: 5000000 },
  business: { subscription: 15000000, onetime: 7500000 }
};

// Función para determinar el plan basándose en el monto
function getPlanIdFromAmount(amount) {
  // Verificar montos de suscripción (completos)
  if (amount === PLAN_AMOUNTS.basic.subscription) return 'basic';
  if (amount === PLAN_AMOUNTS.professional.subscription) return 'professional';
  if (amount === PLAN_AMOUNTS.business.subscription) return 'business';
  
  // Verificar montos de pago único (50%)
  if (amount === PLAN_AMOUNTS.basic.onetime) return 'basic';
  if (amount === PLAN_AMOUNTS.professional.onetime) return 'professional';
  if (amount === PLAN_AMOUNTS.business.onetime) return 'business';
  
  // Fallback: determinar por rango de montos
  if (amount <= 4000000) return 'basic';
  if (amount <= 8000000) return 'professional';
  return 'business';
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const base44 = createClientFromRequest(req);
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return Response.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ============ PAYMENT INTENT EVENTS (One-time payments) ============
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentSucceeded(base44, paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentFailed(base44, paymentIntent);
        break;
      }

      // ============ INVOICE EVENTS (Subscriptions) ============
      case 'invoice.paid': {
        const invoice = event.data.object;
        await handleInvoicePaid(base44, invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handleInvoicePaymentFailed(base44, invoice);
        break;
      }

      // ============ SUBSCRIPTION EVENTS ============
      case 'customer.subscription.created': {
        const subscription = event.data.object;
        await handleSubscriptionCreated(base44, subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdated(base44, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionCanceled(base44, subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

// ============ HANDLER FUNCTIONS ============

async function handlePaymentIntentSucceeded(base44, paymentIntent) {
  const { id, amount, currency, customer, metadata, invoice } = paymentIntent;
  
  console.log(`🔍 Processing payment_intent.succeeded: ${id}`);
  console.log(`   invoice field: ${invoice}`);
  console.log(`   metadata: ${JSON.stringify(metadata)}`);
  
  // Si el PaymentIntent está asociado a una factura, es un pago de suscripción
  // El evento invoice.paid se encargará de registrarlo correctamente
  if (invoice) {
    console.log(`⏭️ Payment intent ${id} is linked to invoice ${invoice}, skipping (handled by invoice.paid)`);
    return;
  }
  
  // IMPORTANTE: Buscar en Stripe si este PaymentIntent está asociado a algún invoice
  // Esto cubre el caso donde el campo invoice no viene en el webhook pero existe la relación
  try {
    const invoices = await stripe.invoices.list({
      limit: 5,
      expand: ['data.subscription']
    });
    
    const linkedInvoice = invoices.data.find(inv => inv.payment_intent === id);
    if (linkedInvoice) {
      console.log(`⏭️ Payment intent ${id} found linked to invoice ${linkedInvoice.id} via search, skipping (handled by invoice.paid)`);
      return;
    }
  } catch (err) {
    console.log(`⚠️ Could not search invoices: ${err.message}`);
  }
  
  // Verificar si el metadata indica que es una suscripción
  if (metadata?.paymentMode === PAYMENT_MODES.SUBSCRIPTION) {
    console.log(`⏭️ Payment intent ${id} is a subscription payment (metadata), skipping (handled by invoice.paid)`);
    return;
  }
  
  // Verificar que realmente es un pago único usando el metadata
  // SOLO procesar si explícitamente tiene paymentMode = 'onetime'
  const paymentMode = metadata?.paymentMode;
  
  if (paymentMode !== PAYMENT_MODES.ONETIME) {
    console.log(`⏭️ Payment intent ${id} does not have explicit onetime mode (mode: ${paymentMode}), skipping`);
    return;
  }
  
  // Get customer details
  const customerData = customer ? await stripe.customers.retrieve(customer) : null;
  
  // Determine plan from metadata
  const planId = metadata?.planId || 'basic';
  
  // Check if payment record exists
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_payment_intent_id: id
  });

  if (existingPayments.length > 0) {
    // Update existing record
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.SUCCEEDED
    });
  } else {
    // Create new payment record for one-time payment only
    await base44.asServiceRole.entities.Payment.create({
      customer_email: customerData?.email || metadata?.email || 'unknown',
      customer_name: customerData?.name || metadata?.name || 'Unknown',
      plan_id: planId,
      payment_mode: PAYMENT_MODES.ONETIME,
      amount: amount,
      currency: currency,
      status: PAYMENT_STATUS.SUCCEEDED,
      stripe_payment_intent_id: id,
      stripe_customer_id: customer,
      user_id: customerData?.metadata?.userId || null
    });
  }

  console.log(`✅ One-time payment succeeded: ${id}`);
}

async function handlePaymentIntentFailed(base44, paymentIntent) {
  const { id } = paymentIntent;
  
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_payment_intent_id: id
  });

  if (existingPayments.length > 0) {
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.FAILED
    });
  }

  console.log(`❌ One-time payment failed: ${id}`);
}

async function handleInvoicePaid(base44, invoice) {
  const { id, subscription, customer, amount_paid, currency, payment_intent } = invoice;
  
  console.log(`🔍 Processing invoice.paid: ${id}`);
  console.log(`   subscription: ${subscription}`);
  console.log(`   payment_intent: ${payment_intent}`);
  
  if (!subscription) {
    console.log(`⏭️ Invoice ${id} has no subscription, skipping`);
    return; // Not a subscription invoice
  }
  
  const customerData = await stripe.customers.retrieve(customer);
  const subscriptionData = await stripe.subscriptions.retrieve(subscription);
  const priceId = subscriptionData.items.data[0]?.price?.id;
  const planId = subscriptionData.metadata?.planId || PRICE_TO_PLAN[priceId] || 'basic';
  const subscriptionName = subscriptionData.metadata?.subscriptionName || null;

  // PRIMERO: Buscar si existe un registro incorrecto creado por payment_intent.succeeded
  // usando el payment_intent_id de este invoice
  if (payment_intent) {
    const incorrectPayments = await base44.asServiceRole.entities.Payment.filter({
      stripe_payment_intent_id: payment_intent
    });
    
    if (incorrectPayments.length > 0) {
      // Corregir el registro existente - convertirlo a suscripción
      console.log(`🔧 Fixing incorrect payment record ${incorrectPayments[0].id} -> subscription`);
      await base44.asServiceRole.entities.Payment.update(incorrectPayments[0].id, {
        payment_mode: PAYMENT_MODES.SUBSCRIPTION,
        subscription_name: subscriptionName,
        plan_id: planId,
        status: PAYMENT_STATUS.SUCCEEDED,
        amount: amount_paid,
        stripe_subscription_id: subscription,
        subscription_status: subscriptionData.status,
        current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString()
      });
      console.log(`✅ Subscription invoice paid (fixed existing): ${id}`);
      return;
    }
  }

  // Check if payment record exists for this subscription
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: subscription
  });

  if (existingPayments.length > 0) {
    // Update existing subscription payment record
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.SUCCEEDED,
      amount: amount_paid,
      subscription_status: subscriptionData.status,
      current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString()
    });
  } else {
    // Create new payment record for subscription
    await base44.asServiceRole.entities.Payment.create({
      customer_email: customerData?.email || 'unknown',
      customer_name: customerData?.name || 'Unknown',
      subscription_name: subscriptionName,
      plan_id: planId,
      payment_mode: PAYMENT_MODES.SUBSCRIPTION,
      amount: amount_paid,
      currency: currency,
      status: PAYMENT_STATUS.SUCCEEDED,
      stripe_payment_intent_id: payment_intent,
      stripe_subscription_id: subscription,
      stripe_customer_id: customer,
      user_id: customerData?.metadata?.userId || null,
      subscription_status: subscriptionData.status,
      current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString()
    });
  }

  console.log(`✅ Subscription invoice paid: ${id}`);
}

async function handleInvoicePaymentFailed(base44, invoice) {
  const { subscription } = invoice;
  
  if (!subscription) return;

  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: subscription
  });

  if (existingPayments.length > 0) {
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.FAILED
    });
  }

  console.log(`❌ Subscription invoice payment failed: ${invoice.id}`);
}

async function handleSubscriptionCreated(base44, subscription) {
  console.log(`🆕 Subscription created: ${subscription.id}`);
  // Initial record is created via invoice.paid event
}

async function handleSubscriptionUpdated(base44, subscription) {
  const { id, status, cancel_at_period_end, current_period_end, customer } = subscription;
  
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: id
  });

  // Obtener datos adicionales
  const customerData = customer ? await stripe.customers.retrieve(customer) : null;
  const priceId = subscription.items?.data[0]?.price?.id;
  const planId = subscription.metadata?.planId || PRICE_TO_PLAN[priceId] || 'basic';
  const subscriptionName = subscription.metadata?.subscriptionName || null;

  let paymentStatus = PAYMENT_STATUS.PENDING;
  let subscriptionStatus = status;
  
  if (status === 'active') paymentStatus = PAYMENT_STATUS.SUCCEEDED;
  if (status === 'canceled' || status === 'unpaid') paymentStatus = PAYMENT_STATUS.CANCELED;
  if (status === 'past_due') paymentStatus = PAYMENT_STATUS.FAILED;
  
  // If subscription is set to cancel at period end, mark as canceled
  if (cancel_at_period_end) {
    subscriptionStatus = 'canceled';
  }

  if (existingPayments.length > 0) {
    // Actualizar registro existente
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: paymentStatus,
      subscription_status: subscriptionStatus,
      current_period_end: new Date(current_period_end * 1000).toISOString()
    });
  } else if (status === 'active') {
    // Crear registro si la suscripción pasó de incomplete a active y no existe
    await base44.asServiceRole.entities.Payment.create({
      customer_email: customerData?.email || 'unknown',
      customer_name: customerData?.name || 'Unknown',
      subscription_name: subscriptionName,
      plan_id: planId,
      payment_mode: PAYMENT_MODES.SUBSCRIPTION,
      amount: subscription.items?.data[0]?.price?.unit_amount || 0,
      currency: subscription.items?.data[0]?.price?.currency || 'crc',
      status: paymentStatus,
      stripe_subscription_id: id,
      stripe_customer_id: customer,
      user_id: customerData?.metadata?.userId || null,
      subscription_status: subscriptionStatus,
      current_period_end: new Date(current_period_end * 1000).toISOString()
    });
  }

  console.log(`🔄 Subscription updated: ${id} - Status: ${status}`);
}

async function handleSubscriptionCanceled(base44, subscription) {
  const { id, status, canceled_at } = subscription;
  
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: id
  });

  if (existingPayments.length > 0) {
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.CANCELED,
      subscription_status: 'canceled'
    });
    console.log(`🚫 Subscription canceled and DB updated: ${id}`);
  } else {
    // Si no existe registro pero la suscripción fue cancelada, obtener datos del cliente
    const customerData = subscription.customer 
      ? await stripe.customers.retrieve(subscription.customer) 
      : null;
    
    if (customerData?.email) {
      const priceId = subscription.items?.data[0]?.price?.id;
      const planId = PRICE_TO_PLAN[priceId] || subscription.metadata?.planId || 'basic';
      
      await base44.asServiceRole.entities.Payment.create({
        customer_email: customerData.email,
        customer_name: customerData.name || 'Unknown',
        plan_id: planId,
        payment_mode: PAYMENT_MODES.SUBSCRIPTION,
        amount: subscription.items?.data[0]?.price?.unit_amount || 0,
        currency: subscription.items?.data[0]?.price?.currency || 'crc',
        status: PAYMENT_STATUS.CANCELED,
        stripe_subscription_id: id,
        stripe_customer_id: subscription.customer,
        subscription_status: 'canceled'
      });
      console.log(`🚫 Subscription canceled and new record created: ${id}`);
    }
  }

  console.log(`🚫 Subscription deleted event processed: ${id}`);
}