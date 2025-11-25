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
  const { id, amount, currency, customer, metadata } = paymentIntent;
  
  // Get customer details
  const customerData = customer ? await stripe.customers.retrieve(customer) : null;
  
  // Determine plan from metadata
  const planId = metadata?.planId || 'basic';
  const serviceName = metadata?.serviceName || '';
  
  // Check if payment record exists
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_payment_intent_id: id
  });

  if (existingPayments.length > 0) {
    // Update existing record
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.SUCCEEDED,
      service_name: serviceName || existingPayments[0].service_name
    });
  } else {
    // Create new payment record
    await base44.asServiceRole.entities.Payment.create({
      service_name: serviceName,
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
  const { id, subscription, customer, amount_paid, currency } = invoice;
  
  if (!subscription) return; // Not a subscription invoice
  
  const customerData = await stripe.customers.retrieve(customer);
  const subscriptionData = await stripe.subscriptions.retrieve(subscription);
  const priceId = subscriptionData.items.data[0]?.price?.id;
  const planId = PRICE_TO_PLAN[priceId] || 'basic';
  const serviceName = subscriptionData.metadata?.serviceName || '';

  // Check if payment record exists for this subscription
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: subscription
  });

  if (existingPayments.length > 0) {
    // Update existing subscription payment record
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.SUCCEEDED,
      amount: amount_paid,
      service_name: serviceName || existingPayments[0].service_name
    });
  } else {
    // Create new payment record for subscription
    await base44.asServiceRole.entities.Payment.create({
      service_name: serviceName,
      customer_email: customerData?.email || 'unknown',
      customer_name: customerData?.name || 'Unknown',
      plan_id: planId,
      payment_mode: PAYMENT_MODES.SUBSCRIPTION,
      amount: amount_paid,
      currency: currency,
      status: PAYMENT_STATUS.SUCCEEDED,
      stripe_payment_intent_id: invoice.payment_intent,
      stripe_subscription_id: subscription,
      stripe_customer_id: customer,
      user_id: customerData?.metadata?.userId || null
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
  const { id, status } = subscription;
  
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: id
  });

  if (existingPayments.length > 0) {
    let paymentStatus = PAYMENT_STATUS.PENDING;
    if (status === 'active') paymentStatus = PAYMENT_STATUS.SUCCEEDED;
    if (status === 'canceled' || status === 'unpaid') paymentStatus = PAYMENT_STATUS.CANCELED;
    if (status === 'past_due') paymentStatus = PAYMENT_STATUS.FAILED;

    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: paymentStatus
    });
  }

  console.log(`🔄 Subscription updated: ${id} - Status: ${status}`);
}

async function handleSubscriptionCanceled(base44, subscription) {
  const { id } = subscription;
  
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: id
  });

  if (existingPayments.length > 0) {
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.CANCELED
    });
  }

  console.log(`🚫 Subscription canceled: ${id}`);
}