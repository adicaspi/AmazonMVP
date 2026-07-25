import type { Metadata } from "next";
import { BirkPage } from "../BirkenstockArizona/BirkPage";

export const metadata: Metadata = {
  title: "Birkenstock Arizona Soft Footbed | The Original Two-Strap Sandal",
  description:
    "The iconic Birkenstock Arizona with the legendary contoured cork footbed that molds to your feet. Comfort that lasts for years — with free Prime shipping and returns.",
  openGraph: {
    title: "Birkenstock Arizona — The Original Since 1774",
    description:
      "The contoured cork footbed molds to your feet over time. One sandal, years of comfort.",
    images: [
      {
        url: "https://www.aipicks.co/images/birkenstock/hero-airport.jpg",
        width: 800,
        height: 1200,
        alt: "Birkenstock Arizona Soft Footbed Sandals",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birkenstock Arizona — The Original Since 1774",
    description: "The contoured cork footbed molds to your feet over time.",
    images: ["https://www.aipicks.co/images/birkenstock/hero-airport.jpg"],
  },
};

export default function BirkenstockInstagramPage() {
  return <BirkPage trackingPage="/BirkenstockInstagram" amazonLink="https://www.amazon.com/Birkenstock-Womens-Arizona-Birko-Flo-Sandals/dp/B002LZUNJU?th=1&linkCode=sl2&tag=birkenstock-ig-20&linkId=ad726d5034e345f9ab6f77516c7d3185&language=en_US&ref_=as_li_ss_tl" />;
}
