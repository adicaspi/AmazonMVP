import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";

type AmazonClick = {
  id: string;
  timestamp: string;
  product_name: string;
  button_position: string;
  page: string;
  user_agent?: string;
  referer?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, buttonPosition, page, visitorId } = body;

    if (!productName || !buttonPosition || !page) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const click = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      product_name: productName,
      button_position: buttonPosition,
      page: page,
      visitor_id: visitorId || null,
      user_agent: request.headers.get("user-agent") || null,
      referer: request.headers.get("referer") || null,
    };

    // Try to save to Supabase
    if (supabase && (await isDatabaseAvailable())) {
      const { error } = await supabase.from("amazon_clicks").insert(click);

      if (error) {
        console.error("Supabase error:", error);
        // Don't fail - just log the error
      }
    } else {
      console.warn("Supabase not available, click not saved");
    }

    return NextResponse.json({ success: true, clickId: click.id });
  } catch (error) {
    console.error("Error tracking Amazon click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const limit = parseInt(searchParams.get("limit") || "1000");

    let clicks: AmazonClick[] = [];

    // Try to read from Supabase
    if (supabase && (await isDatabaseAvailable())) {
      let query = supabase
        .from("amazon_clicks")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(limit);

      if (page) {
        query = query.eq("page", page);
      }

      const { data, error } = await query;

      if (!error && data) {
        clicks = data;
      }
    }

    // Calculate stats
    const stats = {
      total: clicks.length,
      byPosition: {} as Record<string, number>,
      byDay: {} as Record<string, number>,
    };

    clicks.forEach((click) => {
      // Count by position
      stats.byPosition[click.button_position] = (stats.byPosition[click.button_position] || 0) + 1;

      // Count by day
      const day = click.timestamp.split("T")[0];
      stats.byDay[day] = (stats.byDay[day] || 0) + 1;
    });

    return NextResponse.json({
      clicks,
      stats,
    });
  } catch (error) {
    console.error("Error reading Amazon clicks:", error);
    return NextResponse.json(
      { error: "Failed to read clicks" },
      { status: 500 }
    );
  }
}
