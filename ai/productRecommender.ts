// ai/productRecommender.ts
// AI-powered product recommendation system
// Scans and analyzes Amazon products to recommend the best ones for publishing

import { openai } from "./client";

type ProductAnalysis = {
  asin: string;
  title: string;
  category: string;
  estimatedPrice: number;
  estimatedRating: number;
  estimatedReviews: number;
  conversionPotential: "high" | "medium" | "low";
  recommendationScore: number; // 0-100
  reasons: string[];
  targetUser: string;
  mainProblem: string;
  whyGoodForAffiliate: string;
};

type CategoryScan = {
  category: string;
  keywords: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minReviews?: number;
};

/**
 * AI Agent that scans Amazon categories and recommends products
 */
export async function scanAndRecommendProducts(
  categories: CategoryScan[],
  maxProductsPerCategory: number = 20
): Promise<ProductAnalysis[]> {
  const allRecommendations: ProductAnalysis[] = [];

  for (const category of categories) {
    console.log(`\n🔍 Scanning ${category.category} for recommended products...`);

    const systemPrompt = `
You are an expert Amazon affiliate marketing analyst. Your job is to identify products that would convert well for affiliate marketing.

Analyze products in this category and recommend the BEST ones based on:
1. **Conversion Potential** - Products that solve real problems, have clear before/after value
2. **Market Demand** - High ratings (4.0+), good review counts (500+)
3. **Price Range** - $15-$60 is ideal for impulse purchases
4. **Problem-Solution Fit** - Products that solve daily, relatable problems
5. **Visual Appeal** - Products with clear visual benefits

For each recommended product, provide:
- A REAL ASIN (10 alphanumeric characters) - use real ASINs you know exist
- Realistic product data (price, rating, reviews)
- Why it would convert well
- Target user and main problem it solves
- Recommendation score (0-100)

Return VALID JSON ONLY in this format:
{
  "products": [
    {
      "asin": "B08YZ5YF7M",
      "title": "Real Product Name",
      "category": "${category.category}",
      "estimatedPrice": 24.99,
      "estimatedRating": 4.5,
      "estimatedReviews": 8500,
      "conversionPotential": "high",
      "recommendationScore": 85,
      "reasons": ["solves common problem", "high reviews", "good price point"],
      "targetUser": "who needs this",
      "mainProblem": "what problem it solves",
      "whyGoodForAffiliate": "why this would convert well"
    }
  ]
}

Generate ${maxProductsPerCategory} products per category. Use REAL ASINs only.
Focus on products that would actually convert well for affiliate marketing.
`.trim();

    const userPrompt = `
Category: ${category.category}
Keywords: ${category.keywords.join(", ")}
Price Range: $${category.minPrice || 15} - $${category.maxPrice || 60}
Minimum Rating: ${category.minRating || 4.0}+
Minimum Reviews: ${category.minReviews || 500}+

Scan this category and recommend the BEST products for affiliate marketing.
Prioritize products that:
- Solve real, daily problems
- Have strong social proof (reviews, ratings)
- Are priced for impulse purchases
- Have clear visual/functional benefits
- Would appeal to your target audience

Return the top ${maxProductsPerCategory} products with highest conversion potential.
`.trim();

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      });

      const raw = completion.choices[0].message.content;
      if (!raw) {
        console.warn(`⚠️  Empty response for ${category.category}`);
        continue;
      }

      const parsed = JSON.parse(raw) as { products?: any[] };
      if (!parsed.products || !Array.isArray(parsed.products)) {
        console.warn(`⚠️  Invalid response format for ${category.category}`);
        continue;
      }

      // Convert to ProductAnalysis format
      for (const p of parsed.products) {
        // Validate ASIN format
        if (!p.asin || !/^[A-Z0-9]{10}$/i.test(p.asin)) {
          console.warn(`⚠️  Invalid ASIN format: ${p.asin}`);
          continue;
        }

        const analysis: ProductAnalysis = {
          asin: p.asin.toUpperCase(),
          title: p.title || "Unknown Product",
          category: p.category || category.category,
          estimatedPrice: p.estimatedPrice || 24.99,
          estimatedRating: p.estimatedRating || 4.5,
          estimatedReviews: p.estimatedReviews || 1000,
          conversionPotential: p.conversionPotential || "medium",
          recommendationScore: p.recommendationScore || 70,
          reasons: p.reasons || [],
          targetUser: p.targetUser || "general audience",
          mainProblem: p.mainProblem || "a common problem",
          whyGoodForAffiliate: p.whyGoodForAffiliate || "good conversion potential",
        };

        allRecommendations.push(analysis);
        console.log(`  ✅ ${analysis.title} (${analysis.asin}) - Score: ${analysis.recommendationScore}/100`);
      }
    } catch (error) {
      console.error(`❌ Error scanning ${category.category}:`, error);
    }
  }

  // Sort by recommendation score (highest first)
  return allRecommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);
}

/**
 * Filter and rank recommendations
 */
export function filterTopRecommendations(
  recommendations: ProductAnalysis[],
  minScore: number = 75,
  maxResults: number = 50
): ProductAnalysis[] {
  return recommendations
    .filter(r => r.recommendationScore >= minScore)
    .filter(r => r.conversionPotential !== "low")
    .slice(0, maxResults);
}

/**
 * Generate detailed recommendation report
 */
export function generateRecommendationReport(
  recommendations: ProductAnalysis[]
): string {
  const highScore = recommendations.filter(r => r.recommendationScore >= 85).length;
  const mediumScore = recommendations.filter(r => r.recommendationScore >= 75 && r.recommendationScore < 85).length;
  const lowScore = recommendations.filter(r => r.recommendationScore < 75).length;

  return `
📊 Product Recommendation Report
================================

Total Products Analyzed: ${recommendations.length}
High Score (85+): ${highScore} products
Medium Score (75-84): ${mediumScore} products
Low Score (<75): ${lowScore} products

Top 10 Recommendations:
${recommendations.slice(0, 10).map((r, i) => `
${i + 1}. ${r.title} (${r.asin})
   Score: ${r.recommendationScore}/100
   Price: $${r.estimatedPrice}
   Rating: ${r.estimatedRating} ⭐ (${r.estimatedReviews.toLocaleString()} reviews)
   Why: ${r.whyGoodForAffiliate}
`).join("")}
`.trim();
}
