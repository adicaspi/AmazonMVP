"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: object) => void;
  }
}

interface ViewContentTrackerProps {
  productName: string;
  productId: string;
  category?: string;
  eventType?: string;
}

export function ViewContentTracker({ productName, productId, category, eventType = "ViewContent" }: ViewContentTrackerProps) {
  useEffect(() => {
    // Track event when product page loads
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventType, {
        content_name: productName,
        content_ids: [productId],
        content_category: category || "Product",
        content_type: "product",
      });
    }
  }, [productName, productId, category, eventType]);

  // This component doesn't render anything visible
  return null;
}
