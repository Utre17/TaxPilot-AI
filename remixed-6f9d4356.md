# Complete Cursor AI Prompts for TaxPilot AI MVP

## 🎯 Strategic Approach: 4-Phase Development

**Why Split Into Phases:**
- Prevents Cursor from being overwhelmed with complex instructions
- Allows testing and validation at each step
- Easier debugging and iteration
- Follows natural development flow

---

## 📋 Phase 1: Project Foundation & Authentication
*Estimated Time: 2-3 hours*

### Cursor Prompt #1: Project Setup & Core Structure

```
I'm building TaxPilot AI, a Swiss tax intelligence platform for SMEs. Create a complete Next.js 15 project with the following specifications:

## PROJECT OVERVIEW
- **Product**: Swiss tax calculator and monitoring platform
- **Users**: SME business owners who need tax optimization
- **Core Value**: AI-powered tax analysis and compliance monitoring

## TECHNICAL REQUIREMENTS
- Next.js 15 with App Router
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui components
- Supabase for database and auth
- Stripe for billing
- OpenAI API for tax analysis

## PROJECT STRUCTURE
Create this exact folder structure:
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx
│   └── api/
│       ├── auth/
│       └── webhooks/
├── components/
│   ├── ui/ (shadcn components)
│   ├── auth/
│   ├── dashboard/
│   └── calculator/
├── lib/
│   ├── supabase/
│   ├── stripe/
│   ├── openai/
│   └── utils/
└── types/
    └── database.ts
```

## IMMEDIATE TASKS
1. Initialize Next.js 15 project with TypeScript
2. Install and configure Tailwind CSS + shadcn/ui
3. Set up Supabase client configuration
4. Create basic authentication pages (login/register)
5. Set up environment variables template
6. Create initial database schema for users and companies
7. Implement basic routing and layout structure

## DATABASE SCHEMA (Supabase)
Create these tables:
```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  legal_form TEXT,
  current_canton TEXT,
  annual_revenue DECIMAL,
  employees INTEGER,
  industry TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## EXPECTED OUTPUTS
- Complete project setup with all dependencies
- Working authentication flow with Supabase
- Basic responsive layout with navigation
- Environment variables configuration
- Database schema implemented
- Type definitions for all data structures

## STYLING GUIDELINES
- Use shadcn/ui components for consistency
- Implement dark/light mode toggle
- Mobile-first responsive design
- Swiss/professional color scheme (blues, greys, whites)
- Clean, modern interface suitable for business users

Please create all files with proper TypeScript types, error handling, and follow Next.js 15 best practices. Include comprehensive comments explaining the architecture.
```

---

## 📊 Phase 2: Tax Calculator & Company Profile
*Estimated Time: 3-4 hours*

### Cursor Prompt #2: Core Tax Calculator

```
Now I need to build the core tax calculator and company profile system for TaxPilot AI. This is the main value proposition - a comprehensive Swiss tax calculator that's better than government tools.

## CONTEXT
Building on the existing Next.js 15 + Supabase + shadcn/ui foundation from Phase 1.

## FEATURES TO BUILD

### 1. Company Profile Input Form
Create a multi-step form component that collects:
- Company basic info (name, legal form, industry)
- Financial data (annual revenue, profit margins)
- Location data (current canton, considering relocation)
- Employee count and structure
- Business activities and VAT status

### 2. Swiss Tax Calculator Engine
Build a comprehensive calculator that calculates:
- Corporate income tax for all 26 cantons
- Capital tax rates
- VAT implications
- Withholding tax considerations
- Municipal tax variations
- Total effective tax rate comparison

### 3. Tax Health Score Algorithm
Create an AI-powered scoring system (0-100) based on:
- Current tax efficiency vs optimal structure
- Compliance risk assessment
- Optimization opportunities identified
- Industry benchmarking

## TECHNICAL IMPLEMENTATION

### Components to Create:
```
components/
├── calculator/
│   ├── CompanyProfileForm.tsx
│   ├── TaxCalculator.tsx
│   ├── CantonComparison.tsx
│   ├── TaxHealthScore.tsx
│   └── ResultsDashboard.tsx
└── ui/
    ├── multi-step-form.tsx
    ├── progress-indicator.tsx
    └── results-chart.tsx
```

### Tax Calculation Logic:
```typescript
// Types needed
interface CompanyData {
  name: string;
  legalForm: 'GmbH' | 'AG' | 'Einzelfirma' | 'Kollektivgesellschaft';
  canton: string;
  revenue: number;
  profit: number;
  employees: number;
  industry: string;
  vatRegistered: boolean;
}

interface TaxCalculation {
  canton: string;
  corporateIncomeTax: number;
  capitalTax: number;
  municipalTax: number;
  totalTaxBurden: number;
  effectiveRate: number;
  savings: number;
}

interface TaxHealthScore {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: string[];
  recommendations: string[];
  potentialSavings: number;
}
```

### OpenAI Integration:
- Use GPT-4 to analyze company data and generate personalized recommendations
- Create tax health assessment with specific optimization suggestions
- Generate compliance alerts and deadline reminders

### Swiss Tax Data:
Include accurate 2025 tax rates for all 26 cantons. Use official rates from:
- Federal Tax Administration (FTA)
- Cantonal tax authorities
- Municipal tax multipliers

## API ROUTES TO CREATE:
```
app/api/
├── calculator/
│   ├── analyze/route.ts (GPT-4 analysis)
│   ├── compare/route.ts (canton comparison)
│   └── health-score/route.ts
└── companies/
    ├── create/route.ts
    └── update/route.ts
```

## EXPECTED OUTPUTS:
1. Multi-step company profile form with validation
2. Comprehensive tax calculator for all Swiss cantons
3. Visual comparison charts and tables
4. AI-powered tax health score with recommendations
5. Responsive results dashboard
6. Save/load company profiles functionality
7. Email capture for lead generation

## USER EXPERIENCE FLOW:
1. User lands on calculator page
2. Enters company information (3-4 step form)
3. Calculator processes data and shows loading state
4. Results display with canton comparison
5. Tax health score prominently displayed
6. Recommendations and optimization suggestions
7. Option to save results and create account
8. Email capture for detailed PDF report

## VALIDATION & ERROR HANDLING:
- Form validation with helpful error messages
- API error handling with user-friendly feedback
- Loading states for all async operations
- Data persistence during form completion
- Graceful degradation if APIs fail

Please create all components with proper TypeScript types, comprehensive error handling, and a professional UI suitable for business users. Include realistic sample data for testing.
```

---

## 🏦 Phase 3: Stripe Integration & Billing
*Estimated Time: 2-3 hours*

### Cursor Prompt #3: Subscription Management

```
Now implement complete Stripe billing and subscription management for TaxPilot AI. Users should be able to upgrade from free calculator to paid monitoring services.

## CONTEXT
Building on existing Next.js 15 + Supabase setup with working tax calculator.

## SUBSCRIPTION TIERS TO IMPLEMENT:

### Free Tier:
- Basic tax calculator access
- Canton comparison (one-time)
- Email capture for results

### Starter Plan - CHF 197/month:
- Unlimited calculations
- Tax health monitoring
- Compliance calendar
- Email alerts
- Save multiple company profiles

### Professional Plan - CHF 497/month:
- Everything in Starter
- AI-powered recommendations
- Expert consultation credits
- Priority support
- Advanced reporting

## TECHNICAL IMPLEMENTATION:

### Database Schema Updates:
```sql
-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Usage tracking
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Stripe Configuration:
Create these products and prices in Stripe:
- Starter Plan: CHF 197/month (price_starter_monthly)
- Professional Plan: CHF 497/month (price_professional_monthly)

### Components to Build:
```
components/
├── billing/
│   ├── PricingTable.tsx
│   ├── SubscriptionStatus.tsx
│   ├── BillingHistory.tsx
│   ├── PaymentMethod.tsx
│   └── UpgradeModal.tsx
└── dashboard/
    ├── UsageMeter.tsx
    └── FeatureGates.tsx
```

### API Routes:
```
app/api/
├── stripe/
│   ├── create-customer/route.ts
│   ├── create-subscription/route.ts
│   ├── cancel-subscription/route.ts
│   ├── update-payment-method/route.ts
│   └── webhooks/route.ts
└── billing/
    ├── usage/route.ts
    └── limits/route.ts
```

## KEY FEATURES:

### 1. Pricing Page:
- Clear tier comparison table
- Swiss-specific pricing (CHF)
- Feature comparison matrix
- Call-to-action buttons
- Trust signals and testimonials placeholder

### 2. Stripe Customer Portal:
- Create Stripe customers on user registration
- Subscription management interface
- Payment method updates
- Billing history access
- Invoice downloads

### 3. Feature Gating System:
```typescript
// Usage limits by plan
const PLAN_LIMITS = {
  free: {
    calculations: 3,
    savedProfiles: 1,
    cantonComparisons: 1
  },
  starter: {
    calculations: -1, // unlimited
    savedProfiles: 5,
    cantonComparisons: -1
  },
  professional: {
    calculations: -1,
    savedProfiles: -1,
    cantonComparisons: -1,
    expertConsultations: 2
  }
};
```

### 4. Webhook Handling:
Handle these Stripe webhook events:
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed

### 5. Usage Tracking:
Track user actions for billing and analytics:
- Calculator usage
- Report generations
- Feature access attempts
- API calls made

## SUBSCRIPTION FLOW:

### Free to Paid Conversion:
1. User hits usage limit
2. Upgrade modal appears
3. Stripe Checkout integration
4. Subscription activated
5. Feature access updated
6. Confirmation email sent

### Billing Management:
1. Dashboard shows current plan
2. Usage meters display consumption
3. Billing history accessible
4. Easy upgrade/downgrade options
5. Cancel subscription workflow

## SECURITY & VALIDATION:
- Webhook signature verification
- Subscription status validation on every request
- Rate limiting on API endpoints
- Secure customer ID handling
- PCI compliance through Stripe

## EXPECTED OUTPUTS:
1. Complete pricing page with Swiss CHF pricing
2. Stripe integration with customer and subscription creation
3. Feature gating system based on subscription tier
4. Webhook handling for subscription updates
5. Usage tracking and limits enforcement
6. Billing dashboard for customers
7. Upgrade/downgrade workflows
8. Email notifications for billing events

## TESTING REQUIREMENTS:
- Stripe test mode configuration
- Mock webhook events
- Usage limit testing
- Subscription lifecycle testing
- Payment failure scenarios

Please implement with proper error handling, TypeScript types, and Swiss business-appropriate UX. Include comprehensive logging for debugging billing issues.
```

---

## 📈 Phase 4: Dashboard & Monitoring Features
*Estimated Time: 3-4 hours*

### Cursor Prompt #4: Complete Dashboard & Monitoring

```
Final phase: Build the comprehensive dashboard and monitoring features that provide ongoing value for TaxPilot AI subscribers.

## CONTEXT
Building on complete foundation with auth, calculator, and billing systems working.

## DASHBOARD FEATURES TO BUILD:

### 1. Main Dashboard Overview:
- Tax health score prominently displayed
- Quick stats (potential savings, compliance status)
- Recent activity feed
- Upcoming deadlines and alerts
- Action items and recommendations

### 2. Company Management:
- Multiple company profiles for enterprise users
- Switch between companies easily
- Company settings and tax preferences
- Historical analysis tracking

### 3. Compliance Calendar:
- Swiss tax deadlines (federal, cantonal, municipal)
- VAT filing dates
- Corporate filing requirements
- Custom reminders and notifications

### 4. Monitoring & Alerts:
- Regulatory change notifications
- Tax rate updates
- Compliance deadline warnings
- Optimization opportunity alerts

### 5. Reporting System:
- Monthly tax health reports
- Canton comparison analysis
- Savings opportunity reports
- Compliance status summaries
- Export to PDF functionality

## COMPONENTS TO BUILD:

```
components/
├── dashboard/
│   ├── DashboardOverview.tsx
│   ├── TaxHealthWidget.tsx
│   ├── ComplianceCalendar.tsx
│   ├── AlertsPanel.tsx
│   ├── CompanySelector.tsx
│   ├── RecentActivity.tsx
│   └── QuickActions.tsx
├── monitoring/
│   ├── ComplianceTracker.tsx
│   ├── DeadlineManager.tsx
│   ├── RegulatoryAlerts.tsx
│   └── OptimizationSuggestions.tsx
├── reports/
│   ├── MonthlyReport.tsx
│   ├── ComparisonReport.tsx
│   ├── PDFExport.tsx
│   └── ReportHistory.tsx
└── notifications/
    ├── NotificationCenter.tsx
    ├── EmailPreferences.tsx
    └── AlertSettings.tsx
```

## DATABASE SCHEMA ADDITIONS:

```sql
-- Monitoring and alerts
CREATE TABLE tax_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  company_id UUID REFERENCES companies(id),
  type TEXT NOT NULL, -- 'deadline', 'regulation', 'optimization'
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  due_date TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Compliance tracking
CREATE TABLE compliance_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  category TEXT NOT NULL, -- 'tax_filing', 'vat', 'corporate'
  title TEXT NOT NULL,
  due_date TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'overdue'
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Analysis history
CREATE TABLE analysis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  analysis_data JSONB NOT NULL,
  health_score INTEGER,
  potential_savings DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports
CREATE TABLE generated_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  company_id UUID REFERENCES companies(id),
  report_type TEXT NOT NULL,
  report_data JSONB,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API ROUTES:

```
app/api/
├── dashboard/
│   ├── overview/route.ts
│   ├── alerts/route.ts
│   └── activity/route.ts
├── monitoring/
│   ├── compliance/route.ts
│   ├── deadlines/route.ts
│   └── regulations/route.ts
├── reports/
│   ├── generate/route.ts
│   ├── history/route.ts
│   └── export/route.ts
└── notifications/
    ├── send/route.ts
    └── preferences/route.ts
```

## AI-POWERED FEATURES:

### 1. Smart Recommendations:
```typescript
// Use GPT-4 to generate personalized recommendations
const generateRecommendations = async (companyData: CompanyData) => {
  const prompt = `
  Analyze this Swiss company and provide 3-5 specific tax optimization recommendations:
  Company: ${JSON.stringify(companyData)}
  
  Focus on:
  - Canton relocation opportunities
  - Legal structure optimization
  - Tax planning strategies
  - Compliance improvements
  - Cost-saving opportunities
  
  Provide actionable, Switzerland-specific advice.
  `;
  
  // GPT-4 API call
  // Return structured recommendations
};
```

### 2. Regulatory Monitoring:
- Monitor Swiss Federal Tax Administration updates
- Track cantonal tax rate changes
- Alert users to relevant regulatory changes
- Analyze impact on specific companies

### 3. Compliance Automation:
- Generate filing checklists
- Create deadline reminders
- Track completion status
- Send escalation alerts

## NOTIFICATION SYSTEM:

### Email Notifications:
- Weekly digest of action items
- Urgent compliance deadlines
- Regulatory updates
- Monthly health score reports
- Optimization opportunities

### In-App Notifications:
- Real-time alerts for urgent items
- Progress updates on analysis
- Feature announcements
- Usage limit warnings

## REPORTING ENGINE:

### Monthly Tax Health Report:
- Executive summary
- Health score trend
- Optimization opportunities
- Compliance status
- Action recommendations
- Canton comparison updates

### PDF Export:
- Professional report formatting
- Company branding options
- Charts and visualizations
- Shareable with advisors/board

## USER EXPERIENCE:

### Dashboard Layout:
```
┌─────────────────┬─────────────────┐
│ Health Score    │ Quick Actions   │
│ (Large Widget)  │ - New Analysis  │
│                 │ - View Reports  │
│                 │ - Contact Expert│
├─────────────────┼─────────────────┤
│ Upcoming Items  │ Recent Activity │
│ - Deadlines     │ - Calculations  │
│ - Alerts        │ - Updates       │
│ - Tasks         │ - Reports       │
├─────────────────┴─────────────────┤
│ Recommendations Panel             │
│ - AI-generated suggestions        │
│ - Priority actions                │
└───────────────────────────────────┘
```

### Mobile Responsiveness:
- Stack widgets vertically on mobile
- Thumb-friendly touch targets
- Swipe gestures for navigation
- Offline capability for key data

## PERFORMANCE OPTIMIZATION:

### Caching Strategy:
- Cache tax calculations for common scenarios
- Store regulatory data locally
- Implement background sync for updates
- Use React Query for data fetching

### Real-time Updates:
- Supabase real-time subscriptions for alerts
- Live compliance status updates
- Instant notification delivery
- Background data refresh

## EXPECTED OUTPUTS:
1. Complete dashboard with all monitoring widgets
2. Compliance calendar with Swiss tax deadlines
3. AI-powered recommendation engine
4. Comprehensive reporting system
5. Email and in-app notification system
6. Multi-company management interface
7. PDF export functionality
8. Mobile-responsive design
9. Real-time data updates
10. Performance-optimized data loading

## TESTING & VALIDATION:
- Dashboard loads under 2 seconds
- All calculations are mathematically accurate
- Notifications send reliably
- PDF reports generate correctly
- Mobile interface is fully functional
- Real-time updates work properly

Please implement with Swiss business standards in mind, including proper date formatting, currency display (CHF), and professional terminology. Include comprehensive error handling and loading states for all async operations.
```

---

## 🎯 Execution Strategy & Tips

### How to Use These Prompts Effectively:

#### 1. **Sequential Execution**
- Complete Phase 1 fully before moving to Phase 2
- Test each phase thoroughly before proceeding
- Don't skip the testing and validation steps

#### 2. **Cursor AI Best Practices**
```
For each prompt:
1. Copy the entire prompt exactly as written
2. Let Cursor complete the full implementation
3. Test the features before moving on
4. Fix any errors before the next phase
5. Commit to git after each successful phase
```

#### 3. **Common Issues & Solutions**

**If Cursor gets overwhelmed:**
- Break the current prompt into smaller pieces
- Focus on one component at a time
- Use "Continue from where you left off" prompts

**If there are TypeScript errors:**
- Run `npm run type-check` after each phase
- Fix type issues immediately
- Don't accumulate technical debt

**If Supabase integration fails:**
- Double-check environment variables
- Verify database schema matches exactly
- Test authentication flow manually

#### 4. **Environment Setup Checklist**

Before starting Phase 1:
```bash
# Required accounts and keys
□ Supabase project created
□ Stripe account (test mode)
□ OpenAI API key
□ Domain registered (optional)

# Environment variables needed
□ NEXT_PUBLIC_SUPABASE_URL
□ NEXT_PUBLIC_SUPABASE_ANON_KEY
□ SUPABASE_SERVICE_ROLE_KEY
□ STRIPE_PUBLIC_KEY
□ STRIPE_SECRET_KEY
□ STRIPE_WEBHOOK_SECRET
□ OPENAI_API_KEY
```

### 5. **Testing After Each Phase**

**Phase 1 Testing:**
- User registration works
- Login/logout functions
- Database connection established
- Basic navigation works

**Phase 2 Testing:**
- Tax calculator produces accurate results
- Company profiles save correctly
- AI analysis returns reasonable recommendations
- All 26 cantons display properly

**Phase 3 Testing:**
- Stripe test payments work
- Subscription tiers activate properly
- Feature gating functions correctly
- Webhooks receive and process events

**Phase 4 Testing:**
- Dashboard loads with real data
- Notifications send properly
- Reports generate and export
- Mobile interface works smoothly

### 6. **Recommended Development Timeline**

**Week 1:**
- Day 1-2: Phase 1 (Foundation)
- Day 3-4: Phase 2 (Calculator)
- Day 5: Testing and bug fixes

**Week 2:**
- Day 1-2: Phase 3 (Billing)
- Day 3-4: Phase 4 (Dashboard)
- Day 5: Final testing and polish

### 7. **When to Modify the Prompts**

**Customize for your specific needs:**
- Add your actual Stripe product IDs
- Include your specific Swiss tax rate data
- Modify the color scheme/branding
- Adjust feature gates based on your pricing strategy

**Don't modify:**
- The core architecture decisions
- Database schema structure
- API route organization
- TypeScript type definitions

### 8. **Success Metrics for Each Phase**

**Phase 1 Success:**
- ✅ Users can register and login
- ✅ Database schema is created
- ✅ Basic layout renders properly
- ✅ No TypeScript errors

**Phase 2 Success:**
- ✅ Calculator works for all 26 cantons
- ✅ Company profiles save and load
- ✅ Tax health score generates
- ✅ Results display clearly

**Phase 3 Success:**
- ✅ Test payments process successfully
- ✅ Subscription tiers activate features
- ✅ Usage limits enforce properly
- ✅ Billing dashboard functions

**Phase 4 Success:**
- ✅ Dashboard shows real company data
- ✅ Notifications send via email
- ✅ Reports export to PDF
- ✅ Mobile interface is responsive

This structured approach ensures you build a solid, tested MVP that matches your business plan requirements while being manageable for a solo developer using Cursor AI.