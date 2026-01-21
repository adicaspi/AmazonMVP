// ai/runProductScanner.ts
// Run the product scanner and recommendation system
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { scanAndRecommendProducts, filterTopRecommendations } from "./productRecommender";
import { generateBestSellersInstructions } from "./amazonBestSellers";
import fs from "fs/promises";
import path from "path";

type CategoryScan = {
  category: string;
  keywords: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minReviews?: number;
};

async function main() {
  console.log("🤖 Amazon Product Scanner & Recommender");
  console.log("========================================\n");
  console.log("⚠️  IMPORTANT: This system provides PRODUCT TYPES and search strategies.");
  console.log("It does NOT provide real ASINs - you must find them on Amazon yourself.\n");

  // Define categories to scan
  const categories: CategoryScan[] = [
    {
      category: "Kitchen Organization",
      keywords: ["kitchen organizer", "drawer organizer", "food storage", "kitchen storage"],
      minPrice: 15,
      maxPrice: 60,
      minRating: 4.0,
      minReviews: 500,
    },
    {
      category: "Home Storage",
      keywords: ["storage baskets", "organization", "closet storage", "home storage"],
      minPrice: 15,
      maxPrice: 50,
      minRating: 4.0,
      minReviews: 300,
    },
    {
      category: "Kitchen Tools",
      keywords: ["kitchen tools", "jar opener", "bag sealer", "kitchen accessories"],
      minPrice: 10,
      maxPrice: 40,
      minRating: 4.0,
      minReviews: 500,
    },
    {
      category: "Food Storage",
      keywords: ["food storage containers", "airtight containers", "meal prep", "silicone lids"],
      minPrice: 15,
      maxPrice: 50,
      minRating: 4.2,
      minReviews: 1000,
    },
    {
      category: "Home Decor & Organization",
      keywords: ["wall shelves", "storage furniture", "home decor", "organization"],
      minPrice: 20,
      maxPrice: 60,
      minRating: 4.0,
      minReviews: 500,
    },
  ];

  console.log(`📋 Generating search strategies for ${categories.length} categories...\n`);

  // Scan all categories
  const allRecommendations = await scanAndRecommendProducts(categories, 20);

  if (allRecommendations.length === 0) {
    console.log("❌ No recommendations generated. Try adjusting your search criteria.");
    return;
  }

  console.log(`\n✅ Generated ${allRecommendations.length} product recommendations!`);

  // Show Best Sellers instructions FIRST (most reliable)
  console.log(generateBestSellersInstructions());

  // Filter top recommendations
  const topRecommendations = filterTopRecommendations(allRecommendations, 75, 50);

  console.log(`\n⭐ Top ${topRecommendations.length} product types to search for (score 75+):`);

  // Generate report (modified to show search URLs instead of ASINs)
  console.log(`\n📋 Product Types to Search:\n`);
  topRecommendations.slice(0, 20).forEach((r, i) => {
    const searchUrl = r.reasons.find(reason => reason.startsWith("Search:"));
    console.log(`${i + 1}. ${r.title}`);
    console.log(`   Score: ${r.recommendationScore}/100`);
    console.log(`   Price: $${r.estimatedPrice}`);
    console.log(`   Rating: ${r.estimatedRating} ⭐`);
    if (searchUrl) {
      console.log(`   ${searchUrl}`);
    }
    console.log("");
  });

  // Save recommendations (but note they don't have real ASINs)
  const outputFile = path.join(process.cwd(), "ai/recommended-products.json");
  const recommendationsToSave = topRecommendations.map(r => ({
    ...r,
    note: "⚠️  This is a product TYPE, not a real ASIN. You must search Amazon and find a real product.",
    instructions: "1. Use the search URL above to find products on Amazon. 2. Click on a product. 3. Copy the ASIN from the URL. 4. Verify the product is real. 5. Add to discoveryInput.json",
  }));
  
  await fs.writeFile(
    outputFile,
    JSON.stringify(recommendationsToSave, null, 2),
    "utf8"
  );

  console.log(`\n📝 Saved product types to: ai/recommended-products.json`);
  console.log(`\n⚠️  IMPORTANT: These are PRODUCT TYPES, not real ASINs!`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Use the Amazon Best Sellers links above (most reliable)`);
  console.log(`   2. OR use the search URLs for each product type`);
  console.log(`   3. Find real products on Amazon`);
  console.log(`   4. Copy ASINs from product URLs`);
  console.log(`   5. Verify products are real`);
  console.log(`   6. Add verified products to discoveryInput.json`);
  console.log(`   7. Run: npm run import:discovery`);
}

main().catch(console.error);
