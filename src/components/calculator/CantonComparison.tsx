'use client';

import { useState } from 'react';
import { TaxCalculation, CANTON_TAX_RATES } from '@/lib/swiss-tax-data';
import { formatSwissFrancs, formatPercentage, getCantonName } from '@/lib/utils';
import { ChevronDown, ChevronUp, Search, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CantonComparisonProps {
  calculations: TaxCalculation[];
  currentCanton: string;
  onCantonSelect?: (canton: string) => void;
}

type SortField = 'canton' | 'totalTaxBurden' | 'effectiveRate' | 'federalTax' | 'cantonalTax' | 'municipalTax';
type SortDirection = 'asc' | 'desc';

export default function CantonComparison({ 
  calculations, 
  currentCanton, 
  onCantonSelect 
}: CantonComparisonProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('totalTaxBurden');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showTop5Only, setShowTop5Only] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const filteredAndSortedCalculations = calculations
    .filter(calc => {
      const cantonName = getCantonName(calc.canton, 'EN').toLowerCase();
      return cantonName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'canton':
          aValue = getCantonName(a.canton, 'EN');
          bValue = getCantonName(b.canton, 'EN');
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? 
          aValue.localeCompare(bValue) : 
          bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' ? 
        (aValue as number) - (bValue as number) : 
        (bValue as number) - (aValue as number);
    });

  const displayCalculations = showTop5Only ? 
    filteredAndSortedCalculations.slice(0, 5) : 
    filteredAndSortedCalculations;

  const currentCantonCalculation = calculations.find(calc => calc.canton === currentCanton);
  const bestCalculation = calculations.reduce((best, current) => 
    current.totalTaxBurden < best.totalTaxBurden ? current : best
  );

  const savings = currentCantonCalculation ? 
    currentCantonCalculation.totalTaxBurden - bestCalculation.totalTaxBurden : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="swiss-card">
          <div className="swiss-card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm swiss-body">Current Canton</p>
                <p className="text-xl font-bold swiss-heading">
                  {getCantonName(currentCanton, 'EN')}
                </p>
                <p className="text-sm swiss-body">
                  {currentCantonCalculation ? formatSwissFrancs(currentCantonCalculation.totalTaxBurden) : '—'}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-swiss-blue-500" />
            </div>
          </div>
        </div>

        <div className="swiss-card">
          <div className="swiss-card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm swiss-body">Best Canton</p>
                <p className="text-xl font-bold swiss-heading text-green-600">
                  {getCantonName(bestCalculation.canton, 'EN')}
                </p>
                <p className="text-sm swiss-body">
                  {formatSwissFrancs(bestCalculation.totalTaxBurden)}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="swiss-card">
          <div className="swiss-card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm swiss-body">Potential Savings</p>
                <p className={`text-xl font-bold swiss-heading ${savings > 0 ? 'text-green-600' : 'text-swiss-grey-600'}`}>
                  {savings > 0 ? formatSwissFrancs(savings) : '—'}
                </p>
                <p className="text-sm swiss-body">
                  {savings > 0 ? 'Annual savings available' : 'Already optimized'}
                </p>
              </div>
              <TrendingUp className={`h-8 w-8 ${savings > 0 ? 'text-green-600' : 'text-swiss-grey-400'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="swiss-card">
        <div className="swiss-card-content">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-swiss-grey-400" />
                <Input
                  placeholder="Search cantons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={showTop5Only ? "swiss" : "outline"}
                size="sm"
                onClick={() => setShowTop5Only(!showTop5Only)}
              >
                {showTop5Only ? 'Show All' : 'Top 5'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="swiss-card">
        <div className="swiss-card-header">
          <h3 className="text-xl font-semibold swiss-subheading">
            Canton Tax Comparison
          </h3>
          <p className="swiss-body">
            Compare tax burdens across {displayCalculations.length} Swiss cantons
          </p>
        </div>

        <div className="swiss-card-content">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-swiss-grey-200 dark:border-swiss-grey-700">
                  <th 
                    className="text-left py-3 px-4 font-medium swiss-subheading cursor-pointer hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800"
                    onClick={() => handleSort('canton')}
                  >
                    <div className="flex items-center gap-2">
                      Canton
                      {getSortIcon('canton')}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-4 font-medium swiss-subheading cursor-pointer hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800"
                    onClick={() => handleSort('totalTaxBurden')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Total Tax
                      {getSortIcon('totalTaxBurden')}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-4 font-medium swiss-subheading cursor-pointer hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800"
                    onClick={() => handleSort('effectiveRate')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Effective Rate
                      {getSortIcon('effectiveRate')}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-4 font-medium swiss-subheading cursor-pointer hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800"
                    onClick={() => handleSort('federalTax')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Federal Tax
                      {getSortIcon('federalTax')}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-4 font-medium swiss-subheading cursor-pointer hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800"
                    onClick={() => handleSort('cantonalTax')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Cantonal Tax
                      {getSortIcon('cantonalTax')}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-4 font-medium swiss-subheading cursor-pointer hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800"
                    onClick={() => handleSort('municipalTax')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Municipal Tax
                      {getSortIcon('municipalTax')}
                    </div>
                  </th>
                  {onCantonSelect && (
                    <th className="text-center py-3 px-4 font-medium swiss-subheading">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayCalculations.map((calc, index) => {
                  const isCurrentCanton = calc.canton === currentCanton;
                  const isBestCanton = calc.canton === bestCalculation.canton;
                  const rank = index + 1;
                  
                  return (
                    <tr 
                      key={calc.canton}
                      className={`
                        border-b border-swiss-grey-100 dark:border-swiss-grey-800 hover:bg-swiss-grey-50 dark:hover:bg-swiss-grey-800/50
                        ${isCurrentCanton ? 'bg-swiss-blue-50 dark:bg-swiss-blue-900/20' : ''}
                        ${isBestCanton ? 'bg-green-50 dark:bg-green-900/20' : ''}
                      `}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-swiss-grey-200 dark:bg-swiss-grey-700 px-2 py-1 rounded">
                            #{rank}
                          </span>
                          <div>
                            <div className="font-medium swiss-subheading">
                              {getCantonName(calc.canton, 'EN')}
                            </div>
                            <div className="text-xs swiss-body">
                              {calc.canton}
                              {isCurrentCanton && (
                                <span className="ml-2 text-swiss-blue-600 font-medium">Current</span>
                              )}
                              {isBestCanton && (
                                <span className="ml-2 text-green-600 font-medium">Best</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatSwissFrancs(calc.totalTaxBurden)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {formatPercentage(calc.effectiveRate)}
                      </td>
                      <td className="py-3 px-4 text-right swiss-body">
                        {formatSwissFrancs(calc.federalTax)}
                      </td>
                      <td className="py-3 px-4 text-right swiss-body">
                        {formatSwissFrancs(calc.cantonalTax)}
                      </td>
                      <td className="py-3 px-4 text-right swiss-body">
                        {formatSwissFrancs(calc.municipalTax)}
                      </td>
                      {onCantonSelect && (
                        <td className="py-3 px-4 text-center">
                          {!isCurrentCanton && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onCantonSelect(calc.canton)}
                            >
                              Select
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tax Breakdown Legend */}
      <div className="swiss-card">
        <div className="swiss-card-header">
          <h4 className="font-semibold swiss-subheading">Understanding Swiss Tax Structure</h4>
        </div>
        <div className="swiss-card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium swiss-subheading mb-2">Federal Tax</h5>
              <p className="swiss-body">8.5% corporate income tax paid to the federal government. Same rate for all cantons.</p>
            </div>
            <div>
              <h5 className="font-medium swiss-subheading mb-2">Cantonal Tax</h5>
              <p className="swiss-body">Canton-specific corporate tax rate. Varies significantly between cantons (6.18% - 8.84%).</p>
            </div>
            <div>
              <h5 className="font-medium swiss-subheading mb-2">Municipal Tax</h5>
              <p className="swiss-body">Municipal multiplier applied to cantonal tax. Each municipality sets its own multiplier.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 