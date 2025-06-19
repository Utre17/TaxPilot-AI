import { PLAN_LIMITS, PlanLimits, Subscription, UsageLog } from '@/types/database';

export interface FeatureGateResult {
  allowed: boolean;
  reason?: string;
  upgradeRequired?: boolean;
  currentUsage?: number;
  limit?: number;
}

export class FeatureGate {
  private planId: string;
  private planLimits: PlanLimits;
  private currentUsage: Record<string, number>;

  constructor(planId: string = 'free', currentUsage: Record<string, number> = {}) {
    this.planId = planId;
    this.planLimits = PLAN_LIMITS[planId] || PLAN_LIMITS.free;
    this.currentUsage = currentUsage;
  }

  // Check if user can perform tax calculation
  canCalculateTaxes(): FeatureGateResult {
    const limit = this.planLimits.calculations;
    const usage = this.currentUsage.calculations || 0;

    if (limit === -1) {
      return { allowed: true };
    }

    if (usage >= limit) {
      return {
        allowed: false,
        reason: `You've reached your limit of ${limit} calculations per month`,
        upgradeRequired: true,
        currentUsage: usage,
        limit,
      };
    }

    return {
      allowed: true,
      currentUsage: usage,
      limit,
    };
  }

  // Check if user can save company profiles
  canSaveCompanyProfile(): FeatureGateResult {
    const limit = this.planLimits.savedProfiles;
    const usage = this.currentUsage.savedProfiles || 0;

    if (limit === -1) {
      return { allowed: true };
    }

    if (usage >= limit) {
      return {
        allowed: false,
        reason: `You've reached your limit of ${limit} saved company profiles`,
        upgradeRequired: true,
        currentUsage: usage,
        limit,
      };
    }

    return {
      allowed: true,
      currentUsage: usage,
      limit,
    };
  }

  // Check if user can perform canton comparisons
  canCompareCantons(): FeatureGateResult {
    const limit = this.planLimits.cantonComparisons;
    const usage = this.currentUsage.cantonComparisons || 0;

    if (limit === -1) {
      return { allowed: true };
    }

    if (usage >= limit) {
      return {
        allowed: false,
        reason: `You've reached your limit of ${limit} canton comparison${limit === 1 ? '' : 's'} per month`,
        upgradeRequired: true,
        currentUsage: usage,
        limit,
      };
    }

    return {
      allowed: true,
      currentUsage: usage,
      limit,
    };
  }

  // Check if user has access to AI recommendations
  canAccessAIRecommendations(): FeatureGateResult {
    if (!this.planLimits.aiRecommendations) {
      return {
        allowed: false,
        reason: 'AI recommendations are only available with paid plans',
        upgradeRequired: true,
      };
    }

    return { allowed: true };
  }

  // Check if user has access to compliance monitoring
  canAccessComplianceMonitoring(): FeatureGateResult {
    if (!this.planLimits.complianceMonitoring) {
      return {
        allowed: false,
        reason: 'Compliance monitoring is only available with paid plans',
        upgradeRequired: true,
      };
    }

    return { allowed: true };
  }

  // Check if user can use expert consultations
  canUseExpertConsultation(): FeatureGateResult {
    const limit = this.planLimits.expertConsultations;
    
    if (!limit) {
      return {
        allowed: false,
        reason: 'Expert consultations are only available with Professional plan',
        upgradeRequired: true,
      };
    }

    const usage = this.currentUsage.expertConsultations || 0;

    if (usage >= limit) {
      return {
        allowed: false,
        reason: `You've used all ${limit} expert consultation credits this month`,
        upgradeRequired: false,
        currentUsage: usage,
        limit,
      };
    }

    return {
      allowed: true,
      currentUsage: usage,
      limit,
    };
  }

  // Check if user has priority support
  hasPrioritySupport(): boolean {
    return this.planLimits.prioritySupport;
  }

  // Get all current limits and usage
  getLimitsOverview() {
    return {
      planId: this.planId,
      limits: {
        calculations: {
          limit: this.planLimits.calculations,
          usage: this.currentUsage.calculations || 0,
          unlimited: this.planLimits.calculations === -1,
        },
        savedProfiles: {
          limit: this.planLimits.savedProfiles,
          usage: this.currentUsage.savedProfiles || 0,
          unlimited: this.planLimits.savedProfiles === -1,
        },
        cantonComparisons: {
          limit: this.planLimits.cantonComparisons,
          usage: this.currentUsage.cantonComparisons || 0,
          unlimited: this.planLimits.cantonComparisons === -1,
        },
        expertConsultations: this.planLimits.expertConsultations ? {
          limit: this.planLimits.expertConsultations,
          usage: this.currentUsage.expertConsultations || 0,
          unlimited: false,
        } : null,
      },
      features: {
        aiRecommendations: this.planLimits.aiRecommendations,
        complianceMonitoring: this.planLimits.complianceMonitoring,
        prioritySupport: this.planLimits.prioritySupport,
      },
    };
  }

  // Get upgrade suggestions based on current usage
  getUpgradeSuggestions(): string[] {
    const suggestions: string[] = [];

    if (this.planId === 'free') {
      suggestions.push('Upgrade to Starter for unlimited calculations and AI recommendations');
    }

    if (this.planId === 'starter') {
      suggestions.push('Upgrade to Professional for expert consultations and priority support');
    }

    // Check if user is hitting limits
    const calculations = this.canCalculateTaxes();
    if (!calculations.allowed) {
      suggestions.push('Upgrade for unlimited tax calculations');
    }

    const profiles = this.canSaveCompanyProfile();
    if (!profiles.allowed) {
      suggestions.push('Upgrade for unlimited company profiles');
    }

    const ai = this.canAccessAIRecommendations();
    if (!ai.allowed) {
      suggestions.push('Upgrade for AI-powered tax optimization recommendations');
    }

    return suggestions;
  }
}

// Helper function to calculate usage from logs
export const calculateUsageFromLogs = (logs: UsageLog[]): Record<string, number> => {
  const usage: Record<string, number> = {};
  
  logs.forEach(log => {
    usage[log.action] = (usage[log.action] || 0) + 1;
  });

  return usage;
};

// Helper function to check if subscription is active
export const isSubscriptionActive = (subscription: Subscription | null): boolean => {
  if (!subscription) return false;
  
  const now = new Date();
  const periodEnd = new Date(subscription.current_period_end);
  
  return subscription.status === 'active' && periodEnd > now;
};

// Get user's current plan ID
export const getUserPlanId = (subscription: Subscription | null): string => {
  if (!subscription || !isSubscriptionActive(subscription)) {
    return 'free';
  }
  
  return subscription.plan_id;
}; 