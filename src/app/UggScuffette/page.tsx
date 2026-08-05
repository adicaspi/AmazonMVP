import type { Metadata } from "next";
import { UggPage } from "./UggPage";
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

export default async function UggScuffettePage() {
  const product = await getCachedProduct();
  return <UggPage trackingPage="/UggScuffette" product={product} />;
}
