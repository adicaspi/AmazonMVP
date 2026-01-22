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
              <p className="text-sm text-slate-500 mt-2">
                Updated regularly • Curated from hundreds of options • Only products we'd recommend ourselves
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span>View All Products</span>
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
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <span>View All Products</span>
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
              className="group border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 p-6"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💡</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-bold rounded-full border border-yellow-300">Lighting</span>
                <span className="text-xs text-slate-600 font-medium">8 min read</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-700 transition-colors">
                How to Choose the Perfect Kitchen Lighting
              </h3>
              <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                A complete guide to selecting kitchen lighting that combines functionality with style.
              </p>
            </Link>
            <Link
              href="/guides/organizing-small-kitchen"
              className="group border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 p-6"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🗂️</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-emerald-200 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">Organization</span>
                <span className="text-xs text-slate-600 font-medium">10 min read</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                How to Organize a Small Kitchen
              </h3>
              <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                Practical strategies for organizing a small kitchen with drawer organizers and storage solutions.
              </p>
            </Link>
            <Link
              href="/guides/kitchen-storage-solutions"
              className="group border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:border-blue-300 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 p-6"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📦</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-bold rounded-full border border-blue-300">Storage</span>
                <span className="text-xs text-slate-600 font-medium">9 min read</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                Kitchen Storage Solutions: Organize Every Corner
              </h3>
              <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                Comprehensive guide to kitchen storage with drawer organizers and cabinet solutions.
              </p>
            </Link>
            <Link
              href="/guides/choosing-bedroom-lighting"
              className="group border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 hover:border-purple-300 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 p-6"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌙</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-200 text-purple-800 text-xs font-bold rounded-full border border-purple-300">Lighting</span>
                <span className="text-xs text-slate-600 font-medium">7 min read</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                How to Choose Bedroom Lighting for Better Sleep
              </h3>
              <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                Complete guide to bedroom lighting for creating a relaxing atmosphere that promotes better sleep.
              </p>
            </Link>
            <Link
              href="/guides/creating-cozy-living-room"
              className="group border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-rose-50 to-red-50 hover:border-orange-300 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 p-6"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🛋️</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded-full border border-orange-300">Decor</span>
                <span className="text-xs text-slate-600 font-medium">8 min read</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-700 transition-colors">
                How to Create a Cozy Living Room
              </h3>
              <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                Transform your living room into a cozy, inviting space with lighting, textiles, and organization.
              </p>
            </Link>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span>View All Guides</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <EmailCapture />

      <section className="py-16 md:py-20 border-t border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/40 rounded-full shadow-lg backdrop-blur-sm">
            <span className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            About AI Picks
          </h2>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-12 max-w-3xl mx-auto">
            We curate the best home accessories and provide practical guides to help you
            create a more organized, comfortable, and beautiful living space. Our recommendations
            are based on thorough research and real-world testing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl backdrop-blur-sm border-2 border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2 hover:scale-105">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">✓</div>
              <div className="font-bold text-2xl mb-3 text-white">Trusted</div>
              <div className="text-emerald-100 text-base">Editorial reviews you can count on</div>
            </div>
            <div className="group p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border-2 border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 hover:scale-105">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🔄</div>
              <div className="font-bold text-2xl mb-3 text-white">Updated</div>
              <div className="text-blue-100 text-base">Regularly refreshed weekly</div>
            </div>
            <div className="group p-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl backdrop-blur-sm border-2 border-orange-400/30 hover:border-orange-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-2 hover:scale-105">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <div className="font-bold text-2xl mb-3 text-white">Independent</div>
              <div className="text-orange-100 text-base">No brand bias, ever</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
