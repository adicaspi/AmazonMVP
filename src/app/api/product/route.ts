import { NextRequest, NextResponse } from "next/server";
import { getProductsByASIN } from "@/lib/amazon-creators-api";

export async function GET(request: NextRequest) {
  const asin = request.nextUrl.searchParams.get("asin");

  if (!asin) {
    return NextResponse.json({ error: "Missing 'asin' parameter" }, { status: 400 });
  }

  // Validate ASIN format (10 alphanumeric characters)
  if (!/^[A-Z0-9]{10}$/.test(asin)) {
    return NextResponse.json({ error: "Invalid ASIN format" }, { status: 400 });
  }

  try {
    const products = await getProductsByASIN([asin]);

    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(products[0], {
      headers: {
        // Cache for 1 hour
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Amazon Creators API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product data" },
      { status: 500 }
    );
  }
}
