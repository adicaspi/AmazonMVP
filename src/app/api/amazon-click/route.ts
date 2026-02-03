import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type AmazonClick = {
  id: string;
  timestamp: string;
  productName: string;
  buttonPosition: string;
  page: string;
  userAgent?: string;
  referer?: string;
};

const CLICKS_FILE = path.join(process.cwd(), "data", "amazon-clicks.json");

async function readClicks(): Promise<AmazonClick[]> {
  try {
    const content = await fs.readFile(CLICKS_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeClick(click: AmazonClick): Promise<void> {
  const clicks = await readClicks();
  clicks.push(click);

  // Keep only last 10,000 clicks
  const trimmed = clicks.slice(-10000);

  // Ensure data directory exists
  const dir = path.dirname(CLICKS_FILE);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(CLICKS_FILE, JSON.stringify(trimmed, null, 2), "utf8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, buttonPosition, page } = body;

    if (!productName || !buttonPosition || !page) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const click: AmazonClick = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      productName,
      buttonPosition,
      page,
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
    };

    await writeClick(click);

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

    let clicks = await readClicks();

    // Filter by page if provided
    if (page) {
      clicks = clicks.filter((c) => c.page === page);
    }

    // Sort by most recent
    const sorted = clicks.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Calculate stats
    const stats = {
      total: clicks.length,
      byPosition: {} as Record<string, number>,
      byDay: {} as Record<string, number>,
    };

    clicks.forEach((click) => {
      // Count by position
      stats.byPosition[click.buttonPosition] = (stats.byPosition[click.buttonPosition] || 0) + 1;

      // Count by day
      const day = click.timestamp.split("T")[0];
      stats.byDay[day] = (stats.byDay[day] || 0) + 1;
    });

    return NextResponse.json({
      clicks: sorted.slice(0, limit),
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
