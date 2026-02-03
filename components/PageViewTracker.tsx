"use client";

import { useEffect } from "react";

interface PageViewTrackerProps {
  page: string;
}

export function PageViewTracker({ page }: PageViewTrackerProps) {
  useEffect(() => {
    // Track page view on mount
    fetch("/api/page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    }).catch(() => {
      // Silently fail
    });
  }, [page]);

  return null; // This component doesn't render anything
}
