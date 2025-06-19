import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { success: false, error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Define your price IDs from Stripe Dashboard
    const priceMap: Record<string, string> = {
      starter: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter',
      professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID || 'price_professional',
    };

    const priceId = priceMap[planId];
    if (!priceId) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan ID' },
        { status: 400 }
      );
    }

    // Get the origin for redirect URLs
    const headersList = headers();
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/welcome`,
      cancel_url: `${origin}/pricing?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        planId,
      },
      subscription_data: {
        trial_period_days: 14, // 14-day free trial
        metadata: {
          planId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { success: false, error: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error during checkout' },
      { status: 500 }
    );
  }
} 