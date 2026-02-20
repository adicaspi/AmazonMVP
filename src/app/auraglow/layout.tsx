"use client";

import { useEffect } from "react";

export default function AuraGlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const mainHeader = document.querySelector("body > header");
    const mainElement = document.querySelector("body > main");

    if (mainHeader) (mainHeader as HTMLElement).style.display = "none";
    if (mainElement) (mainElement as HTMLElement).style.background = "transparent";

    return () => {
      if (mainHeader) (mainHeader as HTMLElement).style.display = "";
      if (mainElement) (mainElement as HTMLElement).style.background = "";
    };
  }, []);

  return <>{children}</>;
}
