import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!accessToken) {
      console.warn("FACEBOOK_ACCESS_TOKEN not configured — CAPI events will not be sent");
      return NextResponse.json(
        { error: "FACEBOOK_ACCESS_TOKEN not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { events, pixel_id } = body;

    if (!pixel_id) {
      return NextResponse.json(
        { error: "pixel_id is required" },
        { status: 400 }
      );
    }

    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: "events array is required and must not be empty" },
        { status: 400 }
      );
    }

    const pixelId = pixel_id;
    const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE || null;
    const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

    const payload: Record<string, unknown> = { data: events };
    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Facebook CAPI error:", result);
      return NextResponse.json(
        { error: "Facebook API error", details: result },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("CAPI route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
