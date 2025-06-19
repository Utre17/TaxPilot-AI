'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calculator, BarChart3, Zap, ArrowRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect to calculator after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/calculator');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const features = [
    {
      icon: Calculator,
      title: 'Unlimited Tax Calculations',
      description: 'Calculate taxes for all 26 Swiss cantons with no limits'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get detailed insights and optimization recommendations'
    },
    {
      icon: Zap,
      title: 'AI-Powered Recommendations',
      description: 'Receive personalized tax strategies powered by AI'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-swiss-blue-50 to-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold swiss-heading mb-4">
            Welcome to TaxPilot AI! 🎉
          </h1>
          <p className="text-xl swiss-body text-swiss-grey-600 mb-6 max-w-2xl mx-auto">
            Your subscription is now active and your 14-day free trial has started. 
            You now have access to all premium features.
          </p>
          
          {/* Trial Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8">
            <Gift className="w-4 h-4 mr-2" />
            14-Day Free Trial Active
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-swiss-grey-200"
            >
              <div className="w-12 h-12 bg-swiss-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-swiss-blue-600" />
              </div>
              <h3 className="text-lg font-semibold swiss-heading mb-2">
                {feature.title}
              </h3>
              <p className="text-sm swiss-body text-swiss-grey-600">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-swiss-blue-600 hover:bg-swiss-blue-700 text-white px-8 py-4"
            >
              <Link href="/calculator">
                <Calculator className="w-5 h-5 mr-2" />
                Start Calculating Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4"
            >
              <Link href="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>

          {/* Auto-redirect notice */}
          <p className="text-sm swiss-body text-swiss-grey-500 mt-6">
            You'll be automatically redirected to the calculator in {countdown} seconds
          </p>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 pt-8 border-t border-swiss-grey-200"
        >
          <h2 className="text-2xl font-bold swiss-heading mb-6">What's Next?</h2>
          <div className="text-left max-w-2xl mx-auto space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-swiss-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
              <div>
                <p className="font-medium">Calculate your current tax situation</p>
                <p className="text-sm text-swiss-grey-600">Enter your company details to see your tax burden across all Swiss cantons</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-swiss-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
              <div>
                <p className="font-medium">Explore optimization opportunities</p>
                <p className="text-sm text-swiss-grey-600">Get AI-powered recommendations for tax savings and business structure optimization</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-swiss-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
              <div>
                <p className="font-medium">Compare cantons and plan your strategy</p>
                <p className="text-sm text-swiss-grey-600">Use our advanced tools to plan relocations and business structure changes</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 