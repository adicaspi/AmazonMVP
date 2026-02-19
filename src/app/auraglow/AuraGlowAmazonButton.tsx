"use client";

import { ReactNode } from "react";
import { trackAuraGlowConversion } from "./AuraGlowPixel";

interface AuraGlowAmazonButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  position?: string;
}

export function AuraGlowAmazonButton({
  href,
  children,
  className,
  position,
}: AuraGlowAmazonButtonProps) {
  const handleClick = () => {
    const pagePath =
      typeof window !== "undefined" ? window.location.pathname : "";

    // 1. Track to main site pixel (Lead + AmazonClick)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fbq = typeof window !== "undefined" && (window as any).fbq;
    if (fbq) {
      fbq("track", "Lead", {
        content_name: "AuraGlow Teeth Whitening Kit",
        content_category: "Affiliate Link Click",
        content_ids: [position || "unknown"],
        value: 29.99,
        currency: "USD",
      });

      fbq("trackCustom", "AmazonClick", {
        product: "AuraGlow Teeth Whitening Kit",
        button_position: position || "unknown",
        page_url: pagePath,
      });
    }

    // 2. Track to AuraGlow-specific pixel (2679443682454721)
    trackAuraGlowConversion(position || "unknown");

    // 3. Track on server for analytics dashboard
    fetch("/api/amazon-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: "AuraGlow Teeth Whitening Kit",
        buttonPosition: position || "unknown",
        page: pagePath,
      }),
    }).catch(() => {});
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
