import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure - AI Picks",
  description: "Amazon affiliate disclosure and site ethics for AI Picks.",
};

export default function DisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
        Affiliate Disclosure
      </h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <div className="border-l-4 border-slate-900 pl-6 py-4 bg-slate-50 mb-8">
          <p className="text-lg font-semibold text-slate-900">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What This Means</h2>
          <p className="text-slate-700 leading-relaxed">
            AI Picks participates in the Amazon Services LLC Associates Program, an 
            affiliate advertising program designed to provide a means for sites to earn 
            advertising fees by advertising and linking to Amazon.com.
          </p>
          <p className="text-slate-700 leading-relaxed mt-4">
            When you click on a product link on our site and make a purchase on Amazon, 
            we may receive a small commission at no additional cost to you. This helps us 
            continue to provide free, valuable content and product recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Editorial Independence</h2>
          <p className="text-slate-700 leading-relaxed">
            Our product recommendations are based on thorough research, testing, and 
            editorial judgment. We do not accept payment from brands to feature their 
            products. Our affiliate relationships do not influence our recommendations 
            or reviews.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Pricing and Availability</h2>
          <p className="text-slate-700 leading-relaxed">
            Product prices and availability are accurate as of the date/time indicated 
            and are subject to change. Any price and availability information displayed 
            on Amazon at the time of purchase will apply to the purchase of the product.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Your Support</h2>
          <p className="text-slate-700 leading-relaxed">
            By using our affiliate links, you're supporting our work and helping us 
            continue to provide free, valuable content. We appreciate your support!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Questions</h2>
          <p className="text-slate-700 leading-relaxed">
            If you have any questions about our affiliate relationships or disclosure 
            practices, please <a href="/contact" className="text-slate-900 underline">contact us</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
