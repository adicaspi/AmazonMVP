"use client";

import { useEffect } from "react";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hide main site header/footer on analytics page
  useEffect(() => {
    // Hide header, footer, and affiliate disclosure
    const mainHeader = document.querySelector("body > header");
    const mainFooter = document.querySelector("body > footer");
    const mainElement = document.querySelector("body > main");
    const affiliateDisclosure = document.querySelector('[class*="affiliate"]');

    if (mainHeader) (mainHeader as HTMLElement).style.display = "none";
    if (mainFooter) (mainFooter as HTMLElement).style.display = "none";
    if (affiliateDisclosure) (affiliateDisclosure as HTMLElement).style.display = "none";
    if (mainElement) (mainElement as HTMLElement).style.background = "transparent";

    return () => {
      // Restore on unmount
      if (mainHeader) (mainHeader as HTMLElement).style.display = "";
      if (mainFooter) (mainFooter as HTMLElement).style.display = "";
      if (affiliateDisclosure) (affiliateDisclosure as HTMLElement).style.display = "";
      if (mainElement) (mainElement as HTMLElement).style.background = "";
    };
  }, []);

  return <>{children}</>;
}
