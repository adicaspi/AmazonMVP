import type { Metadata } from "next";
import { UggPage } from "./UggPage";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "The UGG Slippers We Keep Coming Back To | AiPicks",
  description:
    "UGG's Scuffette II combines the plush sheepskin comfort the brand is known for with an easy slip-on design made for everyday wear. Our editorial take.",
  openGraph: {
    title: "The UGG Slippers We Keep Coming Back To",
    description:
      "UGG's Scuffette II: plush sheepskin comfort, easy slip-on design, that classic chestnut look. An AiPicks recommendation.",
    images: [
      {
        url: "https://www.aipicks.co/images/ugg/hero-studio.jpg",
        width: 1122,
        height: 1402,
        alt: "UGG Scuffette II Slippers in chestnut",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "The UGG Slippers We Keep Coming Back To",
    description: "Plush sheepskin comfort, easy slip-on design — an AiPicks recommendation.",
    images: ["https://www.aipicks.co/images/ugg/hero-studio.jpg"],
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

export default async function UggScuffettePage() {
  let product = null;
  try {
    product = await getCachedProduct();
  } catch (err) {
    console.error("Amazon Creators API fetch failed:", err);
  }
  return <UggPage trackingPage="/UggScuffette" product={product} />;
}
