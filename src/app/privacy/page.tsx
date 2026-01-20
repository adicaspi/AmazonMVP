import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - AI Picks",
  description: "Privacy policy for AI Picks.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-sm text-slate-500 mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-slate-700 leading-relaxed">
            We collect information that you provide directly to us, such as when you 
            subscribe to our newsletter or contact us. We also automatically collect 
            certain information about your device and how you interact with our site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-slate-700 leading-relaxed">
            We use the information we collect to provide, maintain, and improve our 
            services, to communicate with you, and to analyze how our site is used.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Cookies and Tracking</h2>
          <p className="text-slate-700 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our 
            site and hold certain information. You can instruct your browser to refuse 
            all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Third-Party Services</h2>
          <p className="text-slate-700 leading-relaxed">
            Our site may contain links to third-party websites, including Amazon. 
            We are not responsible for the privacy practices of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Your Rights</h2>
          <p className="text-slate-700 leading-relaxed">
            You have the right to access, update, or delete your personal information. 
            If you have any questions about this privacy policy, please contact us.
          </p>
        </section>
      </div>
    </div>
  );
}
