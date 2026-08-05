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
        url: "https://m.media-amazon.com/images/I/31KstO2FSiL._SL1000_.jpg",
        width: 1000,
        height: 1000,
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
    images: ["https://m.media-amazon.com/images/I/31KstO2FSiL._SL1000_.jpg"],
  },
};

const ASIN = "B082HHR652";

// Same cache key as /UggScuffette — both pages share one hourly API fetch
const getCachedProduct = unstable_cache(
  // Throws on API failure so unstable_cache does NOT store the miss —
  // a cached null used to blank the page images for a full hour.
  async (): Promise<AmazonProductData | null> => {
    const products = await getProductsByASIN([ASIN]);
    return products.length > 0 ? products[0] : null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

export default async function UggCozyPage() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <CozyPage trackingPage="/UggCozy" product={product} />;
}
