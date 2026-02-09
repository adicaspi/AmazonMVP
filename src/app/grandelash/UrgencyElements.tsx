"use client";

export function UrgencyElements() {
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
            <p className="text-sm text-green-600 font-medium mt-1">
              ✓ 20K+ bought in past month
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-600 flex items-center gap-1 justify-end">
              <span>✓</span> Free Prime shipping
            </p>
            <p className="text-sm font-bold text-rose-600">
              Ships Today!
            </p>
          </div>
        </div>
      </div>

      {/* Real Trust Signals — no fake counters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <span className="text-amber-500">⭐</span>
          <span className="text-sm font-medium text-amber-800">
            <strong>4.8</strong> from 90K+ verified reviews
          </span>
        </div>

        <div className="flex-1 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <span className="text-green-500">🏆</span>
          <span className="text-sm font-medium text-green-800">
            <strong>#1 Best Seller</strong> in Lash Serums
          </span>
        </div>
      </div>
    </div>
  );
}

export function MiniUrgency() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-amber-400">⭐</span>
      <span><strong>4.8</strong> from 90K+ reviews &middot; <strong>20K+ bought last month</strong></span>
    </div>
  );
}
