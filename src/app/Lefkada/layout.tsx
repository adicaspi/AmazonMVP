"use client";

import { useEffect } from "react";

export default function LefkadaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Private trip page: hide the store chrome (header, affiliate disclosure,
  // footer) that the root layout renders around every page.
  useEffect(() => {
    const hidden: HTMLElement[] = [];
    Array.from(document.body.children).forEach((child) => {
      const el = child as HTMLElement;
      if (el.tagName !== "MAIN" && el.tagName !== "SCRIPT" && el.style.display !== "none") {
        el.style.display = "none";
        hidden.push(el);
      }
    });

    return () => {
      hidden.forEach((el) => {
        el.style.display = "";
      });
    };
  }, []);

  return <>{children}</>;
}
