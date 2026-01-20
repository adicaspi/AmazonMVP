// ai/runCreativeGenerator.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";
import { generateCreativeAngles, type CreativeAngles } from "./creativeAngleAgent";
import { supabase, isDatabaseAvailable } from "../lib/db";

type Product = {
  id: string;
  slug: string;
  name: string;
  angle?: string;
  content: {
    painBullets: string[];
    whoItsFor: string[];
  };
};

const CREATIVES_FILE = path.join(process.cwd(), "data", "creatives.json");

async function readCreatives(): Promise<CreativeAngles[]> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase.from("creatives").select("*");
      if (!error && data) {
        return data.map((row) => ({
          productId: row.product_id,
          productName: row.product_name,
          angles: row.angles || [],
          generatedAt: row.generated_at,
        }));
      }
    } catch (error) {
      console.warn("Failed to read creatives from database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  try {
    const content = await fs.readFile(CREATIVES_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeCreatives(creatives: CreativeAngles[]): Promise<void> {
  // Try database first
  if (supabase && (await isDatabaseAvailable()) && creatives.length > 0) {
    try {
      const dbRows = creatives.map((c) => ({
        product_id: c.productId,
        product_name: c.productName,
        angles: c.angles,
        generated_at: c.generatedAt,
      }));

      // Use upsert to handle existing records
      const { error } = await supabase.from("creatives").upsert(dbRows, {
        onConflict: "product_id",
      });

      if (!error) {
        return; // Successfully written to database
      }
    } catch (error) {
      console.warn("Failed to write creatives to database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  await fs.writeFile(CREATIVES_FILE, JSON.stringify(creatives, null, 2), "utf8");
}

async function readProducts(): Promise<Product[]> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, slug, name, angle, pain_bullets, who_its_for");

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          slug: row.slug,
          name: row.name,
          angle: row.angle || undefined,
          content: {
            painBullets: row.pain_bullets || [],
            whoItsFor: row.who_its_for || [],
          },
        }));
      }
    } catch (error) {
      console.warn("Failed to read products from database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  try {
    const productsFile = path.join(process.cwd(), "data", "products.json");
    const content = await fs.readFile(productsFile, "utf8");
    const products = JSON.parse(content);
    return products.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      angle: p.angle,
      content: {
        painBullets: p.content?.painBullets || [],
        whoItsFor: p.content?.whoItsFor || [],
      },
    }));
  } catch {
    return [];
  }
}

async function main() {
  const products = await readProducts();

  if (products.length === 0) {
    console.log("No products found. Run `npm run ai:pipeline` first.");
    return;
  }

  const existingCreatives = await readCreatives();
  const existingProductIds = new Set(existingCreatives.map((c) => c.productId));

  console.log(`\n=== Creative Angle Generator ===\n`);
  console.log(`Found ${products.length} products`);
  console.log(`${existingProductIds.size} already have creatives\n`);

  const newCreatives: CreativeAngles[] = [];

  for (const product of products) {
    // Skip if already generated
    if (existingProductIds.has(product.id)) {
      console.log(`⏭️  Skipping ${product.name} (already has creatives)`);
      continue;
    }

    console.log(`\n🎨 Generating creatives for: ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Angle: ${product.angle || "none"}`);

    try {
      // Extract problem and target user from product content
      const keyProblem = product.content.painBullets[0] || "common problem";
      const targetUser = product.content.whoItsFor[0] || "general audience";

      const angles = await generateCreativeAngles(
        product.name,
        keyProblem,
        targetUser,
        product.angle
      );

      const creative: CreativeAngles = {
        productId: product.id,
        productName: product.name,
        angles,
        generatedAt: new Date().toISOString(),
      };

      newCreatives.push(creative);
      console.log(`   ✅ Generated ${angles.length} ad angles`);
    } catch (error) {
      console.error(`   ❌ Error: ${error}`);
      continue;
    }
  }

  if (newCreatives.length > 0) {
    // Merge with existing
    const allCreatives = [...existingCreatives, ...newCreatives];
    await writeCreatives(allCreatives);
    console.log(`\n✅ Saved ${newCreatives.length} new creative sets to data/creatives.json`);
    console.log(`   Total: ${allCreatives.length} products with creatives`);
  } else {
    console.log(`\n✅ All products already have creatives.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
