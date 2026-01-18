// app/page.tsx
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold">Currently Testing</h1>

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/p/${product.slug}`}   // 👈 THIS is critical
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-slate-500 transition-colors"
            >
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                {product.vertical.replace("_", " ")} • {product.status}
              </div>
              <h2 className="mt-1 text-lg font-semibold group-hover:text-slate-50">
                {product.name}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {product.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
