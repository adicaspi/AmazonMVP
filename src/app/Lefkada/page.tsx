import type { Metadata } from "next";
import { LefkadaPage } from "./LefkadaPage";

export const metadata: Metadata = {
  title: "לפקדה 2027 — תכנון ההפלגה",
  description:
    "תכנון מלא להפלגת החברים בלפקדה, יוני 2027: מסלול יום־יום באיים היוניים, סירה, לוגיסטיקה, וילה בפורטו ראפטי ותקציב.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "לפקדה 2027 — שבוע ההפלגה של החבר׳ה",
    description:
      "19–26 ביוני 2027 · תשעה חברים · Bali 4.6 · חמישה ימי שיט באיים היוניים + וילה בפורטו ראפטי.",
    type: "website",
    images: [
      {
        url: "https://www.aipicks.co/images/lefkada-og.png",
        width: 1200,
        height: 630,
        alt: "לפקדה 2027 — שבוע ההפלגה של החבר׳ה",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "לפקדה 2027 — שבוע ההפלגה של החבר׳ה",
    description: "חמישה ימי שיט באיים היוניים + וילה בפורטו ראפטי.",
    images: ["https://www.aipicks.co/images/lefkada-og.png"],
  },
};

export default function Page() {
  return <LefkadaPage />;
}
