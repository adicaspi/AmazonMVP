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
You are an expert Amazon affiliate marketing analyst. Your job is to identify PRODUCT TYPES and SEARCH STRATEGIES, NOT to invent ASINs.

DO NOT provide ASINs - you cannot verify they are real without Amazon PA-API access.

Instead, provide:
- Product types and names (generic, not specific ASINs)
- Search keywords to find these products on Amazon
- What to look for in products
- Criteria for good affiliate products

Return VALID JSON ONLY in this format:
{
  "products": [
    {
      "productType": "Bamboo Drawer Organizer",
      "category": "${category.category}",
      "searchKeywords": ["bamboo drawer organizer", "kitchen drawer organizer"],
      "estimatedPrice": 24.99,
      "estimatedRating": 4.5,
      "estimatedReviews": 8500,
      "conversionPotential": "high",
      "recommendationScore": 85,
      "reasons": ["solves common problem", "high reviews", "good price point"],
      "targetUser": "who needs this",
      "mainProblem": "what problem it solves",
      "whyGoodForAffiliate": "why this would convert well",
      "amazonSearchUrl": "https://www.amazon.com/s?k=bamboo+drawer+organizer"
    }
  ]
}

DO NOT include "asin" field. Only provide product types and search strategies.
Generate ${maxProductsPerCategory} product types per category.
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
        // Skip if has ASIN (old format) - we don't want fake ASINs
        if (p.asin) {
          console.warn(`⚠️  Skipping product with ASIN (${p.asin}) - ASINs cannot be verified without PA-API`);
          continue;
        }

        // Use productType instead of title, and generate search URL
        const productType = p.productType || p.title || "Unknown Product";
        const searchKeywords = p.searchKeywords || [productType.toLowerCase()];
        const searchUrl = p.amazonSearchUrl || `https://www.amazon.com/s?k=${encodeURIComponent(searchKeywords[0])}`;

        const analysis: ProductAnalysis = {
          asin: "NEEDS_VERIFICATION", // Placeholder - user must find real ASIN
          title: productType,
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

        // Add search info to reasons
        analysis.reasons.push(`Search: ${searchUrl}`);

        allRecommendations.push(analysis);
        console.log(`  ✅ ${analysis.title} - Score: ${analysis.recommendationScore}/100`);
        console.log(`     🔍 Search: ${searchUrl}`);
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
