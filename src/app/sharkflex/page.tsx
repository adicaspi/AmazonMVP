import type { Metadata } from "next";
import { SharkPage } from "../shark-flexstyle/SharkPage";

export const metadata: Metadata = {
  title: "Shark FlexStyle™ Air Styling & Drying System | Salon Blowout at Home",
  description:
    "Dry, curl, smooth & volumize with one tool. The Shark FlexStyle 5-in-1 Air Styling & Drying System (HD430) gives you a salon blowout at home with less heat damage. Thousands of 5-star reviews, free Prime shipping.",
  openGraph: {
    title: "Shark FlexStyle™ — A Salon Blowout at Home in Half the Time",
    description:
      "One tool. Endless styles. Dry. Curl. Smooth. Volumize. The Shark FlexStyle replaces your dryer, curler & straightener — with less heat damage.",
    images: [
      {
        url: "/images/shark-flexstyle/salon-blowout.jpg",
        width: 1200,
        height: 1200,
        alt: "Shark FlexStyle Salon Blowout at Home",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shark FlexStyle™ — A Salon Blowout at Home",
    description:
      "Dry. Curl. Smooth. Volumize. One tool, endless styles, less heat damage.",
    images: ["/images/shark-flexstyle/salon-blowout.jpg"],
  },
};

export default async function SharkFlexSalesPage() {
  return <SharkPage trackingPage="/sharkflex" />;
}
