"use client";

import { useEffect } from "react";

export default function GrandeLashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hide main site header on landing page for cleaner experience
  useEffect(() => {
    const mainHeader = document.querySelector("body > header");
    const mainElement = document.querySelector("body > main");

    if (mainHeader) (mainHeader as HTMLElement).style.display = "none";
    if (mainElement) (mainElement as HTMLElement).style.background = "transparent";

    return () => {
      // Restore on unmount
      if (mainHeader) (mainHeader as HTMLElement).style.display = "";
      if (mainElement) (mainElement as HTMLElement).style.background = "";
    };
  }, []);

  return <>{children}</>;
}
