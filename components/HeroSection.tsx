// components/HeroSection.tsx

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Minimal, well-designed home accessories that upgrade your space.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Curated recommendations and practical guides to help you create a more organized, 
          comfortable, and beautiful home.
        </p>
      </div>
    </section>
  );
}
