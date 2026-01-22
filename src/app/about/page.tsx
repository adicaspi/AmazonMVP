import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AI Picks - How We Curate Home Products",
  description: "Learn how AI Picks selects and reviews home accessories. We're transparent about our affiliate relationships and editorial independence.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <article className="prose prose-slate max-w-none">
        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Our Story
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 sm:mb-8">
          About AI Picks
        </h1>
        
        <div className="space-y-8 sm:space-y-12">
          {/* User-First Opening */}
          <section>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6 font-medium">
              If you're tired of scrolling endless reviews and still feeling unsure, this site is for you.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              We created AI Picks because shopping for home products shouldn't require hours of research. 
              With millions of options, fake reviews, and inconsistent quality on Amazon, finding the right 
              product feels impossible. We do the research so you don't have to.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Our team analyzes hundreds of products, reads real reviews, and evaluates design quality 
              to bring you only the best options for your home. We select products based on value, 
              usability, and genuine user satisfaction—not marketing hype.
            </p>
          </section>

          {/* Why We Exist */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              How We Select Products
            </h2>

          {/* How We Select Products - Already moved above */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              We curate from hundreds of options, selecting only products that meet our standards for quality, 
              value, and user satisfaction. Our process is thorough and transparent:
            </p>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Research Phase</h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    We analyze thousands of products across categories, looking at reviews, ratings, price points, and design quality.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Selection Criteria</h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    Products must meet our standards for quality, value, and user satisfaction. We prioritize items with consistent positive reviews and real-world usability.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Editorial Review</h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    Our team writes honest, helpful descriptions that focus on benefits and real use cases—not marketing fluff.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Regular Updates</h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    We refresh our recommendations weekly, removing products that no longer meet our standards and adding new discoveries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Transparency About Affiliate Links */}
          <section className="bg-slate-50 border-l-4 border-slate-900 p-6 sm:p-8 rounded-r-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              Transparency About Affiliate Links
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              <strong>Yes, we use affiliate links.</strong> When you click a product link and make a purchase, 
              we may earn a small commission at no extra cost to you.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              Here's what this means:
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-base sm:text-lg text-slate-700 mb-4">
              <li>You pay the same price—we don't mark up products</li>
              <li>Our recommendations are independent—we don't accept payment to feature products</li>
              <li>Affiliate income helps us maintain the site and continue curating quality products</li>
              <li>We only recommend products we genuinely believe are worth your money</li>
            </ul>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Our editorial independence is non-negotiable. We'll never recommend a product just 
              because it pays more—only because it's genuinely good.
            </p>
          </section>

          {/* Our Promise */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our Promise to You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="group p-6 sm:p-8 bg-gradient-to-br from-white to-emerald-50/20 border-2 border-slate-200 rounded-2xl hover:border-emerald-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Honest Reviews</h3>
                <p className="text-slate-700 leading-relaxed">
                  We tell you what's good and what's not. No sugar-coating, no fake enthusiasm.
                </p>
              </div>
              <div className="group p-6 sm:p-8 bg-gradient-to-br from-white to-blue-50/20 border-2 border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔄</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Regular Updates</h3>
                <p className="text-slate-700 leading-relaxed">
                  Our recommendations are refreshed weekly to reflect current quality and availability.
                </p>
              </div>
              <div className="group p-6 sm:p-8 bg-gradient-to-br from-white to-purple-50/20 border-2 border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Thorough Research</h3>
                <p className="text-slate-700 leading-relaxed">
                  We analyze thousands of products so you can find the best ones quickly.
                </p>
              </div>
              <div className="group p-6 sm:p-8 bg-gradient-to-br from-white to-teal-50/20 border-2 border-slate-200 rounded-2xl hover:border-teal-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💎</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Quality First</h3>
                <p className="text-slate-700 leading-relaxed">
                  We prioritize quality, value, and user satisfaction over everything else.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-slate-200 pt-8 sm:pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              Questions or Feedback?
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              We'd love to hear from you. Visit our <a href="/contact" className="text-emerald-600 hover:text-emerald-700 underline">contact page</a> to get in touch.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
