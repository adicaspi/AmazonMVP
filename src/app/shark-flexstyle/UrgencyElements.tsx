// One clean, truthful deal bar. No fabricated counters and no fake countdown
// (a timer that resets at midnight every day is fake urgency — savvy Facebook
// traffic recognizes it and trusts the page less).
export function UrgencyElements() {
  return (
    <div className="bg-gray-900 text-white rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-lg">🔥</span>
        <span className="font-bold">Limited-Time Deal on Amazon</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-300">
        <span className="flex items-center gap-1"><span className="text-green-400">✓</span> Free Prime shipping</span>
        <span className="flex items-center gap-1"><span className="text-green-400">✓</span> Ships today</span>
      </div>
    </div>
  );
}
