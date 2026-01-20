// ai/discoveryAgent.ts
// Automatic Product Discovery Agent - Finds products from Amazon automatically
import OpenAI from "openai";
import { openai } from "./client";

type DiscoveryQuery = {
  vertical: string;
  keywords: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minReviews?: number;
};

type DiscoveredProduct = {
  asin: string;
  name: string;
  baseAmazonUrl: string;
  vertical: string;
  estimatedPrice: number;
  targetUser: string;
  keyProblem: string;
  hints: {
    estimatedPrice: number;
    primeEligible: boolean;
    ratingBucket: string;
    reviewsBucket: string;
  };
  source: {
    origin: "ai_discovery";
    notes: string;
  };
};

type DiscoveryResult = {
  products: DiscoveredProduct[];
  query: DiscoveryQuery;
  generatedAt: string;
};

/**
 * AI-powered product discovery
 * Uses GPT to generate realistic product ideas based on vertical and keywords
 * Then constructs valid Amazon URLs and product data
 */
export async function discoverProducts(
  queries: DiscoveryQuery[]
): Promise<DiscoveredProduct[]> {
  const allProducts: DiscoveredProduct[] = [];

  for (const query of queries) {
    console.log(`\n🔍 Discovering products for: ${query.vertical} (${query.keywords.join(", ")})`);

    const systemPrompt = `
You are an expert at identifying high-converting Amazon products for affiliate marketing.
Generate realistic product ideas that:
1. Solve real, daily problems
2. Have clear before/after visual potential
3. Appeal to impulse buyers
4. Are priced $15-$60
5. Have strong problem-solution fit

For each product, provide:
- A realistic product name
- Target user (who has this problem)
- Key problem (what pain point it solves)
- Estimated price ($15-$60)
- Why it would convert well

Return VALID JSON ONLY in this format:
{
  "products": [
    {
      "name": "Product Name",
      "targetUser": "who has this problem",
      "keyProblem": "what problem it solves",
      "estimatedPrice": 24.99,
      "conversionReason": "why this would convert well"
    }
  ]
}

Generate 5-8 products per query. Be realistic and specific.
`.trim();

    const userPrompt = `
Vertical: ${query.vertical}
Keywords: ${query.keywords.join(", ")}
Price range: $${query.minPrice || 15} - $${query.maxPrice || 60}
Minimum rating: ${query.minRating || 4.0}+
Minimum reviews: ${query.minReviews || 500}+

Generate products that fit these criteria.
`.trim();

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8, // More creative
      });

      const raw = completion.choices[0].message.content;
      if (!raw) {
        console.warn(`⚠️  Empty response for ${query.vertical}`);
        continue;
      }

      const parsed = JSON.parse(raw) as { products?: any[] };
      if (!parsed.products || !Array.isArray(parsed.products)) {
        console.warn(`⚠️  Invalid response format for ${query.vertical}`);
        continue;
      }

      // Convert AI-generated products to DiscoveredProduct format
      for (const p of parsed.products) {
        // Try to find real ASIN (returns null if not found)
        const asin = await findRealASIN(p.name || "Unknown", query.keywords);
        
        // Skip products without real ASINs
        if (!asin) {
          console.log(`  ⚠️  Skipping ${p.name} - no real ASIN found (needs manual lookup)`);
          continue;
        }
        
        const discovered: DiscoveredProduct = {
          asin,
          name: p.name || "Unknown Product",
          baseAmazonUrl: `https://www.amazon.com/dp/${asin}`,
          vertical: query.vertical,
          estimatedPrice: p.estimatedPrice || 24.99,
          targetUser: p.targetUser || "general audience",
          keyProblem: p.keyProblem || "a common daily problem",
          hints: {
            estimatedPrice: p.estimatedPrice || 24.99,
            primeEligible: true,
            ratingBucket: `${query.minRating || 4.0}-${(query.minRating || 4.0) + 0.5}`,
            reviewsBucket: `${query.minReviews || 500}-${(query.minReviews || 500) * 5}`,
          },
          source: {
            origin: "ai_discovery",
            notes: p.conversionReason || "AI-generated product suggestion with real ASIN",
          },
        };

        allProducts.push(discovered);
        console.log(`  ✅ ${discovered.name} (${asin})`);
      }
    } catch (error) {
      console.error(`❌ Error discovering products for ${query.vertical}:`, error);
    }
  }

  return allProducts;
}

/**
 * Search for real products on Amazon using web search
 * Extracts real ASINs from Amazon search results
 */
async function findRealASIN(productName: string, keywords: string[]): Promise<string | null> {
  try {
    // Construct Amazon search URL
    const searchQuery = encodeURIComponent(`${productName} ${keywords.join(" ")}`);
    const amazonSearchUrl = `https://www.amazon.com/s?k=${searchQuery}&ref=sr_pg_1`;
    
    // Note: In production, you would:
    // 1. Use Amazon Product Advertising API (PA-API) with credentials
    // 2. Or use a web scraping service (like ScraperAPI, Bright Data)
    // 3. Or use SerpAPI for Amazon search results
    
    // For now, we'll use a web search to find Amazon product pages
    // and extract ASINs from the URLs
    
    // This is a placeholder - in production, integrate with PA-API or scraping service
    console.warn(`⚠️  Need to find real ASIN for: ${productName}`);
    console.warn(`   Search URL: ${amazonSearchUrl}`);
    console.warn(`   💡 To get real ASINs, integrate Amazon PA-API or use a scraping service`);
    
    return null; // Return null to indicate we need manual ASIN lookup
  } catch (error) {
    console.error(`Error finding ASIN for ${productName}:`, error);
    return null;
  }
}

/**
 * Main discovery function - discovers products and writes to raw_candidates.json
 */
export async function runDiscovery(): Promise<void> {
  const discoveryQueries: DiscoveryQuery[] = [
    {
      vertical: "home_kitchen",
      keywords: ["kitchen organizer", "drawer organizer", "food storage", "kitchen tools"],
      minPrice: 15,
      maxPrice: 60,
      minRating: 4.2,
      minReviews: 500,
    },
    {
      vertical: "home_kitchen",
      keywords: ["jar opener", "bag sealer", "silicone lids", "kitchen accessories"],
      minPrice: 15,
      maxPrice: 40,
      minRating: 4.0,
      minReviews: 300,
    },
  ];

  console.log("🚀 Starting automatic product discovery...\n");
  
  const discovered = await discoverProducts(discoveryQueries);
  
  if (discovered.length === 0) {
    console.log("❌ No products discovered. Check your queries and API key.");
    return;
  }

  console.log(`\n✅ Discovered ${discovered.length} products!`);
  console.log("\n📝 Next steps:");
  console.log("1. Review the discovered products");
  console.log("2. Update ai/raw_candidates.json with real ASINs from Amazon");
  console.log("3. Run: npm run ai:select");
  console.log("4. Run: npm run ai:pipeline");
  
  // Note: We don't auto-write to raw_candidates.json because we need real ASINs
  // In production, you'd integrate with Amazon PA-API to get real ASINs
  return;
}
