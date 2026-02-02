import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "GrandLash - Grow Your Own Natural Lashes | 90,000+ Happy Customers",
  description: "Ditch extensions and grow your own natural lashes. Ophthalmologist-tested. Real results in 8 weeks. Check price on Amazon.",
};

export default function GrandeLASHPage() {
  const amazonLink = "https://www.amazon.com/dp/B082WZTJV5?tag=aipicks20-20";

  return (
    <div className="min-h-screen bg-white">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-3 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-white">
          <span className="font-medium text-center">
            🔥 Limited Time: Get GrandLash with FREE Prime Shipping
          </span>
          <a
            href={amazonLink}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-block px-6 py-2 bg-white text-orange-600 font-bold text-sm rounded-full hover:bg-gray-100 transition-all shadow-md"
          >
            Buy Now on Amazon →
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-6 md:py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Main Promotional Image */}
          <div className="mb-6">
            <Image
              src="/images/grandelash/promo-before-after.jpeg"
              alt="GrandLash Before and After Results"
              width={1024}
              height={1024}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-16 py-5 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] text-black font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#a88734]"
            >
              🛒 Check Price on Amazon
            </a>
            <p className="text-sm text-gray-500 mt-3">✓ Free shipping with Prime • ✓ 90,000+ 5-star reviews</p>
          </div>
        </div>
      </section>

      {/* Second Promotional Image */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Image
              src="/images/grandelash/promo-solution.jpeg"
              alt="GrandLash - The Problem vs The Solution"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-16 py-5 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] text-black font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#a88734]"
            >
              🛍️ Shop Now on Amazon
            </a>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            Why 90,000+ Women Made The Switch
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">Save $1,800/Year</h3>
              <p className="text-gray-600 text-sm">No more expensive monthly fills</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="font-bold text-lg mb-2">Results in 8 Weeks</h3>
              <p className="text-gray-600 text-sm">Visible longer, fuller lashes</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-bold text-lg mb-2">Ophthalmologist-Tested</h3>
              <p className="text-gray-600 text-sm">Safe for sensitive eyes</p>
            </div>
          </div>

          {/* CTA after benefits */}
          <div className="text-center">
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-14 py-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] text-black font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#a88734]"
            >
              Get GrandLash on Amazon →
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Extensions vs GrandLash
          </h2>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-3 text-left"></th>
                  <th className="px-4 py-3 text-center">Extensions</th>
                  <th className="px-4 py-3 text-center bg-green-600">GrandLash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Annual Cost</td>
                  <td className="px-4 py-3 text-center text-gray-600">$1,500+</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">~$70</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Time</td>
                  <td className="px-4 py-3 text-center text-gray-600">2-3 hrs/month</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">30 sec/day</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Damage</td>
                  <td className="px-4 py-3 text-center text-red-600">Yes</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Natural Look</td>
                  <td className="px-4 py-3 text-center text-gray-600">Sometimes</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">Always</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-14 py-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] text-black font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#a88734]"
            >
              💵 Start Saving Today →
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-gray-600">90,000+ 5-Star Reviews on Amazon</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "After 6 weeks, my lashes are longer than my extensions ever were. Saved over $1,200 this year!"
              </p>
              <p className="font-medium text-sm">Sarah M. <span className="text-green-600">✓ Verified</span></p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Extensions were ruining my natural lashes. Switched to GrandLash and they're now longer than ever!"
              </p>
              <p className="font-medium text-sm">Jessica L. <span className="text-green-600">✓ Verified</span></p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "By week 8, people kept asking if I had extensions. This serum is a game-changer!"
              </p>
              <p className="font-medium text-sm">Michelle R. <span className="text-green-600">✓ Verified</span></p>
            </div>
          </div>

          {/* CTA after reviews */}
          <div className="text-center">
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-14 py-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] text-black font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#a88734]"
            >
              Join 90,000+ Happy Customers →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Common Questions
          </h2>

          <div className="space-y-4 mb-10">
            <div className="bg-white p-5 rounded-xl">
              <h3 className="font-bold mb-2">Is it safe for sensitive eyes?</h3>
              <p className="text-gray-600 text-sm">Yes, it's ophthalmologist-tested and safe for contact lens wearers.</p>
            </div>

            <div className="bg-white p-5 rounded-xl">
              <h3 className="font-bold mb-2">How long does one tube last?</h3>
              <p className="text-gray-600 text-sm">About 3 months with daily use - that's less than $1/day.</p>
            </div>

            <div className="bg-white p-5 rounded-xl">
              <h3 className="font-bold mb-2">When will I see results?</h3>
              <p className="text-gray-600 text-sm">Most users see visible results in 4-6 weeks, with full results by 8 weeks.</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center p-8 bg-orange-50 rounded-2xl border-2 border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Transform Your Lashes?</h3>
            <p className="text-gray-600 mb-5">Join thousands of women who ditched extensions</p>
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block px-16 py-5 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] text-black font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#a88734]"
            >
              🛒 Buy Now on Amazon
            </a>
            <p className="text-xs text-gray-500 mt-3">Free shipping with Prime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6 pb-6 border-b border-gray-700">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. This helps support our recommendations at no extra cost to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/disclosure" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>

          <p className="text-xs text-gray-500">
            Results may vary. Not intended to diagnose or treat any condition. © 2026 AI Picks
          </p>
        </div>
      </footer>

      {/* Sticky Bottom CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden z-50">
        <a
          href={amazonLink}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="block w-full py-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] text-black font-bold text-lg rounded-lg text-center shadow-lg border border-[#a88734]"
        >
          🛒 Buy Now on Amazon
        </a>
      </div>

      {/* Spacer for sticky button on mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
