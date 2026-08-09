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

// Same cache key as /GrandeLashMD — all GrandeLash routes share one hourly fetch
const getCachedProduct = unstable_cache(
  // Throws on API failure so unstable_cache does NOT store the miss
  async (): Promise<AmazonProductData | null> => {
    const products = await getProductsByASIN([ASIN]);
    return products.length > 0 ? products[0] : null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

// Broad-audience (no age cap) FB campaign clone — identical page via the
// shared GLPage, its own tracking name + its own Associates tracking ID
// (grand-lash-65-fb-20) for per-campaign attribution on both sides.
const BROAD_AMAZON_LINK = "https://www.amazon.com/dp/B07QNQJ5FK?th=1&linkCode=ll2&tag=grand-lash-65-fb-20&linkId=9be297cce9cb86f05d635fdd810e118f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";

export default async function GrandeLash65Page() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <GLPage trackingPage="/GrandeLash65" amazonLink={BROAD_AMAZON_LINK} product={product} />;
}
