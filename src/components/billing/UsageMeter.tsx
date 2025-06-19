'use client';

import { FeatureGate } from '@/lib/feature-gates';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, CheckCircle, Infinity } from 'lucide-react';

interface UsageMeterProps {
  featureGate: FeatureGate;
  onUpgrade?: () => void;
}

interface UsageItemProps {
  title: string;
  current: number;
  limit: number;
  unlimited?: boolean;
  icon?: React.ReactNode;
  status?: 'good' | 'warning' | 'danger';
}

function UsageItem({ title, current, limit, unlimited, icon, status }: UsageItemProps) {
  const percentage = unlimited ? 0 : Math.min((current / limit) * 100, 100);
  
  const getStatusColor = () => {
    if (unlimited) return 'text-green-600';
    if (status === 'danger' || percentage >= 100) return 'text-red-600';
    if (status === 'warning' || percentage >= 80) return 'text-orange-600';
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (unlimited) return 'bg-green-500';
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-swiss-blue-500';
  };

  return (
    <div className="flex items-center justify-between p-4 border border-swiss-grey-200 dark:border-swiss-grey-700 rounded-lg">
      <div className="flex items-center space-x-3">
        {icon && <div className={getStatusColor()}>{icon}</div>}
        <div>
          <h4 className="font-medium swiss-subheading">{title}</h4>
          <div className="text-sm swiss-body">
            {unlimited ? (
              <div className="flex items-center space-x-1">
                <Infinity className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Unlimited</span>
              </div>
            ) : (
              <span className={`${getStatusColor()} font-medium`}>
                {current} of {limit} used
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {!unlimited && (
          <div className="w-20">
            <div className="w-full bg-swiss-grey-200 dark:bg-swiss-grey-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <div className="text-xs swiss-body mt-1 text-center">
              {Math.round(percentage)}%
            </div>
          </div>
        )}
        
        {unlimited && (
          <CheckCircle className="h-5 w-5 text-green-600" />
        )}
        
        {!unlimited && percentage >= 100 && (
          <AlertTriangle className="h-5 w-5 text-red-600" />
        )}
      </div>
    </div>
  );
}

export default function UsageMeter({ featureGate, onUpgrade }: UsageMeterProps) {
  const overview = featureGate.getLimitsOverview();
  const suggestions = featureGate.getUpgradeSuggestions();

  const hasLimitIssues = (
    (!overview.limits.calculations.unlimited && overview.limits.calculations.usage >= overview.limits.calculations.limit) ||
    (!overview.limits.savedProfiles.unlimited && overview.limits.savedProfiles.usage >= overview.limits.savedProfiles.limit) ||
    (!overview.limits.cantonComparisons.unlimited && overview.limits.cantonComparisons.usage >= overview.limits.cantonComparisons.limit)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold swiss-subheading">Usage Overview</h3>
          <p className="text-sm swiss-body">
            Current usage for your {overview.planId} plan
          </p>
        </div>
        
        {hasLimitIssues && onUpgrade && (
          <Button variant="swiss" onClick={onUpgrade}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        )}
      </div>

      {/* Usage Items */}
      <div className="space-y-3">
        <UsageItem
          title="Tax Calculations"
          current={overview.limits.calculations.usage}
          limit={overview.limits.calculations.limit}
          unlimited={overview.limits.calculations.unlimited}
          icon={<div className="w-2 h-2 bg-current rounded-full" />}
        />

        <UsageItem
          title="Company Profiles"
          current={overview.limits.savedProfiles.usage}
          limit={overview.limits.savedProfiles.limit}
          unlimited={overview.limits.savedProfiles.unlimited}
          icon={<div className="w-2 h-2 bg-current rounded-full" />}
        />

        <UsageItem
          title="Canton Comparisons"
          current={overview.limits.cantonComparisons.usage}
          limit={overview.limits.cantonComparisons.limit}
          unlimited={overview.limits.cantonComparisons.unlimited}
          icon={<div className="w-2 h-2 bg-current rounded-full" />}
        />

        {overview.limits.expertConsultations && (
          <UsageItem
            title="Expert Consultations"
            current={overview.limits.expertConsultations.usage}
            limit={overview.limits.expertConsultations.limit}
            unlimited={overview.limits.expertConsultations.unlimited}
            icon={<div className="w-2 h-2 bg-current rounded-full" />}
          />
        )}
      </div>

      {/* Features Status */}
      <div className="border-t border-swiss-grey-200 dark:border-swiss-grey-700 pt-6">
        <h4 className="font-medium swiss-subheading mb-3">Feature Access</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 bg-swiss-grey-50 dark:bg-swiss-grey-800 rounded-lg">
            <span className="text-sm swiss-body">AI Recommendations</span>
            {overview.features.aiRecommendations ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <div className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                Upgrade Required
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-swiss-grey-50 dark:bg-swiss-grey-800 rounded-lg">
            <span className="text-sm swiss-body">Compliance Monitoring</span>
            {overview.features.complianceMonitoring ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <div className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                Upgrade Required
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-swiss-grey-50 dark:bg-swiss-grey-800 rounded-lg">
            <span className="text-sm swiss-body">Priority Support</span>
            {overview.features.prioritySupport ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <div className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                Pro Plan Only
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Suggestions */}
      {suggestions.length > 0 && (
        <div className="border-t border-swiss-grey-200 dark:border-swiss-grey-700 pt-6">
          <h4 className="font-medium swiss-subheading mb-3">Recommendations</h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="flex items-start p-3 bg-swiss-blue-50 dark:bg-swiss-blue-900/20 rounded-lg"
              >
                <TrendingUp className="h-4 w-4 text-swiss-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm swiss-body text-swiss-blue-900 dark:text-swiss-blue-100">
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
          
          {onUpgrade && (
            <div className="mt-4">
              <Button variant="swiss" size="sm" onClick={onUpgrade}>
                Upgrade Now
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Reset Information */}
      <div className="text-center p-4 bg-swiss-grey-50 dark:bg-swiss-grey-800 rounded-lg">
        <p className="text-xs swiss-body">
          Usage resets on the 1st of each month. Need more capacity? 
          <button className="text-swiss-blue-600 hover:underline ml-1" onClick={onUpgrade}>
            Upgrade your plan
          </button>
        </p>
      </div>
    </div>
  );
} 