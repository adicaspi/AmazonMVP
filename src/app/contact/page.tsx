import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - AI Picks",
  description: "Get in touch with AI Picks. We'd love to hear from you about product suggestions, partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              We're Here to Help
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
            Our team is here to help make your home even better.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Email Card */}
          <div className="group bg-white border-2 border-slate-200 rounded-xl p-6 sm:p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Email Us</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  For general inquiries, product suggestions, or partnership opportunities
                </p>
                <a
                  href="mailto:info@aipicks.co"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition-colors group/link"
                >
                  <span>info@aipicks.co</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="group bg-white border-2 border-slate-200 rounded-xl p-6 sm:p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Quick Response</h2>
                <p className="text-slate-600 leading-relaxed">
                  We aim to respond to all inquiries within <span className="font-semibold text-slate-900">2-3 business days</span>.
                  For urgent matters, please mention "URGENT" in your subject line.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Can Contact Us About */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 sm:p-10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
            What Can We Help You With?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Suggestions */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Product Suggestions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Know a product that deserves to be featured? Tell us about it!
              </p>
            </div>

            {/* Partnership Opportunities */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Partnerships</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interested in collaborating? Let's explore opportunities together.
              </p>
            </div>

            {/* Feedback */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Feedback</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your thoughts help us improve. Share your experience with us.
              </p>
            </div>

            {/* Technical Issues */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Issues</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Experiencing a problem with our site? We'll fix it right away.
              </p>
            </div>

            {/* Press Inquiries */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Press & Media</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Media inquiries and press kit requests are always welcome.
              </p>
            </div>

            {/* General Questions */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">General Questions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Have a question? Don't hesitate to ask. We're here to help!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Reach Out?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            We're excited to hear from you! Drop us an email and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:info@aipicks.co"
            className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Send Us an Email
          </a>
        </div>
      </div>
    </div>
  );
}
