import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";
import { normalizeSource } from "@/lib/normalizeSource";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, utm_source, utm_medium, utm_campaign, utm_content } = body;

    if (!page) {
      return NextResponse.json(
        { error: "Missing page field" },
        { status: 400 }
      );
    }

    const view = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      page: page,
      user_agent: request.headers.get("user-agent") || null,
      referer: request.headers.get("referer") || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
    };

    // Save to Supabase
    if (supabase && (await isDatabaseAvailable())) {
      const { error } = await supabase.from("page_views").insert(view);

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    return NextResponse.json({ success: true, viewId: view.id });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!supabase || !(await isDatabaseAvailable())) {
      return NextResponse.json({ views: [], total: 0, sources: {} });
    }

    let query = supabase
      .from("page_views")
      .select("*", { count: "exact" })
      .order("timestamp", { ascending: false })
      .limit(1000);

    if (page) {
      query = query.eq("page", page);
    }

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    // Calculate traffic sources
    const sources: Record<string, number> = {};
    data?.forEach((view: any) => {
      let source = "Direct";

      if (view.utm_source) {
        source = normalizeSource(view.utm_source);
      } else if (view.referer) {
        try {
          const host = new URL(view.referer).hostname.replace("www.", "").toLowerCase();
          if (host === "aipicks.co") {
            source = "Direct";
          } else {
            source = normalizeSource(host);
          }
        } catch {
          source = normalizeSource(view.referer);
        }
      }

      sources[source] = (sources[source] || 0) + 1;
    });

    return NextResponse.json({
      views: data || [],
      total: count || 0,
      sources,
    });
  } catch (error) {
    console.error("Error reading page views:", error);
    return NextResponse.json(
      { error: "Failed to read views" },
      { status: 500 }
    );
  }
}
