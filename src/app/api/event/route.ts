import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";
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

// Transform database row to Event type
function transformDbRow(row: any): Event {
  return {
    id: row.id,
    timestamp: row.timestamp,
    type: row.type,
    productId: row.product_id || undefined,
    slug: row.slug || undefined,
    offerId: row.offer_id || undefined,
    utm_source: row.utm_source || undefined,
    utm_medium: row.utm_medium || undefined,
    utm_campaign: row.utm_campaign || undefined,
    utm_content: row.utm_content || undefined,
    userAgent: row.user_agent || undefined,
    ip: row.ip || undefined,
    referer: row.referer || undefined,
  };
}

async function readEvents(): Promise<Event[]> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(10000);

      if (!error && data) {
        return data.map(transformDbRow);
      }
    } catch (error) {
      console.warn("Failed to read events from database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
  try {
    const content = await fs.readFile(EVENTS_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeEvent(event: Event): Promise<void> {
  // Try database first
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { error } = await supabase.from("events").insert({
        id: event.id,
        timestamp: event.timestamp,
        type: event.type,
        product_id: event.productId || null,
        slug: event.slug || null,
        offer_id: event.offerId || null,
        utm_source: event.utm_source || null,
        utm_medium: event.utm_medium || null,
        utm_campaign: event.utm_campaign || null,
        utm_content: event.utm_content || null,
        user_agent: event.userAgent || null,
        ip: event.ip || null,
        referer: event.referer || null,
      });

      if (!error) {
        return; // Successfully written to database
      }
    } catch (error) {
      console.warn("Failed to write event to database, using JSON fallback:", error);
    }
  }

  // Fallback to JSON
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
    if (type && ["view", "click", "conversion"].includes(type)) {
      events = events.filter((e) => e.type === type);
    }

    // Return most recent events (already sorted by readEvents if from database)
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
