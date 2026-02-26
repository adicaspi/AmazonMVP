import { NextRequest, NextResponse } from "next/server";
import { getProductRawResponse } from "@/lib/amazon-creators-api";

export async function GET(request: NextRequest) {
  const asin = request.nextUrl.searchParams.get("asin") || "B00YI5VJW6";

  try {
    const raw = await getProductRawResponse(asin);
    return NextResponse.json(raw, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
