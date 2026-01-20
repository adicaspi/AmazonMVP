// lib/amazon-links.ts
// Helper functions for building Amazon affiliate links

const DEFAULT_TRACKING_ID = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks-20";

/**
 * Build an Amazon affiliate link with tracking tag
 */
export function buildAmazonAffiliateLink(
  baseUrl: string,
  trackingId: string = DEFAULT_TRACKING_ID,
  params?: Record<string, string>
): string {
  try {
    const url = new URL(baseUrl);
    
    // Add tracking tag
    url.searchParams.set("tag", trackingId);
    
    // Add any additional params
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  } catch (error) {
    // If URL parsing fails, return original URL with tag appended
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}tag=${trackingId}`;
  }
}

/**
 * Extract ASIN from Amazon URL
 */
export function extractASIN(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : null;
}

/**
 * Build Amazon URL from ASIN
 */
export function buildAmazonURLFromASIN(asin: string, trackingId: string = DEFAULT_TRACKING_ID): string {
  return buildAmazonAffiliateLink(`https://www.amazon.com/dp/${asin}`, trackingId);
}
