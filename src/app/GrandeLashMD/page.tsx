import type { Metadata } from "next";
import { GLPage } from "./GLPage";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "GrandeLASH-MD — The Lash Look Mascara Can't Give You",
  description:
    "Amazon's #1 Best Seller in Eyelash Primers: 4.2★ from 59,000+ customers. Peptide & vitamin serum for longer, thicker, fuller-looking lashes — one swipe a night.",
  openGraph: {
    title: "GrandeLASH-MD — The Lash Look Mascara Can't Give You",
    description:
      "Amazon's #1 Best Seller. One swipe a night for longer, thicker, fuller-looking lashes.",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/41Rx7r18xFL._SL1000_.jpg",
        width: 1000,
        height: 1000,
        alt: "GrandeLASH-MD Lash Enhancing Serum",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrandeLASH-MD — The Lash Look Mascara Can't Give You",
    description: "Amazon's #1 Best Seller in Eyelash Primers. 4.2★ from 59,000+ customers.",
    images: ["https://m.media-amazon.com/images/I/41Rx7r18xFL._SL1000_.jpg"],
  },
};

const ASIN = "B00325D0WK";

const getCachedProduct = unstable_cache(
  // Throws on API failure so unstable_cache does NOT store the miss
  async (): Promise<AmazonProductData | null> => {
    const products = await getProductsByASIN([ASIN]);
    return products.length > 0 ? products[0] : null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

export default async function GrandeLashPage() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <GLPage trackingPage="/GrandeLashMD" product={product} />;
}
