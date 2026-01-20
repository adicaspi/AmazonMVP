// ai/runDiscovery.ts
// Run the automatic product discovery agent
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { discoverProducts } from "./discoveryAgent";
import fs from "fs/promises";
import path from "path";

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

async function main() {
  console.log("🔍 Automatic Product Discovery Agent");
  console.log("=====================================\n");

  // Discovery queries - customize these to find different products
  const queries: DiscoveryQuery[] = [
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

  const discovered = await discoverProducts(queries);

  if (discovered.length === 0) {
    console.log("\n❌ No products discovered. Check your queries and API key.");
    process.exit(1);
  }

  console.log(`\n✅ Discovered ${discovered.length} products!`);

  // Convert to raw_candidates.json format
  const rawCandidates = {
    schemaVersion: "1.0" as const,
    defaults: {
      trackingId: "yourtag-20",
      market: "US",
    },
    items: discovered.map((p) => ({
      asin: p.asin,
      baseAmazonUrl: p.baseAmazonUrl,
      vertical: p.vertical,
      name: p.name,
      targetUser: p.targetUser,
      keyProblem: p.keyProblem,
      hints: p.hints,
      source: p.source,
    })),
  };

  // Write to raw_candidates.json
  const filePath = path.join(process.cwd(), "ai/raw_candidates.json");
  await fs.writeFile(filePath, JSON.stringify(rawCandidates, null, 2), "utf8");

  console.log(`\n✅ Wrote ${discovered.length} products to ai/raw_candidates.json`);
  console.log("\n⚠️  IMPORTANT:");
  console.log("The ASINs generated are PLACEHOLDERS. You need to:");
  console.log("1. Review the product names");
  console.log("2. Search for these products on Amazon");
  console.log("3. Replace the placeholder ASINs with REAL ASINs from Amazon");
  console.log("4. Then run: npm run ai:select");
  console.log("\n💡 For fully automatic discovery, integrate Amazon Product Advertising API (PA-API)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
