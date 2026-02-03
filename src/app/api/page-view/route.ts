import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;

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
      return NextResponse.json({ views: [], total: 0 });
    }

    let query = supabase
      .from("page_views")
      .select("*", { count: "exact" })
      .order("timestamp", { ascending: false })
      .limit(100);

    if (page) {
      query = query.eq("page", page);
    }

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      views: data || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Error reading page views:", error);
    return NextResponse.json(
      { error: "Failed to read views" },
      { status: 500 }
    );
  }
}
