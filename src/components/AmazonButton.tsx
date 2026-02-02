"use client";

import { ReactNode } from "react";

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: object) => void;
  }
}

interface AmazonButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  productName?: string;
}

export function AmazonButton({ href, children, className, productName }: AmazonButtonProps) {
  const handleClick = () => {
    // Track the click as a Lead event in Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: productName || "Amazon Product",
        content_category: "Affiliate Link Click",
      });
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
