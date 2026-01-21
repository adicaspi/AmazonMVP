import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AI Picks - How We Curate Home Products",
  description: "Learn how AI Picks selects and reviews home accessories. We're transparent about our affiliate relationships and editorial independence.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 sm:mb-8">
          About AI Picks
        </h1>
        
        <div className="space-y-8 sm:space-y-12">
          {/* Why We Exist */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              Why We Exist
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              Shopping for home products on Amazon can be overwhelming. With millions of options, 
              fake reviews, and inconsistent quality, finding the right product takes hours of research.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              AI Picks exists to solve this problem. We do the research so you don't have to. 
              Our team analyzes thousands of products, reads real reviews, and tests items when possible 
              to bring you only the best options for your home.
            </p>
          </section>

          {/* How We Select Products */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              How We Select Products
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              Our curation process is thorough and transparent:
            </p>
            <ol className="list-decimal list-inside space-y-3 sm:space-y-4 text-base sm:text-lg text-slate-700">
              <li>
                <strong>Research Phase:</strong> We analyze thousands of products across categories, 
                looking at reviews, ratings, price points, and design quality.
              </li>
              <li>
                <strong>Selection Criteria:</strong> Products must meet our standards for quality, 
                value, and user satisfaction. We prioritize items with consistent positive reviews 
                and real-world usability.
              </li>
              <li>
                <strong>Editorial Review:</strong> Our team writes honest, helpful descriptions 
                that focus on benefits and real use cases—not marketing fluff.
              </li>
              <li>
                <strong>Regular Updates:</strong> We refresh our recommendations weekly, removing 
                products that no longer meet our standards and adding new discoveries.
              </li>
            </ol>
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
              <div className="p-6 bg-white border border-slate-200 rounded-xl">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Honest Reviews</h3>
                <p className="text-slate-700">
                  We tell you what's good and what's not. No sugar-coating, no fake enthusiasm.
                </p>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-xl">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Regular Updates</h3>
                <p className="text-slate-700">
                  Our recommendations are refreshed weekly to reflect current quality and availability.
                </p>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-xl">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Thorough Research</h3>
                <p className="text-slate-700">
                  We analyze thousands of products so you can find the best ones quickly.
                </p>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-xl">
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Quality First</h3>
                <p className="text-slate-700">
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
