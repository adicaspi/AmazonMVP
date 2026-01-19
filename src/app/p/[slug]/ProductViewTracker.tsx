"use client";

import { useEffect } from "react";

type Props = {
  productId: string;
  slug: string;
};

export function ProductViewTracker({ productId, slug }: Props) {
  useEffect(() => {
    // Extract UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
      utm_source: urlParams.get("utm_source") || undefined,
      utm_medium: urlParams.get("utm_medium") || undefined,
      utm_campaign: urlParams.get("utm_campaign") || undefined,
      utm_content: urlParams.get("utm_content") || undefined,
    };

    // Track page view
    fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "view",
        productId,
        slug,
        ...utmParams,
      }),
    }).catch((err) => {
      console.error("Failed to track view:", err);
    });
  }, [productId, slug]);

  return null; // This component doesn't render anything
}
