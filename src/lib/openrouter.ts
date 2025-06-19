// OpenRouter API integration for AI recommendations
// Free tier available for development, cheaper than OpenAI

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface OpenRouterError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

class OpenRouterAPI {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. AI recommendations will be disabled.');
    }
  }

  async generateTaxRecommendations(
    companyData: any,
    healthScore: any,
    savingsAnalysis: any
  ): Promise<string[]> {
    if (!this.apiKey) {
      return this.getFallbackRecommendations(companyData, healthScore, savingsAnalysis);
    }

    try {
      const prompt = this.buildRecommendationPrompt(companyData, healthScore, savingsAnalysis);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'TaxPilot AI',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free', // Free model
          messages: [
            {
              role: 'system',
              content: 'You are a Swiss tax expert providing actionable recommendations for SME tax optimization.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData: OpenRouterError = await response.json();
        console.error('OpenRouter API error:', errorData);
        throw new Error(`OpenRouter API error: ${errorData.error.message}`);
      }

      const data: OpenRouterResponse = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      // Parse recommendations from response
      const recommendations = this.parseRecommendations(content);
      
      return recommendations.length > 0 ? recommendations : this.getFallbackRecommendations(companyData, healthScore, savingsAnalysis);

    } catch (error) {
      console.error('OpenRouter AI recommendation error:', error);
      return this.getFallbackRecommendations(companyData, healthScore, savingsAnalysis);
    }
  }

  private buildRecommendationPrompt(companyData: any, healthScore: any, savingsAnalysis: any): string {
    return `
Analyze this Swiss company's tax situation and provide 3-5 specific, actionable recommendations:

Company Profile:
- Name: ${companyData.companyName || companyData.name}
- Legal Form: ${companyData.legalForm}
- Canton: ${companyData.canton}
- Revenue: CHF ${companyData.revenue?.toLocaleString()}
- Profit: CHF ${companyData.profit?.toLocaleString()}
- Employees: ${companyData.employees}
- Industry: ${companyData.industry}

Tax Health Analysis:
- Overall Score: ${healthScore.score}/100 (${healthScore.grade})
- Potential Savings: CHF ${savingsAnalysis.annualSavings?.toLocaleString()}
- Current Tax Burden: CHF ${savingsAnalysis.currentTaxBurden?.toLocaleString()}
- Best Canton: ${savingsAnalysis.bestCanton?.name} (CHF ${savingsAnalysis.bestCanton?.taxBurden?.toLocaleString()})

Key Issues Identified:
${healthScore.issues?.map((issue: string) => `- ${issue}`).join('\n') || '- No major issues identified'}

Provide specific recommendations in this format:
1. [Recommendation title]: [Specific action with expected impact]
2. [Recommendation title]: [Specific action with expected impact]
3. [Recommendation title]: [Specific action with expected impact]

Focus on: canton optimization, legal structure, timing strategies, and compliance improvements.
`;
  }

  private parseRecommendations(content: string): string[] {
    // Extract numbered recommendations from the AI response
    const lines = content.split('\n');
    const recommendations: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      // Match numbered recommendations (1., 2., etc.)
      if (/^\d+\./.test(trimmed)) {
        const rec = trimmed.replace(/^\d+\.\s*/, '').trim();
        if (rec.length > 10) { // Filter out very short responses
          recommendations.push(rec);
        }
      }
    }
    
    return recommendations;
  }

  private getFallbackRecommendations(companyData: any, healthScore: any, savingsAnalysis: any): string[] {
    const recommendations: string[] = [];
    
    // Canton optimization
    if (savingsAnalysis.annualSavings > 10000) {
      recommendations.push(
        `Canton Relocation: Consider relocating to ${savingsAnalysis.bestCanton?.name} to save CHF ${savingsAnalysis.annualSavings?.toLocaleString()} annually while maintaining business operations.`
      );
    }
    
    // Legal form optimization
    if (companyData.legalForm === 'Einzelfirma' && companyData.profit > 100000) {
      recommendations.push(
        'Legal Structure: Convert to GmbH or AG to benefit from lower corporate tax rates and improved tax planning flexibility.'
      );
    }
    
    // Profit distribution timing
    if (companyData.legalForm === 'AG' || companyData.legalForm === 'GmbH') {
      recommendations.push(
        'Dividend Timing: Optimize dividend distributions across tax years to minimize personal income tax impact and leverage qualified participation exemptions.'
      );
    }
    
    // VAT optimization
    if (companyData.revenue > 100000 && !companyData.vatRegistered) {
      recommendations.push(
        'VAT Registration: Consider voluntary VAT registration to recover input VAT and improve cash flow, especially for B2B operations.'
      );
    }
    
    // General compliance
    recommendations.push(
      'Tax Planning: Implement quarterly tax reviews to ensure optimal timing of expenses, depreciation strategies, and provision management.'
    );
    
    return recommendations.slice(0, 4); // Return max 4 recommendations
  }
}

// Export singleton instance
export const openRouterAPI = new OpenRouterAPI();

// Helper function to generate AI recommendations with fallback
export async function generateAIRecommendations(
  companyData: any,
  healthScore: any,
  savingsAnalysis: any
): Promise<string[]> {
  // First try OpenAI if available and has credits
  if (process.env.OPENAI_API_KEY) {
    try {
      // Try OpenAI first (existing implementation would go here)
      // For now, fall back to OpenRouter
    } catch (error) {
      console.log('OpenAI failed, falling back to OpenRouter:', error);
    }
  }
  
  // Use OpenRouter as primary/fallback
  return await openRouterAPI.generateTaxRecommendations(companyData, healthScore, savingsAnalysis);
} 