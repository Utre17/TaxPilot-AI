import { NextRequest, NextResponse } from 'next/server';
import { CompanyData, calculateTaxes, TaxCalculation } from '@/lib/swiss-tax-data';

export async function POST(request: NextRequest) {
  try {
    const data: CompanyData = await request.json();
    
    // Validate required fields
    if (!data.revenue || !data.legalForm) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: revenue or legalForm' 
        },
        { status: 400 }
      );
    }

    // Calculate taxes for all cantons
    const calculations: TaxCalculation[] = calculateTaxes(data);
    
    // Sort by total tax burden (ascending - best deals first)
    const sortedCalculations = calculations.sort((a, b) => a.totalTaxBurden - b.totalTaxBurden);
    
    // Calculate potential savings
    const currentCantonTax = calculations.find(calc => 
      calc.canton === data.canton
    )?.totalTaxBurden || calculations[0]?.totalTaxBurden || 0;
    
    const bestCantonTax = sortedCalculations[0]?.totalTaxBurden || 0;
    const potentialSavings = currentCantonTax - bestCantonTax;

    return NextResponse.json({
      success: true,
      data: {
        calculations: sortedCalculations,
        summary: {
          currentCantonTax,
          bestCantonTax,
          potentialSavings,
          bestCanton: sortedCalculations[0]?.canton || '',
          averageTax: calculations.reduce((sum, calc) => sum + calc.totalTaxBurden, 0) / calculations.length
        },
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Canton comparison error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during canton comparison' 
      },
      { status: 500 }
    );
  }
} 