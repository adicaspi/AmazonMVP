import { NextRequest, NextResponse } from "next/server";
import { getOfferById } from "@/lib/products";

type Params = Promise<{ offerId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { offerId } = await params;
  
  // Get product by ID
  const product = await getOfferById(offerId);

  if (!product) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Build Amazon URL with tracking ID
  // Extract ASIN from the URL to ensure we have the correct one
  const asinMatch = product.amazon.url.match(/\/dp\/([A-Z0-9]{10})/i);
  const asin = asinMatch ? asinMatch[1].toUpperCase() : null;
  
  if (!asin) {
    console.error(`❌ Could not extract ASIN from URL: ${product.amazon.url}`);
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Build clean Amazon URL with ASIN
  const amazonUrl = new URL(`https://www.amazon.com/dp/${asin}`);
  
  // Add tracking ID as 'tag' parameter (required for affiliate links)
  if (product.amazon.trackingId) {
    amazonUrl.searchParams.set("tag", product.amazon.trackingId);
  }
  
  console.log(`🔗 Redirecting to Amazon: ${amazonUrl.toString()}`);

  // Track click event
  try {
    const utmParams = {
      utm_source: request.nextUrl.searchParams.get("utm_source") || undefined,
      utm_medium: request.nextUrl.searchParams.get("utm_medium") || undefined,
      utm_campaign: request.nextUrl.searchParams.get("utm_campaign") || undefined,
      utm_content: request.nextUrl.searchParams.get("utm_content") || undefined,
    };

    await fetch(new URL("/api/event", request.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "click",
        productId: product.id,
        slug: product.slug,
        offerId: offerId,
        ...utmParams,
      }),
    }).catch((err) => {
      console.error("Failed to track click:", err);
      // Don't fail the redirect if tracking fails
    });
  } catch (error) {
    console.error("Error tracking click:", error);
  }

  // Redirect to Amazon
  return NextResponse.redirect(amazonUrl.toString());
}
