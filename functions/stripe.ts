import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@^14.0.0';

// CONFIGURATION
const PAYMENT_MODES = {
  SUBSCRIPTION: 'subscription',
  ONETIME: 'onetime'
};

const PLAN_IDS = {
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  BUSINESS: 'business'
};

// Mapping Plan IDs to Stripe Price IDs
const STRIPE_PRICES = {
  [PLAN_IDS.BASIC]: {
    subscription: "price_1SUE0bFA0Fkjjug3eDCGxI4G",
    onetime: "price_1SLIXLFA0Fkjjug3cjtoEAzT" // Assuming same onetime price for all for now or need specific ones
  },
  [PLAN_IDS.PROFESSIONAL]: {
    subscription: "price_1SUE2DFA0Fkjjug3euWqaW5c",
    onetime: "price_1SLIXLFA0Fkjjug3cjtoEAzT"
  },
  [PLAN_IDS.BUSINESS]: {
    subscription: "price_1SUE32FA0Fkjjug3khKfal6N",
    onetime: "price_1SLIXLFA0Fkjjug3cjtoEAzT"
  }
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
    
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await req.json();
    const { action } = body;

    // --- ACTION: GET CONFIG ---
    if (action === "getConfig") {
      return Response.json({ 
        publishableKey: Deno.env.get("STRIPE_PUBLISHABLE_KEY") 
      });
    }

    // --- ACTION: CREATE PAYMENT INTENT / SUBSCRIPTION ---
    if (action === "createPaymentIntent") {
      const { planId, paymentMode, email, name, projectName } = body;
      
      if (!email) {
        return Response.json({ error: "Email is required" });
      }

      const user = await base44.auth.me().catch(() => null);
      
      // 1. Create or Get Customer
      let customer;
      const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: name,
          metadata: {
            base44_user_id: user ? user.id : null
          }
        });
      }

      const priceId = STRIPE_PRICES[planId]?.[paymentMode];
      if (!priceId) {
        return Response.json({ error: "Invalid plan or payment mode configuration" });
      }

      // Common metadata
      const metadata = {
        planId: planId,
        paymentMode: paymentMode,
        base44_user_id: user ? user.id : null,
        projectName: projectName || "Sin nombre"
      };

      if (paymentMode === PAYMENT_MODES.SUBSCRIPTION) {
        // For subscriptions, we create a Subscription directly (which creates a PaymentIntent)
        // Or for SetupIntent + Subscription later. 
        // Simplest for "Payment Element" with Subscription is to create a Subscription with 'incomplete' status
        
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent'],
          metadata: metadata,
          subscription_data: {
            metadata: metadata // Ensure subscription object also has metadata
          }
        });

        return Response.json({
          subscriptionId: subscription.id,
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });

      } else {
        // One-time payment (50% down payment)
        // Note: In a real app, you might want to calculate 50% of the plan price dynamically
        // Here we use the predefined onetime price ID, or we could pass amount directly.
        // Using priceId is safer for backend control.
        
        // For PaymentIntent with Price ID (Stripe typically wants 'amount', not price ID for simple intents unless using checkout sessions)
        // But if we defined Products/Prices in Stripe dashboard for the "Down Payment", we can look up the amount.
        // To keep it simple and robust, let's fetch the price amount first or use hardcoded knowledge (bad practice).
        // Better: Retrieve the price from Stripe.
        
        const price = await stripe.prices.retrieve(priceId);

        const paymentIntent = await stripe.paymentIntents.create({
          amount: price.unit_amount,
          currency: price.currency,
          customer: customer.id,
          automatic_payment_methods: { enabled: true },
          metadata: metadata
        });

        return Response.json({
          clientSecret: paymentIntent.client_secret,
        });
      }
    }

    // --- ACTION: CANCEL SUBSCRIPTION ---
    if (action === "cancelSubscription") {
      const { subscriptionId } = body;
      const user = await base44.auth.me();

      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Security check: Verify this subscription belongs to the user
      // We can query our database for the subscription to check ownership
      const [subscriptionRecord] = await base44.entities.Subscription.list({
        stripe_subscription_id: subscriptionId,
        user_id: user.id
      });

      if (!subscriptionRecord) {
        return Response.json({ error: "Subscription not found or access denied" }, { status: 403 });
      }

      // Cancel in Stripe
      const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

      return Response.json({ 
        status: canceledSubscription.status,
        message: "Subscription canceled successfully" 
      });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Stripe function error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});