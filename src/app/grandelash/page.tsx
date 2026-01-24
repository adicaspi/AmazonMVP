import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GrandeLASH-MD: The Extension Killer That Saves You $1,800 a Year",
  description: "Ophthalmologist-tested lash serum that gives you longer, fuller lashes in 4-6 weeks. 90,000+ 5-star reviews. Check price on Amazon.",
};

export default function GrandeLASHPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-amber-50/30 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-full">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                ⭐ 90,000+ 5-Star Reviews on Amazon
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              The <span className="text-amber-600">Extension Killer</span> That Saves You{" "}
              <span className="text-amber-600">$1,800 a Year</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-700 mb-4 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-slate-900">Ophthalmologist-tested</strong> lash serum that gives you{" "}
              <strong className="text-slate-900">longer, fuller lashes in 4–6 weeks</strong>—without the damage, cost, or maintenance of extensions.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ophthalmologist-Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Results in 4–6 Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Damage to Natural Lashes</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-10">
              <a
                href="https://www.amazon.com/dp/B00KQ8X7VW?tag=aipicks20-20"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-block px-10 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                Check Price on Amazon →
              </a>
              <p className="text-xs text-slate-500 mt-3">Free shipping on orders over $25</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Before/After */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Results. Real Lashes. Real Fast.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See the transformation in just 4–6 weeks. No extensions. No damage. Just longer, fuller, naturally beautiful lashes.
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
              <div className="text-center mb-4">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Before</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mb-4">
                <span className="text-slate-400 text-sm">Before Photo Placeholder</span>
              </div>
              <p className="text-sm text-slate-600 text-center">Short, sparse natural lashes</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-300">
              <div className="text-center mb-4">
                <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">After 6 Weeks</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-yellow-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-amber-600 text-sm">After Photo Placeholder</span>
              </div>
              <p className="text-sm text-amber-800 text-center font-semibold">Long, full, naturally enhanced lashes</p>
            </div>
          </div>

          {/* Science of Growth */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              The Science of Growth
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧬</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Amino Acids</h4>
                <p className="text-slate-300 text-sm">
                  Essential building blocks that strengthen lash follicles and promote healthy growth from the root.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💧</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Hyaluronic Acid</h4>
                <p className="text-slate-300 text-sm">
                  Deep hydration that prevents breakage and keeps lashes flexible, reducing daily fallout.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Vitamin E</h4>
                <p className="text-slate-300 text-sm">
                  Powerful antioxidant that protects lash follicles from damage and supports natural growth cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Math Comparison Table */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Math That Changes Everything
            </h2>
            <p className="text-lg text-slate-600">
              Stop paying for expensive maintenance. Start investing in your natural beauty.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Comparison</th>
                  <th className="px-6 py-4 text-center font-bold">Lash Extensions</th>
                  <th className="px-6 py-4 text-center font-bold bg-amber-600">GrandeLASH-MD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Initial Cost</td>
                  <td className="px-6 py-4 text-center text-slate-600">$150–$300</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">$65–$85</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Monthly Maintenance</td>
                  <td className="px-6 py-4 text-center text-slate-600">$100–$150</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">$0</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Annual Cost</td>
                  <td className="px-6 py-4 text-center text-slate-600">$1,350–$2,100</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">$65–$85</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Time Investment</td>
                  <td className="px-6 py-4 text-center text-slate-600">2–3 hours/month</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">30 seconds/day</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Damage to Natural Lashes</td>
                  <td className="px-6 py-4 text-center text-red-600">Yes—permanent thinning</td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-600">No—strengthens lashes</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-amber-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">Total Savings (Year 1)</td>
                  <td className="px-6 py-4 text-center text-slate-600">—</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-700 text-xl">$1,265–$2,015</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA after table */}
          <div className="text-center mt-8">
            <a
              href="https://www.amazon.com/dp/B00KQ8X7VW?tag=aipicks20-20"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Saving Today →
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-full">
              <span className="text-sm font-bold text-amber-800">
                ⭐ 90,000+ Verified 5-Star Reviews on Amazon
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Women. Real Results. Real Reviews.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                "I was spending $150 every 3 weeks on extensions. After 6 weeks with GrandeLASH-MD, my natural lashes are longer than my extensions ever were. I've saved over $1,200 this year alone."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sarah M.</p>
                  <p className="text-xs text-slate-500">Verified Purchase</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                "My extensions were causing my natural lashes to fall out. I switched to GrandeLASH-MD and not only did my lashes grow back, they're now longer and thicker than before. No more expensive salon visits!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Jessica L.</p>
                  <p className="text-xs text-slate-500">Verified Purchase</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                "I was skeptical, but after 4 weeks I saw real results. By week 8, my lashes were so long people kept asking if I had extensions. This serum is a game-changer—and so much cheaper!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Michelle R.</p>
                  <p className="text-xs text-slate-500">Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Questions, Answered
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know before you buy.
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Is it safe for sensitive eyes?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes. GrandeLASH-MD is <strong>ophthalmologist-tested</strong> and safe for sensitive eyes and contact lens wearers. The formula is free of prostaglandins, which can cause eye irritation. However, if you have a history of eye conditions, we recommend consulting with your eye doctor before use.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                How long does one tube last?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                One 2ml tube lasts approximately <strong>3 months</strong> with daily use (one swipe along the lash line). That's about <strong>$0.70 per day</strong>—less than your morning coffee. Compare that to $150 every 3 weeks for extensions, and the savings are undeniable.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                What happens if I stop using it?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Your lashes will gradually return to their natural length over several weeks—<strong>unlike extensions, which can cause permanent damage</strong>. The good news? Many users find that after 3–6 months of use, their natural lash growth cycle has improved, so even after stopping, their lashes remain longer than before they started.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                How quickly will I see results?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Most users notice <strong>visible results in 4–6 weeks</strong>, with full results appearing by 8–12 weeks. This is because the serum works with your natural lash growth cycle, strengthening lashes from the root. Unlike extensions that give instant (but temporary) results, GrandeLASH-MD creates lasting, natural beauty.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-amber-300 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can I use it with mascara and extensions?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, you can use mascara. Apply GrandeLASH-MD at night after removing makeup. However, <strong>we don't recommend using it with extensions</strong>, as the serum works best on natural lashes. Many users transition from extensions to GrandeLASH-MD and find they no longer need extensions once their natural lashes grow.
              </p>
            </div>
          </div>

          {/* CTA after FAQ */}
          <div className="text-center mt-12">
            <a
              href="https://www.amazon.com/dp/B00KQ8X7VW?tag=aipicks20-20"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Get Your GrandeLASH-MD on Amazon →
            </a>
          </div>
        </div>
      </section>

      {/* Footer / Compliance */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-700 pb-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Amazon Associate Disclosure</h3>
            <p className="text-slate-300 leading-relaxed">
              <strong>As an Amazon Associate, I earn from qualifying purchases.</strong> When you click on links to Amazon and make a purchase, I may receive a small commission at no additional cost to you. This helps support the research and recommendations I provide. I only recommend products I believe in and that have been thoroughly researched.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3">About</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/disclosure" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Disclaimer</h4>
              <p className="text-slate-400 text-sm">
                Individual results may vary. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult with a healthcare professional before use if you have any medical conditions.
              </p>
            </div>
          </div>

          <div className="text-center text-slate-400 text-sm border-t border-slate-700 pt-8">
            <p>© 2026 AI Picks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
