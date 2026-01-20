import { getAllProducts } from "@/lib/products";
import Link from "next/link";
import type { Metadata } from "next";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Analytics Dashboard - AI Picks",
  description: "Track performance across all product variants. Views, clicks, CTR, and conversion metrics.",
  openGraph: {
    title: "Analytics Dashboard - AI Picks",
    description: "Track performance across all product variants. Views, clicks, CTR, and conversion metrics.",
    url: "https://www.aipicks.co/analytics",
    siteName: "AI Picks",
    type: "website",
  },
};

type Event = {
  id: string;
  timestamp: string;
  type: "view" | "click" | "conversion";
  productId?: string;
  slug?: string;
  offerId?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

type ProductMetrics = {
  productId: string;
  slug: string;
  name: string;
  angle?: string;
  views: number;
  clicks: number;
  ctr: number;
  conversions: number;
};

async function getEvents(): Promise<Event[]> {
  try {
    // Read events directly from file (server-side)
    const fs = await import("fs/promises");
    const path = await import("path");
    const eventsFile = path.join(process.cwd(), "data", "events.json");
    const content = await fs.readFile(eventsFile, "utf8");
    const events = JSON.parse(content) as Event[];
    return events || [];
  } catch {
    return [];
  }
}

function calculateMetrics(events: Event[], products: Awaited<ReturnType<typeof getAllProducts>>): ProductMetrics[] {
  const metricsMap = new Map<string, ProductMetrics>();

  // Initialize metrics for all products
  products.forEach((product) => {
    metricsMap.set(product.id, {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      angle: product.angle,
      views: 0,
      clicks: 0,
      ctr: 0,
      conversions: 0,
    });
  });

  // Count events
  events.forEach((event) => {
    if (!event.productId) return;

    const metrics = metricsMap.get(event.productId);
    if (!metrics) return;

    if (event.type === "view") {
      metrics.views++;
    } else if (event.type === "click") {
      metrics.clicks++;
    } else if (event.type === "conversion") {
      metrics.conversions++;
    }
  });

  // Calculate CTR
  metricsMap.forEach((metrics) => {
    metrics.ctr = metrics.views > 0 ? (metrics.clicks / metrics.views) * 100 : 0;
  });

  return Array.from(metricsMap.values()).sort((a, b) => b.views - a.views);
}

function groupByBaseProduct(metrics: ProductMetrics[]): Map<string, ProductMetrics[]> {
  const grouped = new Map<string, ProductMetrics[]>();

  metrics.forEach((metric) => {
    // Extract base product ID (remove -v1, -v2, -v3 suffix)
    const baseId = metric.productId.replace(/-v\d+$/, "");
    if (!grouped.has(baseId)) {
      grouped.set(baseId, []);
    }
    grouped.get(baseId)!.push(metric);
  });

  return grouped;
}

export default async function AnalyticsPage() {
  const events = await getEvents();
  const products = await getAllProducts();
  const metrics = calculateMetrics(events, products);
  const grouped = groupByBaseProduct(metrics);

  const totalViews = events.filter((e) => e.type === "view").length;
  const totalClicks = events.filter((e) => e.type === "click").length;
  const totalCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              Track performance across all product variants
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-all shadow-sm hover:shadow"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Total Views</div>
            <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{totalViews.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Total Clicks</div>
            <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{totalClicks.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Overall CTR</div>
            <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{totalCTR.toFixed(2)}%</div>
          </div>
        </div>

        {/* Product Variants Comparison */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Product Variants Performance</h2>
          
          {Array.from(grouped.entries()).map(([baseId, variants]) => {
            const baseProduct = products.find((p) => p.id.startsWith(baseId.replace(/-v\d+$/, "")));
            const totalVariantViews = variants.reduce((sum, v) => sum + v.views, 0);
            const totalVariantClicks = variants.reduce((sum, v) => sum + v.clicks, 0);
            const variantCTR = totalVariantViews > 0 ? (totalVariantClicks / totalVariantViews) * 100 : 0;

            return (
              <div
                key={baseId}
                className="rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{baseProduct?.name || baseId}</h3>
                  <div className="mt-2 flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <span>Total: {totalVariantViews} views, {totalVariantClicks} clicks</span>
                    <span className="font-medium">CTR: {variantCTR.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {variants.map((variant) => (
                    <div
                      key={variant.productId}
                      className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-600">
                              {variant.productId.split("-").pop()?.toUpperCase()}
                            </span>
                            {variant.angle && (
                              <span className="text-sm text-slate-600 dark:text-slate-400 italic line-clamp-1">
                                {variant.angle}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/p/${variant.slug}`}
                            className="mt-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                          >
                            View page →
                          </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-right">
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Views</div>
                            <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-50">{variant.views}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Clicks</div>
                            <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-50">{variant.clicks}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">CTR</div>
                            <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-50">
                              {variant.ctr.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar for CTR */}
                      <div className="mt-4">
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-400 dark:to-slate-500 transition-all duration-500"
                            style={{ width: `${Math.min(variant.ctr, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Individual Product Metrics */}
        {metrics.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">All Products</h2>
            <div className="rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Product
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Views
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Clicks
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        CTR
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Conversions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {metrics.map((metric) => (
                      <tr key={metric.productId} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-50">{metric.name}</div>
                            {metric.angle && (
                              <div className="text-sm text-slate-600 dark:text-slate-400 italic line-clamp-1">
                                {metric.angle}
                              </div>
                            )}
                            <Link
                              href={`/p/${metric.slug}`}
                              className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mt-1 transition-colors"
                            >
                              View →
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-50">{metric.views}</td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-50">{metric.clicks}</td>
                        <td className="px-6 py-4 text-right font-medium">
                          <span className={metric.ctr > 5 ? "text-green-600 dark:text-green-400" : metric.ctr > 2 ? "text-amber-600 dark:text-amber-400" : "text-slate-600 dark:text-slate-400"}>
                            {metric.ctr.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-50">{metric.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {metrics.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No analytics data yet. Start testing products to see metrics here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
