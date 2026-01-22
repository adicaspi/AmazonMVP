"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white border-t-2 border-slate-200 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              🍪 We use cookies
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic,
              and personalize content. By clicking "Accept", you consent to our use of cookies.
              Read our{" "}
              <Link href="/privacy" className="text-slate-900 underline hover:text-slate-700">
                Privacy Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 rounded-lg shadow-md transition-all"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
