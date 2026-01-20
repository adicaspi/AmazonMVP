import { getAllProducts } from "@/lib/products";
import Link from "next/link";

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <header className="space-y-4 text-center sm:text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Live Product Tests
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl">
                Meta ads → landing page → Amazon affiliate links. These are the
                products currently in testing.
              </p>
            </div>
            <Link
              href="/analytics"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors whitespace-nowrap"
            >
              View Analytics →
            </Link>
          </div>
        </header>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              No products yet. Once the AI pipeline runs, they'll appear here.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/p/${p.slug}`}
              className="group block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-600 hover:bg-slate-900 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-[10px] uppercase tracking-wide text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                    {p.vertical.replace("_", " ")} • {p.status}
                  </div>
                  <span className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-200 text-sm">
                    →
                  </span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-200">
                    {p.name}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>
                {p.angle && (
                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-xs text-slate-500 italic line-clamp-1">
                      Angle: {p.angle}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
