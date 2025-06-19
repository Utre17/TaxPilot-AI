'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CompanyData } from '@/lib/swiss-tax-data';
import { SWISS_CANTONS, formatSwissFrancs } from '@/lib/utils';
import { Building, Users, DollarSign, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface CompanyProfileFormProps {
  onSubmit: (data: CompanyData) => void;
  onCancel?: () => void;
  initialData?: Partial<CompanyData>;
}

interface FormStep {
  id: number;
  title: string;
  description: string;
  icon: any;
}

const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: 'Company Basics',
    description: 'Basic information about your company',
    icon: Building,
  },
  {
    id: 2,
    title: 'Financial Information',
    description: 'Revenue and profit data for tax calculations',
    icon: DollarSign,
  },
  {
    id: 3,
    title: 'Location & Structure',
    description: 'Location and organizational details',
    icon: MapPin,
  },
  {
    id: 4,
    title: 'Review & Calculate',
    description: 'Review your information and calculate taxes',
    icon: Users,
  },
];

const SWISS_INDUSTRIES = [
  'Technology/Software',
  'Manufacturing',
  'Consulting',
  'Finance/Banking',
  'Healthcare',
  'Construction',
  'Retail/E-commerce',
  'Hospitality/Tourism',
  'Real Estate',
  'Transportation/Logistics',
  'Education',
  'Agriculture',
  'Energy',
  'Other',
];

export default function CompanyProfileForm({ 
  onSubmit, 
  onCancel, 
  initialData = {} 
}: CompanyProfileFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<CompanyData>>({
    name: '',
    legalForm: 'GmbH',
    canton: '',
    revenue: 0,
    profit: 0,
    employees: 1,
    industry: '',
    vatRegistered: false,
    ...initialData,
  });

  const updateFormData = (updates: Partial<CompanyData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors when user updates fields
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name?.trim()) {
          newErrors.name = 'Company name is required';
        }
        if (!formData.legalForm) {
          newErrors.legalForm = 'Legal form is required';
        }
        if (!formData.industry) {
          newErrors.industry = 'Industry is required';
        }
        break;

      case 2:
        if (!formData.revenue || formData.revenue <= 0) {
          newErrors.revenue = 'Revenue must be greater than 0';
        }
        if (!formData.profit || formData.profit < 0) {
          newErrors.profit = 'Profit cannot be negative';
        }
        if (formData.profit && formData.revenue && formData.profit > formData.revenue) {
          newErrors.profit = 'Profit cannot exceed revenue';
        }
        break;

      case 3:
        if (!formData.canton) {
          newErrors.canton = 'Canton is required';
        }
        if (!formData.employees || formData.employees < 1) {
          newErrors.employees = 'Must have at least 1 employee';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep) && formData.name && formData.canton) {
      onSubmit(formData as CompanyData);
    }
  };

  const progress = (currentStep / FORM_STEPS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold swiss-heading">Company Profile</h2>
          <span className="text-sm swiss-body">
            Step {currentStep} of {FORM_STEPS.length}
          </span>
        </div>
        <div className="w-full bg-swiss-grey-200 dark:bg-swiss-grey-700 rounded-full h-2">
          <div 
            className="bg-swiss-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8">
        {FORM_STEPS.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;
          const IconComponent = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${isCompleted ? 'bg-swiss-blue-500 text-white' : ''}
                ${isCurrent ? 'bg-swiss-blue-100 dark:bg-swiss-blue-900/20 text-swiss-blue-500' : ''}
                ${!isCompleted && !isCurrent ? 'bg-swiss-grey-200 dark:bg-swiss-grey-700 text-swiss-grey-400' : ''}
              `}>
                <IconComponent className="h-5 w-5" />
              </div>
              {index < FORM_STEPS.length - 1 && (
                <div className={`
                  w-16 h-1 mx-2
                  ${isCompleted ? 'bg-swiss-blue-500' : 'bg-swiss-grey-200 dark:bg-swiss-grey-700'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="swiss-card">
        <div className="swiss-card-header">
          <h3 className="text-xl font-semibold swiss-subheading">
            {FORM_STEPS[currentStep - 1].title}
          </h3>
          <p className="swiss-body">
            {FORM_STEPS[currentStep - 1].description}
          </p>
        </div>

        <div className="swiss-card-content">
          {/* Step 1: Company Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Company Name *
                </label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="Your company name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Legal Form *
                </label>
                <select
                  value={formData.legalForm || ''}
                  onChange={(e) => updateFormData({ legalForm: e.target.value as CompanyData['legalForm'] })}
                  className="flex h-10 w-full rounded-md border border-swiss-grey-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-blue-500 focus-visible:ring-offset-2"
                >
                  <option value="GmbH">GmbH (Limited Liability Company)</option>
                  <option value="AG">AG (Stock Corporation)</option>
                  <option value="Einzelfirma">Einzelfirma (Sole Proprietorship)</option>
                  <option value="Kollektivgesellschaft">Kollektivgesellschaft (General Partnership)</option>
                </select>
                {errors.legalForm && (
                  <p className="text-sm text-red-600 mt-1">{errors.legalForm}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry || ''}
                  onChange={(e) => updateFormData({ industry: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-swiss-grey-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-blue-500 focus-visible:ring-offset-2"
                >
                  <option value="">Select your industry</option>
                  {SWISS_INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-sm text-red-600 mt-1">{errors.industry}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Financial Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Annual Revenue (CHF) *
                </label>
                <Input
                  type="number"
                  value={formData.revenue || ''}
                  onChange={(e) => updateFormData({ revenue: parseFloat(e.target.value) || 0 })}
                  placeholder="1000000"
                  className={errors.revenue ? 'border-red-500' : ''}
                />
                {formData.revenue && formData.revenue > 0 && (
                  <p className="text-sm swiss-body mt-1">
                    {formatSwissFrancs(formData.revenue)}
                  </p>
                )}
                {errors.revenue && (
                  <p className="text-sm text-red-600 mt-1">{errors.revenue}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Annual Profit (CHF) *
                </label>
                <Input
                  type="number"
                  value={formData.profit || ''}
                  onChange={(e) => updateFormData({ profit: parseFloat(e.target.value) || 0 })}
                  placeholder="200000"
                  className={errors.profit ? 'border-red-500' : ''}
                />
                {formData.profit && formData.profit > 0 && formData.revenue && formData.revenue > 0 && (
                  <p className="text-sm swiss-body mt-1">
                    {formatSwissFrancs(formData.profit)} ({((formData.profit / formData.revenue) * 100).toFixed(1)}% margin)
                  </p>
                )}
                {errors.profit && (
                  <p className="text-sm text-red-600 mt-1">{errors.profit}</p>
                )}
              </div>

              <div className="bg-swiss-blue-50 dark:bg-swiss-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium swiss-subheading mb-2">💡 Financial Data Tips</h4>
                <ul className="text-sm swiss-body space-y-1">
                  <li>• Use your latest annual financial statements</li>
                  <li>• Revenue = Total income before expenses</li>
                  <li>• Profit = Revenue minus all expenses</li>
                  <li>• Data is used only for tax calculations</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Location & Structure */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Current Canton *
                </label>
                <select
                  value={formData.canton || ''}
                  onChange={(e) => updateFormData({ canton: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-swiss-grey-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-blue-500 focus-visible:ring-offset-2"
                >
                  <option value="">Select your canton</option>
                  {SWISS_CANTONS.map((canton) => (
                    <option key={canton.code} value={canton.code}>
                      {canton.name}
                    </option>
                  ))}
                </select>
                {errors.canton && (
                  <p className="text-sm text-red-600 mt-1">{errors.canton}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium swiss-subheading mb-2">
                  Number of Employees *
                </label>
                <Input
                  type="number"
                  value={formData.employees || ''}
                  onChange={(e) => updateFormData({ employees: parseInt(e.target.value) || 1 })}
                  placeholder="10"
                  min="1"
                  className={errors.employees ? 'border-red-500' : ''}
                />
                {errors.employees && (
                  <p className="text-sm text-red-600 mt-1">{errors.employees}</p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.vatRegistered || false}
                    onChange={(e) => updateFormData({ vatRegistered: e.target.checked })}
                    className="h-4 w-4 text-swiss-blue-500 focus:ring-swiss-blue-500 border-swiss-grey-300 rounded"
                  />
                  <span className="swiss-subheading">VAT Registered</span>
                </label>
                <p className="text-sm swiss-body mt-1 ml-7">
                  Check if your company is registered for VAT (typically required above CHF 100,000 revenue)
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium swiss-subheading">Company Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="swiss-body">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="swiss-body">Legal Form:</span>
                      <span className="font-medium">{formData.legalForm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="swiss-body">Industry:</span>
                      <span className="font-medium">{formData.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="swiss-body">Canton:</span>
                      <span className="font-medium">
                        {SWISS_CANTONS.find(c => c.code === formData.canton)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium swiss-subheading">Financial & Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="swiss-body">Revenue:</span>
                      <span className="font-medium">{formatSwissFrancs(formData.revenue || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="swiss-body">Profit:</span>
                      <span className="font-medium">{formatSwissFrancs(formData.profit || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="swiss-body">Employees:</span>
                      <span className="font-medium">{formData.employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="swiss-body">VAT Registered:</span>
                      <span className="font-medium">{formData.vatRegistered ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-swiss-blue-50 dark:bg-swiss-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium swiss-subheading mb-2">Ready to Calculate</h4>
                <p className="text-sm swiss-body">
                  We'll analyze your company data and calculate taxes for all 26 Swiss cantons, 
                  provide optimization recommendations, and generate your tax health score.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="swiss-card-content border-t border-swiss-grey-200 dark:border-swiss-grey-700">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onCancel : handlePrevious}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>

            {currentStep < FORM_STEPS.length ? (
              <Button
                variant="swiss"
                onClick={handleNext}
                className="flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="swiss"
                onClick={handleSubmit}
                className="flex items-center"
              >
                Calculate Taxes
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 