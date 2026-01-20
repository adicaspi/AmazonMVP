// components/HeroSection.tsx

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 border-b border-slate-200 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white via-emerald-50/40 to-blue-50/30" />
      
      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse [animation-delay:1000ms]" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-100/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-delay:2000ms]" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 sm:mb-8 px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-200/50 rounded-full shadow-lg backdrop-blur-sm">
          <span className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center justify-center gap-2">
            <span className="text-base sm:text-lg">✨</span>
            <span>Curated Home Accessories</span>
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-slate-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2">
          Minimal, well-designed{" "}
          <span className="bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-600 bg-clip-text text-transparent animate-gradient">
            home accessories
          </span>{" "}
          that upgrade your space.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
          Curated recommendations and practical guides to help you create a more organized, 
          comfortable, and beautiful home.
        </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-base text-slate-600 mb-12">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-semibold">Trusted Reviews</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse [animation-delay:500ms]" />
              <span className="font-semibold">Regularly Updated</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse [animation-delay:1000ms]" />
              <span className="font-semibold">Editorial Independence</span>
            </div>
          </div>
        <div className="flex items-center justify-center gap-4">
          <a 
            href="/products" 
            className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            Explore Products
          </a>
          <a 
            href="/guides" 
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Read Guides
          </a>
        </div>
      </div>
    </section>
  );
}
