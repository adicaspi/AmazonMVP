// ai/runProductScanner.ts
// Run the product scanner and recommendation system
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { scanAndRecommendProducts, filterTopRecommendations, generateRecommendationReport } from "./productRecommender";
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
  console.log("This system will:");
  console.log("1. Scan multiple Amazon categories");
  console.log("2. Analyze hundreds of products");
  console.log("3. Recommend the best products for affiliate marketing\n");

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

  console.log(`📋 Scanning ${categories.length} categories...\n`);

  // Scan all categories
  const allRecommendations = await scanAndRecommendProducts(categories, 20);

  if (allRecommendations.length === 0) {
    console.log("❌ No products found. Try adjusting your search criteria.");
    return;
  }

  console.log(`\n✅ Found ${allRecommendations.length} products total`);

  // Filter top recommendations
  const topRecommendations = filterTopRecommendations(allRecommendations, 75, 50);

  console.log(`\n⭐ Top ${topRecommendations.length} recommendations (score 75+):`);

  // Generate report
  const report = generateRecommendationReport(topRecommendations);
  console.log(report);

  // Save to file
  const outputFile = path.join(process.cwd(), "ai/recommended-products.json");
  await fs.writeFile(
    outputFile,
    JSON.stringify(topRecommendations, null, 2),
    "utf8"
  );

  console.log(`\n📝 Saved recommendations to: ai/recommended-products.json`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Review the recommendations in ai/recommended-products.json`);
  console.log(`   2. Verify ASINs on Amazon`);
  console.log(`   3. Add selected products to discoveryInput.json`);
  console.log(`   4. Run: npm run import:discovery`);
}

main().catch(console.error);
