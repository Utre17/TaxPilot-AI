# TaxPilot AI - Swiss Tax Intelligence Platform

A comprehensive tax calculator and monitoring platform specifically designed for Swiss SMEs, featuring AI-powered recommendations and real-time compliance tracking.

## 🚀 Features

### Phase 1 ✅ - Foundation
- Next.js 15 with TypeScript and Tailwind CSS
- Swiss-themed professional design system
- Supabase authentication and database
- Mobile-responsive UI components

### Phase 2 ✅ - Tax Calculator
- Complete 2025 Swiss tax data for all 26 cantons
- Advanced tax health scoring (0-100 with A-F grades)
- Interactive canton comparison with filtering
- Real-time tax calculations and savings analysis

### Phase 3 ✅ - Billing & AI Integration
- Stripe subscription billing (CHF 197/month Starter, CHF 497/month Professional)
- Feature gating with usage limits (Free: 3 calculations/month)
- OpenRouter AI integration for tax recommendations
- Complete billing portal and webhook processing

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL), Stripe, OpenRouter AI
- **Deployment**: Vercel (recommended)
- **Design**: Swiss professional color scheme, mobile-first

## 📋 Environment Variables

Create a `.env.local` file with the following variables:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_endpoint_secret

# Stripe Price IDs (Create these in your Stripe Dashboard)
STRIPE_STARTER_PRICE_ID=price_starter_monthly
STRIPE_PROFESSIONAL_PRICE_ID=price_professional_monthly

# AI Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
# OPENAI_API_KEY=your_openai_api_key (optional fallback)
```

## 🚀 Quick Start

1. **Clone and Install**
```bash
git clone <repository-url>
cd taxpilot-ai
npm install
```

2. **Setup Environment**
- Copy `.env.example` to `.env.local`
- Fill in your Supabase, Stripe, and OpenRouter credentials

3. **Run Development Server**
```bash
npm run dev
```

4. **Visit Application**
- Homepage: http://localhost:3000
- Calculator: http://localhost:3000/calculator
- Pricing: http://localhost:3000/pricing

## 🧪 Testing the Implementation

### Tax Calculator
1. Navigate to `/calculator`
2. Fill in company details (or use pre-populated demo data)
3. See usage limits for free users (2/3 calculations used)
4. View tax health score and AI recommendations

### Billing System
1. Visit `/pricing` to see subscription plans
2. Click "Start Free Trial" to test Stripe checkout
3. Use Stripe test cards: `4242 4242 4242 4242`

### Feature Gating
- Free users: Limited to 3 calculations, 1 canton comparison
- Paid users: Unlimited access + AI recommendations

## 📊 Business Model

### Subscription Tiers
- **Free**: 3 calculations/month, basic features
- **Starter CHF 197/month**: Unlimited calculations, AI recommendations, monitoring
- **Professional CHF 497/month**: Everything + expert consultations, priority support

### Revenue Projections
- Target: 1,000 paying customers by Q4 2025
- Average revenue per customer: CHF 2,500/year
- Projected ARR: CHF 2.5M with 70% gross margins

## 🔧 Development

### Project Structure
```
src/
├── app/                 # Next.js 15 app directory
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Protected dashboard area
│   ├── api/            # API routes (Stripe, calculator)
│   ├── calculator/     # Tax calculator page
│   └── pricing/        # Pricing and billing page
├── components/         # Reusable UI components
│   ├── billing/        # Pricing table, usage meters
│   ├── calculator/     # Tax calculation components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility libraries
│   ├── stripe/         # Stripe integration
│   ├── supabase/       # Database clients
│   ├── feature-gates.ts # Subscription feature gating
│   ├── openrouter.ts   # AI recommendations
│   └── swiss-tax-data.ts # Tax calculation engine
└── types/              # TypeScript type definitions
```

### Key Features

#### Tax Calculation Engine (`lib/swiss-tax-data.ts`)
- Official 2025 tax rates for all 26 Swiss cantons
- Corporate income tax calculation with municipal multipliers
- Tax health scoring algorithm with A-F grades
- Potential savings analysis and canton optimization

#### AI Recommendations (`lib/openrouter.ts`)
- OpenRouter integration with Llama 3.1 8B (free tier)
- Fallback to rule-based recommendations
- Swiss tax optimization strategies
- Personalized advice based on company profile

#### Feature Gating (`lib/feature-gates.ts`)
- Plan-based access control
- Usage tracking and limits enforcement
- Upgrade suggestion system
- Real-time restriction management

## 🌍 Swiss Market Focus

### Competitive Advantages
- **Local Expertise**: Built specifically for Swiss tax law
- **Complete Coverage**: All 26 cantons with 2025 rates
- **Professional Design**: Swiss business aesthetic
- **CHF Pricing**: Native Swiss franc billing

### Target Market
- Swiss SMEs (5-500 employees)
- Revenue range: CHF 500K - CHF 50M
- Primary sectors: Technology, consulting, manufacturing
- Geographic focus: German-speaking Switzerland initially

## 📈 Next Phase (Phase 4)

### Dashboard & User Management
- User account management and profiles
- Billing history and subscription management
- Saved company profiles and calculations
- Compliance calendar and tax alerts
- Advanced analytics and reporting

### Future Enhancements
- Multi-language support (German, French, Italian)
- API access for accounting software integration
- Advanced tax planning tools
- Expert consultation booking system

## 🤝 Support & Documentation

### Getting Help
- Documentation: `/docs` (coming in Phase 4)
- Email Support: support@taxpilot.ai
- Professional Plan: Priority support included

### API Documentation
- Calculator API: `/api/calculator/analyze`
- Comparison API: `/api/calculator/compare`
- Stripe Webhooks: `/api/stripe/webhooks`

---

**Built with Swiss precision for Swiss businesses.** 🇨🇭

For questions or support, contact: hello@taxpilot.ai "# TaxPilot-AI" 
"# TaxPilot-AI" 
"# TaxPilot-AI" 
"# TaxPilot-AI" 
