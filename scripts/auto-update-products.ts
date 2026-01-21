// scripts/auto-update-products.ts
// Fully automatic product import and update system
// Reads from discoveryInput.json and updates products-data.ts with real ASINs

import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type DiscoveryInput = {
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
};

type Room = "living_room" | "kitchen" | "storage" | "lighting" | "bedroom" | "bathroom" | "office" | "dining" | "outdoor" | "entryway" | "laundry" | "kids_room" | "garage" | "balcony" | "patio" | "basement";

const VERTICAL_TO_ROOM: Record<string, Room> = {
  home_kitchen: "kitchen",
  home_living: "living_room",
  home_bedroom: "bedroom",
  home_bathroom: "bathroom",
  home_office: "office",
  home_storage: "storage",
  home_lighting: "lighting",
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

function generateTags(vertical: string, title: string, problem: string): string[] {
  const tags = new Set<string>();
  const text = `${title} ${problem}`.toLowerCase();
  
  // Common tags
  if (text.includes("organizer") || text.includes("organize")) tags.add("organization");
  if (text.includes("storage") || text.includes("store")) tags.add("storage");
  if (text.includes("bamboo")) tags.add("bamboo");
  if (text.includes("silicone")) tags.add("silicone");
  if (text.includes("kitchen")) tags.add("kitchen-essentials");
  if (text.includes("drawer")) tags.add("drawer-organization");
  if (text.includes("food")) tags.add("food-storage");
  if (text.includes("eco") || text.includes("reusable")) tags.add("eco-friendly");
  if (text.includes("lamp") || text.includes("light")) tags.add("lighting");
  if (text.includes("pillow")) tags.add("decorative");
  if (text.includes("shelf")) tags.add("wall-mounted");
  if (text.includes("basket")) tags.add("baskets");
  if (text.includes("jar")) tags.add("kitchen-tools");
  if (text.includes("bag")) tags.add("food-storage");
  
  return Array.from(tags).slice(0, 4);
}

function generateImageUrl(slug: string, title: string): string {
  // Use a deterministic approach to get consistent images
  const imageMap: Record<string, string> = {
    "adjustable-bamboo-drawer-organizer": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    "over-the-cabinet-trash-bag-holder": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
    "portable-mini-bag-sealer": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
    "reusable-stretch-silicone-lids": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
    "under-cabinet-jar-opener": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
  };
  
  return imageMap[slug] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format";
}

async function autoUpdateProducts() {
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  const productsFile = path.join(process.cwd(), "lib/products-data.ts");
  
  try {
    // Read discovery input
    const discoveryContent = await fs.readFile(discoveryFile, "utf8");
    const discoveryProducts: DiscoveryInput[] = JSON.parse(discoveryContent);
    
    console.log(`\n🚀 Automatic Product Import System`);
    console.log(`=====================================\n`);
    console.log(`📦 Found ${discoveryProducts.length} products in discoveryInput.json\n`);
    
    // Validate all ASINs
    const invalidASINs = discoveryProducts.filter(p => !isValidASIN(p.asin));
    if (invalidASINs.length > 0) {
      console.error(`❌ Invalid ASINs found:`, invalidASINs.map(p => p.asin));
      process.exit(1);
    }
    
    // Read current products file
    let productsContent = await fs.readFile(productsFile, "utf8");
    
    const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";
    
    // Update each product that matches
    let updatedCount = 0;
    let addedCount = 0;
    
    for (const discovery of discoveryProducts) {
      const slug = generateSlug(discovery.title);
      const room = VERTICAL_TO_ROOM[discovery.vertical] || "kitchen";
      const tags = generateTags(discovery.vertical, discovery.title, discovery.mainProblem);
      const amazonUrl = buildAmazonURLFromASIN(discovery.asin, trackingId);
      const imageUrl = generateImageUrl(slug, discovery.title);
      
      // Check if product exists (by ASIN or slug)
      const asinPattern = new RegExp(`asin:\\s*"${discovery.asin}"`, "i");
      const slugPattern = new RegExp(`slug:\\s*"${slug}"`, "i");
      
      if (asinPattern.test(productsContent) || slugPattern.test(productsContent)) {
        // Update existing product
        console.log(`🔄 Updating: ${discovery.title} (${discovery.asin})`);
        
        // Update ASIN
        productsContent = productsContent.replace(
          new RegExp(`(asin:\\s*")[^"]+(".*?slug:\\s*"${slug}")`, "is"),
          `$1${discovery.asin}$2`
        );
        
        // Update amazonUrl
        productsContent = productsContent.replace(
          new RegExp(`(amazonUrl:\\s*")[^"]+(".*?slug:\\s*"${slug}")`, "is"),
          `$1${amazonUrl}$2`
        );
        
        // Update price if exists
        productsContent = productsContent.replace(
          new RegExp(`(price:\\s*)[0-9.]+(.*?slug:\\s*"${slug}")`, "is"),
          `$1${discovery.price}$2`
        );
        
        updatedCount++;
      } else {
        // Add new product - find insertion point
        console.log(`➕ Adding: ${discovery.title} (${discovery.asin})`);
        
        const productCode = `  {
    id: "${discovery.asin}",
    slug: "${slug}",
    title: "${discovery.title}",
    benefitTitle: "${discovery.title}",
    room: "${room}",
    tags: [${tags.map(t => `"${t}"`).join(", ")}],
    shortDescription: "${discovery.mainProblem}. ${discovery.title} solves this problem effectively.",
    whyWePickedIt: "We selected this product because it solves ${discovery.mainProblem.toLowerCase()} for ${discovery.targetUser.toLowerCase()}. With ${discovery.rating} stars and ${discovery.reviews.toLocaleString()} reviews, it's a proven solution that delivers real value.",
    image: "${imageUrl}",
    amazonUrl: "${amazonUrl}",
    asin: "${discovery.asin}",
    price: ${discovery.price},
    highlights: [
      "High customer satisfaction (${discovery.rating} stars)",
      "${discovery.reviews.toLocaleString()}+ verified reviews",
      "Solves ${discovery.mainProblem.toLowerCase()}"
    ],
    pros: [
      "Proven solution with ${discovery.reviews.toLocaleString()}+ reviews",
      "High rating (${discovery.rating} stars)",
      "Addresses ${discovery.mainProblem.toLowerCase()}"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "${discovery.rating} stars",
      "Reviews": "${discovery.reviews.toLocaleString()}+",
      "Price": "$${discovery.price}",
      "Target User": "${discovery.targetUser}"
    },
    status: "published",
    featured: false,
    dateAdded: "${new Date().toISOString().split('T')[0]}"
  }`;
        
        // Insert before the closing bracket
        const insertPattern = /(export const products: Product\[\] = \[)([\s\S]*?)(\];)/;
        const match = productsContent.match(insertPattern);
        if (match) {
          const existingProducts = match[2].trim();
          const separator = existingProducts ? ",\n" : "";
          productsContent = productsContent.replace(
            insertPattern,
            `$1${existingProducts}${separator}${productCode}\n$3`
          );
        }
        
        addedCount++;
      }
    }
    
    // Also update productImages if needed
    const imageMapEntries: string[] = [];
    for (const discovery of discoveryProducts) {
      const slug = generateSlug(discovery.title);
      const imageUrl = generateImageUrl(slug, discovery.title);
      imageMapEntries.push(`  "${slug}": "${imageUrl}"`);
    }
    
    // Write updated file
    await fs.writeFile(productsFile, productsContent, "utf8");
    
    console.log(`\n✅ Import Complete!`);
    console.log(`   Updated: ${updatedCount} products`);
    console.log(`   Added: ${addedCount} products`);
    console.log(`   Total processed: ${discoveryProducts.length} products`);
    console.log(`\n📝 All products now use real ASINs from discoveryInput.json`);
    console.log(`🔗 All links use tracking ID: ${trackingId}`);
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

autoUpdateProducts();
