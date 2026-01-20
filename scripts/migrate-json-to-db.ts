// scripts/migrate-json-to-db.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";
import { supabase, isDatabaseAvailable } from "../lib/db";

async function migrateProducts() {
  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    return;
  }

  try {
    const productsFile = path.join(process.cwd(), "data", "products.json");
    const content = await fs.readFile(productsFile, "utf8");
    const products = JSON.parse(content);

    console.log(`\n📦 Migrating ${products.length} products to database...`);

    const dbRows = products.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      vertical: p.vertical,
      name: p.name,
      angle: p.angle || null,
      short_description: p.shortDescription,
      hero_image: p.heroImage || null,
      price_note: p.priceNote || null,
      amazon_url: p.amazon.url,
      amazon_tracking_id: p.amazon.trackingId,
      headline: p.content.headline,
      subheadline: p.content.subheadline,
      pain_bullets: p.content.painBullets,
      how_it_works: p.content.howItWorks,
      who_its_for: p.content.whoItsFor,
      who_its_not_for: p.content.whoItsNotFor,
      cta_text: p.content.ctaText,
      faq: p.content.faq,
      affiliate_disclosure: p.disclosures.affiliate,
      status: p.status,
    }));

    // Use upsert to handle existing records
    const { error } = await supabase.from("products").upsert(dbRows, {
      onConflict: "id",
    });

    if (error) throw error;

    console.log(`✅ Migrated ${products.length} products to database.`);
  } catch (error) {
    console.error("❌ Error migrating products:", error);
    throw error;
  }
}

async function migrateEvents() {
  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    return;
  }

  try {
    const eventsFile = path.join(process.cwd(), "data", "events.json");
    const content = await fs.readFile(eventsFile, "utf8");
    const events = JSON.parse(content);

    console.log(`\n📊 Migrating ${events.length} events to database...`);

    const dbRows = events.map((e: any) => ({
      id: e.id,
      timestamp: e.timestamp,
      type: e.type,
      product_id: e.productId || null,
      slug: e.slug || null,
      offer_id: e.offerId || null,
      utm_source: e.utm_source || null,
      utm_medium: e.utm_medium || null,
      utm_campaign: e.utm_campaign || null,
      utm_content: e.utm_content || null,
      user_agent: e.userAgent || null,
      ip: e.ip || null,
      referer: e.referer || null,
    }));

    // Use upsert to handle existing records
    const { error } = await supabase.from("events").upsert(dbRows, {
      onConflict: "id",
    });

    if (error) throw error;

    console.log(`✅ Migrated ${events.length} events to database.`);
  } catch (error) {
    console.error("❌ Error migrating events:", error);
    throw error;
  }
}

async function migrateCreatives() {
  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    return;
  }

  try {
    const creativesFile = path.join(process.cwd(), "data", "creatives.json");
    const content = await fs.readFile(creativesFile, "utf8");
    const creatives = JSON.parse(content);

    if (creatives.length === 0) {
      console.log(`\n📝 No creatives to migrate.`);
      return;
    }

    console.log(`\n🎨 Migrating ${creatives.length} creatives to database...`);

    const dbRows = creatives.map((c: any) => ({
      product_id: c.productId,
      product_name: c.productName,
      angles: c.angles,
      generated_at: c.generatedAt,
    }));

    // Use upsert to handle existing records
    const { error } = await supabase.from("creatives").upsert(dbRows, {
      onConflict: "product_id",
    });

    if (error) throw error;

    console.log(`✅ Migrated ${creatives.length} creatives to database.`);
  } catch (error) {
    console.error("❌ Error migrating creatives:", error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting migration from JSON to database...\n");

  await migrateProducts();
  await migrateEvents();
  await migrateCreatives();

  console.log("\n✅ Migration completed!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
