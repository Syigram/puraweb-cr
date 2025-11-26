import Stripe from "npm:stripe@17.5.0";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return Response.json({ error: "subscriptionId is required" }, { status: 400 });
    }

    // Verify that this subscription belongs to the user
    const payments = await base44.asServiceRole.entities.Payment.filter({
      user_id: user.id,
      stripe_subscription_id: subscriptionId
    });

    if (payments.length === 0) {
      return Response.json({ error: "Subscription not found or unauthorized" }, { status: 404 });
    }

    // Cancel the subscription in Stripe
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    // Update the payment record
    await base44.asServiceRole.entities.Payment.update(payments[0].id, {
      subscription_status: "canceled"
    });

    return Response.json({
      success: true,
      subscription: {
        id: canceledSubscription.id,
        status: canceledSubscription.status,
        canceled_at: canceledSubscription.canceled_at
      }
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});