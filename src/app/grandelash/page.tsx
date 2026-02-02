import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "GrandLash - Ditch Extensions, Grow Your Own Natural Lashes | 90,000+ Happy Customers",
  description: "Unlock your lash potential with GrandLash serum. Real results in 8 weeks. Ophthalmologist-tested. Join 90,000+ believers. Check price on Amazon.",
};

export default function GrandeLASHPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Hero Section with Promotional Image */}
      <section className="relative py-8 md:py-12">
        {/* Golden sparkle background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Limited Time Offer Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-sm rounded-full shadow-lg animate-pulse">
              <span className="text-lg">⚡</span>
              <span>LIMITED-TIME OFFER!</span>
              <span className="text-lg">⚡</span>
            </div>
          </div>

          {/* Main Promotional Image - Before/After */}
          <div className="flex justify-center mb-8">
            <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400">
              <Image
                src="/images/grandelash/promo-before-after.png"
                alt="GrandLash Before and After Results - Ditch the Extensions, Grow Your Own Natural Lashes"
                width={800}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <a
              href="https://www.amazon.com/dp/B082WZTJV5?social_share=cm_sw_r_cso_wa_mwn_dp_XXB3TP0Q34EC7FSE4TET&badgeInsights=bestseller-insights&th=1&linkCode=ll1&tag=aipicks20-20&linkId=8730dd8a3b2b424aef19cacfd6dd5aa6&language=en_US&ref_=as_li_ss_tl"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-bold text-xl rounded-full hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 border-2 border-amber-300"
            >
              🛒 BUY NOW ON AMAZON
            </a>
            <p className="text-sm text-slate-600 mt-4 flex items-center justify-center gap-2">
              <span className="text-emerald-600">✓</span> Free shipping with Prime
              <span className="mx-2">|</span>
              <span className="text-emerald-600">✓</span> 90,000+ Happy Customers
            </p>
          </div>
        </div>
      </section>

      {/* Viral Sensation Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-amber-100/30 to-white relative overflow-hidden">
        {/* Golden sparkle decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZiYmYyNCIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            {/* Viral Sensation Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-amber-400 rounded-full shadow-md mb-6">
              <span className="text-amber-500 text-xl">★</span>
              <span className="font-bold text-slate-800">VIRAL SENSATION!</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 italic">
              UNLOCK YOUR LASH POTENTIAL.
            </h2>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-8 italic">
              JOIN 90,000+ BELIEVERS
            </h3>
          </div>

          {/* Second Promotional Image - Problem/Solution */}
          <div className="flex justify-center mb-8">
            <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400">
              <Image
                src="/images/grandelash/promo-solution.png"
                alt="GrandLash - The Problem vs The Solution - Real Results"
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="text-center">
            <a
              href="https://www.amazon.com/dp/B082WZTJV5?social_share=cm_sw_r_cso_wa_mwn_dp_XXB3TP0Q34EC7FSE4TET&badgeInsights=bestseller-insights&th=1&linkCode=ll1&tag=aipicks20-20&linkId=8730dd8a3b2b424aef19cacfd6dd5aa6&language=en_US&ref_=as_li_ss_tl"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-bold text-xl rounded-full hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 border-2 border-amber-300"
            >
              🛍️ SHOP NOW ON AMAZON
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose GrandLash Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why 90,000+ Women Chose GrandLash
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ditch expensive extensions. Grow your own natural, beautiful lashes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Save $1,800/Year</h3>
              <p className="text-slate-600">
                Stop spending on expensive monthly extension fills. One tube lasts 3 months.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Results in 8 Weeks</h3>
              <p className="text-slate-600">
                See visible results fast. Longer, fuller lashes that are 100% yours.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">👁️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ophthalmologist-Tested</h3>
              <p className="text-slate-600">
                Safe for sensitive eyes. No damage to your natural lashes.
              </p>
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

          <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Comparison</th>
                  <th className="px-6 py-4 text-center font-bold">Lash Extensions</th>
                  <th className="px-6 py-4 text-center font-bold bg-gradient-to-r from-amber-500 to-yellow-500">GrandLash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Initial Cost</td>
                  <td className="px-6 py-4 text-center text-slate-600">$150–$300</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">$65–$85</td>
                </tr>
                <tr className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Monthly Maintenance</td>
                  <td className="px-6 py-4 text-center text-slate-600">$100–$150</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">$0</td>
                </tr>
                <tr className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Annual Cost</td>
                  <td className="px-6 py-4 text-center text-slate-600">$1,350–$2,100</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">$65–$85</td>
                </tr>
                <tr className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Time Investment</td>
                  <td className="px-6 py-4 text-center text-slate-600">2–3 hours/month</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600">30 seconds/day</td>
                </tr>
                <tr className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">Damage to Natural Lashes</td>
                  <td className="px-6 py-4 text-center text-red-600">Yes—permanent thinning</td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-600">No—strengthens lashes</td>
                </tr>
                <tr className="hover:bg-amber-50 transition-colors bg-amber-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">Total Savings (Year 1)</td>
                  <td className="px-6 py-4 text-center text-slate-600">—</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-700 text-xl">$1,265–$2,015</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA after table */}
          <div className="text-center mt-10">
            <a
              href="https://www.amazon.com/dp/B082WZTJV5?social_share=cm_sw_r_cso_wa_mwn_dp_XXB3TP0Q34EC7FSE4TET&badgeInsights=bestseller-insights&th=1&linkCode=ll1&tag=aipicks20-20&linkId=8730dd8a3b2b424aef19cacfd6dd5aa6&language=en_US&ref_=as_li_ss_tl"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-bold text-xl rounded-full hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 border-2 border-amber-300"
            >
              💵 Start Saving Today - Check Price
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 border-2 border-amber-500 rounded-full shadow-lg">
              <span className="text-lg font-bold text-white">
                ⭐ 90,000+ 5-Star Reviews on Amazon
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Women. Real Results. Real Reviews.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 hover:border-amber-400 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                "I was spending $150 every 3 weeks on extensions. After 6 weeks with GrandLash, my natural lashes are longer than my extensions ever were. I've saved over $1,200 this year alone."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sarah M.</p>
                  <p className="text-xs text-emerald-600 font-semibold">✓ Verified Purchase</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 hover:border-amber-400 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                "My extensions were causing my natural lashes to fall out. I switched to GrandLash and not only did my lashes grow back, they're now longer and thicker than before!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Jessica L.</p>
                  <p className="text-xs text-emerald-600 font-semibold">✓ Verified Purchase</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 hover:border-amber-400 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                "I was skeptical, but after 4 weeks I saw real results. By week 8, my lashes were so long people kept asking if I had extensions. This serum is a game-changer!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Michelle R.</p>
                  <p className="text-xs text-emerald-600 font-semibold">✓ Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-amber-50">
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
            <div className="bg-white rounded-xl p-6 border-2 border-amber-200 hover:border-amber-400 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Is it safe for sensitive eyes?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes. GrandLash is <strong>ophthalmologist-tested</strong> and safe for sensitive eyes and contact lens wearers. The formula is gentle and designed for daily use. However, if you have a history of eye conditions, we recommend consulting with your eye doctor before use.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-200 hover:border-amber-400 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                How long does one tube last?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                One tube lasts approximately <strong>3 months</strong> with daily use. That's about <strong>$0.70 per day</strong>—less than your morning coffee. Compare that to $150 every 3 weeks for extensions, and the savings are undeniable.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-200 hover:border-amber-400 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                How quickly will I see results?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Most users notice <strong>visible results in 4–6 weeks</strong>, with full results appearing by 8 weeks. This is because the serum works with your natural lash growth cycle, strengthening lashes from the root for lasting, natural beauty.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-200 hover:border-amber-400 transition-all shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can I use it with mascara?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes! Apply GrandLash at night after removing makeup, and you can wear mascara during the day. Many users find they need less mascara once their lashes grow longer and fuller.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl border-2 border-amber-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Lashes?
            </h3>
            <p className="text-slate-700 mb-6">
              Join 90,000+ women who ditched extensions for real, natural lashes.
            </p>
            <a
              href="https://www.amazon.com/dp/B082WZTJV5?social_share=cm_sw_r_cso_wa_mwn_dp_XXB3TP0Q34EC7FSE4TET&badgeInsights=bestseller-insights&th=1&linkCode=ll1&tag=aipicks20-20&linkId=8730dd8a3b2b424aef19cacfd6dd5aa6&language=en_US&ref_=as_li_ss_tl"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-bold text-xl rounded-full hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 border-2 border-amber-300"
            >
              🛒 GET GRANDLASH ON AMAZON
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
