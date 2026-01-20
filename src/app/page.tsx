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

      <section className="py-16 md:py-20 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50/50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div className="relative">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Featured Collection
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                Top Picks This Week
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mt-3 max-w-2xl leading-relaxed">
                Handpicked favorites from our editors — carefully curated to help you create a more beautiful home
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span>View all products</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {topPicks.map((product, idx) => (
              <div 
                key={product.id} 
                className="animate-fade-in transform hover:scale-105 transition-transform duration-300" 
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-block mb-3 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Guides
            </h2>
            <p className="text-slate-600">Practical, actionable guides to help you organize and upgrade your home.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for guides - will be replaced with actual guide data */}
            <div className="border-2 border-dashed border-slate-200 bg-white/50 p-8 rounded-xl text-center">
              <div className="text-4xl mb-4">📚</div>
              <div className="text-sm text-slate-500 mb-2 font-semibold">Coming soon</div>
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

      <section className="py-16 md:py-20 border-t border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About AI Picks
          </h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
            We curate the best home accessories and provide practical guides to help you 
            create a more organized, comfortable, and beautiful living space. Our recommendations 
            are based on thorough research and real-world testing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl mb-3">✓</div>
              <div className="font-bold text-lg mb-2">Trusted</div>
              <div className="text-slate-300 text-sm">Editorial reviews</div>
            </div>
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl mb-3">🔄</div>
              <div className="font-bold text-lg mb-2">Updated</div>
              <div className="text-slate-300 text-sm">Regularly refreshed</div>
            </div>
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl mb-3">🎯</div>
              <div className="font-bold text-lg mb-2">Independent</div>
              <div className="text-slate-300 text-sm">No brand bias</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
