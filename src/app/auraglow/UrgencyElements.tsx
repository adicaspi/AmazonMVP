"use client";

import { useState, useEffect } from "react";

export function UrgencyElements() {
  const [viewers, setViewers] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 17) + 12);
    setStock(Math.floor(Math.random() * 9) + 7);

    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(35, prev + change));
      });
    }, 30000);

    return () => clearInterval(viewerInterval);
  }, []);

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">$29.99</span>
              <span className="text-lg text-gray-400 line-through">$39.99</span>
              <span className="text-sm text-green-600 font-bold">25% OFF</span>
            </div>
            <p className="text-sm text-blue-600 font-semibold mt-1">
              Amazon&apos;s Choice for teeth whitening
            </p>
            <p className="text-sm text-green-600 font-medium">
              15K+ bought in past month
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-600 flex items-center gap-1 justify-end">
              <span>&#10003;</span> Free Prime shipping
            </p>
            <p className="text-sm font-bold text-blue-700">
              Ships Today!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-sm font-medium text-amber-800">
            <strong>{viewers}</strong> people viewing now
          </span>
        </div>

        <div className="flex-1 flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
          <span className="text-orange-500">&#9888;&#65039;</span>
          <span className="text-sm font-medium text-orange-800">
            Only <strong>{stock}</strong> left at this price!
          </span>
        </div>
      </div>
    </div>
  );
}
