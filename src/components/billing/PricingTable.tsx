'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users } from 'lucide-react';
import { formatSwissFrancs } from '@/lib/utils';
import { STRIPE_PRODUCTS } from '@/lib/stripe/client';

interface PricingTableProps {
  currentPlan?: string;
  onSelectPlan?: (planId: string) => void;
  showFreePlan?: boolean;
}

const FREE_PLAN = {
  name: 'Free',
  price: 0,
  currency: 'CHF',
  interval: 'month',
  description: 'Perfect for getting started with Swiss tax calculations',
  features: [
    '3 tax calculations per month',
    '1 canton comparison',
    'Basic tax health score',
    'Email capture for results',
    'Standard support',
  ],
  limitations: [
    'Limited calculations',
    'No AI recommendations',
    'No compliance monitoring',
  ],
  cta: 'Get Started Free',
  popular: false,
};

const PRICING_PLANS = [
  FREE_PLAN,
  {
    ...STRIPE_PRODUCTS.starter,
    description: 'Ideal for SMEs needing regular tax monitoring and optimization',
    limitations: [],
    cta: 'Start 14-Day Free Trial',
    popular: true,
  },
  {
    ...STRIPE_PRODUCTS.professional,
    description: 'Complete solution for businesses requiring expert guidance',
    limitations: [],
    cta: 'Start 14-Day Free Trial',
    popular: false,
  },
];

export default function PricingTable({ 
  currentPlan = 'free', 
  onSelectPlan,
  showFreePlan = true 
}: PricingTableProps) {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const plansToShow = showFreePlan ? PRICING_PLANS : PRICING_PLANS.slice(1);

  const getPlanId = (plan: any) => {
    if (plan.name === 'Free') return 'free';
    if (plan.name === 'Starter Plan') return 'starter';
    if (plan.name === 'Professional Plan') return 'professional';
    return plan.name.toLowerCase().replace(' plan', '');
  };

  const isCurrentPlan = (plan: any) => {
    const planId = getPlanId(plan);
    return currentPlan === planId;
  };

  const handleSelectPlan = (plan: any) => {
    const planId = getPlanId(plan);
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  return (
    <div className="py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold swiss-heading mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg swiss-body max-w-2xl mx-auto mb-8">
          Transparent Swiss pricing with no hidden fees. All plans include 14-day free trial.
        </p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-swiss-grey-100 dark:bg-swiss-grey-800 rounded-lg p-1">
          <button
            onClick={() => setBillingInterval('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingInterval === 'month'
                ? 'bg-white dark:bg-swiss-grey-700 text-swiss-blue-600 shadow-sm'
                : 'text-swiss-grey-600 hover:text-swiss-grey-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingInterval === 'year'
                ? 'bg-white dark:bg-swiss-grey-700 text-swiss-blue-600 shadow-sm'
                : 'text-swiss-grey-600 hover:text-swiss-grey-900'
            }`}
          >
            Yearly
            <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plansToShow.map((plan, index) => {
          const planId = getPlanId(plan);
          const isCurrent = isCurrentPlan(plan);
          const isPopular = plan.popular;
          
          // Calculate yearly price (20% discount)
          const monthlyPrice = plan.price;
          const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);
          const displayPrice = billingInterval === 'year' ? yearlyPrice / 12 : monthlyPrice;

          return (
            <div
              key={planId}
              className={`relative rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                isPopular
                  ? 'border-swiss-blue-500 shadow-lg'
                  : 'border-swiss-grey-200 dark:border-swiss-grey-700'
              } ${
                isCurrent
                  ? 'ring-2 ring-swiss-blue-500 ring-opacity-50'
                  : ''
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-swiss-blue-500 text-white text-sm font-medium">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrent && (
                <div className="absolute -top-4 right-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                    Current Plan
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold swiss-subheading mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm swiss-body mb-4">
                    {plan.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    {plan.price === 0 ? (
                      <div className="text-4xl font-bold swiss-heading">
                        Free
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold swiss-heading">
                          {formatSwissFrancs(displayPrice)}
                        </div>
                        <div className="text-sm swiss-body">
                          per month{billingInterval === 'year' && ', billed annually'}
                        </div>
                        {billingInterval === 'year' && (
                          <div className="text-xs text-green-600 font-medium mt-1">
                            Save {formatSwissFrancs(monthlyPrice * 12 - yearlyPrice)} per year
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={isPopular ? "swiss" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isCurrent}
                  >
                    {isCurrent ? 'Current Plan' : plan.cta}
                  </Button>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-medium swiss-subheading text-sm uppercase tracking-wider">
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm swiss-body">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Limitations for free plan */}
                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="pt-3 border-t border-swiss-grey-200 dark:border-swiss-grey-700">
                      <h5 className="font-medium swiss-subheading text-xs uppercase tracking-wider text-swiss-grey-500 mb-2">
                        Limitations:
                      </h5>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <div className="h-4 w-4 mt-0.5 mr-3 flex-shrink-0">
                              <div className="h-1 w-4 bg-swiss-grey-300 rounded"></div>
                            </div>
                            <span className="text-xs swiss-body text-swiss-grey-600">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise Section */}
      <div className="text-center mt-12 pt-8 border-t border-swiss-grey-200 dark:border-swiss-grey-700">
        <div className="max-w-2xl mx-auto">
          <Users className="h-12 w-12 text-swiss-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold swiss-heading mb-2">
            Enterprise Solution
          </h3>
          <p className="swiss-body mb-6">
            Need custom tax strategies for large corporations or multiple entities? 
            Our enterprise solution includes dedicated support, custom integrations, and compliance consulting.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="text-center mt-12 pt-8 border-t border-swiss-grey-200 dark:border-swiss-grey-700">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold swiss-heading mb-2">14-Day</div>
              <div className="swiss-body">Free Trial</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold swiss-heading mb-2">Cancel</div>
              <div className="swiss-body">Anytime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold swiss-heading mb-2">CHF</div>
              <div className="swiss-body">Swiss Pricing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 