import { HeroSection } from "@/components/HeroSection";
import { CategoryCards } from "@/components/CategoryCards";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products-data";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const topPicks = featuredProducts.slice(0, 6);

  return (
    <>
      <HeroSection />
      
      <CategoryCards />

      <section className="py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Top Picks This Week
            </h2>
            <Link
              href="/products"
              className="text-sm text-slate-600 hover:text-slate-900 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for guides - will be replaced with actual guide data */}
            <div className="border border-slate-200 bg-white p-6">
              <div className="text-sm text-slate-500 mb-2">Coming soon</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Guide content will appear here
              </h3>
              <p className="text-sm text-slate-600">
                MDX guides are being set up...
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            About AI Picks
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            We curate the best home accessories and provide practical guides to help you 
            create a more organized, comfortable, and beautiful living space. Our recommendations 
            are based on thorough research and real-world testing.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div>
              <div className="font-semibold text-slate-900">Trusted</div>
              <div>Editorial reviews</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Updated</div>
              <div>Regularly refreshed</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Independent</div>
              <div>No brand bias</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
