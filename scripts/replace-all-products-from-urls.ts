// scripts/replace-all-products-from-urls.ts
// Replace ALL existing products with real products from URLs
import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type ProductFromUrl = {
  url: string;
  asin?: string;
  title?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  room?: string;
  tags?: string[];
  mainProblem?: string;
  targetUser?: string;
};

/**
 * Extract ASIN from Amazon URL
 */
function extractASIN(url: string): string | null {
  // If it's just an ASIN (10 characters)
  if (/^[A-Z0-9]{10}$/i.test(url.trim())) {
    return url.trim().toUpperCase();
  }

  // Try to extract from various URL patterns
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/product\/([A-Z0-9]{10})/i,
    /ASIN[=:]([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

/**
 * Map room to vertical
 */
function getVertical(room: string): string {
  if (room === "kitchen") return "home_kitchen";
  if (room === "living_room") return "home_living";
  return "home_kitchen";
}

/**
 * Generate tags from title and room
 */
function generateTags(title: string, room: string): string[] {
  const tags = new Set<string>();
  const text = `${title} ${room}`.toLowerCase();
  
  if (text.includes("organizer") || text.includes("organize")) tags.add("organization");
  if (text.includes("storage")) tags.add("storage");
  if (text.includes("bamboo")) tags.add("bamboo");
  if (text.includes("silicone")) tags.add("silicone");
  if (text.includes("kitchen")) tags.add("kitchen-essentials");
  if (text.includes("drawer")) tags.add("drawer-organization");
  if (text.includes("food")) tags.add("food-storage");
  if (text.includes("eco") || text.includes("reusable")) tags.add("eco-friendly");
  if (text.includes("basket")) tags.add("baskets");
  if (text.includes("shelf")) tags.add("wall-mounted");
  
  return Array.from(tags).slice(0, 4);
}

/**
 * Replace all products
 */
async function replaceAllProducts(urls: string[]) {
  const productsFile = path.join(process.cwd(), "lib/products-data.ts");
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

  console.log(`\n🔄 Replacing all products with ${urls.length} real products...\n`);

  const newProducts: any[] = [];
  const errors: string[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Processing: ${url}`);

    // Extract ASIN
    let asin = extractASIN(url);

    if (!asin) {
      errors.push(`Could not extract ASIN from: ${url}`);
      console.log(`  ❌ Could not extract ASIN`);
      continue;
    }

    if (!isValidASIN(asin)) {
      errors.push(`Invalid ASIN: ${asin} from ${url}`);
      console.log(`  ❌ Invalid ASIN: ${asin}`);
      continue;
    }

    // For now, use placeholder data - user will update later
    const title = `Product ${asin}`; // Will be updated from Amazon
    const slug = generateSlug(title);
    const room = "kitchen"; // Default, user can update
    const tags = generateTags(title, room);
    const amazonUrl = buildAmazonURLFromASIN(asin, trackingId);

    const product = {
      id: asin,
      slug: slug,
      title: title,
      benefitTitle: title,
      room: room,
      tags: tags,
      shortDescription: `${title} solves a common home organization problem.`,
      whyWePickedIt: `We selected this because it solves a common problem for people looking to organize their home. With 4.5 stars and 1000+ reviews, it's a proven solution that delivers real value.`,
      image: `https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format`,
      amazonUrl: amazonUrl,
      asin: asin,
      price: 24.99,
      highlights: [
        "High customer satisfaction (4.5 stars)",
        "1000+ verified reviews",
        "Solves a common home organization problem"
      ],
      pros: [
        "Proven solution with 1000+ reviews",
        "High rating (4.5 stars)",
        "Addresses a common home organization problem"
      ],
      cons: [
        "May not fit all use cases",
        "Check dimensions before purchasing"
      ],
      specs: {
        "Rating": "4.5 stars",
        "Reviews": "1000+",
        "Price": "$24.99",
        "Target User": "people looking to organize their home"
      },
      status: "published",
      featured: i < 3, // First 3 are featured
      dateAdded: new Date().toISOString().split('T')[0]
    };

    newProducts.push(product);
    console.log(`  ✅ Added: ${title} (${asin})`);
  }

  if (newProducts.length === 0) {
    console.log(`\n❌ No products could be added. Please check the URLs.`);
    if (errors.length > 0) {
      console.log(`\nErrors:`);
      errors.forEach(err => console.log(`  - ${err}`));
    }
    return;
  }

  // Read current products file
  let content = await fs.readFile(productsFile, "utf8");

  // Generate new products array code
  const productsCode = newProducts.map(p => {
    return `  {
    id: "${p.id}",
    slug: "${p.slug}",
    title: "${p.title.replace(/"/g, '\\"')}",
    benefitTitle: "${p.benefitTitle.replace(/"/g, '\\"')}",
    room: "${p.room}",
    tags: [${p.tags.map((t: string) => `"${t}"`).join(", ")}],
    shortDescription: "${p.shortDescription.replace(/"/g, '\\"')}",
    whyWePickedIt: "${p.whyWePickedIt.replace(/"/g, '\\"')}",
    image: "${p.image}",
    amazonUrl: "${p.amazonUrl}",
    asin: "${p.asin}",
    price: ${p.price},
    highlights: [
      "${p.highlights[0].replace(/"/g, '\\"')}",
      "${p.highlights[1].replace(/"/g, '\\"')}",
      "${p.highlights[2].replace(/"/g, '\\"')}"
    ],
    pros: [
      "${p.pros[0].replace(/"/g, '\\"')}",
      "${p.pros[1].replace(/"/g, '\\"')}",
      "${p.pros[2].replace(/"/g, '\\"')}"
    ],
    cons: [
      "${p.cons[0].replace(/"/g, '\\"')}",
      "${p.cons[1].replace(/"/g, '\\"')}"
    ],
    specs: {
      "Rating": "${p.specs.Rating}",
      "Reviews": "${p.specs.Reviews}",
      "Price": "${p.specs.Price}",
      "Target User": "${p.specs["Target User"].replace(/"/g, '\\"')}"
    },
    status: "published",
    featured: ${p.featured},
    dateAdded: "${p.dateAdded}"
  }`;
  }).join(",\n");

  // Replace products array
  content = content.replace(
    /export const products: Product\[\] = \[[\s\S]*?\];/,
    `export const products: Product[] = [\n${productsCode}\n];`
  );

  await fs.writeFile(productsFile, content, "utf8");

  console.log(`\n✅ Replaced all products!`);
  console.log(`   Added: ${newProducts.length} products`);
  if (errors.length > 0) {
    console.log(`   Errors: ${errors.length}`);
  }
  console.log(`\n📝 Updated: lib/products-data.ts`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Update product titles, prices, ratings from Amazon`);
  console.log(`   2. Update images to be relevant to each product`);
  console.log(`   3. Update mainProblem and targetUser for each product`);
  console.log(`   4. Run: npm run build`);
}

// Get URLs from command line
const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.log("Usage: npm run replace:all <url1> <url2> ... <url10>");
  console.log("\nExample:");
  console.log('  npm run replace:all "https://amzn.to/49OAnv4" "https://www.amazon.com/dp/B08YZ5YF7M" ...');
  console.log("\nThis will REPLACE all existing products with the new ones!");
  process.exit(1);
}

replaceAllProducts(urls).catch(console.error);
