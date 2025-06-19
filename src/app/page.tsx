'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calculator, Shield, Zap, TrendingUp, Users, CheckCircle, Star, Quote, Award, FileCheck, BarChart3, Clock, MapPin, Building2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  y: -4,
  scale: 1.02,
  transition: { duration: 0.2 }
};

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Reusable Components
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any; title: string; description: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={cardHover}
    className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-swiss-blue-500 to-swiss-blue-600 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const StatBadge = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center shadow-lg"
  >
    <div className="text-2xl font-bold text-swiss-blue-600">{value}</div>
    <div className="text-sm text-slate-600">{label}</div>
  </motion.div>
);

const TestimonialCard = ({ avatar, name, company, quote, delay = 0 }: { avatar: string; name: string; company: string; quote: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={cardHover}
    className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      ))}
    </div>
    <blockquote className="text-slate-700 mb-6 leading-relaxed">"{quote}"</blockquote>
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-swiss-blue-500 to-swiss-blue-600 flex items-center justify-center text-white font-semibold text-sm">
        {avatar}
      </div>
      <div>
        <div className="font-medium text-slate-900">{name}</div>
        <div className="text-sm text-slate-600">{company}</div>
      </div>
    </div>
  </motion.div>
);

const CTAButton = ({ href, children, variant = "primary", ...props }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary"; [key: string]: any }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="inline-block"
  >
    <Button
      asChild
      size="lg"
      className={`
        ${variant === "primary" 
          ? "bg-swiss-blue-600 hover:bg-swiss-blue-700 text-white" 
          : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
        } 
        px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200
      `}
      {...props}
    >
      <Link href={href}>{children}</Link>
    </Button>
  </motion.div>
);

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header with Clerk Auth */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 h-16 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-swiss-blue-600">TaxPilot AI</Link>
          <SignedIn>
            <div className="hidden md:flex space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/test-redirects">Test Redirects</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/clerk-status">Clerk Status</Link>
              </Button>
            </div>
          </SignedIn>
        </div>
        
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="default" size="sm" className="bg-swiss-blue-600 hover:bg-swiss-blue-700">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/calculator">Calculator</Link>
            </Button>
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg border border-slate-200",
                  userButtonPopoverActionButton: "hover:bg-slate-50"
                }
              }}
            />
          </SignedIn>
        </div>
      </header>

      {/* 1. Full-Screen Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Authentication Status Banner */}
          <SignedIn>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium inline-flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>✅ You're successfully logged in! Your redirects are working perfectly.</span>
            </motion.div>
          </SignedIn>
          
          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl text-sm font-medium text-green-800 shadow-sm"
            >
              <span>🇨🇭</span>
              <span>Swiss Hosted</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl text-sm font-medium text-blue-800 shadow-sm"
            >
              <span>🤖</span>
              <span>AI + Human Oversight</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl text-sm font-medium text-purple-800 shadow-sm"
            >
              <span>🔒</span>
              <span>Encrypted</span>
            </motion.div>
          </motion.div>

          {/* Hero Content */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Swiss Tax Help<br />
            <span className="text-swiss-blue-600">You Can Trust</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            AI-powered insights meet Swiss precision. Save thousands while staying compliant.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <CTAButton href="/calculator">Try TaxPilot Free</CTAButton>
          </motion.div>

          {/* Animated Score Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12 inline-flex items-center space-x-2 px-6 py-3 bg-green-50 border border-green-200 rounded-2xl text-green-800"
          >
            <Star className="h-5 w-5 text-green-600 fill-current" />
            <span className="font-medium">
              Average Tax Health Score: <AnimatedCounter target={87} duration={2000} suffix="/100" />
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. Feature Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-sky-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              Everything you need for Swiss tax success
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              From simple calculations to smart AI guidance — we've got your back
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Calculator} 
              title="Multi-Canton Support" 
              description="Accurate calculations for all 26 Swiss cantons with real-time tax rates and municipal multipliers."
              delay={0}
            />
            <FeatureCard 
              icon={Zap} 
              title="AI-Powered Insights" 
              description="Get personalized optimization recommendations powered by advanced AI and Swiss tax expertise."
              delay={0.1}
            />
            <FeatureCard 
              icon={Shield} 
              title="Compliance Assured" 
              description="Stay compliant with latest Swiss federal and cantonal regulations, updated in real-time."
              delay={0.2}
            />
            <FeatureCard 
              icon={TrendingUp} 
              title="Smart Optimization" 
              description="Discover legal tax strategies specific to your business structure and canton."
              delay={0.3}
            />
            <FeatureCard 
              icon={Users} 
              title="SME Focused" 
              description="Designed specifically for small and medium enterprises with Swiss business needs."
              delay={0.4}
            />
            <FeatureCard 
              icon={FileCheck} 
              title="Export Ready" 
              description="Generate professional reports ready for submission to Swiss tax authorities."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: AI Optimization */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Block */}
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              >
                AI finds savings you'd miss
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                Our AI analyzes thousands of tax scenarios across all Swiss cantons, identifying optimization opportunities that even experienced accountants might overlook. Get personalized recommendations tailored to your business structure.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Canton comparison with relocation scenarios</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Optimal timing for dividends and distributions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Business structure optimization analysis</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Animated Result Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-2xl border border-slate-200">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Optimization Results</h3>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-sm font-medium text-green-800">
                      Score: A (<AnimatedCounter target={94} duration={1500} />/100)
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <div className="text-xs text-slate-500 mb-1">Current Tax</div>
                    <div className="font-semibold text-slate-800">CHF 42,300</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    <div className="text-xs text-green-600 mb-1">After Optimization</div>
                    <div className="font-semibold text-green-700">CHF 35,500</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 text-center">
                  <div className="text-sm text-green-700 mb-1">Annual Savings</div>
                  <div className="text-2xl font-bold text-green-800">
                    CHF <AnimatedCounter target={6800} duration={2000} />
                  </div>
                </div>
              </div>
              
              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-4 -right-4"
              >
                <StatBadge value="CHF 14,300" label="Max Savings Found" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: Compliance Confidence */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-2xl border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl">
                    <Shield className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-medium text-green-800">Swiss Federal Tax Law</div>
                      <div className="text-sm text-green-600">Updated 2024</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">26 Cantonal Rules</div>
                      <div className="text-sm text-blue-600">Real-time sync</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-2xl">
                    <Building2 className="h-6 w-6 text-purple-600" />
                    <div>
                      <div className="font-medium text-purple-800">Municipal Multipliers</div>
                      <div className="text-sm text-purple-600">Auto-detection</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                  </div>
                </div>
              </div>

              {/* Vertical badge stack */}
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 space-y-3">
                <StatBadge value="2024" label="Up-to-date" delay={0.2} />
                <StatBadge value="Auto" label="Rule Detection" delay={0.4} />
              </div>
            </motion.div>

            {/* Right: Text Block */}
            <div className="order-1 lg:order-2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              >
                Stay compliant, sleep easy
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                Our compliance engine continuously monitors Swiss tax law changes across all federal and cantonal levels. Get automatic updates and alerts when regulations affect your business, ensuring you're always on the right side of the law.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700">Real-time law engine updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700">Automated compliance monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700">Risk assessment and alerts</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              Trusted by Swiss business owners like you
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-slate-600"
            >
              Real stories from real businesses across Switzerland
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              avatar="MW"
              name="Marcus Weber"
              company="Weber Consulting GmbH • Zurich"
              quote="TaxPilot made our filing effortless. We saved CHF 4,200 and hours of accountant fees."
              delay={0}
            />
            <TestimonialCard
              avatar="SM"
              name="Sarah Müller"
              company="TechStart AG • Basel"
              quote="Finally a tool that speaks SME language. Clear recommendations we could actually implement."
              delay={0.1}
            />
            <TestimonialCard
              avatar="JD"
              name="Jean-Pierre Dubois"
              company="Alpine Foods SA • Vaud"
              quote="The canton comparison feature helped us relocate and save CHF 8,500 annually."
              delay={0.2}
            />
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-swiss-grey-200 dark:border-swiss-grey-700">
            <div className="text-center">
              <div className="text-3xl font-bold swiss-heading text-swiss-blue-600">50+</div>
              <div className="text-sm swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">SMEs Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold swiss-heading text-swiss-blue-600">CHF 180K+</div>
              <div className="text-sm swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold swiss-heading text-swiss-blue-600">26</div>
              <div className="text-sm swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">Cantons Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold swiss-heading text-swiss-blue-600">4.9★</div>
              <div className="text-sm swiss-body text-swiss-grey-600 dark:text-swiss-grey-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-swiss-blue-600 to-swiss-blue-700 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.2) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to save on your Swiss taxes?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-swiss-blue-100 mb-8"
          >
            Join 50+ Swiss SMEs who trust TaxPilot for their tax optimization
          </motion.p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-white font-medium">14-day free trial</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-white font-medium">No credit card required</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-white font-medium">Cancel anytime</div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button asChild size="lg" className="bg-white text-swiss-blue-600 hover:bg-swiss-grey-100 rounded-2xl">
                <Link href="/calculator">
                  Try TaxPilot Free
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-2xl">
                <Link href="/register">
                  Get Your Free Account
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="mt-6 flex items-center justify-center space-x-4 text-swiss-blue-100">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm">4.9/5 rating</span>
            </div>
            <div className="text-swiss-blue-200">•</div>
            <div className="text-sm">50+ happy customers</div>
            <div className="text-swiss-blue-200">•</div>
            <div className="text-sm">CHF 180K+ saved</div>
          </div>
        </div>
      </section>
    </main>
  );
} 