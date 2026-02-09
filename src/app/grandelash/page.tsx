import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "./HeroCarousel";
import { AmazonButton } from "@/components/AmazonButton";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { PageViewTracker } from "@/components/PageViewTracker";
import { UrgencyElements } from "./UrgencyElements";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { SocialProofPopup } from "./SocialProofPopup";

export const metadata: Metadata = {
  title: "GrandeLASH-MD Lash Serum | Grow Longer Lashes in 8 Weeks",
  description: "The #1 Best-Selling Lash Serum on Amazon. 90,000+ 5-star reviews. Grow longer, thicker, fuller lashes naturally. Ophthalmologist tested. $36 with free Prime shipping.",
  openGraph: {
    title: "GrandeLASH-MD - Grow Longer, Thicker Lashes in 8 Weeks",
    description: "The #1 Best-Selling Lash Serum on Amazon. 90,000+ 5-star reviews. Ophthalmologist tested. Real results, naturally.",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/61QhbRMdKIL._SL1500_.jpg",
        width: 1500,
        height: 1500,
        alt: "GrandeLASH-MD Lash Enhancing Serum",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrandeLASH-MD - Grow Longer, Thicker Lashes in 8 Weeks",
    description: "The #1 Best-Selling Lash Serum on Amazon. 90,000+ 5-star reviews. Real results in 8 weeks!",
    images: ["https://m.media-amazon.com/images/I/61QhbRMdKIL._SL1500_.jpg"],
  },
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
      <PageViewTracker page="/grandelash" />

      {/* Urgency Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold animate-pulse">
          <span>🔥</span>
          <span>BEST SELLER: 20K+ Bought Last Month!</span>
          <span>🔥</span>
        </div>
      </div>

      {/* ============================================ */}
      {/* HERO SECTION — Transformation-First Approach */}
      {/* ============================================ */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-16">
          {/* Mobile: Transformation headline + rating ABOVE carousel */}
          <div className="md:hidden mb-3">
            <h1 className="text-xl font-bold text-gray-900 leading-snug mb-1.5">
              From Sparse to <span className="text-rose-600">Full Lashes</span> in 8 Weeks
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Clinically tested serum. 90K+ verified results.
            </p>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-gray-900 text-white text-xs font-medium px-2 py-0.5 rounded">Amazon&apos;s Choice</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">4.8 (90K+)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Carousel — B/A leads */}
            <div className="order-1 md:order-2">
              <HeroCarousel />
            </div>

            {/* Content */}
            <div className="order-2 md:order-1">
              {/* Desktop only: badges and headline */}
              <div className="hidden md:block">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
                    <span>🏆</span>
                    #1 Best Seller
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  From Sparse to <span className="text-rose-600">Full Lashes</span> — In Just <span className="text-rose-600">8 Weeks</span>
                </h1>

                <p className="text-xl text-gray-600 mb-4">
                  Clinically tested serum. No glue, no salon visits, no damage to your natural lashes.
                </p>

                <p className="text-lg text-rose-700 font-bold mb-4 flex items-center gap-2">
                  Join <span className="text-rose-600 font-extrabold">90,000+ women</span> who quit extensions forever.
                </p>

                <p className="text-base text-green-700 font-bold mb-6 flex items-center gap-2">
                  <span>💰</span>
                  Save $2,256/year compared to lash extensions
                </p>
              </div>

              {/* Urgency Elements - Price, Timer, Stock */}
              <div className="mb-4 md:mb-5">
                <UrgencyElements />
              </div>

              {/* CTA Button - Outcome Based */}
              <div className="mb-4">
                <AmazonButton
                  href={amazonLink}
                  productName="GrandeLASH-MD"
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-5 md:py-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xl md:text-2xl rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                >
                  <span>Start Your Lash Transformation</span>
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                {/* Mobile-only quick trust badges */}
                <div className="flex items-center justify-center gap-4 mt-3 md:hidden">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Free Shipping
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> 30-Day Returns
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Prime
                  </span>
                </div>
              </div>

              {/* Identity Bridge - Mobile */}
              <p className="text-center text-sm text-gray-600 mb-3 md:hidden font-medium">
                Join <span className="text-rose-600 font-bold">90,000+ women</span> who quit extensions forever.
              </p>

              {/* Trust Elements Under CTA - Desktop only */}
              <div className="hidden md:flex flex-col gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>30-Day Money Back Guarantee</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Free & Fast Prime Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Ships Today if Ordered Within 2 Hours</span>
                </div>
              </div>

              {/* Rating - Desktop only */}
              <div className="hidden md:flex flex-wrap items-center gap-2 text-sm">
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
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* RAPID PROOF STACK — Immediately After Hero   */}
      {/* ============================================ */}
      <section className="py-6 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-4 md:mb-8">
            Real Results from Real Women
          </h2>
          {/* 3 Before/After Side by Side */}
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-center">
              <img
                src="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125476/WhatsApp_Image_2026-02-03_at_09.47.22_qin8v4.jpg"
                alt="Customer Before and After Results — Week 4"
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-semibold">Week 4 Results</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-center">
              <img
                src="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125473/WhatsApp_Image_2026-02-03_at_09.49.37_sian5m.jpg"
                alt="Amazing Lash Transformation — Week 6"
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-semibold">Week 6 Results</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-center">
              <img
                src="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125472/WhatsApp_Image_2026-02-03_at_09.48.01_hh0bs8.jpg"
                alt="Real Customer Lash Growth — Week 8"
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-semibold">Week 8 Results</p>
              </div>
            </div>
          </div>
          {/* Swipe indicator - mobile only */}
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400 md:hidden">
            <span>&larr; Swipe for more &rarr;</span>
          </div>

          {/* CTA after proof stack */}
          <div className="text-center mt-6">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              position="proof-stack"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Get These Results on Amazon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO PROOF — Moved Up (was below reviews)   */}
      {/* ============================================ */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-4 md:mb-8">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Real Video Reviews
            </div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-3">
              Watch Real Transformations
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              20-second before &amp; after from verified customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-sm md:max-w-2xl mx-auto">
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
                <p className="text-white font-semibold text-sm md:text-base">Before &amp; After</p>
                <p className="text-rose-100 text-xs md:text-sm">See the transformation!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              position="video-testimonials"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Start Your Transformation on Amazon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRANSFORMATION TIMELINE — High Impact        */}
      {/* ============================================ */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-6 md:mb-10">
            Your Lash Growth Timeline
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-rose-400 to-rose-600"></div>

            <div className="space-y-6 md:space-y-8">
              {/* Week 1-2 */}
              <div className="flex gap-4 md:gap-6 items-start">
                <div className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold text-sm md:text-base border-2 border-rose-300 z-10">
                  1-2
                </div>
                <div className="bg-rose-50 rounded-xl p-4 flex-1 border border-rose-100">
                  <h3 className="font-bold text-base md:text-lg text-gray-900">Conditioning Phase</h3>
                  <p className="text-sm text-gray-600 mt-1">Serum nourishes and strengthens your natural lash follicles. Lashes begin to feel healthier.</p>
                </div>
              </div>

              {/* Week 3-5 */}
              <div className="flex gap-4 md:gap-6 items-start">
                <div className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center font-bold text-sm md:text-base border-2 border-rose-400 z-10">
                  3-5
                </div>
                <div className="bg-rose-50 rounded-xl p-4 flex-1 border border-rose-200">
                  <h3 className="font-bold text-base md:text-lg text-gray-900">Visible Growth</h3>
                  <p className="text-sm text-gray-600 mt-1">Noticeable length increase. Friends start asking if you got extensions. Lashes appear thicker.</p>
                </div>
              </div>

              {/* Week 6-8 */}
              <div className="flex gap-4 md:gap-6 items-start">
                <div className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base border-2 border-rose-600 z-10">
                  6-8
                </div>
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 flex-1 border border-rose-300 shadow-sm">
                  <h3 className="font-bold text-base md:text-lg text-gray-900">Full Lash Look</h3>
                  <p className="text-sm text-gray-600 mt-1">Dramatically longer, fuller, thicker lashes. No mascara needed. Extensions officially unnecessary.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              position="timeline"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Start Your 8-Week Transformation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SOCIAL PROOF BAR                             */}
      {/* ============================================ */}
      <section className="bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 py-4 md:py-8 border-y border-rose-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">⭐</span>
              <div className="text-lg md:text-3xl font-bold text-rose-600">90,000+</div>
              <div className="text-xs md:text-sm text-gray-600">5-Star Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">🏆</span>
              <div className="text-lg md:text-3xl font-bold text-rose-600">#1</div>
              <div className="text-xs md:text-sm text-gray-600">Best Seller</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">👁️</span>
              <div className="text-lg md:text-3xl font-bold text-rose-600">Tested</div>
              <div className="text-xs md:text-sm text-gray-600">Doctor Approved</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">🐰</span>
              <div className="text-lg md:text-3xl font-bold text-rose-600">100%</div>
              <div className="text-xs md:text-sm text-gray-600">Cruelty Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICE ANCHORING — Visual Math Breakdown      */}
      {/* ============================================ */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Why GrandLash Beats Extensions
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Do the math — the savings are massive
            </p>
          </div>

          {/* Visual Math — The Money Shot */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {/* Extensions Cost */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 md:p-6 text-center">
              <p className="text-sm font-semibold text-red-500 mb-2 uppercase tracking-wide">Extensions</p>
              <p className="text-lg md:text-xl text-gray-700 mb-1">$200 &times; 12 visits</p>
              <p className="text-3xl md:text-4xl font-extrabold text-red-600">$2,400<span className="text-base font-normal text-red-400">/year</span></p>
            </div>

            {/* GrandLash Cost */}
            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-5 md:p-6 text-center shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</div>
              <p className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wide">GrandLash</p>
              <p className="text-lg md:text-xl text-gray-700 mb-1">$36 &times; 4 tubes</p>
              <p className="text-3xl md:text-4xl font-extrabold text-green-600">$144<span className="text-base font-normal text-green-400">/year</span></p>
            </div>

            {/* You Save */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 md:p-6 text-center">
              <p className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wide">You Save</p>
              <p className="text-3xl md:text-5xl font-extrabold text-amber-600">$2,256</p>
              <p className="text-base md:text-lg font-bold text-amber-500">Every Year</p>
            </div>
          </div>

          {/* Comparison Table */}
          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Your Lashes", good: "Real", bad: "Fake" },
              { label: "Time", good: "30 sec/day", bad: "2-3 hours" },
              { label: "Safety", good: "Doctor Tested", bad: "Glue" },
              { label: "Health", good: "Strengthens", bad: "Damages" },
            ].map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500 mb-2 font-medium">{row.label}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">GrandLash</div>
                    <div className="text-green-600 font-bold text-sm">{row.good}</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Extensions</div>
                    <div className="text-red-500 font-bold text-sm">{row.bad}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
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
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">$144/year</td>
                  <td className="px-6 py-4 text-center text-red-500">$2,400+/year</td>
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
              position="comparison-table"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Save $2,256/Year — Get GrandLash Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BEFORE/AFTER DEEP DIVE + Problem/Solution    */}
      {/* ============================================ */}
      <section className="py-10 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/grandelash/promo-before-after.jpeg"
                alt="Before and After Results"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 md:p-6 rounded-r-xl">
                <h3 className="font-bold text-base md:text-xl text-gray-900 mb-2">The Problem with Extensions</h3>
                <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>$150-300 every 2-3 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>Damages your natural lashes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>Hours spent at the salon</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 md:p-6 rounded-r-xl">
                <h3 className="font-bold text-base md:text-xl text-gray-900 mb-2">The GrandLash Solution</h3>
                <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>One tube lasts 3 months ($36)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Strengthens & nourishes lashes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>30 seconds a day, at home</span>
                  </li>
                </ul>
              </div>

              <AmazonButton
                href={amazonLink}
                productName="GrandeLASH-MD"
                position="benefits-card"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 md:px-8 md:py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Ditch Extensions — Get GrandLash
              </AmazonButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS                                 */}
      {/* ============================================ */}
      <section className="py-10 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              How It Works
            </h2>
            <p className="text-sm md:text-lg text-gray-600">Simple. Effective. Just 30 seconds a day.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-6 text-lg md:text-2xl font-bold">1</div>
              <h3 className="font-bold text-sm md:text-xl mb-1 md:mb-3">Apply Nightly</h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">Apply to clean, dry lashes before bed. One stroke along the lash line.</p>
              <p className="text-xs text-gray-600 md:hidden">Before bed</p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-6 text-lg md:text-2xl font-bold">2</div>
              <h3 className="font-bold text-sm md:text-xl mb-1 md:mb-3">Be Consistent</h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">Use daily for best results. The serum works with your natural lash growth cycle.</p>
              <p className="text-xs text-gray-600 md:hidden">Use daily</p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-6 text-lg md:text-2xl font-bold">3</div>
              <h3 className="font-bold text-sm md:text-xl mb-1 md:mb-3">See Results</h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">Notice longer, fuller lashes in 4-6 weeks. Full results by 8-12 weeks.</p>
              <p className="text-xs text-gray-600 md:hidden">4-8 weeks</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* REVIEWS SECTION                              */}
      {/* ============================================ */}
      <section className="py-10 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-2 md:mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 md:w-8 md:h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Loved by 90,000+ Women
            </h2>
            <p className="text-sm md:text-lg text-gray-600">Don&apos;t just take our word for it</p>
          </div>

          {/* Reviews - Horizontal scroll on mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { name: "Sarah M.", text: "After 6 weeks, my lashes are longer than my extensions ever were. I've saved over $1,200 this year!", rating: 5 },
              { name: "Jessica L.", text: "Extensions were ruining my natural lashes. Switched to GrandLash and they're now longer and thicker than before!", rating: 5 },
              { name: "Michelle R.", text: "By week 8, people kept asking if I had extensions. This serum is a complete game-changer!", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md flex-shrink-0 w-[85vw] md:w-auto snap-center">
                <div className="flex gap-0.5 mb-2 md:mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 text-rose-600 rounded-full flex items-center justify-center font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-green-600 font-medium">✓ Verified Amazon Purchase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Swipe indicator - mobile only */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400 md:hidden">
            <span>&larr; Swipe to read more reviews &rarr;</span>
          </div>

          <div className="text-center mt-6 md:mt-10">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              position="reviews-section"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Join 90,000+ Women Who Quit Extensions
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Trust Bar Before FAQ */}
      <section className="py-6 md:py-8 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Prime Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">30-Day Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Ophthalmologist Tested</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl md:text-3xl">🐰</span>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Cruelty Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION                                  */}
      {/* ============================================ */}
      <section className="py-10 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 mb-6 md:mb-12">
            Everything you need to know about GrandLash
          </p>

          <div className="space-y-3 md:space-y-4">
            {[
              {
                q: "Does it really work?",
                a: "Yes! GrandLash is clinically proven to show visible lash growth in as little as 4-6 weeks, with full results by 8-12 weeks. Over 90,000 women have seen real results.",
                showMobile: true
              },
              {
                q: "When will I see first results?",
                a: "Most users notice their lashes looking healthier within 2-3 weeks. Visible length improvement typically appears at 4-6 weeks, with dramatic results by week 8-12.",
                showMobile: true
              },
              {
                q: "Will it irritate my eyes?",
                a: "GrandLash is ophthalmologist tested and safe for sensitive eyes. It's also safe for contact lens wearers. Some users may experience mild tingling which is normal and temporary.",
                showMobile: true
              },
              {
                q: "What if it doesn't work for me?",
                a: "Amazon offers a hassle-free return policy. If you're not satisfied with your results, you can return it within 30 days for a full refund.",
                showMobile: true
              },
              {
                q: "Can I use it with mascara?",
                a: "Absolutely! Apply GrandLash at night on clean lashes before bed. During the day, you can wear your favorite mascara as usual.",
                showMobile: false
              },
              {
                q: "Is it safe during pregnancy?",
                a: "While GrandLash is safe for most users, we recommend consulting with your doctor before using any new cosmetic products during pregnancy or nursing.",
                showMobile: false
              },
              {
                q: "How long does one tube last?",
                a: "One tube lasts approximately 3 months with daily use. That's less than $1 per day for salon-quality lashes!",
                showMobile: false
              },
              {
                q: "What happens if I stop using it?",
                a: "Your lashes will gradually return to their natural state over time. Many users continue with a maintenance routine of 2-3 times per week to keep results.",
                showMobile: false
              }
            ].map((faq, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${!faq.showMobile ? 'hidden md:block' : ''}`}>
                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2">{faq.q}</h3>
                <p className="text-sm md:text-base text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <AmazonButton
              href={amazonLink}
              productName="GrandeLASH-MD"
              position="faq-section"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Get Your Lash Transformation Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA — With Identity Bridge              */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-rose-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Amazon&apos;s Choice - 20K+ Bought Last Month!
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join 90,000+ Women Who Quit Extensions Forever
          </h2>
          <p className="text-xl text-rose-100 mb-4 max-w-2xl mx-auto">
            Start growing your own naturally longer, fuller lashes today.
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-4xl font-bold">$36</span>
            <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full">
              Amazon&apos;s Choice
            </span>
          </div>
          <AmazonButton
            href={amazonLink}
            productName="GrandeLASH-MD"
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-white text-rose-600 font-bold text-xl rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start Your 8-Week Lash Transformation
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <p className="text-rose-200 text-sm mt-4">Free Prime shipping + 30-day money back guarantee</p>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-gray-100 py-6 md:py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Secure Checkout via Amazon</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">Fast Prime Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">30-Day Money Back Guarantee</span>
            </div>
          </div>
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
            Results may vary. This product is not intended to diagnose, treat, cure, or prevent any disease. &copy; 2026 AI Picks. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Social Proof Popup */}
      <SocialProofPopup />

      {/* Sticky Mobile CTA - Always visible on mobile */}
      <StickyMobileCTA amazonLink={amazonLink} />
    </div>
  );
}
