import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { SocialProof } from "@/components/SocialProof";
import { EmailCapture } from "@/components/EmailCapture";
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
      
      <SocialProof />
      
      <HowItWorks />
      
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            {topPicks.map((product, idx) => {
              const delayClass = idx === 0 ? 'animate-fade-in' : 
                                 idx === 1 ? 'animate-fade-in-delay-1' :
                                 idx === 2 ? 'animate-fade-in-delay-2' :
                                 idx === 3 ? 'animate-fade-in-delay-3' :
                                 idx === 4 ? 'animate-fade-in-delay-4' :
                                 'animate-fade-in-delay-5';
              return (
                <div 
                  key={product.id} 
                  className={`${delayClass} transform hover:scale-105 transition-transform duration-300`}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
          <div className="mt-6 sm:mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <span>View all products</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Featured Guides
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Practical Guides for Your Home
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">Practical, actionable guides to help you organize and upgrade your home. Each guide includes product recommendations and real-world solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/guides/choosing-kitchen-lighting"
              className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1 p-6"
            >
              <div className="text-4xl mb-3">💡</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Lighting</span>
                <span className="text-xs text-slate-500">8 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                How to Choose the Perfect Kitchen Lighting
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                A complete guide to selecting kitchen lighting that combines functionality with style.
              </p>
            </Link>
            <Link
              href="/guides/organizing-small-kitchen"
              className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1 p-6"
            >
              <div className="text-4xl mb-3">🗂️</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Organization</span>
                <span className="text-xs text-slate-500">10 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                How to Organize a Small Kitchen
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                Practical strategies for organizing a small kitchen with drawer organizers and storage solutions.
              </p>
            </Link>
            <Link
              href="/guides/kitchen-storage-solutions"
              className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1 p-6"
            >
              <div className="text-4xl mb-3">📦</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Storage</span>
                <span className="text-xs text-slate-500">9 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Kitchen Storage Solutions: Organize Every Corner
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                Comprehensive guide to kitchen storage with drawer organizers and cabinet solutions.
              </p>
            </Link>
            <Link
              href="/guides/choosing-bedroom-lighting"
              className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1 p-6"
            >
              <div className="text-4xl mb-3">🌙</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Lighting</span>
                <span className="text-xs text-slate-500">7 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                How to Choose Bedroom Lighting for Better Sleep
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                Complete guide to bedroom lighting for creating a relaxing atmosphere that promotes better sleep.
              </p>
            </Link>
            <Link
              href="/guides/creating-cozy-living-room"
              className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1 p-6"
            >
              <div className="text-4xl mb-3">🛋️</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Decor</span>
                <span className="text-xs text-slate-500">8 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                How to Create a Cozy Living Room
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                Transform your living room into a cozy, inviting space with lighting, textiles, and organization.
              </p>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View all guides</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      <EmailCapture />

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
