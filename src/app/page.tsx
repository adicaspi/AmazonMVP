import { getAllProducts } from "@/lib/products";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Live Product Tests
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Meta ads → landing page → Amazon affiliate links. These are the
            products currently in testing.
          </p>
        </header>

        {products.length === 0 && (
          <p className="text-slate-400">
            No products yet. Once the AI pipeline runs, they’ll appear here.
          </p>
        )}

        <div className="space-y-3">
          {products.map((p) => (
            <a
              key={p.id}
              href={`/p/${p.slug}`}
              className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-500 hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    {p.vertical.replace("_", " ")} • {p.status}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">{p.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {p.shortDescription}
                  </p>
                </div>
                <span className="text-xs text-slate-400">View test →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
