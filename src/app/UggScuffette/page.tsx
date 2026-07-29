import type { Metadata } from "next";
import { UggPage } from "./UggPage";

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
        url: "https://www.aipicks.co/images/ugg/hero.jpg",
        width: 800,
        height: 1200,
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
    images: ["https://www.aipicks.co/images/ugg/hero.jpg"],
  },
};

export default function UggScuffettePage() {
  return <UggPage trackingPage="/UggScuffette" />;
}
