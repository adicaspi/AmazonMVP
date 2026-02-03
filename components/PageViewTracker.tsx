"use client";

import { useEffect } from "react";

interface PageViewTrackerProps {
  page: string;
}

export function PageViewTracker({ page }: PageViewTrackerProps) {
  useEffect(() => {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");
    const utmContent = urlParams.get("utm_content");

    // Track page view on mount
    fetch("/api/page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
      }),
    }).catch(() => {
      // Silently fail
    });
  }, [page]);

  return null;
}
