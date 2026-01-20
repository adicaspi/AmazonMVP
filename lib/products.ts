// lib/products.ts
import { supabase, isDatabaseAvailable } from "./db";
import productsData from "@/data/products.json";

export type Product = {
  id: string;
  slug: string;
  vertical: string;
  name: string;
  angle?: string;
  shortDescription: string;
  heroImage?: string;
  priceNote?: string;
  amazon: {
    url: string;
    trackingId: string;
  };
  content: {
    headline: string;
    subheadline: string;
    painBullets: string[];
    howItWorks: string[];
    whoItsFor: string[];
    whoItsNotFor: string[];
    ctaText: string;
    faq: { q: string; a: string }[];
  };
  disclosures: {
    affiliate: string;
  };
  status: "testing" | "winner" | "killed";
};

// Fallback to JSON if database not available
const productsFromJson = productsData as Product[];

// Transform database row to Product type
function transformDbRow(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    vertical: row.vertical,
    name: row.name,
    angle: row.angle || undefined,
    shortDescription: row.short_description,
    heroImage: row.hero_image || undefined,
    priceNote: row.price_note || undefined,
    amazon: {
      url: row.amazon_url,
      trackingId: row.amazon_tracking_id,
    },
    content: {
      headline: row.headline,
      subheadline: row.subheadline,
      painBullets: row.pain_bullets || [],
      howItWorks: row.how_it_works || [],
      whoItsFor: row.who_its_for || [],
      whoItsNotFor: row.who_its_not_for || [],
      ctaText: row.cta_text,
      faq: row.faq || [],
    },
    disclosures: {
      affiliate: row.affiliate_disclosure,
    },
    status: row.status,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map(transformDbRow);
      }
    } catch (error) {
      console.warn("Failed to fetch products from database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  return productsFromJson;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return transformDbRow(data);
      }
    } catch (error) {
      console.warn("Failed to fetch product from database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  return productsFromJson.find((p) => p.slug === slug);
}

export async function getOfferById(id: string): Promise<Product | undefined> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return transformDbRow(data);
      }
    } catch (error) {
      console.warn("Failed to fetch product from database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  return productsFromJson.find((p) => p.id === id);
}
