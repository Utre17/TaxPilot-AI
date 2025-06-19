import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export default stripe;

// Swiss pricing configuration (matches client.ts)
export const PRICING_PLANS = {
  starter: {
    name: 'Starter Plan',
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 19700, // CHF 197.00 in cents
    currency: 'chf',
    interval: 'month',
    features: [
      'Unlimited tax calculations',
      'Tax health monitoring', 
      'Compliance calendar',
      'Email alerts',
      'Save up to 5 company profiles',
      'AI-powered recommendations',
    ],
  },
  professional: {
    name: 'Professional Plan',
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    price: 49700, // CHF 497.00 in cents
    currency: 'chf',
    interval: 'month',
    features: [
      'Everything in Starter',
      'Unlimited company profiles',
      '2 expert consultation credits/month',
      'Priority support',
      'Advanced reporting',
      'Custom tax strategies',
      'Regulatory update notifications',
    ],
  },
};

// Helper functions for Stripe operations
export const createStripeCustomer = async (email: string, name: string) => {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      environment: process.env.NODE_ENV || 'development',
    },
  });
  
  return customer;
};

export const createSubscription = async (
  customerId: string,
  priceId: string,
  trialDays: number = 14
) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    trial_period_days: trialDays,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });
  
  return subscription;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);
  return subscription;
};

export const updateSubscription = async (
  subscriptionId: string,
  newPriceId: string
) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [{
      id: subscription.items.data[0].id,
      price: newPriceId,
    }],
    proration_behavior: 'create_prorations',
  });
  
  return updatedSubscription;
};

export const createBillingPortalSession = async (
  customerId: string,
  returnUrl: string
) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  
  return session;
};

export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      trial_period_days: 14,
    },
  });
  
  return session;
};

// Webhook signature verification
export const verifyWebhookSignature = (
  body: string,
  signature: string,
  webhookSecret: string
) => {
  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
};

// Usage tracking helpers
export const recordUsage = async (
  subscriptionId: string,
  usageRecordData: Stripe.UsageRecordCreateParams
) => {
  // For metered billing if needed in the future
  // Currently we use seat-based pricing
  return null;
};

export { stripe }; 