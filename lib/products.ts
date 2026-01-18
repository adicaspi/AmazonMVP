// lib/products.ts
import productsData from "@/data/products.json";

export type Product = {
  id: string;
  slug: string;
  vertical: string;
  name: string;
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

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOfferById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
