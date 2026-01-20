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
  // Clean the URL first (remove any existing query params)
  const baseUrl = product.amazon.url.split('?')[0];
  const amazonUrl = new URL(baseUrl);
  
  // Add tracking ID as 'tag' parameter
  amazonUrl.searchParams.set("tag", product.amazon.trackingId);

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
