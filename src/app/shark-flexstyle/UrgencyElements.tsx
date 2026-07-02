"use client";

import { useState, useEffect } from "react";

// One clean urgency element: deal line + countdown. No fabricated viewer or
// stock counters — fake scarcity reads as spam and erodes trust.
export function UrgencyElements() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="bg-gray-900 text-white rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex items-center gap-2">
        <span className="text-lg">🔥</span>
        <span className="font-bold">Limited-Time Deal</span>
        <span className="hidden sm:inline text-xs text-gray-300">· Free Prime shipping · Ships today</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-300">Ends in</span>
        <div className="flex items-center gap-1 font-mono font-bold text-base tabular-nums">
          <span className="bg-white/15 rounded px-1.5 py-0.5">{pad(timeLeft.hours)}</span>
          <span>:</span>
          <span className="bg-white/15 rounded px-1.5 py-0.5">{pad(timeLeft.minutes)}</span>
          <span>:</span>
          <span className="bg-white/15 rounded px-1.5 py-0.5">{pad(timeLeft.seconds)}</span>
        </div>
      </div>
    </div>
  );
}
