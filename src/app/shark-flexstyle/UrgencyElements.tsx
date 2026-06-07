"use client";

import { useState, useEffect } from "react";

export function UrgencyElements() {
  const [viewers, setViewers] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    // Simulate realistic viewer count (12-28 people)
    setViewers(Math.floor(Math.random() * 17) + 12);

    // Simulate low stock (7-15 units)
    setStock(Math.floor(Math.random() * 9) + 7);

    // Update viewers every 30 seconds
    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(8, Math.min(35, prev + change));
      });
    }, 30000);

    return () => clearInterval(viewerInterval);
  }, []);

  return (
    <div className="space-y-3">
      {/* Price Display */}
      <div className="bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">$279</span>
              <span className="text-sm text-green-600 font-bold">Amazon&apos;s Choice</span>
            </div>
            <p className="text-sm text-amber-700 font-semibold mt-1">
              ⏰ Limited-time Amazon price
            </p>
            <p className="text-sm text-green-600 font-medium">
              ✓ Thousands bought this month
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-600 flex items-center gap-1 justify-end">
              <span>✓</span> Free Prime shipping
            </p>
            <p className="text-sm font-bold text-amber-700">
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
          <span className="text-orange-500">⚠️</span>
          <span className="text-sm font-medium text-orange-800">
            Only <strong>{stock}</strong> left at this price!
          </span>
        </div>
      </div>
    </div>
  );
}
