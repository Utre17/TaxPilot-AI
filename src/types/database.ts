// Database types for TaxPilot AI - Swiss Tax Intelligence Platform

export interface Database {
  public: {
    Tables: {
      // User profiles with Swiss tax-specific information
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          swiss_company_id: string | null; // Swiss CHE number
          canton: string | null; // Swiss canton for tax calculations
          municipality: string | null;
          created_at: string;
          updated_at: string;
          subscription_status: 'trial' | 'active' | 'canceled' | 'past_due';
          subscription_tier: 'basic' | 'professional' | 'enterprise';
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          swiss_company_id?: string | null;
          canton?: string | null;
          municipality?: string | null;
          created_at?: string;
          updated_at?: string;
          subscription_status?: 'trial' | 'active' | 'canceled' | 'past_due';
          subscription_tier?: 'basic' | 'professional' | 'enterprise';
        };
        Update: {
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          swiss_company_id?: string | null;
          canton?: string | null;
          municipality?: string | null;
          updated_at?: string;
          subscription_status?: 'trial' | 'active' | 'canceled' | 'past_due';
          subscription_tier?: 'basic' | 'professional' | 'enterprise';
        };
      };

      // Swiss tax calculations and reports
      tax_calculations: {
        Row: {
          id: string;
          user_id: string;
          calculation_type: 'income_tax' | 'corporate_tax' | 'vat' | 'wealth_tax';
          tax_year: number;
          canton: string;
          municipality: string | null;
          input_data: Record<string, any>; // JSON data for tax inputs
          calculated_results: Record<string, any>; // JSON data for tax results
          ai_analysis: string | null; // AI-generated tax insights
          status: 'draft' | 'completed' | 'reviewed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          calculation_type: 'income_tax' | 'corporate_tax' | 'vat' | 'wealth_tax';
          tax_year: number;
          canton: string;
          municipality?: string | null;
          input_data: Record<string, any>;
          calculated_results?: Record<string, any>;
          ai_analysis?: string | null;
          status?: 'draft' | 'completed' | 'reviewed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          calculation_type?: 'income_tax' | 'corporate_tax' | 'vat' | 'wealth_tax';
          tax_year?: number;
          canton?: string;
          municipality?: string | null;
          input_data?: Record<string, any>;
          calculated_results?: Record<string, any>;
          ai_analysis?: string | null;
          status?: 'draft' | 'completed' | 'reviewed';
          updated_at?: string;
        };
      };

      // Swiss tax optimization recommendations
      tax_optimizations: {
        Row: {
          id: string;
          user_id: string;
          calculation_id: string;
          optimization_type: 'deduction' | 'timing' | 'structure' | 'planning';
          title: string;
          description: string;
          potential_savings: number; // CHF amount
          implementation_difficulty: 'easy' | 'medium' | 'complex';
          legal_basis: string; // Swiss law reference
          ai_confidence: number; // 0-100 confidence score
          status: 'suggested' | 'accepted' | 'rejected' | 'implemented';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          calculation_id: string;
          optimization_type: 'deduction' | 'timing' | 'structure' | 'planning';
          title: string;
          description: string;
          potential_savings: number;
          implementation_difficulty: 'easy' | 'medium' | 'complex';
          legal_basis: string;
          ai_confidence: number;
          status?: 'suggested' | 'accepted' | 'rejected' | 'implemented';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          optimization_type?: 'deduction' | 'timing' | 'structure' | 'planning';
          title?: string;
          description?: string;
          potential_savings?: number;
          implementation_difficulty?: 'easy' | 'medium' | 'complex';
          legal_basis?: string;
          ai_confidence?: number;
          status?: 'suggested' | 'accepted' | 'rejected' | 'implemented';
          updated_at?: string;
        };
      };

      // Swiss canton and municipality tax rates
      swiss_tax_rates: {
        Row: {
          id: string;
          canton: string;
          municipality: string | null;
          tax_year: number;
          income_tax_rate: number;
          wealth_tax_rate: number;
          corporate_tax_rate: number;
          capital_tax_rate: number;
          multiplier: number; // Municipal tax multiplier
          valid_from: string;
          valid_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          canton: string;
          municipality?: string | null;
          tax_year: number;
          income_tax_rate: number;
          wealth_tax_rate: number;
          corporate_tax_rate: number;
          capital_tax_rate: number;
          multiplier: number;
          valid_from: string;
          valid_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          canton?: string;
          municipality?: string | null;
          tax_year?: number;
          income_tax_rate?: number;
          wealth_tax_rate?: number;
          corporate_tax_rate?: number;
          capital_tax_rate?: number;
          multiplier?: number;
          valid_from?: string;
          valid_to?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      subscription_status: 'trial' | 'active' | 'canceled' | 'past_due';
      subscription_tier: 'basic' | 'professional' | 'enterprise';
      calculation_type: 'income_tax' | 'corporate_tax' | 'vat' | 'wealth_tax';
      optimization_type: 'deduction' | 'timing' | 'structure' | 'planning';
      implementation_difficulty: 'easy' | 'medium' | 'complex';
    };
  };
}

// Convenience types for common database operations
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type TaxCalculation = Database['public']['Tables']['tax_calculations']['Row'];
export type TaxCalculationInsert = Database['public']['Tables']['tax_calculations']['Insert'];
export type TaxCalculationUpdate = Database['public']['Tables']['tax_calculations']['Update'];

export type TaxOptimization = Database['public']['Tables']['tax_optimizations']['Row'];
export type TaxOptimizationInsert = Database['public']['Tables']['tax_optimizations']['Insert'];
export type TaxOptimizationUpdate = Database['public']['Tables']['tax_optimizations']['Update'];

export type SwissTaxRate = Database['public']['Tables']['swiss_tax_rates']['Row'];
export type SwissTaxRateInsert = Database['public']['Tables']['swiss_tax_rates']['Insert'];
export type SwissTaxRateUpdate = Database['public']['Tables']['swiss_tax_rates']['Update'];

// Swiss-specific types for tax calculations
export interface SwissIncomeTaxInput {
  grossIncome: number;
  deductions: {
    professionalExpenses: number;
    socialSecurityContributions: number;
    pillar3a: number;
    pillar3b: number;
    mortgageInterest: number;
    maintenanceExpenses: number;
    childcareExpenses: number;
    donations: number;
    other: number;
  };
  personalCircumstances: {
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    numberOfChildren: number;
    numberOfDependents: number;
    age: number;
    disability: boolean;
  };
}

export interface SwissCorporateTaxInput {
  revenue: number;
  operatingExpenses: number;
  depreciation: number;
  interest: number;
  extraordinaryItems: number;
  participationDeduction: number;
  lossCarryForward: number;
  capitalTax: {
    paidUpCapital: number;
    reserves: number;
    provisionsAndLiabilities: number;
  };
}

export interface SwissTaxResult {
  federal: {
    incomeTax: number;
    wealthTax?: number;
    corporateTax?: number;
    capitalTax?: number;
  };
  cantonal: {
    incomeTax: number;
    wealthTax?: number;
    corporateTax?: number;
    capitalTax?: number;
  };
  municipal: {
    incomeTax: number;
    wealthTax?: number;
    corporateTax?: number;
    capitalTax?: number;
  };
  total: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: {
    taxableIncome: number;
    taxableWealth?: number;
    taxableProfit?: number;
    taxableCapital?: number;
  };
}

// Subscription and billing types for Phase 3
export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  action: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface TaxAlert {
  id: string;
  user_id: string;
  company_id: string;
  type: 'deadline' | 'regulation' | 'optimization';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  is_read: boolean;
  created_at: string;
}

export interface ComplianceItem {
  id: string;
  company_id: string;
  category: 'tax_filing' | 'vat' | 'corporate';
  title: string;
  due_date: string;
  status: 'pending' | 'completed' | 'overdue';
  notes?: string;
  created_at: string;
  completed_at?: string;
}

export interface AnalysisHistory {
  id: string;
  company_id: string;
  analysis_data: Record<string, any>;
  health_score: number;
  potential_savings: number;
  created_at: string;
}

export interface GeneratedReport {
  id: string;
  user_id: string;
  company_id: string;
  report_type: string;
  report_data: Record<string, any>;
  pdf_url?: string;
  created_at: string;
}

// Plan limits interface
export interface PlanLimits {
  calculations: number; // -1 for unlimited
  savedProfiles: number;
  cantonComparisons: number;
  expertConsultations?: number;
  aiRecommendations: boolean;
  complianceMonitoring: boolean;
  prioritySupport: boolean;
}

// Plan definitions
export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    calculations: 3,
    savedProfiles: 1,
    cantonComparisons: 1,
    aiRecommendations: false,
    complianceMonitoring: false,
    prioritySupport: false,
  },
  starter: {
    calculations: -1, // unlimited
    savedProfiles: 5,
    cantonComparisons: -1,
    aiRecommendations: true,
    complianceMonitoring: true,
    prioritySupport: false,
  },
  professional: {
    calculations: -1,
    savedProfiles: -1,
    cantonComparisons: -1,
    expertConsultations: 2,
    aiRecommendations: true,
    complianceMonitoring: true,
    prioritySupport: true,
  },
}; 