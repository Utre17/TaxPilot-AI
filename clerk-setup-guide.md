# 🔐 Clerk + Supabase Integration Guide

## 📋 Overview
We're migrating from Supabase Auth to Clerk while keeping Supabase as our database. This gives us:
- ✅ Clerk's beautiful, pre-built auth UI
- ✅ Supabase's powerful database capabilities
- ✅ Better user experience and easier maintenance

## 🚀 Step 1: Install Clerk

```bash
npm install @clerk/nextjs
```

## 🔑 Step 2: Environment Variables

Add these to your `.env.local` file:

```bash
# Existing Supabase Configuration (keep these)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# NEW: Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Clerk URLs (for development)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Existing Stripe Configuration (keep these)
STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_STARTER_PRICE_ID=price_your_starter_price_id_here
STRIPE_PROFESSIONAL_PRICE_ID=price_your_professional_price_id_here

# Existing OpenAI Configuration (keep these)
OPENAI_API_KEY=your_openai_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
NODE_ENV=development
```

## 🏗️ Step 3: Update Root Layout

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaxPilot AI - Swiss Tax Intelligence',
  description: 'Professional Swiss tax intelligence platform for SMEs. Calculate taxes, optimize deductions, and get AI-powered insights for all Swiss cantons.',
  keywords: 'Swiss tax, tax calculator, tax optimization, SME, Switzerland, cantons, AI tax advice',
  authors: [{ name: 'TaxPilot AI Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'TaxPilot AI - Swiss Tax Intelligence',
    description: 'Professional Swiss tax intelligence platform for SMEs',
    type: 'website',
    locale: 'en_CH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          inter.className,
          'min-h-screen bg-background font-sans antialiased'
        )}>
          {/* Swiss-themed gradient background */}
          <div className="fixed inset-0 -z-10 swiss-layout" />
          
          {/* Main application content */}
          <div className="relative z-10">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

## 🔄 Step 4: Create New Auth Pages

### `src/app/sign-in/[[...sign-in]]/page.tsx`:

```tsx
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-swiss-blue-500 hover:bg-swiss-blue-600',
            card: 'shadow-lg',
          },
          variables: {
            colorPrimary: '#1f2937', // Swiss blue
          }
        }}
      />
    </div>
  );
}
```

### `src/app/sign-up/[[...sign-up]]/page.tsx`:

```tsx
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-swiss-blue-500 hover:bg-swiss-blue-600',
            card: 'shadow-lg',
          },
          variables: {
            colorPrimary: '#1f2937', // Swiss blue
          }
        }}
      />
    </div>
  );
}
```

## 🛡️ Step 5: Protect Dashboard Route

### `src/middleware.ts`:

```ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Routes that can be visited while signed out
  publicRoutes: [
    '/',
    '/pricing',
    '/calculator',
    '/api/webhooks/stripe', // Keep Stripe webhooks public
  ],
  // Routes that require authentication
  ignoredRoutes: [
    '/api/webhooks/stripe', // Stripe webhooks shouldn't be protected
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## 🗄️ Step 6: Update Database Schema

### Add Clerk User ID to Supabase:

```sql
-- Add clerk_user_id column to profiles table
ALTER TABLE profiles 
ADD COLUMN clerk_user_id TEXT UNIQUE;

-- Create index for faster lookups
CREATE INDEX idx_profiles_clerk_user_id ON profiles(clerk_user_id);

-- Update the profiles table to use Clerk IDs as primary reference
-- We'll keep the UUID as primary key but use clerk_user_id for lookups
```

## 🔧 Step 7: Update Supabase Client

### `src/lib/supabase/clerk-integration.ts`:

```ts
import { auth } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Create Supabase client for server-side operations
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Get or create user profile using Clerk user data
export async function getOrCreateUserProfile() {
  const { userId, user } = auth();
  
  if (!userId || !user) {
    throw new Error('User not authenticated');
  }

  // Check if profile exists
  const { data: existingProfile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('clerk_user_id', userId)
    .single();

  if (existingProfile) {
    return existingProfile;
  }

  // Create new profile
  const { data: newProfile, error } = await supabaseAdmin
    .from('profiles')
    .insert({
      clerk_user_id: userId,
      email: user.primaryEmailAddress?.emailAddress || '',
      full_name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return newProfile;
}

// Update profile with additional data
export async function updateUserProfile(updates: Partial<any>) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('clerk_user_id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
```

## 💳 Step 8: Update Stripe Integration

### `src/app/api/stripe/create-checkout-session/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createCheckoutSession, createStripeCustomer } from '@/lib/stripe/server';
import { PRICING_PLANS } from '@/lib/stripe/server';
import { getOrCreateUserProfile } from '@/lib/supabase/clerk-integration';

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    // Validate plan ID
    if (!planId || !PRICING_PLANS[planId as keyof typeof PRICING_PLANS]) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      );
    }

    // Get authenticated user from Clerk
    const { userId, user } = auth();

    if (!userId || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get or create user profile
    const profile = await getOrCreateUserProfile();

    // Check if user already has a Stripe customer
    let stripeCustomerId = profile.stripe_customer_id;

    if (!stripeCustomerId) {
      // Create Stripe customer
      const customer = await createStripeCustomer(
        user.primaryEmailAddress?.emailAddress || '',
        profile.full_name || `${user.firstName} ${user.lastName}`
      );
      
      stripeCustomerId = customer.id;

      // Update profile with Stripe customer ID
      await updateUserProfile({ stripe_customer_id: stripeCustomerId });
    }

    // Get plan details
    const plan = PRICING_PLANS[planId as keyof typeof PRICING_PLANS];
    
    // Create checkout session
    const session = await createCheckoutSession(
      stripeCustomerId,
      plan.priceId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`
    );

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Checkout session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

## 📱 Step 9: Update Dashboard

### `src/app/(dashboard)/dashboard/page.tsx`:

```tsx
import { auth } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
// ... other imports

export default function DashboardPage() {
  const { userId, user } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-swiss-grey-800 shadow-sm border-b border-swiss-grey-200 dark:border-swiss-grey-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold swiss-heading">Dashboard</h1>
              <p className="swiss-body">
                Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/pricing">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Link>
              </Button>
              <Button asChild variant="swiss">
                <Link href="/calculator/income">
                  <Plus className="h-4 w-4 mr-2" />
                  New Calculation
                </Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Rest of dashboard content */}
      {/* ... */}
    </div>
  );
}
```

## 🔄 Step 10: Update Pricing Page

### Remove old authentication logic and update redirects:

```tsx
// In pricing page, update the plan selection to use Clerk
const handlePlanSelection = async (planId: string) => {
  if (planId === 'free') {
    router.push('/sign-up');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, redirect to sign-in
      if (response.status === 401) {
        router.push(`/sign-in?redirect_url=${encodeURIComponent(`/pricing?plan=${planId}`)}`);
        return;
      }
      throw new Error(data.error || 'Failed to create checkout session');
    }

    // Redirect to Stripe Checkout
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL received');
    }

  } catch (err) {
    console.error('Checkout error:', err);
    setError(err instanceof Error ? err.message : 'An error occurred');
  } finally {
    setLoading(false);
  }
};
```

## 🧹 Step 11: Remove Old Auth Files

Delete these files:
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- Old Supabase auth helpers that are no longer needed

## ✅ Step 12: Test the Integration

1. **Start your dev server**: `npm run dev`
2. **Visit**: `http://localhost:3001`
3. **Try to access dashboard** - should redirect to Clerk sign-in
4. **Sign up with Clerk** - should create profile in Supabase
5. **Test Stripe checkout** - should work with Clerk user data

## 🎨 Benefits Achieved

✅ **Professional auth UI** from Clerk  
✅ **Simplified code** - no more custom auth forms  
✅ **Better user management** in Clerk dashboard  
✅ **Automatic email verification**  
✅ **Social login support** (easily add Google, etc.)  
✅ **User profiles and metadata** handling  
✅ **Security best practices** built-in  

This integration gives you the best of both worlds: Clerk's excellent authentication experience with Supabase's powerful database capabilities! 