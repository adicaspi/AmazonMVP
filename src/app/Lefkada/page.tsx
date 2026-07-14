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
};

export default function Page() {
  return <LefkadaPage />;
}
