'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PricingTable from '@/components/billing/PricingTable';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlParams, setUrlParams] = useState<{
    success: string | null;
    canceled: string | null;
    autoselect: string | null;
  }>({ success: null, canceled: null, autoselect: null });

  // Check for URL parameters (success/canceled/autoselect) on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setUrlParams({
        success: searchParams.get('success'),
        canceled: searchParams.get('canceled'),
        autoselect: searchParams.get('autoselect')
      });
    }
  }, []);

  // Auto-select plan if redirected from login
  useEffect(() => {
    if (urlParams.autoselect) {
      handlePlanSelection(urlParams.autoselect);
    }
  }, [urlParams.autoselect]);

  const handlePlanSelection = async (planId: string) => {
    if (planId === 'free') {
      // Redirect to sign-up for free plan
      router.push('/sign-up');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If unauthorized, redirect to sign-in with plan selection
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-swiss-grey-200 dark:border-swiss-grey-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-swiss-blue-500 hover:text-swiss-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="swiss">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {urlParams.success && (
        <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <p className="text-green-800 dark:text-green-200">
                Subscription activated successfully! Welcome to TaxPilot AI.
              </p>
            </div>
          </div>
        </div>
      )}

      {urlParams.canceled && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
              <p className="text-orange-800 dark:text-orange-200">
                Subscription setup was canceled. You can try again anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              <p className="text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingTable onSelectPlan={handlePlanSelection} />
        
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-swiss-grey-800 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-swiss-blue-500"></div>
                <span className="swiss-body">Setting up your subscription...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-swiss-grey-50 dark:bg-swiss-grey-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold swiss-heading text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid gap-8">
            <div>
              <h3 className="text-lg font-semibold swiss-subheading mb-2">
                Is there really a 14-day free trial?
              </h3>
              <p className="swiss-body">
                Yes! All paid plans include a 14-day free trial. No credit card required for the trial period. 
                You can cancel anytime during the trial without being charged.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold swiss-subheading mb-2">
                Can I change plans later?
              </h3>
              <p className="swiss-body">
                Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate the billing accordingly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold swiss-subheading mb-2">
                Are the tax calculations accurate for 2025?
              </h3>
              <p className="swiss-body">
                Yes, we use official 2025 tax rates from the Swiss Federal Tax Administration and all 26 cantonal authorities. 
                Our calculations are updated regularly to reflect any changes in tax law.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold swiss-subheading mb-2">
                What payment methods do you accept?
              </h3>
              <p className="swiss-body">
                We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for Swiss customers. 
                All payments are processed securely through Stripe.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold swiss-subheading mb-2">
                Is my financial data secure?
              </h3>
              <p className="swiss-body">
                Your security is our top priority. We use bank-level encryption, comply with Swiss data protection laws, 
                and never store sensitive financial information on our servers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold swiss-subheading mb-2">
                Can I get help setting up my account?
              </h3>
              <p className="swiss-body">
                Professional plan subscribers get priority support and can schedule consultation calls with our tax experts. 
                All users have access to our comprehensive help documentation and email support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-swiss-blue-600 dark:bg-swiss-blue-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to optimize your Swiss taxes?
          </h2>
          <p className="text-xl text-swiss-blue-100 mb-8">
            Join hundreds of Swiss SMEs saving time and money with TaxPilot AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-swiss-blue-600 hover:bg-swiss-blue-50"
              onClick={() => handlePlanSelection('starter')}
              disabled={loading}
            >
              Start Free Trial
            </Button>
            <Link href="/calculator">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-swiss-blue-600"
              >
                Try Calculator Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 