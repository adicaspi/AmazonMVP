import type { Metadata } from "next";
import { CozyPage } from "./CozyPage";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "UGG Scuffette II — The Cozy Upgrade Your Feet Deserve",
  description:
    "4.7★ from 23,000+ Amazon customers. The plush wool slipper women keep coming back for — warm from the first step, with free Prime shipping and returns.",
  openGraph: {
    title: "UGG Scuffette II — The Cozy Upgrade Your Feet Deserve",
    description:
      "The plush wool slipper women keep coming back for. 4.7★ on Amazon.",
    images: [
      {
        url: "https://www.aipicks.co/images/ugg/hero.jpg",
        width: 800,
        height: 1200,
        alt: "UGG Scuffette II Slippers",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "UGG Scuffette II — The Cozy Upgrade Your Feet Deserve",
    description: "The plush wool slipper women keep coming back for. 4.7★ on Amazon.",
    images: ["https://www.aipicks.co/images/ugg/hero.jpg"],
  },
};

const ASIN = "B082HHR652";

// Same cache key as /UggScuffette — both pages share one hourly API fetch
const getCachedProduct = unstable_cache(
  async (): Promise<AmazonProductData | null> => {
    try {
      const products = await getProductsByASIN([ASIN]);
      if (products.length > 0) return products[0];
    } catch (err) {
      console.error("Failed to fetch UGG data from Amazon Creators API:", err);
    }
    return null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

export default async function UggCozyPage() {
  const product = await getCachedProduct();
  return <CozyPage trackingPage="/UggCozy" product={product} />;
}
