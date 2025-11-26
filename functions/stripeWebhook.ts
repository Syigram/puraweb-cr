import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@^14.0.0';

// Standardized constants matching frontend and backend
const PAYMENT_MODES = {
  SUBSCRIPTION: 'subscription',
  ONETIME: 'onetime'
};

const PAYMENT_STATUS = {
  SUCCEEDED: 'succeeded',
  PENDING: 'pending',
  FAILED: 'failed',
  CANCELED: 'canceled'
};

const STRIPE_PRICES_TO_PLAN = {
  // Basic
  "price_1SUE0bFA0Fkjjug3eDCGxI4G": "basic",
  // Professional
  "price_1SUE2DFA0Fkjjug3euWqaW5c": "professional",
  // Business
  "price_1SUE32FA0Fkjjug3khKfal6N": "business",
  // One-time (Generic)
  "price_1SLIXLFA0Fkjjug3cjtoEAzT": "basic" // Default or handle dynamic
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const signature = req.headers.get("stripe-signature");
    const body = await req.text();
    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        Deno.env.get("STRIPE_WEBHOOK_SECRET")
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Helper to create/update Payment record
    const upsertPayment = async (paymentData) => {
        // We append to history (Create new record for every payment)
        await base44.asServiceRole.entities.Payment.create(paymentData);
    };

    // Helper to upsert Subscription Entity
    const upsertSubscription = async (subData) => {
        // Check if exists
        const existing = await base44.asServiceRole.entities.Subscription.list({
            stripe_subscription_id: subData.stripe_subscription_id
        });

        if (existing.length > 0) {
            await base44.asServiceRole.entities.Subscription.update(existing[0].id, subData);
        } else {
            await base44.asServiceRole.entities.Subscription.create(subData);
        }
    };

    switch (event.type) {
      // --- PAYMENT INTENT SUCCEEDED (One-time & Subscription first payment) ---
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const metadata = paymentIntent.metadata || {};
        
        // Determine plan ID
        // Sometimes intent doesn't have price info directly if created via amount
        // We rely on metadata we passed during creation
        const planId = metadata.planId || "unknown";
        const paymentMode = metadata.paymentMode || "unknown";
        const projectName = metadata.projectName || "Sin nombre";

        await upsertPayment({
            customer_email: "", // Will try to fill from customer if needed, or update later. Stripe PI usually has receipt_email
            // Better to get customer details
            stripe_payment_intent_id: paymentIntent.id,
            stripe_customer_id: paymentIntent.customer,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: PAYMENT_STATUS.SUCCEEDED,
            plan_id: planId,
            payment_mode: paymentMode,
            project_name: projectName,
            customer_email: paymentIntent.receipt_email || (await stripe.customers.retrieve(paymentIntent.customer)).email,
            customer_name: (await stripe.customers.retrieve(paymentIntent.customer)).name,
            user_id: metadata.base44_user_id // If we passed it
        });
        break;
      }

      // --- INVOICE PAYMENT SUCCEEDED (Recurring subscriptions) ---
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        
        // If this is a subscription invoice
        if (invoice.subscription) {
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
            const metadata = subscription.metadata || {};
            
            // Create Payment Record for history
            await upsertPayment({
                stripe_payment_intent_id: invoice.payment_intent,
                stripe_subscription_id: invoice.subscription,
                stripe_customer_id: invoice.customer,
                amount: invoice.amount_paid,
                currency: invoice.currency,
                status: PAYMENT_STATUS.SUCCEEDED,
                plan_id: metadata.planId || "unknown",
                payment_mode: PAYMENT_MODES.SUBSCRIPTION,
                project_name: metadata.projectName || "Sin nombre",
                customer_email: invoice.customer_email,
                customer_name: invoice.customer_name,
                user_id: metadata.base44_user_id
            });

            // Update Subscription Entity Status
            if (metadata.base44_user_id) {
                await upsertSubscription({
                    user_id: metadata.base44_user_id,
                    stripe_subscription_id: subscription.id,
                    plan_id: metadata.planId || "unknown",
                    status: subscription.status, // active
                    project_name: metadata.projectName || "Sin nombre",
                    current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
                });
            }
        }
        break;
      }

      // --- SUBSCRIPTION UPDATED / DELETED ---
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const metadata = subscription.metadata || {};

        if (metadata.base44_user_id) {
            await upsertSubscription({
                user_id: metadata.base44_user_id,
                stripe_subscription_id: subscription.id,
                plan_id: metadata.planId || "unknown",
                status: subscription.status,
                project_name: metadata.projectName || "Sin nombre",
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
            });
        }
        break;
      }
      
      // --- PAYMENT FAILED ---
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        // Log failure if needed, similar to success but status = failed
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(`Webhook handler error: ${error.message}`);
    return new Response(`Webhook handler error: ${error.message}`, { status: 500 });
  }
});