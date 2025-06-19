import { NextRequest, NextResponse } from 'next/server';
import { CompanyData, calculateTaxHealthScore, TaxHealthScore } from '@/lib/swiss-tax-data';

export async function POST(request: NextRequest) {
  try {
    const data: CompanyData = await request.json();
    
    // Validate required fields
    if (!data.revenue || !data.canton || !data.legalForm) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: revenue, canton, or legalForm' 
        },
        { status: 400 }
      );
    }

    // Calculate tax health score
    const healthScore: TaxHealthScore = calculateTaxHealthScore(data);
    
    // Generate AI recommendations if available (mock for now)
    const aiRecommendations = [
      "Consider relocating to a canton with lower corporate tax rates",
      "Optimize your business structure for better tax efficiency",
      "Review deductible expenses to maximize tax savings"
    ];

    return NextResponse.json({
      success: true,
      data: {
        healthScore,
        aiRecommendations,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Tax analysis error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during tax analysis' 
      },
      { status: 500 }
    );
  }
} 