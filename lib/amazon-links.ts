// lib/amazon-links.ts
// Helper functions for building Amazon affiliate links

const DEFAULT_TRACKING_ID = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

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
    
    // Always set/replace the tracking tag with the correct one
    url.searchParams.set("tag", trackingId);
    
    // Add any additional params
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  } catch (error) {
    // If URL parsing fails, try to extract ASIN and build clean URL
    const asin = extractASIN(baseUrl);
    if (asin) {
      return `https://www.amazon.com/dp/${asin}?tag=${trackingId}`;
    }
    // Fallback: append tag to original URL
    // Remove existing tag if present
    const cleanUrl = baseUrl.replace(/[?&]tag=[^&]*/g, "");
    const newSeparator = cleanUrl.includes("?") ? "&" : "?";
    return `${cleanUrl}${newSeparator}tag=${trackingId}`;
  }
}

/**
 * Validate if an Amazon URL/ASIN is likely valid
 * Note: This doesn't check if the product actually exists, just format validation
 */
export function isValidASIN(asin: string): boolean {
  // ASIN format: 10 alphanumeric characters
  return /^[A-Z0-9]{10}$/i.test(asin);
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
