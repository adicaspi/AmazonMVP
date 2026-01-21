// components/HowItWorks.tsx

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Finding the right home products shouldn't be overwhelming. Here's how we make it simple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="text-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
              1
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
              We Research
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our team analyzes thousands of products, reviews, and user feedback to find the best options for your home.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
              2
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
              We Curate
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We select only products that meet our standards for quality, value, and design—saving you hours of research.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
              3
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
              You Choose
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Browse our curated picks, read honest reviews, and buy directly from Amazon with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
