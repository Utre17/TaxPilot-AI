'use client';

import { TaxHealthScore } from '@/lib/swiss-tax-data';
import { formatSwissFrancs } from '@/lib/utils';
import { TrendingUp, AlertCircle, CheckCircle, Target, Lightbulb } from 'lucide-react';

interface TaxHealthScoreProps {
  healthScore: TaxHealthScore & { aiRecommendations?: string[] };
  showAIRecommendations?: boolean;
}

export default function TaxHealthScoreComponent({ 
  healthScore, 
  showAIRecommendations = false
}: TaxHealthScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (grade === 'B') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (grade === 'C') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    if (grade === 'D') return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getProgressWidth = (score: number) => {
    return Math.min(100, Math.max(0, score));
  };

  return (
    <div className="swiss-card">
      <div className="swiss-card-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold swiss-subheading">Tax Health Score</h3>
            <p className="swiss-body">Company Analysis</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(healthScore.score)}`}>
              {healthScore.score}
            </div>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(healthScore.grade)} relative group`}>
              Grade {healthScore.grade}
              {/* Personalization Tooltip for Low Grades */}
              {(healthScore.grade === 'D' || healthScore.grade === 'F') && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  {healthScore.grade === 'F' 
                    ? "Your tax structure is leaking value — let's fix that!" 
                    : "Room for improvement — quick wins available!"
                  }
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="swiss-card-content space-y-6">
        {/* Score Visualization */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm swiss-body">Tax Optimization Score</span>
            <span className="text-sm font-medium">{healthScore.score}/100</span>
          </div>
          <div className="w-full bg-swiss-grey-200 dark:bg-swiss-grey-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                healthScore.score >= 90 ? 'bg-green-500' :
                healthScore.score >= 80 ? 'bg-blue-500' :
                healthScore.score >= 70 ? 'bg-yellow-500' :
                healthScore.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${getProgressWidth(healthScore.score)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs swiss-body mt-1">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Potential Savings */}
        {healthScore.potentialSavings > 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">
                  Potential Annual Savings
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatSwissFrancs(healthScore.potentialSavings)}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Available through canton relocation and optimization
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Issues Found */}
        {healthScore.issues.length > 0 && (
          <div>
            <h4 className="font-semibold swiss-subheading mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
              Issues Identified ({healthScore.issues.length})
            </h4>
            <div className="space-y-2">
              {healthScore.issues.map((issue, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                >
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm swiss-body text-orange-900 dark:text-orange-100">
                    {issue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Basic Recommendations */}
        {healthScore.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold swiss-subheading mb-3 flex items-center">
              <Target className="h-5 w-5 text-swiss-blue-500 mr-2" />
              Basic Recommendations ({healthScore.recommendations.length})
            </h4>
            <div className="space-y-2">
              {healthScore.recommendations.map((recommendation, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-3 bg-swiss-blue-50 dark:bg-swiss-blue-900/20 rounded-lg border border-swiss-blue-200 dark:border-swiss-blue-800"
                >
                  <CheckCircle className="h-4 w-4 text-swiss-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm swiss-body text-swiss-blue-900 dark:text-swiss-blue-100">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {showAIRecommendations && (
          <div>
            <h4 className="font-semibold swiss-subheading mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
              AI-Powered Recommendations
              {(!healthScore.aiRecommendations || healthScore.aiRecommendations.length === 0) && (
                <span className="ml-2 text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                  Generating...
                </span>
              )}
            </h4>
            <div className="space-y-2">
              {healthScore.aiRecommendations && healthScore.aiRecommendations.length > 0 ? (
                healthScore.aiRecommendations.map((recommendation, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                  >
                    <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm swiss-body text-amber-900 dark:text-amber-100">
                      {recommendation}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm swiss-body text-amber-700 dark:text-amber-300">
                    AI recommendations are being generated based on your company profile and tax situation...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Score Explanation */}
        <div className="bg-swiss-grey-50 dark:bg-swiss-grey-800 p-4 rounded-lg">
          <h4 className="font-semibold swiss-subheading mb-2">How We Calculate Your Score</h4>
          <div className="text-sm swiss-body space-y-1">
            <p>• <strong>Tax Efficiency (70%):</strong> Your canton ranking vs. all 26 cantons</p>
            <p>• <strong>VAT Optimization (10%):</strong> VAT registration status vs. revenue</p>
            <p>• <strong>Legal Structure (10%):</strong> Company form optimization for your size</p>
            <p>• <strong>Business Factors (10%):</strong> Employee count, profit margins, growth</p>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-swiss-blue-50 dark:bg-swiss-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold swiss-subheading mb-2">Next Steps</h4>
          <div className="text-sm swiss-body space-y-1">
            {healthScore.score < 70 && (
              <p>• Consider relocating to a lower-tax canton for immediate savings</p>
            )}
            {healthScore.potentialSavings > 10000 && (
              <p>• Schedule a consultation to discuss relocation strategy</p>
            )}
            <p>• Review tax planning strategies for your industry</p>
            <p>• Set up monitoring for regulatory changes</p>
          </div>
        </div>
      </div>
    </div>
  );
} 