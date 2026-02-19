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

    // Track to AuraGlow-specific pixel ONLY (2679443682454721)
    trackAuraGlowConversion(position || "unknown");

    // Track on server for analytics dashboard
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
