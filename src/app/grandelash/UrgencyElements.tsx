"use client";

import { useState, useEffect } from "react";

// Static initial values shown during SSR and before hydration.
// These prevent the "0" flash that kills credibility.
const INITIAL_VIEWERS = 24;
const INITIAL_STOCK = 9;

// Randomized range boundaries
const VIEWERS_MIN = 18;
const VIEWERS_MAX = 47;
const STOCK_MIN = 3;
const STOCK_MAX = 7;

function getRandomViewers() {
  return Math.floor(Math.random() * (VIEWERS_MAX - VIEWERS_MIN + 1)) + VIEWERS_MIN;
}

function getRandomStock() {
  return Math.floor(Math.random() * (STOCK_MAX - STOCK_MIN + 1)) + STOCK_MIN;
}

export function UrgencyElements() {
  const [viewers, setViewers] = useState(INITIAL_VIEWERS);
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Set randomized values on mount (client-side only)
    setViewers(getRandomViewers());
    setStock(getRandomStock());
    setHydrated(true);

    // Calculate time until midnight
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    // Drift viewers every 30s with small deltas for realism
    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(VIEWERS_MIN, Math.min(VIEWERS_MAX, prev + change));
      });
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerInterval);
    };
  }, []);

  return (
    <div className="space-y-3">
      {/* Price Display */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">$36</span>
              <span className="text-sm text-green-600 font-bold">Amazon&apos;s Choice</span>
            </div>
            <p className="text-sm text-rose-600 font-semibold mt-1">
              &#x23F0; Limited-time Amazon price
            </p>
            <p className="text-sm text-green-600 font-medium">
              &#x2713; 20K+ bought in past month
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-600 flex items-center gap-1 justify-end">
              <span>&#x2713;</span> Free Prime shipping
            </p>
            {/* Ships Today - prominent green with pulse */}
            <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 justify-end mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Ships Today!
            </p>
          </div>
        </div>
      </div>

      {/* Live Viewers & Stock Warning */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Live Viewers */}
        <div className="flex-1 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-sm font-medium text-amber-800">
            <strong>{viewers}</strong> people viewing now
          </span>
        </div>

        {/* Stock Warning */}
        <div className="flex-1 flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
          <span className="text-orange-500">&#x26A0;&#xFE0F;</span>
          <span className="text-sm font-medium text-orange-800">
            Only <strong>{stock}</strong> left at this price!
          </span>
        </div>
      </div>
    </div>
  );
}

export function MiniUrgency() {
  const [viewers, setViewers] = useState(INITIAL_VIEWERS);

  useEffect(() => {
    setViewers(getRandomViewers());
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(VIEWERS_MIN, Math.min(VIEWERS_MAX, prev + change));
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span><strong>{viewers}</strong> people viewing this right now</span>
    </div>
  );
}
