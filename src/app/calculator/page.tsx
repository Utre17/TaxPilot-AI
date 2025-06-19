'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CompanyProfileForm from '@/components/calculator/CompanyProfileForm';
import TaxHealthScore from '@/components/calculator/TaxHealthScore';
import CantonComparison from '@/components/calculator/CantonComparison';
import { CompanyData, TaxCalculation as TaxCalculationType, TaxHealthScore as TaxHealthScoreType } from '@/lib/swiss-tax-data';
import { Calculator, FileText, Share2, ArrowLeft, Crown, Lock, TrendingUp, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';
import { FeatureGate } from '@/lib/feature-gates';

type CalculatorStep = 'form' | 'calculating' | 'results';

// Demo usage data for feature gate testing
const DEMO_USAGE = {
  calculations: 2, // User has used 2 out of 3 free calculations
  cantonComparisons: 0,
  savedProfiles: 0,
};

const DEMO_PLAN = 'free'; // Can be 'free', 'starter', or 'professional'

export default function CalculatorPage() {
  const [step, setStep] = useState<CalculatorStep>('form');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [taxCalculations, setTaxCalculations] = useState<TaxCalculationType[] | null>(null);
  const [healthScore, setHealthScore] = useState<TaxHealthScoreType | null>(null);
  const [featureGate] = useState(() => new FeatureGate(DEMO_PLAN, DEMO_USAGE));
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Check if user can perform calculation
  const canCalculate = featureGate.canCalculateTaxes();
  const canCompareCantons = featureGate.canCompareCantons();
  const hasAIRecommendations = featureGate.canAccessAIRecommendations();

  // Timer for registration modal (30 seconds after results appear)
  useEffect(() => {
    if (step === 'results' && DEMO_PLAN === 'free') {
      const timer = setTimeout(() => {
        setShowRegistrationModal(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    // Reset to form if user hits limits
    if (!canCalculate.allowed && step !== 'form') {
      setStep('form');
    }
  }, [canCalculate.allowed, step]);

  const handleFormSubmit = async (data: CompanyData) => {
    // Check feature gate first
    if (!canCalculate.allowed) {
      // This will be handled by the form component
      return;
    }

    setCompanyData(data);
    setStep('calculating');

    try {
      // Analyze company data
      const analysisResponse = await fetch('/api/calculator/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed');
      }

      const analysisResult = await analysisResponse.json();

      // Get canton comparison
      const comparisonResponse = await fetch('/api/calculator/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!comparisonResponse.ok) {
        throw new Error('Comparison failed');
      }

      const comparisonResult = await comparisonResponse.json();

      setTaxCalculations(comparisonResult.data?.calculations || []);
      setHealthScore(analysisResult.data?.healthScore || analysisResult.data);
      
      // Log usage (in real app, this would be sent to backend)
      console.log('Calculation performed - usage logged');
      
      setStep('results');
    } catch (error) {
      console.error('Calculation failed:', error);
      alert('Calculation failed. Please try again.');
      setStep('form');
    }
  };

  const handleStartOver = () => {
    setStep('form');
    setCompanyData(null);
    setTaxCalculations(null);
    setHealthScore(null);
  };

  const handleUpgrade = () => {
    window.location.href = '/pricing';
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
            
            {/* Usage Indicator */}
            <div className="flex items-center space-x-4">
              <div className="text-sm swiss-body">
                {canCalculate.limit === -1 ? (
                  <div className="flex items-center text-green-600">
                    <Crown className="h-4 w-4 mr-1" />
                    Unlimited calculations
                  </div>
                ) : (
                  <span className={canCalculate.allowed ? 'text-swiss-grey-600' : 'text-red-600'}>
                    {canCalculate.currentUsage || 0}/{canCalculate.limit} calculations used
                  </span>
                )}
              </div>
              
              {!canCalculate.allowed && (
                <Button variant="swiss" size="sm" onClick={handleUpgrade}>
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'form' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Calculator className="h-12 w-12 text-swiss-blue-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold swiss-heading mb-4">
                Swiss Tax Calculator
              </h1>
              <p className="text-lg swiss-body">
                Calculate your optimal tax strategy across all Swiss cantons
              </p>
              
              {/* Feature Gate Warning */}
              {!canCalculate.allowed && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center justify-center">
                    <Lock className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-800 dark:text-red-200 font-medium">
                      {canCalculate.reason}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 border-red-300 text-red-700 hover:bg-red-50"
                    onClick={handleUpgrade}
                  >
                    Upgrade for unlimited calculations
                  </Button>
                </div>
              )}
            </div>
            
            <CompanyProfileForm 
              onSubmit={handleFormSubmit}
            />
          </div>
        )}

        {step === 'calculating' && (
          <div className="text-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-swiss-blue-500 mx-auto mb-8"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-swiss-blue-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold swiss-heading mb-4">
              Crunching the numbers...
            </h2>
            <div className="space-y-2 max-w-md mx-auto">
              <p className="swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">
                ✓ Checking 26 cantonal tax codes
              </p>
              <p className="swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">
                ✓ Running AI optimization analysis
              </p>
              <p className="swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">
                ✓ Calculating potential savings...
              </p>
            </div>
            <div className="mt-6 bg-swiss-blue-50 dark:bg-swiss-blue-900/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm swiss-body text-swiss-blue-700 dark:text-swiss-blue-300">
                💡 Did you know? Swiss SMEs save an average of CHF 5,200 annually by optimizing their canton choice.
              </p>
            </div>
          </div>
        )}

        {step === 'results' && companyData && taxCalculations && healthScore && (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold swiss-heading mb-2">
                Tax Analysis Results
              </h1>
              <p className="swiss-body">
                Analysis for <strong>{companyData.name}</strong>
              </p>
              
              {/* Plan-based features indicator */}
              <div className="mt-4 flex justify-center space-x-4">
                {hasAIRecommendations.allowed ? (
                  <div className="flex items-center text-green-600">
                    <Crown className="h-4 w-4 mr-1" />
                    AI recommendations included
                  </div>
                ) : (
                  <div className="flex items-center text-orange-600">
                    <Lock className="h-4 w-4 mr-1" />
                    AI recommendations require upgrade
                  </div>
                )}
              </div>
            </div>

            {/* Tax Health Score */}
            <TaxHealthScore 
              healthScore={healthScore} 
              showAIRecommendations={hasAIRecommendations.allowed}
            />

            {/* Immediate Action CTA */}
            {healthScore.potentialSavings > 1000 && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500 text-white rounded-full p-3">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold swiss-heading text-green-800 dark:text-green-200 mb-2">
                  Want to save CHF {Math.round(healthScore.potentialSavings).toLocaleString()} this year?
                </h3>
                <p className="swiss-body text-green-700 dark:text-green-300 mb-6">
                  Get your complete tax optimization plan with step-by-step implementation guide
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="swiss" size="lg" onClick={handleUpgrade}>
                    Get Full Optimization Plan
                  </Button>
                  <Button variant="outline" size="lg" className="border-green-500 text-green-700 hover:bg-green-50">
                    Talk to a Tax Expert
                  </Button>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-3">
                  14-day free trial • No commitment • Cancel anytime
                </p>
              </div>
            )}

            {/* Canton Comparison */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold swiss-heading">
                  Canton Comparison
                </h2>
                
                {!canCompareCantons.allowed && (
                  <div className="flex items-center text-orange-600">
                    <Lock className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {canCompareCantons.reason}
                    </span>
                  </div>
                )}
              </div>
              
              <CantonComparison 
                calculations={taxCalculations}
                currentCanton={companyData.canton}
                onCantonSelect={(canton) => console.log('Selected canton:', canton)}
              />
              
              {!canCompareCantons.allowed && (
                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
                  <p className="text-orange-800 dark:text-orange-200">
                    Full canton comparison features require a paid plan
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-swiss-grey-800 border border-swiss-grey-200 dark:border-swiss-grey-700 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold swiss-subheading mb-4">
                What would you like to do next?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={handleStartOver}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Again
                </Button>
                
                <Button 
                  variant="swiss" 
                  onClick={() => setShowExportModal(true)}
                  className="relative"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Get PDF Report
                  {!hasAIRecommendations.allowed && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 rounded-full">
                      Free
                    </span>
                  )}
                </Button>
                
                <Button variant="outline" onClick={() => setShowShareModal(true)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
              
              {!hasAIRecommendations.allowed && (
                <div className="mt-4 pt-4 border-t border-swiss-grey-200 dark:border-swiss-grey-700">
                  <p className="text-sm swiss-body text-swiss-grey-600 dark:text-swiss-grey-400 mb-3">
                    Want the complete analysis with AI recommendations?
                  </p>
                  <Button variant="swiss" onClick={handleUpgrade}>
                    <Crown className="h-4 w-4 mr-2" />
                    Start Free Trial
                  </Button>
                </div>
              )}
            </div>

            {/* Upgrade CTA for free users */}
            {DEMO_PLAN === 'free' && (
              <div className="mt-12 text-center p-8 bg-gradient-to-r from-swiss-blue-50 to-swiss-blue-100 dark:from-swiss-blue-900/20 dark:to-swiss-blue-800/20 rounded-2xl">
                <Crown className="h-12 w-12 text-swiss-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold swiss-heading mb-2">
                  Unlock Advanced Features
                </h3>
                <p className="swiss-body mb-6">
                  Get unlimited calculations, AI recommendations, compliance monitoring, and more
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="swiss" size="lg" onClick={handleUpgrade}>
                    Start 14-Day Free Trial
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.location.href = '/pricing'}>
                    View All Plans
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-swiss-grey-800 rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold swiss-subheading">Save Your Tax Report</h3>
                <button onClick={() => setShowExportModal(false)}>
                  <X className="h-5 w-5 text-swiss-grey-500" />
                </button>
              </div>
              <p className="swiss-body mb-6">
                Enter your email to receive this PDF report plus monthly Swiss tax optimization tips.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-swiss-grey-300 dark:border-swiss-grey-600 rounded-lg focus:ring-2 focus:ring-swiss-blue-500 focus:border-transparent"
                />
                <div className="flex gap-3">
                  <Button variant="swiss" className="flex-1">
                    Send Report & Tips
                  </Button>
                  <Button variant="outline" onClick={() => setShowExportModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
              <p className="text-xs text-swiss-grey-500 mt-3">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-swiss-grey-800 rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold swiss-subheading">Share Results</h3>
                <button onClick={() => setShowShareModal(false)}>
                  <X className="h-5 w-5 text-swiss-grey-500" />
                </button>
              </div>
              <p className="swiss-body mb-6">
                Create a free account to save and share your tax analysis with your team or advisor.
              </p>
              <div className="flex gap-3">
                <Button variant="swiss" className="flex-1" onClick={handleUpgrade}>
                  Create Free Account
                </Button>
                <Button variant="outline" onClick={() => setShowShareModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Registration Modal (appears after 30s) */}
        {showRegistrationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-swiss-grey-800 rounded-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold swiss-heading">Save Your Report</h3>
                <button onClick={() => setShowRegistrationModal(false)}>
                  <X className="h-5 w-5 text-swiss-grey-500" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-swiss-blue-100 dark:bg-swiss-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-swiss-blue-600" />
                </div>
                <h4 className="text-lg font-semibold swiss-subheading mb-2">
                  Don't lose this valuable analysis!
                </h4>
                <p className="swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">
                  Create your free account to save this report and get monthly Swiss tax optimization tips.
                </p>
              </div>

              {healthScore && healthScore.potentialSavings > 1000 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">
                      You could save CHF {Math.round(healthScore.potentialSavings).toLocaleString()} annually
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-swiss-grey-300 dark:border-swiss-grey-600 rounded-lg focus:ring-2 focus:ring-swiss-blue-500 focus:border-transparent"
                />
                <Button variant="swiss" className="w-full" onClick={handleUpgrade}>
                  Create Free Account & Save Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowRegistrationModal(false)}
                >
                  Maybe Later
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-swiss-grey-500">
                <span>✓ 14-day free trial</span>
                <span>✓ No credit card</span>
                <span>✓ Cancel anytime</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}