import type { Metadata } from "next";
import { NBPage } from "./NBPage";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "New Balance 928v3 — Walk All Day, Feel It Nowhere",
  description:
    "The walking shoe serious walkers swear by: ROLLBAR stability, genuine leather, and four widths from narrow to extra-wide. Free Prime shipping and returns.",
  openGraph: {
    title: "New Balance 928v3 — Walk All Day, Feel It Nowhere",
    description:
      "ROLLBAR stability, genuine leather, four widths. The walking shoe built for your miles.",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/31FScmxvWAL._SL1000_.jpg",
        width: 1000,
        height: 1000,
        alt: "New Balance Women's 928v3 Walking Shoe",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Balance 928v3 — Walk All Day, Feel It Nowhere",
    description: "ROLLBAR stability, genuine leather, four widths on Amazon.",
    images: ["https://m.media-amazon.com/images/I/31FScmxvWAL._SL1000_.jpg"],
  },
};

const ASIN = "B01N553EY1";

// Live listing data (price, official images) from the Creators API — the
// reviews resource isn't returned by Amazon, so rating comes from verified
// constants in NBPage once confirmed on the listing.
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

export default async function NewBalance928Page() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <NBPage trackingPage="/NewBalance928" product={product} />;
}
