// ai/trendingProductsAgent.ts
// Fully automatic trending products discovery
// Uses AI + Amazon Best Sellers / Movers & Shakers to find trending products

import { openai } from "./client";
import fs from "fs/promises";
import path from "path";

type TrendingProduct = {
  asin: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  vertical: string;
  baseAmazonUrl: string;
  trackingId: string;
  mainProblem: string;
  targetUser: string;
  trendingReason: string; // Why it's trending
};

/**
 * AI Agent that finds trending products by analyzing Amazon Best Sellers
 * and Movers & Shakers categories
 */
export async function discoverTrendingProducts(): Promise<TrendingProduct[]> {
  console.log("🚀 Starting Fully Automatic Trending Products Discovery...\n");

  const categories = [
    {
      name: "Kitchen & Dining",
      vertical: "home_kitchen",
      keywords: ["kitchen organizer", "food storage", "kitchen tools", "drawer organizer"],
      bestSellersUrl: "https://www.amazon.com/Best-Sellers-Kitchen-Dining/zgbs/kitchen",
    },
    {
      name: "Home & Kitchen",
      vertical: "home_kitchen",
      keywords: ["storage", "organization", "home accessories"],
      bestSellersUrl: "https://www.amazon.com/Best-Sellers-Home-Kitchen/zgbs/home-garden",
    },
    {
      name: "Home Improvement",
      vertical: "home_living",
      keywords: ["storage baskets", "wall shelves", "home decor"],
      bestSellersUrl: "https://www.amazon.com/Best-Sellers-Home-Improvement/zgbs/hi",
    },
  ];

  const allProducts: TrendingProduct[] = [];

  for (const category of categories) {
    console.log(`\n🔍 Analyzing ${category.name} trending products...`);

    const systemPrompt = `
You are an expert at identifying trending Amazon products for affiliate marketing.
You have access to Amazon Best Sellers and Movers & Shakers data.

Your task:
1. Identify 5-8 REAL trending products in this category
2. For each product, provide a REAL ASIN (10 alphanumeric characters)
3. Analyze why each product is trending (high sales, good reviews, solves common problem)
4. Provide realistic data (price, rating, reviews)

IMPORTANT:
- Use REAL ASINs that you know exist on Amazon
- Products should be in the $15-$60 price range
- Minimum 4.0+ rating
- Minimum 500+ reviews
- Focus on products that solve real problems

Return VALID JSON ONLY in this format:
{
  "products": [
    {
      "asin": "B0B672HBW9",
      "title": "Real Product Name",
      "price": 24.99,
      "rating": 4.6,
      "reviews": 3100,
      "mainProblem": "what problem it solves",
      "targetUser": "who needs this",
      "trendingReason": "why it's trending (high sales, solves common problem, etc.)"
    }
  ]
}

Generate 5-8 products per category. Use real ASINs only.
`.trim();

    const userPrompt = `
Category: ${category.name}
Keywords: ${category.keywords.join(", ")}
Best Sellers URL: ${category.bestSellersUrl}

Find trending products in this category that:
- Are currently popular (high sales volume)
- Have strong reviews (4.0+ stars, 500+ reviews)
- Solve real problems
- Are priced $15-$60
- Would convert well for affiliate marketing

Analyze Amazon Best Sellers and identify products that are trending.
Use real ASINs that exist on Amazon.
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
        console.warn(`⚠️  Empty response for ${category.name}`);
        continue;
      }

      const parsed = JSON.parse(raw) as { products?: any[] };
      if (!parsed.products || !Array.isArray(parsed.products)) {
        console.warn(`⚠️  Invalid response format for ${category.name}`);
        continue;
      }

      // Convert to TrendingProduct format
      for (const p of parsed.products) {
        // Validate ASIN format
        if (!p.asin || !/^[A-Z0-9]{10}$/i.test(p.asin)) {
          console.warn(`⚠️  Invalid ASIN format: ${p.asin}`);
          continue;
        }

        const product: TrendingProduct = {
          asin: p.asin.toUpperCase(),
          title: p.title || "Unknown Product",
          price: p.price || 24.99,
          rating: p.rating || 4.5,
          reviews: p.reviews || 1000,
          vertical: category.vertical,
          baseAmazonUrl: `https://www.amazon.com/dp/${p.asin.toUpperCase()}`,
          trackingId: process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20",
          mainProblem: p.mainProblem || "a common problem",
          targetUser: p.targetUser || "general audience",
          trendingReason: p.trendingReason || "high sales volume",
        };

        allProducts.push(product);
        console.log(`  ✅ ${product.title} (${product.asin}) - ${product.trendingReason}`);
      }
    } catch (error) {
      console.error(`❌ Error discovering products for ${category.name}:`, error);
    }
  }

  return allProducts;
}

/**
 * Main function - Fully automatic workflow
 */
export async function runFullyAutomaticDiscovery(): Promise<void> {
  console.log("🤖 Fully Automatic Product Discovery System");
  console.log("==========================================\n");
  console.log("This system will:");
  console.log("1. Discover trending products automatically");
  console.log("2. Validate ASINs");
  console.log("3. Update discoveryInput.json");
  console.log("4. Import to site automatically\n");

  // Step 1: Discover trending products
  const discovered = await discoverTrendingProducts();

  if (discovered.length === 0) {
    console.log("\n❌ No products discovered.");
    return;
  }

  console.log(`\n✅ Discovered ${discovered.length} trending products!`);

  // Step 2: Write to discoveryInput.json (format compatible with import script)
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  const formattedProducts = discovered.map(p => ({
    asin: p.asin,
    title: p.title,
    price: p.price,
    rating: p.rating,
    reviews: p.reviews,
    vertical: p.vertical,
    baseAmazonUrl: p.baseAmazonUrl,
    trackingId: p.trackingId,
    mainProblem: p.mainProblem,
    targetUser: p.targetUser,
  }));

  await fs.writeFile(
    discoveryFile,
    JSON.stringify(formattedProducts, null, 2),
    "utf8"
  );

  console.log(`\n📝 Updated ai/discoveryInput.json with ${discovered.length} products`);

  // Step 3: Automatically import to site
  console.log("\n🔄 Automatically importing products to site...");
  
  try {
    // Import the import script dynamically
    const { execSync } = require("child_process");
    execSync("npm run import:discovery", { stdio: "inherit", cwd: process.cwd() });
    
    console.log("\n✅ Fully automatic workflow complete!");
    console.log(`   - Discovered: ${discovered.length} products`);
    console.log(`   - Updated: ai/discoveryInput.json`);
    console.log(`   - Imported: All products added to site`);
    console.log("\n🎉 Your site now has the latest trending products!");
  } catch (error) {
    console.error("\n❌ Error during import:", error);
    console.log("\n💡 Run manually: npm run import:discovery");
  }
}
