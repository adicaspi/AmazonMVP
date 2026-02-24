"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: (...args: any[]) => void;
  }
}

interface ViewContentTrackerProps {
  productName: string;
  productId: string;
  category?: string;
}

export function ViewContentTracker({ productName, productId, category }: ViewContentTrackerProps) {
  useEffect(() => {
    // Track ViewContent event when product page loads
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: productName,
        content_ids: [productId],
        content_category: category || "Product",
        content_type: "product",
      });
    }
  }, [productName, productId, category]);

  // This component doesn't render anything visible
  return null;
}
