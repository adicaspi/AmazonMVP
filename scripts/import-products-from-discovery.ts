// scripts/import-products-from-discovery.ts
// Automatically imports products from discoveryInput.json and updates products-data.ts
import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN } from "../lib/amazon-links";

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

function mapVerticalToRoom(vertical: string): Room {
  const mapping: Record<string, Room> = {
    home_kitchen: "kitchen",
    home_living: "living_room",
    home_bedroom: "bedroom",
    home_bathroom: "bathroom",
    home_office: "office",
    home_storage: "storage",
    home_lighting: "lighting",
  };
  return mapping[vertical] || "kitchen";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateTags(vertical: string, title: string): string[] {
  const tags: string[] = [];
  const titleLower = title.toLowerCase();
  
  // Extract keywords from title
  if (titleLower.includes("organizer")) tags.push("organization");
  if (titleLower.includes("storage")) tags.push("storage");
  if (titleLower.includes("bamboo")) tags.push("bamboo");
  if (titleLower.includes("silicone")) tags.push("silicone");
  if (titleLower.includes("kitchen")) tags.push("kitchen-essentials");
  if (titleLower.includes("drawer")) tags.push("drawer-organization");
  if (titleLower.includes("food")) tags.push("food-storage");
  if (titleLower.includes("eco")) tags.push("eco-friendly");
  if (titleLower.includes("lamp") || titleLower.includes("light")) tags.push("lighting");
  if (titleLower.includes("pillow")) tags.push("decorative");
  if (titleLower.includes("shelf")) tags.push("wall-mounted");
  if (titleLower.includes("basket")) tags.push("baskets");
  
  return tags.length > 0 ? tags : ["home-accessories"];
}

async function importProducts() {
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  const productsFile = path.join(process.cwd(), "lib/products-data.ts");
  
  try {
    // Read discovery input
    const discoveryContent = await fs.readFile(discoveryFile, "utf8");
    const discoveryProducts: DiscoveryInput[] = JSON.parse(discoveryContent);
    
    console.log(`📦 Found ${discoveryProducts.length} products in discoveryInput.json`);
    
    // Read current products file
    const productsContent = await fs.readFile(productsFile, "utf8");
    
    // Extract existing products array
    const productsMatch = productsContent.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
    if (!productsMatch) {
      throw new Error("Could not find products array in products-data.ts");
    }
    
    const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";
    const newProducts: string[] = [];
    
    for (const discovery of discoveryProducts) {
      const slug = generateSlug(discovery.title);
      const room = mapVerticalToRoom(discovery.vertical);
      const tags = generateTags(discovery.vertical, discovery.title);
      const amazonUrl = buildAmazonURLFromASIN(discovery.asin, trackingId);
      
      // Generate product object
      const productCode = `  {
    id: "${discovery.asin}",
    slug: "${slug}",
    title: "${discovery.title}",
    benefitTitle: "${discovery.title}",
    room: "${room}",
    tags: [${tags.map(t => `"${t}"`).join(", ")}],
    shortDescription: "${discovery.mainProblem}. ${discovery.title}.",
    whyWePickedIt: "We selected this product because it solves ${discovery.mainProblem.toLowerCase()} for ${discovery.targetUser.toLowerCase()}. With ${discovery.rating} stars and ${discovery.reviews.toLocaleString()} reviews, it's a proven solution.",
    image: productImages["${slug}"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
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
      
      newProducts.push(productCode);
      console.log(`✅ Prepared: ${discovery.title} (${discovery.asin})`);
    }
    
    // Replace or append products
    const newProductsArray = `export const products: Product[] = [
${newProducts.join(",\n")}
];`;
    
    // Replace the products array
    const updatedContent = productsContent.replace(
      /export const products: Product\[\] = \[[\s\S]*?\];/,
      newProductsArray
    );
    
    await fs.writeFile(productsFile, updatedContent, "utf8");
    console.log(`\n✅ Successfully imported ${discoveryProducts.length} products!`);
    console.log(`📝 Updated: lib/products-data.ts`);
    console.log(`\n⚠️  Note: You may need to update product images manually for better relevance.`);
    
  } catch (error) {
    console.error("❌ Error importing products:", error);
    process.exit(1);
  }
}

importProducts();
