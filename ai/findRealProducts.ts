// ai/findRealProducts.ts
// System that guides you to find REAL products on Amazon
// Instead of inventing ASINs, it gives you search strategies

import { openai } from "./client";

type ProductSearchStrategy = {
  category: string;
  searchKeywords: string[];
  amazonSearchUrl: string;
  whatToLookFor: string[];
  criteria: {
    minRating: number;
    minReviews: number;
    priceRange: string;
  };
  exampleProducts: string[]; // Product names to search for
};

/**
 * Generate search strategies to find REAL products on Amazon
 * This doesn't invent ASINs - it tells you HOW to find real products
 */
export async function generateProductSearchStrategies(): Promise<ProductSearchStrategy[]> {
  console.log("🔍 Generating search strategies to find REAL products on Amazon...\n");

  const systemPrompt = `
You are an expert at finding real Amazon products for affiliate marketing.
Your job is NOT to invent ASINs, but to provide SEARCH STRATEGIES.

For each category, provide:
1. Best search keywords to use on Amazon
2. What to look for in products
3. Criteria for good affiliate products
4. Example product names (real products that exist)

Return VALID JSON ONLY in this format:
{
  "strategies": [
    {
      "category": "Kitchen Organization",
      "searchKeywords": ["kitchen drawer organizer", "drawer organizer", "kitchen storage"],
      "amazonSearchUrl": "https://www.amazon.com/s?k=kitchen+drawer+organizer",
      "whatToLookFor": ["4+ star rating", "500+ reviews", "$15-$60 price"],
      "criteria": {
        "minRating": 4.0,
        "minReviews": 500,
        "priceRange": "$15-$60"
      },
      "exampleProducts": ["Bamboo Drawer Organizer", "Plastic Drawer Dividers"]
    }
  ]
}

DO NOT invent ASINs. Focus on search strategies and what to look for.
`.trim();

  const userPrompt = `
Generate search strategies for finding real Amazon products in these categories:
1. Kitchen Organization
2. Home Storage
3. Food Storage
4. Kitchen Tools
5. Home Decor

For each category, provide:
- Best search keywords
- Amazon search URLs
- What to look for
- Criteria for good products
- Example product types (not specific ASINs)

Focus on helping users FIND real products, not inventing fake ones.
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
      throw new Error("Empty response");
    }

    const parsed = JSON.parse(raw) as { strategies?: any[] };
    if (!parsed.strategies || !Array.isArray(parsed.strategies)) {
      throw new Error("Invalid response format");
    }

    return parsed.strategies.map(s => ({
      category: s.category,
      searchKeywords: s.searchKeywords || [],
      amazonSearchUrl: s.amazonSearchUrl || `https://www.amazon.com/s?k=${encodeURIComponent(s.searchKeywords?.[0] || "")}`,
      whatToLookFor: s.whatToLookFor || [],
      criteria: {
        minRating: s.criteria?.minRating || 4.0,
        minReviews: s.criteria?.minReviews || 500,
        priceRange: s.criteria?.priceRange || "$15-$60",
      },
      exampleProducts: s.exampleProducts || [],
    }));

  } catch (error) {
    console.error("Error generating strategies:", error);
    return [];
  }
}

/**
 * Main function - Generate search strategies
 */
export async function findRealProducts(): Promise<void> {
  console.log("🎯 Real Product Finder - Search Strategies");
  console.log("==========================================\n");
  console.log("This system helps you find REAL products on Amazon.");
  console.log("It doesn't invent ASINs - it tells you HOW to search.\n");

  const strategies = await generateProductSearchStrategies();

  if (strategies.length === 0) {
    console.log("❌ No strategies generated.");
    return;
  }

  console.log(`✅ Generated ${strategies.length} search strategies\n`);

  for (const strategy of strategies) {
    console.log(`\n📦 ${strategy.category}`);
    console.log("─".repeat(50));
    console.log(`\n🔍 Search Keywords:`);
    strategy.searchKeywords.forEach((keyword, i) => {
      console.log(`   ${i + 1}. ${keyword}`);
    });
    
    console.log(`\n🔗 Amazon Search URL:`);
    console.log(`   ${strategy.amazonSearchUrl}`);
    
    console.log(`\n✅ What to Look For:`);
    strategy.whatToLookFor.forEach((item, i) => {
      console.log(`   ${i + 1}. ${item}`);
    });
    
    console.log(`\n📊 Criteria:`);
    console.log(`   • Rating: ${strategy.criteria.minRating}+ stars`);
    console.log(`   • Reviews: ${strategy.criteria.minReviews}+ reviews`);
    console.log(`   • Price: ${strategy.criteria.priceRange}`);
    
    if (strategy.exampleProducts.length > 0) {
      console.log(`\n💡 Example Product Types:`);
      strategy.exampleProducts.forEach((product, i) => {
        console.log(`   ${i + 1}. ${product}`);
      });
    }
  }

  console.log(`\n\n📝 Next Steps:`);
  console.log(`1. Open each Amazon search URL above`);
  console.log(`2. Browse the results and find products that match the criteria`);
  console.log(`3. Click on a product to see its ASIN in the URL`);
  console.log(`4. Copy the ASIN and verify the product is real`);
  console.log(`5. Add verified products to ai/discoveryInput.json`);
  console.log(`6. Run: npm run import:discovery`);
  
  console.log(`\n💡 Tip: Use Amazon SiteStripe to get affiliate links easily!`);
}
