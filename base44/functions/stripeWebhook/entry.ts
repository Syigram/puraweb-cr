import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@^14.0.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const whatsappAccessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");

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
  'price_1Sl3etFA0Fkjjug3MNf5Sj9r': 'basic',
  'price_1SlDVZFA0Fkjjug3ZD17ovCC': 'professional',
  'price_1SlDXAFA0Fkjjug3E3DsbzuG': 'business'
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
      limit: 10,
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
  
  // Si NO tiene paymentMode en metadata, es probablemente un pago de suscripción
  // (los pagos únicos siempre tienen paymentMode = 'onetime' en metadata)
  const paymentMode = metadata?.paymentMode;
  
  if (!paymentMode) {
    console.log(`⏭️ Payment intent ${id} has no paymentMode metadata, likely subscription - skipping (handled by invoice.paid)`);
    return;
  }
  
  // Solo procesar si explícitamente tiene paymentMode = 'onetime'
  if (paymentMode !== PAYMENT_MODES.ONETIME) {
    console.log(`⏭️ Payment intent ${id} has unknown paymentMode (${paymentMode}), skipping`);
    return;
  }
  
  // Get customer details
  const customerData = customer ? await stripe.customers.retrieve(customer) : null;
  
  // Determine plan from metadata or amount
  let planId = metadata?.planId;
  if (!planId) {
    planId = getPlanIdFromAmount(amount);
  }
  
  // Check if payment record exists
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_payment_intent_id: id
  });

  if (existingPayments.length > 0) {
    // Update existing record
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.SUCCEEDED,
      plan_id: planId
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

  // Send WhatsApp notification - get phone from payment method billing details
  let customerPhone = customerData?.phone || metadata?.phone;
  
  // Try to get phone from the payment intent's payment method
  if (!customerPhone && paymentIntent.payment_method) {
    try {
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
      customerPhone = paymentMethod.billing_details?.phone;
    } catch (e) {
      console.log('Could not retrieve payment method for phone:', e.message);
    }
  }
  
  console.log(`📱 About to send WhatsApp for one-time payment. Phone: ${customerPhone}`);
  await sendWhatsAppPaymentConfirmation(customerPhone, amount, planId, PAYMENT_MODES.ONETIME, currency);

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
  let { id, subscription, customer, amount_paid, currency, payment_intent } = invoice;
  
  console.log(`🔍 Processing invoice.paid: ${id}`);
  console.log(`   subscription: ${subscription}`);
  console.log(`   payment_intent: ${payment_intent}`);
  console.log(`   customer: ${customer}`);
  
  // Si no tiene subscription, intentar buscarla por el invoice
  if (!subscription) {
    console.log(`🔍 Invoice ${id} has no subscription field, searching...`);
    try {
      // Obtener el invoice completo desde Stripe
      const fullInvoice = await stripe.invoices.retrieve(id);
      subscription = fullInvoice.subscription;
      payment_intent = fullInvoice.payment_intent;
      customer = fullInvoice.customer;
      amount_paid = fullInvoice.amount_paid;
      currency = fullInvoice.currency;
      console.log(`📋 Full invoice data - subscription: ${subscription}, payment_intent: ${payment_intent}`);
    } catch (e) {
      console.log(`⚠️ Could not retrieve full invoice: ${e.message}`);
    }
  }
  
  if (!subscription) {
    console.log(`⏭️ Invoice ${id} has no subscription after lookup, skipping`);
    return; // Not a subscription invoice
  }
  
  const customerData = await stripe.customers.retrieve(customer);
  const subscriptionData = await stripe.subscriptions.retrieve(subscription);
  const priceId = subscriptionData.items.data[0]?.price?.id;
  const planId = subscriptionData.metadata?.planId || PRICE_TO_PLAN[priceId] || 'basic';
  const subscriptionName = subscriptionData.metadata?.subscriptionName || null;

  // Get phone number for WhatsApp notification FIRST
  let customerPhone = customerData?.phone || subscriptionData.metadata?.phone;
  console.log(`📱 Looking for phone - customerData.phone: ${customerData?.phone}, metadata.phone: ${subscriptionData.metadata?.phone}`);
  
  // Try to get phone from the invoice's payment intent
  if (!customerPhone && payment_intent) {
    try {
      console.log(`📱 Retrieving payment intent ${payment_intent} for phone lookup`);
      const pi = await stripe.paymentIntents.retrieve(payment_intent);
      console.log(`📱 Payment intent has payment_method: ${pi.payment_method}`);
      if (pi.payment_method) {
        const paymentMethod = await stripe.paymentMethods.retrieve(pi.payment_method);
        customerPhone = paymentMethod.billing_details?.phone;
        console.log(`📱 Got phone from billing details: ${customerPhone}`);
      }
    } catch (e) {
      console.log('Could not retrieve payment method for phone:', e.message);
    }
  }

  // Check if payment record exists for this subscription
  const existingPayments = await base44.asServiceRole.entities.Payment.filter({
    stripe_subscription_id: subscription
  });
  
  // Also check if there's a record by payment_intent (created incorrectly by payment_intent.succeeded)
  let existingByPaymentIntent = [];
  if (payment_intent) {
    existingByPaymentIntent = await base44.asServiceRole.entities.Payment.filter({
      stripe_payment_intent_id: payment_intent
    });
  }

  // Check if this is the first payment for this subscription by looking at invoice number
  // invoice.billing_reason can be: 'subscription_create', 'subscription_cycle', 'subscription_update', etc.
  const isFirstPayment = existingPayments.length === 0 && existingByPaymentIntent.length === 0;

  if (existingPayments.length > 0) {
    // Update existing subscription payment record (renewal)
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, {
      status: PAYMENT_STATUS.SUCCEEDED,
      amount: amount_paid,
      subscription_status: subscriptionData.status,
      current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString()
    });
    console.log(`✅ Updated existing subscription record`);
  } else if (existingByPaymentIntent.length > 0) {
    // Fix incorrect record created by payment_intent.succeeded
    console.log(`🔧 Fixing incorrect payment record ${existingByPaymentIntent[0].id} -> subscription`);
    await base44.asServiceRole.entities.Payment.update(existingByPaymentIntent[0].id, {
      payment_mode: PAYMENT_MODES.SUBSCRIPTION,
      subscription_name: subscriptionName,
      plan_id: planId,
      status: PAYMENT_STATUS.SUCCEEDED,
      amount: amount_paid,
      stripe_subscription_id: subscription,
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

  // WhatsApp notification is now sent from handleSubscriptionUpdated when the record is created
  // This avoids duplicate messages since subscription.updated fires before invoice.paid
  console.log(`📱 WhatsApp handled by subscription.updated event (isFirstPayment: ${isFirstPayment})`);
  

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
  const { id, status, customer, current_period_end } = subscription;
  
  console.log(`🆕 Subscription created: ${id}, status: ${status}`);
  
  // Si la suscripción se crea directamente como activa, crear el registro
  if (status === 'active') {
    const customerData = customer ? await stripe.customers.retrieve(customer) : null;
    const priceId = subscription.items?.data[0]?.price?.id;
    const planId = subscription.metadata?.planId || PRICE_TO_PLAN[priceId] || 'basic';
    const subscriptionName = subscription.metadata?.subscriptionName || null;
    
    // Verificar si ya existe
    const existingPayments = await base44.asServiceRole.entities.Payment.filter({
      stripe_subscription_id: id
    });
    
    if (existingPayments.length === 0) {
      await base44.asServiceRole.entities.Payment.create({
        customer_email: customerData?.email || 'unknown',
        customer_name: customerData?.name || 'Unknown',
        subscription_name: subscriptionName,
        plan_id: planId,
        payment_mode: PAYMENT_MODES.SUBSCRIPTION,
        amount: subscription.items?.data[0]?.price?.unit_amount || 0,
        currency: subscription.items?.data[0]?.price?.currency || 'crc',
        status: PAYMENT_STATUS.SUCCEEDED,
        stripe_subscription_id: id,
        stripe_customer_id: customer,
        user_id: customerData?.metadata?.userId || null,
        subscription_status: status,
        current_period_end: new Date(current_period_end * 1000).toISOString()
      });
      console.log(`✅ Subscription created and payment record added: ${id}`);
    }
  }
}

async function handleSubscriptionUpdated(base44, subscription) {
  const { id, status, cancel_at_period_end, customer } = subscription;
  
  // current_period_end puede estar en el objeto principal o en los items
  const currentPeriodEnd = subscription.current_period_end || 
                           subscription.items?.data[0]?.current_period_end;
  
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

  // Calcular fecha de fin del período
  const periodEndDate = currentPeriodEnd 
    ? new Date(currentPeriodEnd * 1000).toISOString() 
    : null;

  if (existingPayments.length > 0) {
    // Actualizar registro existente
    const updateData = {
      status: paymentStatus,
      subscription_status: subscriptionStatus
    };
    if (periodEndDate) {
      updateData.current_period_end = periodEndDate;
    }
    await base44.asServiceRole.entities.Payment.update(existingPayments[0].id, updateData);
  } else if (status === 'active') {
    // Crear registro si la suscripción pasó de incomplete a active y no existe
    const createData = {
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
      subscription_status: subscriptionStatus
    };
    if (periodEndDate) {
      createData.current_period_end = periodEndDate;
    }
    await base44.asServiceRole.entities.Payment.create(createData);
    
    // Send WhatsApp for NEW subscription created here
    let customerPhone = customerData?.phone || subscription.metadata?.phone;
    
    // Try to get phone from default payment method
    if (!customerPhone && subscription.default_payment_method) {
      try {
        const paymentMethod = await stripe.paymentMethods.retrieve(subscription.default_payment_method);
        customerPhone = paymentMethod.billing_details?.phone;
      } catch (e) {
        console.log('Could not retrieve payment method for phone:', e.message);
      }
    }
    
    console.log(`📱 Sending WhatsApp for NEW subscription (from updated event). Phone: ${customerPhone}`);
    await sendWhatsAppPaymentConfirmation(
      customerPhone, 
      subscription.items?.data[0]?.price?.unit_amount || 0, 
      planId, 
      PAYMENT_MODES.SUBSCRIPTION, 
      subscription.items?.data[0]?.price?.currency || 'crc'
    );
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

// ============ WHATSAPP NOTIFICATION ============

const PLAN_NAMES = {
  basic: { es: 'Básico', en: 'Basic' },
  professional: { es: 'Profesional', en: 'Professional' },
  business: { es: 'Empresarial', en: 'Business' }
};

const PAYMENT_MODE_NAMES = {
  subscription: { es: 'Suscripción', en: 'Subscription' },
  onetime: { es: 'Pago Único', en: 'One-time Payment' }
};

async function sendWhatsAppPaymentConfirmation(phoneNumber, amount, planId, paymentMode, currency = 'crc') {
  console.log(`📱 sendWhatsAppPaymentConfirmation called with:`, {
    phoneNumber,
    amount,
    planId,
    paymentMode,
    currency,
    hasToken: !!whatsappAccessToken,
    hasPhoneId: !!whatsappPhoneNumberId
  });

  if (!whatsappAccessToken || !whatsappPhoneNumberId) {
    console.log('⚠️ WhatsApp credentials not configured, skipping notification');
    return;
  }

  if (!phoneNumber) {
    console.log('⚠️ No phone number provided, skipping WhatsApp notification');
    return;
  }

  // Format phone number (remove spaces, dashes, and ensure it has country code)
  let formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
  if (!formattedPhone.startsWith('+')) {
    // Assume Costa Rica if no country code
    if (!formattedPhone.startsWith('506')) {
      formattedPhone = '506' + formattedPhone;
    }
  } else {
    formattedPhone = formattedPhone.substring(1); // Remove + for WhatsApp API
  }

  // Format amount (convert from cents to currency display)
  const amountInUnits = amount / 100;
  const formattedAmount = currency.toUpperCase() === 'CRC' 
    ? `₡${amountInUnits.toLocaleString('es-CR')}`
    : `$${amountInUnits.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  // Get plan and payment mode names
  const planName = PLAN_NAMES[planId]?.es || planId;
  const paymentModeName = PAYMENT_MODE_NAMES[paymentMode]?.es || paymentMode;
  const planDescription = `Plan ${planName} - ${paymentModeName}`;

  const sendMessageToNumber = async (targetPhone) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v22.0/${whatsappPhoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${whatsappAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: targetPhone,
            type: 'template',
            template: {
              name: 'payment_confirmation',
              language: { code: 'es' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: formattedAmount },
                    { type: 'text', text: planDescription }
                  ]
                }
              ]
            }
          })
        }
      );

      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ WhatsApp notification sent to ${targetPhone}`);
        return true;
      } else {
        console.error(`❌ WhatsApp API error for ${targetPhone}:`, result);
        return false;
      }
    } catch (error) {
      console.error(`❌ Failed to send WhatsApp notification to ${targetPhone}:`, error.message);
      return false;
    }
  };

  // Send to customer
  await sendMessageToNumber(formattedPhone);

  // Send copy to configured admin number
  const copyPhoneNumber = Deno.env.get('WHATSAPP_COPY_PHONE_NUMBER');
  if (copyPhoneNumber) {
    let formattedCopyPhone = copyPhoneNumber.replace(/[\s\-\(\)]/g, '');
    if (formattedCopyPhone.startsWith('+')) {
      formattedCopyPhone = formattedCopyPhone.substring(1);
    }
    console.log(`📋 Sending copy to admin number: ${formattedCopyPhone}`);
    await sendMessageToNumber(formattedCopyPhone);
  }
}