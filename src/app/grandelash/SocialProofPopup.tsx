"use client";

import { useState, useEffect } from "react";

const recentBuyers = [
  { name: "Sarah M.", location: "New York", time: "2 minutes ago" },
  { name: "Emily R.", location: "Los Angeles", time: "5 minutes ago" },
  { name: "Jessica L.", location: "Chicago", time: "8 minutes ago" },
  { name: "Ashley K.", location: "Houston", time: "12 minutes ago" },
  { name: "Amanda T.", location: "Phoenix", time: "15 minutes ago" },
  { name: "Brittany S.", location: "Miami", time: "18 minutes ago" },
  { name: "Nicole P.", location: "Seattle", time: "22 minutes ago" },
  { name: "Stephanie W.", location: "Denver", time: "25 minutes ago" },
];

export function SocialProofPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Don't show on first load, wait a bit
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 8000); // Show first popup after 8 seconds

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible || hasInteracted) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentBuyer, hasInteracted]);

  useEffect(() => {
    if (hasInteracted) return;

    // Show next notification every 20-30 seconds
    const interval = setInterval(() => {
      setCurrentBuyer((prev) => (prev + 1) % recentBuyers.length);
      setIsVisible(true);
    }, 25000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, [hasInteracted]);

  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  const buyer = recentBuyers[currentBuyer];

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-32 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-40 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-lg">🛒</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {buyer.name} from {buyer.location}
          </p>
          <p className="text-xs text-gray-600 mt-0.5">
            Just purchased GrandeLASH-MD
          </p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {buyer.time}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">90,000+ reviews</span>
        </div>
        <span className="text-xs font-bold text-green-600">✓ Verified</span>
      </div>
    </div>
  );
}
