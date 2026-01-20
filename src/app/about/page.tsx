import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - AI Picks",
  description: "Learn about AI Picks and our mission to help you create a better home.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
        About AI Picks
      </h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-lg text-slate-700 leading-relaxed">
          AI Picks is a curated resource for home accessories and practical guides. 
          Our mission is to help you create a more organized, comfortable, and beautiful 
          living space through thoughtful recommendations and actionable advice.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Approach</h2>
        <p className="text-slate-700 leading-relaxed">
          We take an editorial approach to product recommendations. Every product featured 
          on our site is carefully researched and evaluated based on quality, value, and 
          real-world usability. We focus on minimal, well-designed items that genuinely 
          improve your home.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Editorial Independence</h2>
        <p className="text-slate-700 leading-relaxed">
          Our recommendations are independent and unbiased. We don't accept payment from 
          brands to feature their products. When you click on an affiliate link and make 
          a purchase, we may earn a small commission at no additional cost to you. This 
          helps us continue providing free, valuable content.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Standards</h2>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Thorough research and testing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Clear, honest product reviews</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Regular content updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Transparent affiliate relationships</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Contact</h2>
        <p className="text-slate-700 leading-relaxed">
          Have questions or suggestions? We'd love to hear from you. 
          <a href="/contact" className="text-slate-900 underline ml-1">Get in touch</a>.
        </p>
      </div>
    </div>
  );
}
