// components/SocialProof.tsx

export function SocialProof() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-emerald-50/30 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Updated Weekly</h3>
            <p className="text-sm text-slate-600">
              Our recommendations are refreshed weekly to reflect current quality and availability.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Trusted Recommendations</h3>
            <p className="text-sm text-slate-600">
              Every product is carefully researched and evaluated for quality, value, and design.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Curated from Thousands</h3>
            <p className="text-sm text-slate-600">
              We analyze thousands of products to bring you only the best options for your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
