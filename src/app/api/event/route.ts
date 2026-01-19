import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type EventType = "view" | "click" | "conversion";

type Event = {
  id: string;
  timestamp: string;
  type: EventType;
  productId?: string;
  slug?: string;
  offerId?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  userAgent?: string;
  ip?: string;
  referer?: string;
};

const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");

async function readEvents(): Promise<Event[]> {
  try {
    const content = await fs.readFile(EVENTS_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeEvent(event: Event): Promise<void> {
  const events = await readEvents();
  events.push(event);
  
  // Keep only last 10,000 events (prevent file from growing too large)
  const trimmed = events.slice(-10000);
  
  await fs.writeFile(EVENTS_FILE, JSON.stringify(trimmed, null, 2), "utf8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      productId,
      slug,
      offerId,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    } = body;

    // Validate event type
    if (!type || !["view", "click", "conversion"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    const event: Event = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      type,
      productId,
      slug,
      offerId,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      userAgent: request.headers.get("user-agent") || undefined,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      referer: request.headers.get("referer") || undefined,
    };

    await writeEvent(event);

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

// GET endpoint for reading events (for analytics dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "100");

    let events = await readEvents();

    // Filter by productId if provided
    if (productId) {
      events = events.filter((e) => e.productId === productId);
    }

    // Filter by type if provided
    if (type) {
      events = events.filter((e) => e.type === type);
    }

    // Return most recent events
    const sorted = events.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      events: sorted.slice(0, limit),
      total: events.length,
    });
  } catch (error) {
    console.error("Error reading events:", error);
    return NextResponse.json(
      { error: "Failed to read events" },
      { status: 500 }
    );
  }
}
