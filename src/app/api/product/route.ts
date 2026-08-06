import { NextRequest, NextResponse } from "next/server";
import { getProductsByASIN, getItemsRaw } from "@/lib/amazon-creators-api";

export async function GET(request: NextRequest) {
  const asin = request.nextUrl.searchParams.get("asin");

  if (!asin) {
    return NextResponse.json({ error: "Missing 'asin' parameter" }, { status: 400 });
  }

  // Experimental resource probe: ?res=comma,separated,resources returns the
  // raw getItems response (invalid resources return the API's own error,
  // which enumerates what IS valid — how we learn about e.g. video support)
  const resOverride = request.nextUrl.searchParams.get("res");
  if (resOverride) {
    try {
      const raw = await getItemsRaw([asin], resOverride.split(","));
      return NextResponse.json(raw as object, { headers: { "Cache-Control": "no-store" } });
    } catch (error) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }
  }

  // Validate ASIN format (10 alphanumeric characters)
  if (!/^[A-Z0-9]{10}$/.test(asin)) {
    return NextResponse.json({ error: "Invalid ASIN format" }, { status: 400 });
  }

  const startTime = Date.now();

  try {
    const products = await getProductsByASIN([asin]);
    const elapsed = Date.now() - startTime;

    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found", apiTimeMs: elapsed }, { status: 404 });
    }

    const product = products[0];

    return NextResponse.json({
      status: "ok",
      apiTimeMs: elapsed,
      asin: product.asin,
      title: product.title,
      price: product.price,
      starRating: product.starRating,
      reviewCount: product.reviewCount,
      primaryImageUrl: product.primaryImage?.large?.url || null,
      variantImageCount: product.variantImages?.length || 0,
      variantImageUrls: product.variantImages?.map(v => v.large?.url).filter(Boolean) || [],
      detailPageURL: product.detailPageURL,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    const elapsed = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Amazon Creators API error:", error);
    return NextResponse.json(
      { status: "error", error: message, apiTimeMs: elapsed },
      { status: 500 }
    );
  }
}
