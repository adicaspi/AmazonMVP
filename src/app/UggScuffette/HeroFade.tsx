"use client";

import { useEffect, useRef, useState } from "react";

// Hero carousel: swipeable, with arrows + dots so it's obviously browsable.
// Auto-advances every 4s until the user interacts.
// [USER ASSET] Photos pending — fill IMAGES when they arrive (same shape as
// the Birkenstock page: { src: "/images/ugg/....jpg", alt, pos }).
// Until then the carousel renders a clean branded placeholder.
// pos = object-position: bias crops toward where the slippers are in frame.
const IMAGES: { src: string; alt: string; pos: string }[] = [];

export function HeroFade() {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (interacted || IMAGES.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(t);
  }, [interacted]);

  const goTo = (i: number) => {
    setInteracted(true);
    setIndex(((i % IMAGES.length) + IMAGES.length) % IMAGES.length);
  };

  // Placeholder until product photos arrive
  if (IMAGES.length === 0) {
    return (
      <div>
        <div className="relative aspect-[2/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-gradient-to-br from-amber-100 via-stone-100 to-amber-200 flex flex-col items-center justify-center gap-3">
          <span className="text-6xl">🐑</span>
          <span className="text-xl font-black tracking-tight text-amber-900">UGG Scuffette II</span>
          <span className="text-xs text-amber-800/70">Photos coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        // Natural 2/3 ratio — images show in full, no cropping. The teaser
        // effect comes from the narrower mobile width set by the parent.
        className="relative aspect-[2/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-stone-100"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
        }}
      >
        {IMAGES.map((img, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: img.pos }}
          />
        ))}

        {/* Arrows */}
        <button
          onClick={() => goTo(index - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo(index + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? "bg-amber-700 w-6" : "bg-gray-300 hover:bg-gray-400 w-2.5"}`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
