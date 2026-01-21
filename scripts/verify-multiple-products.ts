// scripts/verify-multiple-products.ts
// Verify multiple products from recommended-products.json
import fs from "fs/promises";
import path from "path";

type RecommendedProduct = {
  asin: string;
  title: string;
  recommendationScore: number;
  estimatedPrice: number;
  estimatedRating: number;
  estimatedReviews: number;
};

async function verifyMultipleProducts() {
  const recommendedFile = path.join(process.cwd(), "ai/recommended-products.json");
  
  try {
    const content = await fs.readFile(recommendedFile, "utf8");
    const products: RecommendedProduct[] = JSON.parse(content);
    
    if (products.length === 0) {
      console.log("❌ No products found in recommended-products.json");
      console.log("Run 'npm run scan:products' first");
      return;
    }
    
    console.log(`\n🔍 Found ${products.length} recommended products\n`);
    console.log("⚠️  IMPORTANT: These ASINs need to be verified manually!");
    console.log("\nTo verify each product:");
    console.log("1. Open the Amazon URL in your browser");
    console.log("2. Check if the product exists and matches the description");
    console.log("3. Only add verified products to discoveryInput.json\n");
    
    console.log("📋 Products to verify:\n");
    
    // Sort by score (highest first)
    const sorted = products.sort((a, b) => b.recommendationScore - a.recommendationScore);
    
    sorted.forEach((product, index) => {
      const amazonUrl = `https://www.amazon.com/dp/${product.asin}`;
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   ASIN: ${product.asin}`);
      console.log(`   Score: ${product.recommendationScore}/100`);
      console.log(`   Price: $${product.estimatedPrice}`);
      console.log(`   Rating: ${product.estimatedRating} ⭐`);
      console.log(`   Reviews: ${product.estimatedReviews.toLocaleString()}`);
      console.log(`   Verify: ${amazonUrl}`);
      console.log("");
    });
    
    console.log("\n💡 Next steps:");
    console.log("1. Open each Amazon URL and verify the product exists");
    console.log("2. For verified products, add them to ai/discoveryInput.json");
    console.log("3. Run 'npm run import:discovery' to add to site");
    
  } catch (error) {
    console.error("❌ Error reading recommended-products.json:", error);
    console.log("\n💡 Run 'npm run scan:products' first to generate recommendations");
  }
}

verifyMultipleProducts().catch(console.error);
