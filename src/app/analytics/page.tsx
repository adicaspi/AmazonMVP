import { getAllProducts } from "@/lib/products";
import Link from "next/link";

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

function calculateMetrics(events: Event[], products: ReturnType<typeof getAllProducts>): ProductMetrics[] {
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
  const products = getAllProducts();
  const metrics = calculateMetrics(events, products);
  const grouped = groupByBaseProduct(metrics);

  const totalViews = events.filter((e) => e.type === "view").length;
  const totalClicks = events.filter((e) => e.type === "click").length;
  const totalCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="mt-2 text-lg text-slate-400">
              Track performance across all product variants
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-sm text-slate-400 uppercase tracking-wide">Total Views</div>
            <div className="mt-2 text-3xl font-bold">{totalViews.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-sm text-slate-400 uppercase tracking-wide">Total Clicks</div>
            <div className="mt-2 text-3xl font-bold">{totalClicks.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-sm text-slate-400 uppercase tracking-wide">Overall CTR</div>
            <div className="mt-2 text-3xl font-bold">{totalCTR.toFixed(2)}%</div>
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
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-800 bg-slate-900/40">
                  <h3 className="text-xl font-bold">{baseProduct?.name || baseId}</h3>
                  <div className="mt-2 flex items-center gap-6 text-sm text-slate-400">
                    <span>Total: {totalVariantViews} views, {totalVariantClicks} clicks</span>
                    <span>CTR: {variantCTR.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-800">
                  {variants.map((variant) => (
                    <div
                      key={variant.productId}
                      className="p-6 hover:bg-slate-900/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-medium">
                              {variant.productId.split("-").pop()?.toUpperCase()}
                            </span>
                            {variant.angle && (
                              <span className="text-sm text-slate-400 italic line-clamp-1">
                                {variant.angle}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/p/${variant.slug}`}
                            className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                          >
                            View page →
                          </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-right">
                          <div>
                            <div className="text-xs text-slate-400 uppercase tracking-wide">Views</div>
                            <div className="mt-1 text-lg font-bold">{variant.views}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400 uppercase tracking-wide">Clicks</div>
                            <div className="mt-1 text-lg font-bold">{variant.clicks}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400 uppercase tracking-wide">CTR</div>
                            <div className="mt-1 text-lg font-bold">
                              {variant.ctr.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar for CTR */}
                      <div className="mt-4">
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
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
            <h2 className="text-2xl font-bold">All Products</h2>
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/40 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Product
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Views
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Clicks
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wide">
                        CTR
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Conversions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {metrics.map((metric) => (
                      <tr key={metric.productId} className="hover:bg-slate-900/40 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{metric.name}</div>
                            {metric.angle && (
                              <div className="text-sm text-slate-400 italic line-clamp-1">
                                {metric.angle}
                              </div>
                            )}
                            <Link
                              href={`/p/${metric.slug}`}
                              className="text-xs text-blue-400 hover:text-blue-300 mt-1"
                            >
                              View →
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">{metric.views}</td>
                        <td className="px-6 py-4 text-right font-medium">{metric.clicks}</td>
                        <td className="px-6 py-4 text-right font-medium">
                          <span className={metric.ctr > 5 ? "text-green-400" : metric.ctr > 2 ? "text-yellow-400" : "text-slate-400"}>
                            {metric.ctr.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">{metric.conversions}</td>
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
            <p className="text-slate-400 text-lg">
              No analytics data yet. Start testing products to see metrics here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
