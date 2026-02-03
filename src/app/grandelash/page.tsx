import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "./HeroCarousel";
import { AmazonButton } from "@/components/AmazonButton";
import { ViewContentTracker } from "@/components/ViewContentTracker";

export const metadata: Metadata = {
  title: "GrandLash - Grow Your Own Natural Lashes | 90,000+ Happy Customers",
  description: "Ditch extensions and grow your own natural lashes. Ophthalmologist-tested. Real results in 8 weeks. Check price on Amazon.",
};

export default function GrandeLASHPage() {
  const amazonLink = "https://www.amazon.com/dp/B082WZTJV5?tag=aipicks20-20";

  return (
    <div className="min-h-screen bg-white">
      <ViewContentTracker
        productName="GrandeLASH-MD Lash Enhancing Serum"
        productId="grandelash"
        category="Beauty"
      />
      {/* Announcement Bar */}
      <div className="bg-rose-600 text-white text-center py-2 px-4 text-sm font-medium">
        ⭐ Over 90,000 Five-Star Reviews on Amazon ⭐
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <span>🏆</span>
                #1 Best Seller on Amazon
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Grow <span className="text-rose-600">Longer, Thicker</span> Natural Lashes in Just <span className="text-rose-600">8 Weeks</span>
              </h1>

              {/* Subheadline - More emotional */}
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Finally get the lashes you've always wanted — without extensions, glue, or expensive salon visits.
              </p>

              {/* Social Proof Line - Enhanced */}
              <p className="text-base text-gray-700 mb-6 font-medium">
                Clinically tested lash serum — trusted by <span className="text-rose-600 font-bold">90,000+ real women worldwide</span>
              </p>

              {/* CTA Button */}
              <div className="mb-4">
                <AmazonButton
                  href={amazonLink}
                  productName="GrandeLASH-MD"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xl rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                >
                  <span>Buy Now on Amazon</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
              </div>

              {/* Trust Elements Under CTA - Reordered */}
              <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Results or Your Money Back</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Free Prime Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Official Grande Cosmetics Store</span>
                </div>
              </div>

              {/* Rating - Amazon trust */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">4.8/5</span>
                <span className="text-gray-600">from <strong>90,000+ Verified Amazon Buyers</strong></span>
              </div>

              {/* FOMO Line - Shorter */}
              <p className="text-xs text-gray-500 mt-2 italic">
                Amazon Best-Seller This Month
              </p>
            </div>

            {/* Right - Product Carousel with Video */}
            <div>
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar - Enhanced */}
      <section className="bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 py-8 border-y border-rose-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">⭐</span>
              <div className="text-2xl md:text-3xl font-bold text-rose-600">90,000+</div>
              <div className="text-sm text-gray-600">5-Star Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🏆</span>
              <div className="text-2xl md:text-3xl font-bold text-rose-600">#1</div>
              <div className="text-sm text-gray-600">Best Seller on Amazon</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">👁️</span>
              <div className="text-2xl md:text-3xl font-bold text-rose-600">Tested</div>
              <div className="text-sm text-gray-600">Ophthalmologist Approved</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🐰</span>
              <div className="text-2xl md:text-3xl font-bold text-rose-600">100%</div>
              <div className="text-sm text-gray-600">Cruelty Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different - Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why GrandLash Beats Extensions
            </h2>
            <p className="text-lg text-gray-600">
              See how much you save in time, money, and lash health
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-gray-500 font-medium"></th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-rose-600 font-bold text-lg">GrandLash</span>
                      <span className="text-green-500 text-sm">✓ Recommended</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-gray-600 font-bold text-lg">Extensions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">Your Lashes</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Grows Your Real Lashes</td>
                  <td className="px-6 py-4 text-center text-red-500">Fake Lashes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 font-medium">Time Required</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">30 Seconds / Day</td>
                  <td className="px-6 py-4 text-center text-red-500">2-3 Hours at Salon</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">Annual Cost</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">~$280/year</td>
                  <td className="px-6 py-4 text-center text-red-500">$2,000+/year</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 font-medium">Safety</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Ophthalmologist Tested</td>
                  <td className="px-6 py-4 text-center text-red-500">Glue & Chemicals</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">Lash Health</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Strengthens Lashes</td>
                  <td className="px-6 py-4 text-center text-red-500">Damages Natural Lashes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Save $1,800/Year - Buy Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real Women
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the transformation for yourself. No filters, no extensions - just naturally longer, fuller lashes.
            </p>
          </div>

          {/* Results Gallery */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125476/WhatsApp_Image_2026-02-03_at_09.47.22_qin8v4.jpg"
                alt="Customer Before and After Results"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125473/WhatsApp_Image_2026-02-03_at_09.49.37_sian5m.jpg"
                alt="Amazing Lash Transformation"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125472/WhatsApp_Image_2026-02-03_at_09.48.01_hh0bs8.jpg"
                alt="Real Customer Lash Growth"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/grandelash/promo-before-after.jpeg"
                alt="Before and After Results"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-6">
              <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-2">The Problem with Extensions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>$150-300 every 2-3 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>Damages your natural lashes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>Hours spent at the salon</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-2">The GrandLash Solution</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>One tube lasts 3 months (~$70)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Strengthens & nourishes lashes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>30 seconds a day, at home</span>
                  </li>
                </ul>
              </div>

              <AmazonButton
                href={amazonLink}
                productName="GrandeLASH-MD"
                className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Get Your GrandLash Now
              </AmazonButton>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple. Effective. Just 30 seconds a day.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="font-bold text-xl mb-3">Apply Nightly</h3>
              <p className="text-gray-600">Apply to clean, dry lashes before bed. One stroke along the lash line.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="font-bold text-xl mb-3">Be Consistent</h3>
              <p className="text-gray-600">Use daily for best results. The serum works with your natural lash growth cycle.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="font-bold text-xl mb-3">See Results</h3>
              <p className="text-gray-600">Notice longer, fuller lashes in 4-6 weeks. Full results by 8-12 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Loved by 90,000+ Women
            </h2>
            <p className="text-lg text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", text: "After 6 weeks, my lashes are longer than my extensions ever were. I've saved over $1,200 this year!", rating: 5 },
              { name: "Jessica L.", text: "Extensions were ruining my natural lashes. Switched to GrandLash and they're now longer and thicker than before!", rating: 5 },
              { name: "Michelle R.", text: "By week 8, people kept asking if I had extensions. This serum is a complete game-changer!", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-green-600 font-medium">✓ Verified Purchase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Join 90,000+ Happy Customers
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Real Video Reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See The Results For Yourself
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch real customers share their amazing transformations
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-rose-100 to-pink-100 aspect-[9/16] p-2">
              <video
                className="w-full h-full object-contain rounded-xl"
                controls
                playsInline
                preload="metadata"
                poster="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125476/WhatsApp_Image_2026-02-03_at_09.47.22_qin8v4.jpg"
              >
                <source src="https://res.cloudinary.com/dzkgopplv/video/upload/v1770125538/WhatsApp_Video_2026-02-03_at_09.47.39_y4luwi.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-2 left-2 right-2 bg-rose-600/90 backdrop-blur-sm p-3 rounded-xl">
                <p className="text-white font-semibold text-sm md:text-base">Real Customer Review</p>
                <p className="text-rose-100 text-xs md:text-sm">Amazing results in 8 weeks!</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-rose-100 to-pink-100 aspect-[9/16] p-2">
              <video
                className="w-full h-full object-contain rounded-xl"
                controls
                playsInline
                preload="metadata"
                poster="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125473/WhatsApp_Image_2026-02-03_at_09.49.37_sian5m.jpg"
              >
                <source src="https://res.cloudinary.com/dzkgopplv/video/upload/v1770125528/WhatsApp_Video_2026-02-01_at_18.10.00_ayx8jr.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-2 left-2 right-2 bg-rose-600/90 backdrop-blur-sm p-3 rounded-xl">
                <p className="text-white font-semibold text-sm md:text-base">Before & After</p>
                <p className="text-rose-100 text-xs md:text-sm">See the transformation!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Get These Results Too
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* FAQ Section - Expanded */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to know about GrandLash
          </p>

          <div className="space-y-4">
            {[
              {
                q: "Does it really work?",
                a: "Yes! GrandLash is clinically proven to show visible lash growth in as little as 4-6 weeks, with full results by 8-12 weeks. Over 90,000 women have seen real results."
              },
              {
                q: "Will it irritate my eyes?",
                a: "GrandLash is ophthalmologist tested and safe for sensitive eyes. It's also safe for contact lens wearers. Some users may experience mild tingling which is normal and temporary."
              },
              {
                q: "When will I see first results?",
                a: "Most users notice their lashes looking healthier within 2-3 weeks. Visible length improvement typically appears at 4-6 weeks, with dramatic results by week 8-12."
              },
              {
                q: "Can I use it with mascara?",
                a: "Absolutely! Apply GrandLash at night on clean lashes before bed. During the day, you can wear your favorite mascara as usual."
              },
              {
                q: "Is it safe during pregnancy?",
                a: "While GrandLash is safe for most users, we recommend consulting with your doctor before using any new cosmetic products during pregnancy or nursing."
              },
              {
                q: "How long does one tube last?",
                a: "One tube lasts approximately 3 months with daily use. That's less than $1 per day for salon-quality lashes!"
              },
              {
                q: "What happens if I stop using it?",
                a: "Your lashes will gradually return to their natural state over time. Many users continue with a maintenance routine of 2-3 times per week to keep results."
              },
              {
                q: "What if it doesn't work for me?",
                a: "Amazon offers a hassle-free return policy. If you're not satisfied with your results, you can return it within 30 days for a full refund."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Get Your GrandLash Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-rose-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Longer, Fuller Lashes?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Join over 90,000 women who've transformed their lashes naturally.
            Stop spending on extensions and start growing your own beautiful lashes.
          </p>
          <AmazonButton
            href={amazonLink}
            productName="GrandeLASH-MD"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-white text-rose-600 font-bold text-xl rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Buy Now on Amazon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <p className="text-rose-200 text-sm mt-4">Free shipping with Amazon Prime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 pb-8 border-b border-gray-700">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. This helps support our recommendations at no extra cost to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclosure" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>

          <p className="text-xs text-gray-500">
            Results may vary. This product is not intended to diagnose, treat, cure, or prevent any disease. © 2026 AI Picks. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 p-4 md:hidden z-50">
        <AmazonButton
          href={amazonLink}
          productName="GrandeLASH-MD"
          className="flex items-center justify-center gap-2 w-full py-4 bg-rose-600 text-white font-bold rounded-full shadow-lg"
        >
          <span>Buy Now on Amazon</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </AmazonButton>
      </div>
      <div className="h-24 md:hidden"></div>
    </div>
  );
}
