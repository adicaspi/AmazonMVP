import type { Metadata } from "next";
import { UggClassicPage } from "./UggClassicPage";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "UGG Scuffette II Slipper | The Cozy Classic",
  description:
    "The iconic UGG Scuffette II — genuine suede with a plush wool lining that keeps feet warm without overheating. With free Prime shipping and returns.",
  openGraph: {
    title: "UGG Scuffette II — The Slippers You'll Live In",
    description:
      "Genuine suede, plush wool lining, and a real outsole for indoors and out.",
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
    title: "UGG Scuffette II — The Slippers You'll Live In",
    description: "Genuine suede, plush wool lining, cozy from the first slip-in.",
    images: ["https://m.media-amazon.com/images/I/31KstO2FSiL._SL1000_.jpg"],
  },
};

const ASIN = "B082HHR652";

// Live listing data (rating, review count, price, official image) from the
// Amazon Creators API — cached 1 hour, same pattern as /auraglow
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

export default async function UggClassicRoute() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <UggClassicPage trackingPage="/UggClassic" product={product} />;
}
