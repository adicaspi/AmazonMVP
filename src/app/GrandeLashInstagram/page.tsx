import type { Metadata } from "next";
import { GLPage } from "../GrandeLashMD/GLPage";
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
        url: "https://m.media-amazon.com/images/I/71FFdWG73aL._SL1500_.jpg",
        width: 1500,
        height: 1500,
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
    images: ["https://m.media-amazon.com/images/I/71FFdWG73aL._SL1500_.jpg"],
  },
};

const ASIN = "B07QNQJ5FK";

// Same cache key as /GrandeLashMD — both routes share one hourly API fetch
const getCachedProduct = unstable_cache(
  // Throws on API failure so unstable_cache does NOT store the miss
  async (): Promise<AmazonProductData | null> => {
    const products = await getProductsByASIN([ASIN]);
    return products.length > 0 ? products[0] : null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

// Instagram channel clone — identical page via the shared GLPage, its own
// tracking name for per-channel attribution.
// [USER ASSET] When an IG-specific SiteStripe link (separate Associates
// tracking ID) is provided, pass it as amazonLink here.
export default async function GrandeLashInstagramPage() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <GLPage trackingPage="/GrandeLashInstagram" product={product} />;
}
