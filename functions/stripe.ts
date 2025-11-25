import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@^14.0.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

// Map plans to Stripe Price IDs
const PLAN_PRICES = {
  "Básico": "price_1SUE0bFA0Fkjjug3eDCGxI4G",
  "Profesional": "price_1SUE2DFA0Fkjjug3euWqaW5c", 
  "Empresa": "price_1SUE32FA0Fkjjug3khKfal6N",
  // English mappings
  "Basic": "price_1SUE0bFA0Fkjjug3eDCGxI4G",
  "Professional": "price_1SUE2DFA0Fkjjug3euWqaW5c",
  "Business": "price_1SUE32FA0Fkjjug3khKfal6N"
};

const PLAN_AMOUNTS = {
  "price_1SUE0bFA0Fkjjug3eDCGxI4G": 6000000, // 60,000 CRC
  "price_1SUE2DFA0Fkjjug3euWqaW5c": 10000000, // 100,000 CRC
  "price_1SUE32FA0Fkjjug3khKfal6N": 15000000  // 150,000 CRC
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
      const { planName, paymentMode, email, name } = body;
      const priceId = PLAN_PRICES[planName] || PLAN_PRICES["Básico"];
      
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

      // 2. Handle Subscription vs One-time
      if (paymentMode === 'subscription') {
        // Create a subscription
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent'],
          metadata: {
            planName
          }
        });

        return Response.json({
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
          subscriptionId: subscription.id
        });

      } else {
        // One-time payment (50%)
        const fullAmount = PLAN_AMOUNTS[priceId];
        const chargeAmount = Math.round(fullAmount * 0.5); // 50%

        const paymentIntent = await stripe.paymentIntents.create({
          amount: chargeAmount,
          currency: 'crc',
          customer: customerId,
          automatic_payment_methods: { enabled: true },
          metadata: {
            planName,
            type: 'down_payment_50_percent'
          }
        });

        return Response.json({
          clientSecret: paymentIntent.client_secret,
          id: paymentIntent.id
        });
      }
    }

    return Response.json({ error: "Action not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});