import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      throw new Error('Missing Stripe publishable key');
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

export default getStripe;

// Stripe pricing configuration for Swiss market
export const STRIPE_PRODUCTS = {
  starter: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || 'price_starter_monthly',
    name: 'Starter Plan',
    price: 197,
    currency: 'CHF',
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
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID || 'price_professional_monthly',
    name: 'Professional Plan',
    price: 497,
    currency: 'CHF',
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

// Utility function to format Stripe prices
export const formatStripePrice = (amount: number, currency: string = 'CHF') => {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Check if user has active subscription
export const hasActiveSubscription = (subscription: any) => {
  return subscription && ['active', 'trialing'].includes(subscription.status);
};

// Get plan features based on subscription
export const getPlanFeatures = (planId: string) => {
  if (planId === 'starter') return STRIPE_PRODUCTS.starter.features;
  if (planId === 'professional') return STRIPE_PRODUCTS.professional.features;
  return ['Basic tax calculator', 'Canton comparison (1 time)', 'Tax health score'];
}; 