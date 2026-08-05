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
  async (): Promise<AmazonProductData | null> => {
    try {
      const products = await getProductsByASIN([ASIN]);
      if (products.length > 0) return products[0];
    } catch (err) {
      console.error("Failed to fetch New Balance data from Amazon Creators API:", err);
    }
    return null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

export default async function NewBalance928Page() {
  const product = await getCachedProduct();
  return <NBPage trackingPage="/NewBalance928" product={product} />;
}
