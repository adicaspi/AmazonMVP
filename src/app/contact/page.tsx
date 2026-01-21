import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - AI Picks",
  description: "Get in touch with AI Picks.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
        Contact Us
      </h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-lg text-slate-700 leading-relaxed">
          We'd love to hear from you. Whether you have a question, suggestion, or feedback, 
          please don't hesitate to reach out.
        </p>

        <div className="border border-slate-200 bg-slate-50 p-6 rounded">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Email</h2>
          <p className="text-slate-700">
            For general inquiries, please email us at:{" "}
            <a href="mailto:info@aipicks.co" className="text-slate-900 underline">
              info@aipicks.co
            </a>
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-6 rounded">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Response Time</h2>
          <p className="text-slate-700">
            We aim to respond to all inquiries within 2-3 business days.
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-6 rounded">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Product Suggestions</h2>
          <p className="text-slate-700">
            Have a product you'd like us to review? Send us an email with details about 
            the product and why you think it would be a good fit for our audience.
          </p>
        </div>
      </div>
    </div>
  );
}
