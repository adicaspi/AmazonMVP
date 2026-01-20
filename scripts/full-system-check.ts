// scripts/full-system-check.ts
// Full system check: products, selection, display, and viewing
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
dotenv.config({ path: ".env.local" });

async function checkRawCandidates() {
  console.log("\n📋 1. Checking raw_candidates.json...");
  try {
    const rawCandidates = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "ai/raw_candidates.json"), "utf8")
    );
    
    console.log(`   Found ${rawCandidates.items?.length || 0} raw candidates`);
    
    if (rawCandidates.items) {
      for (const item of rawCandidates.items) {
        console.log(`   - ${item.name || item.title}`);
        console.log(`     ASIN: ${item.asin || "MISSING"}`);
        console.log(`     URL: ${item.baseAmazonUrl || "MISSING"}`);
        if (!item.asin || !item.baseAmazonUrl) {
          console.log(`     ⚠️  MISSING DATA!`);
        }
      }
    }
    
    return rawCandidates;
  } catch (error) {
    console.error("   ❌ Error reading raw_candidates.json:", error);
    return null;
  }
}

async function checkCandidates() {
  console.log("\n📋 2. Checking candidates.json...");
  try {
    const candidates = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "ai/candidates.json"), "utf8")
    );
    
    console.log(`   Found ${candidates.items?.length || 0} selected candidates`);
    
    if (candidates.items) {
      for (const item of candidates.items) {
        const candidate = item.candidate;
        if (candidate) {
          console.log(`   - ${candidate.name}`);
          console.log(`     ID: ${candidate.id}`);
          console.log(`     ASIN: ${candidate.baseAmazonUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1] || "NOT FOUND"}`);
          console.log(`     URL: ${candidate.baseAmazonUrl || "MISSING"}`);
          console.log(`     Angle: ${candidate.angle || "NONE"}`);
        }
      }
    }
    
    return candidates;
  } catch (error) {
    console.error("   ❌ Error reading candidates.json:", error);
    return null;
  }
}

async function checkDatabase() {
  console.log("\n📋 3. Checking database...");
  
  if (!supabase || !(await isDatabaseAvailable())) {
    console.log("   ⚠️  Database not available");
    return null;
  }
  
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("   ❌ Error fetching products:", error);
      return null;
    }
    
    console.log(`   Found ${products?.length || 0} products in database`);
    
    if (products) {
      for (const product of products.slice(0, 5)) {
        console.log(`   - ${product.name}`);
        console.log(`     ID: ${product.id}`);
        console.log(`     ASIN: ${product.amazon_url?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1] || "NOT FOUND"}`);
        console.log(`     URL: ${product.amazon_url || "MISSING"}`);
        console.log(`     Image: ${product.hero_image ? "✅" : "❌ MISSING"}`);
        console.log(`     Tracking ID: ${product.amazon_tracking_id || "MISSING"}`);
      }
    }
    
    return products;
  } catch (error) {
    console.error("   ❌ Error:", error);
    return null;
  }
}

async function verifyAmazonLinks(products: any[]) {
  console.log("\n📋 4. Verifying Amazon links...");
  
  if (!products || products.length === 0) {
    console.log("   ⚠️  No products to verify");
    return;
  }
  
  const issues: string[] = [];
  
  for (const product of products) {
    const asinMatch = product.amazon_url?.match(/\/dp\/([A-Z0-9]{10})/i);
    const asin = asinMatch ? asinMatch[1].toUpperCase() : null;
    
    if (!asin) {
      issues.push(`❌ ${product.name}: No ASIN found in URL: ${product.amazon_url}`);
      continue;
    }
    
    if (asin.length !== 10) {
      issues.push(`❌ ${product.name}: Invalid ASIN length: ${asin}`);
      continue;
    }
    
    // Check if URL is properly formatted
    const expectedUrl = `https://www.amazon.com/dp/${asin}`;
    if (product.amazon_url !== expectedUrl) {
      issues.push(`⚠️  ${product.name}: URL format issue. Current: ${product.amazon_url}, Expected: ${expectedUrl}`);
    }
    
    if (!product.amazon_tracking_id) {
      issues.push(`⚠️  ${product.name}: Missing tracking ID`);
    }
    
    if (!product.hero_image) {
      issues.push(`⚠️  ${product.name}: Missing hero image`);
    }
  }
  
  if (issues.length > 0) {
    console.log("   Found issues:");
    issues.forEach(issue => console.log(`   ${issue}`));
  } else {
    console.log("   ✅ All products look good!");
  }
}

async function main() {
  console.log("🔍 FULL SYSTEM CHECK");
  console.log("====================");
  
  const rawCandidates = await checkRawCandidates();
  const candidates = await checkCandidates();
  const dbProducts = await checkDatabase();
  
  if (dbProducts) {
    await verifyAmazonLinks(dbProducts);
  }
  
  console.log("\n📊 SUMMARY");
  console.log("===========");
  console.log(`Raw Candidates: ${rawCandidates?.items?.length || 0}`);
  console.log(`Selected Candidates: ${candidates?.items?.length || 0}`);
  console.log(`Database Products: ${dbProducts?.length || 0}`);
  
  console.log("\n💡 RECOMMENDATIONS");
  console.log("==================");
  
  if (!rawCandidates || !rawCandidates.items || rawCandidates.items.length === 0) {
    console.log("1. ⚠️  No raw candidates found. Need to add products to ai/raw_candidates.json");
  }
  
  if (!candidates || !candidates.items || candidates.items.length === 0) {
    console.log("2. ⚠️  No selected candidates. Run: npm run ai:select");
  }
  
  if (!dbProducts || dbProducts.length === 0) {
    console.log("3. ⚠️  No products in database. Run: npm run ai:pipeline");
  }
  
  if (dbProducts && dbProducts.length > 0) {
    const missingImages = dbProducts.filter(p => !p.hero_image).length;
    if (missingImages > 0) {
      console.log(`4. ⚠️  ${missingImages} products missing images. Run: npm run update:products`);
    }
    
    const invalidUrls = dbProducts.filter(p => {
      const asin = p.amazon_url?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
      return !asin || asin.length !== 10;
    }).length;
    
    if (invalidUrls > 0) {
      console.log(`5. ⚠️  ${invalidUrls} products have invalid Amazon URLs`);
    }
  }
}

main().catch(console.error);
