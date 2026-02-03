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
  position?: string; // e.g., "hero", "comparison", "sticky-footer"
}

export function AmazonButton({ href, children, className, productName, position }: AmazonButtonProps) {
  const handleClick = () => {
    const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

    // Track the click as a Lead event in Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: productName || "Amazon Product",
        content_category: "Affiliate Link Click",
        content_ids: [position || "unknown"], // Which button was clicked
        value: position ? 1 : 0,
        currency: "USD",
      });

      // Also fire a custom event with more details
      window.fbq("trackCustom", "AmazonClick", {
        product: productName || "Amazon Product",
        button_position: position || "unknown",
        page_url: pagePath,
      });
    }

    // Also track on our server for the analytics dashboard
    fetch("/api/amazon-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: productName || "Amazon Product",
        buttonPosition: position || "unknown",
        page: pagePath,
      }),
    }).catch(() => {
      // Silently fail - don't block navigation
    });
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
