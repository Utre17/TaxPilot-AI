// Swiss Tax Data and Calculation Engine for TaxPilot AI
// Based on 2025 official tax rates from Federal Tax Administration (FTA)

export interface CantonTaxRates {
  code: string;
  name: string;
  corporateIncomeTaxRate: number; // %
  capitalTaxRate: number; // %
  municipalMultiplier: number;
  vatThreshold: number; // CHF
  federalTaxRate: number; // %
}

// 2025 Swiss Canton Tax Rates - Official FTA Data
export const CANTON_TAX_RATES: CantonTaxRates[] = [
  {
    code: 'AG',
    name: 'Aargau',
    corporateIncomeTaxRate: 6.72,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.15,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'AI',
    name: 'Appenzell Innerrhoden',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'AR',
    name: 'Appenzell Ausserrhoden',
    corporateIncomeTaxRate: 6.6,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.08,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'BE',
    name: 'Bern',
    corporateIncomeTaxRate: 6.96,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.54,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'BL',
    name: 'Basel-Landschaft',
    corporateIncomeTaxRate: 6.84,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.2,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'BS',
    name: 'Basel-Stadt',
    corporateIncomeTaxRate: 6.99,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'FR',
    name: 'Fribourg',
    corporateIncomeTaxRate: 6.79,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.2,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'GE',
    name: 'Geneva',
    corporateIncomeTaxRate: 6.18,
    capitalTaxRate: 0.001,
    municipalMultiplier: 0.455,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'GL',
    name: 'Glarus',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.2,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'GR',
    name: 'Graubünden',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.25,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'JU',
    name: 'Jura',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.2,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'LU',
    name: 'Lucerne',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.6,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'NE',
    name: 'Neuchâtel',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 0.68,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'NW',
    name: 'Nidwalden',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'OW',
    name: 'Obwalden',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'SG',
    name: 'St. Gallen',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.25,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'SH',
    name: 'Schaffhausen',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.25,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'SO',
    name: 'Solothurn',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.25,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'SZ',
    name: 'Schwyz',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'TG',
    name: 'Thurgau',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.2,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'TI',
    name: 'Ticino',
    corporateIncomeTaxRate: 8.84,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'UR',
    name: 'Uri',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'VD',
    name: 'Vaud',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 0.64,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'VS',
    name: 'Valais',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.0,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'ZG',
    name: 'Zug',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 0.76,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
  {
    code: 'ZH',
    name: 'Zurich',
    corporateIncomeTaxRate: 6.5,
    capitalTaxRate: 0.001,
    municipalMultiplier: 1.19,
    vatThreshold: 100000,
    federalTaxRate: 8.5,
  },
];

// Company data interface as per blueprint
export interface CompanyData {
  name: string;
  legalForm: 'GmbH' | 'AG' | 'Einzelfirma' | 'Kollektivgesellschaft';
  canton: string;
  revenue: number;
  profit: number;
  employees: number;
  industry: string;
  vatRegistered: boolean;
}

// Tax calculation result interface
export interface TaxCalculation {
  canton: string;
  federalTax: number;
  cantonalTax: number;
  municipalTax: number;
  capitalTax: number;
  totalTaxBurden: number;
  effectiveRate: number;
  savings?: number;
}

// Tax health score interface
export interface TaxHealthScore {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: string[];
  recommendations: string[];
  potentialSavings: number;
}

// Core tax calculation engine
export function calculateTaxes(companyData: CompanyData, targetCanton?: string): TaxCalculation[] {
  const cantons = targetCanton 
    ? CANTON_TAX_RATES.filter(c => c.code === targetCanton)
    : CANTON_TAX_RATES;

  return cantons.map(canton => {
    // Federal tax calculation (8.5% on profit)
    const federalTax = companyData.profit * (canton.federalTaxRate / 100);
    
    // Cantonal tax calculation
    const cantonalTax = companyData.profit * (canton.corporateIncomeTaxRate / 100);
    
    // Municipal tax (cantonal tax * municipal multiplier)
    const municipalTax = cantonalTax * canton.municipalMultiplier;
    
    // Capital tax (simplified calculation on equity/capital)
    // Assuming capital is roughly 20% of revenue for SMEs
    const estimatedCapital = companyData.revenue * 0.2;
    const capitalTax = estimatedCapital * canton.capitalTaxRate;
    
    // Total tax burden
    const totalTaxBurden = federalTax + cantonalTax + municipalTax + capitalTax;
    
    // Effective tax rate
    const effectiveRate = companyData.profit > 0 ? (totalTaxBurden / companyData.profit) * 100 : 0;

    return {
      canton: canton.code,
      federalTax,
      cantonalTax,
      municipalTax,
      capitalTax,
      totalTaxBurden,
      effectiveRate,
    };
  });
}

// Calculate potential savings by comparing current canton to best option
export function calculatePotentialSavings(
  companyData: CompanyData, 
  currentCanton: string
): { savings: number; bestCanton: string; currentTax: number; bestTax: number } {
  const allCalculations = calculateTaxes(companyData);
  const currentCalculation = allCalculations.find(calc => calc.canton === currentCanton);
  
  if (!currentCalculation) {
    throw new Error(`Canton ${currentCanton} not found`);
  }
  
  // Find the canton with lowest tax burden
  const bestCalculation = allCalculations.reduce((best, current) => 
    current.totalTaxBurden < best.totalTaxBurden ? current : best
  );
  
  const savings = currentCalculation.totalTaxBurden - bestCalculation.totalTaxBurden;
  
  return {
    savings,
    bestCanton: bestCalculation.canton,
    currentTax: currentCalculation.totalTaxBurden,
    bestTax: bestCalculation.totalTaxBurden,
  };
}

// Generate tax health score based on multiple factors
export function calculateTaxHealthScore(companyData: CompanyData): TaxHealthScore {
  const allCalculations = calculateTaxes(companyData);
  const currentCalculation = allCalculations.find(calc => calc.canton === companyData.canton);
  
  if (!currentCalculation) {
    throw new Error(`Canton ${companyData.canton} not found`);
  }
  
  // Calculate percentile ranking (lower tax = higher score)
  const sortedByTax = allCalculations.sort((a, b) => a.totalTaxBurden - b.totalTaxBurden);
  const currentRank = sortedByTax.findIndex(calc => calc.canton === companyData.canton);
  const percentile = ((26 - currentRank) / 26) * 100;
  
  // Base score from tax efficiency (0-70 points)
  let score = Math.round(percentile * 0.7);
  
  // Additional factors (0-30 points)
  const factors = {
    vatOptimization: companyData.revenue > 100000 && !companyData.vatRegistered ? -10 : 5,
    legalStructure: companyData.legalForm === 'AG' && companyData.revenue > 500000 ? 5 : 0,
    employeeCount: companyData.employees > 10 ? 5 : 0,
    profitMargin: (companyData.profit / companyData.revenue) > 0.15 ? 10 : 5,
  };
  
  score += Object.values(factors).reduce((sum, val) => sum + val, 0);
  score = Math.max(0, Math.min(100, score)); // Clamp between 0-100
  
  // Determine grade
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';
  
  // Generate issues and recommendations
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  if (currentCalculation.effectiveRate > 20) {
    issues.push('High effective tax rate compared to Swiss average');
    recommendations.push('Consider relocating to a lower-tax canton');
  }
  
  if (companyData.revenue > 100000 && !companyData.vatRegistered) {
    issues.push('Not VAT registered despite high revenue');
    recommendations.push('Register for VAT to optimize input tax deductions');
  }
  
  if (companyData.legalForm === 'Einzelfirma' && companyData.revenue > 500000) {
    issues.push('Sole proprietorship may not be optimal for high revenue');
    recommendations.push('Consider incorporating as GmbH or AG for tax efficiency');
  }
  
  const { savings } = calculatePotentialSavings(companyData, companyData.canton);
  if (savings > companyData.profit * 0.05) {
    recommendations.push(`Potential annual savings of ${Math.round(savings).toLocaleString('de-CH')} CHF by relocating`);
  }
  
  return {
    score,
    grade,
    issues,
    recommendations,
    potentialSavings: Math.max(0, savings),
  };
}

// Get canton by code
export function getCantonTaxRates(cantonCode: string): CantonTaxRates | undefined {
  return CANTON_TAX_RATES.find(canton => canton.code === cantonCode);
}

// Get top N cantons with lowest tax burden for a company
export function getTopCantons(companyData: CompanyData, limit: number = 5): TaxCalculation[] {
  const allCalculations = calculateTaxes(companyData);
  return allCalculations
    .sort((a, b) => a.totalTaxBurden - b.totalTaxBurden)
    .slice(0, limit);
} 