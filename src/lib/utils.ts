import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind CSS classes
// This is essential for conditional styling with Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Swiss currency formatting
export function formatSwissFrancs(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Swiss percentage formatting
export function formatPercentage(rate: number, decimals: number = 2): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rate / 100);
}

// Swiss number formatting
export function formatSwissNumber(number: number): string {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}

// Swiss cantons list
export const SWISS_CANTONS = [
  { code: 'AG', name: 'Aargau', nameDE: 'Aargau', nameFR: 'Argovie', nameIT: 'Argovia' },
  { code: 'AI', name: 'Appenzell Innerrhoden', nameDE: 'Appenzell Innerrhoden', nameFR: 'Appenzell Rhodes-Intérieures', nameIT: 'Appenzello Interno' },
  { code: 'AR', name: 'Appenzell Ausserrhoden', nameDE: 'Appenzell Ausserrhoden', nameFR: 'Appenzell Rhodes-Extérieures', nameIT: 'Appenzello Esterno' },
  { code: 'BE', name: 'Bern', nameDE: 'Bern', nameFR: 'Berne', nameIT: 'Berna' },
  { code: 'BL', name: 'Basel-Landschaft', nameDE: 'Basel-Landschaft', nameFR: 'Bâle-Campagne', nameIT: 'Basilea Campagna' },
  { code: 'BS', name: 'Basel-Stadt', nameDE: 'Basel-Stadt', nameFR: 'Bâle-Ville', nameIT: 'Basilea Città' },
  { code: 'FR', name: 'Fribourg', nameDE: 'Freiburg', nameFR: 'Fribourg', nameIT: 'Friborgo' },
  { code: 'GE', name: 'Geneva', nameDE: 'Genf', nameFR: 'Genève', nameIT: 'Ginevra' },
  { code: 'GL', name: 'Glarus', nameDE: 'Glarus', nameFR: 'Glaris', nameIT: 'Glarona' },
  { code: 'GR', name: 'Graubünden', nameDE: 'Graubünden', nameFR: 'Grisons', nameIT: 'Grigioni' },
  { code: 'JU', name: 'Jura', nameDE: 'Jura', nameFR: 'Jura', nameIT: 'Giura' },
  { code: 'LU', name: 'Lucerne', nameDE: 'Luzern', nameFR: 'Lucerne', nameIT: 'Lucerna' },
  { code: 'NE', name: 'Neuchâtel', nameDE: 'Neuenburg', nameFR: 'Neuchâtel', nameIT: 'Neuchâtel' },
  { code: 'NW', name: 'Nidwalden', nameDE: 'Nidwalden', nameFR: 'Nidwald', nameIT: 'Nidvaldo' },
  { code: 'OW', name: 'Obwalden', nameDE: 'Obwalden', nameFR: 'Obwald', nameIT: 'Obvaldo' },
  { code: 'SG', name: 'St. Gallen', nameDE: 'St. Gallen', nameFR: 'Saint-Gall', nameIT: 'San Gallo' },
  { code: 'SH', name: 'Schaffhausen', nameDE: 'Schaffhausen', nameFR: 'Schaffhouse', nameIT: 'Sciaffusa' },
  { code: 'SO', name: 'Solothurn', nameDE: 'Solothurn', nameFR: 'Soleure', nameIT: 'Soletta' },
  { code: 'SZ', name: 'Schwyz', nameDE: 'Schwyz', nameFR: 'Schwytz', nameIT: 'Svitto' },
  { code: 'TG', name: 'Thurgau', nameDE: 'Thurgau', nameFR: 'Thurgovie', nameIT: 'Turgovia' },
  { code: 'TI', name: 'Ticino', nameDE: 'Tessin', nameFR: 'Tessin', nameIT: 'Ticino' },
  { code: 'UR', name: 'Uri', nameDE: 'Uri', nameFR: 'Uri', nameIT: 'Uri' },
  { code: 'VD', name: 'Vaud', nameDE: 'Waadt', nameFR: 'Vaud', nameIT: 'Vaud' },
  { code: 'VS', name: 'Valais', nameDE: 'Wallis', nameFR: 'Valais', nameIT: 'Vallese' },
  { code: 'ZG', name: 'Zug', nameDE: 'Zug', nameFR: 'Zoug', nameIT: 'Zugo' },
  { code: 'ZH', name: 'Zurich', nameDE: 'Zürich', nameFR: 'Zurich', nameIT: 'Zurigo' },
] as const;

// Helper to get canton by code
export function getCantonByCode(code: string) {
  return SWISS_CANTONS.find(canton => canton.code === code);
}

// Helper to get canton name in specific language
export function getCantonName(code: string, language: 'DE' | 'FR' | 'IT' | 'EN' = 'EN') {
  const canton = getCantonByCode(code);
  if (!canton) return code;
  
  switch (language) {
    case 'DE': return canton.nameDE;
    case 'FR': return canton.nameFR;
    case 'IT': return canton.nameIT;
    default: return canton.name;
  }
}

// Tax year validation
export function isValidTaxYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= 2020 && year <= currentYear + 1;
}

// Swiss CHE number validation (Swiss company identification)
export function isValidCHE(che: string): boolean {
  // Swiss CHE format: CHE-XXX.XXX.XXX
  const cheRegex = /^CHE-\d{3}\.\d{3}\.\d{3}$/;
  return cheRegex.test(che);
}

// Format CHE number
export function formatCHE(che: string): string {
  // Remove all non-digits
  const digits = che.replace(/\D/g, '');
  
  if (digits.length === 9) {
    return `CHE-${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}`;
  }
  
  return che;
}

// Calculate effective tax rate
export function calculateEffectiveRate(totalTax: number, income: number): number {
  if (income <= 0) return 0;
  return (totalTax / income) * 100;
}

// Calculate marginal tax rate helper
export function calculateMarginalRate(
  currentTax: number, 
  currentIncome: number, 
  marginalIncome: number = 1000
): number {
  if (currentIncome <= 0) return 0;
  
  // This is a simplified calculation - in reality, you'd need the full tax calculation function
  // For now, we'll return the effective rate as an approximation
  return calculateEffectiveRate(currentTax, currentIncome);
}

// Debounce function for input handling
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Error message formatter
export function formatErrorMessage(error: any): string {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error_description) return error.error_description;
  return 'An unexpected error occurred';
} 