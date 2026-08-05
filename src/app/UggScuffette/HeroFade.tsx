"use client";

import { useEffect, useRef, useState } from "react";

// Hero carousel: swipeable, with arrows + dots so it's obviously browsable.
// Auto-advances every 4s until the user interacts.
// [USER ASSET] Lifestyle photos pending — fill IMAGES when they arrive (same
// shape as the Birkenstock page). Until then the carousel runs on the
// official Amazon product images passed in via `apiImages` (Creators API).
// pos = object-position for lifestyle crops; API product shots render
// object-contain (white studio background, never cropped).
const IMAGES: { src: string; alt: string; pos: string }[] = [];

type Slide = { src: string; alt: string; pos: string; contain: boolean };

export function HeroFade({ apiImages, placeholderEmoji = "\ud83d\udc11", placeholderTitle = "UGG Scuffette II" }: { apiImages?: { url: string; alt: string }[]; placeholderEmoji?: string; placeholderTitle?: string }) {
  const slides: Slide[] =
    IMAGES.length > 0
      ? IMAGES.map((img) => ({ ...img, contain: false }))
      : (apiImages || []).map((img) => ({ src: img.url, alt: img.alt, pos: "50% 50%", contain: true }));

  // Amazon product shots are square canvases — render them exactly like
  // Amazon does: square frame, edge to edge, no padding. Lifestyle photos
  // (manual IMAGES) keep the tall 2:3 crop.
  const apiMode = IMAGES.length === 0;
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Amazon-style: product images never auto-rotate; only lifestyle mode does
    if (apiMode || interacted || slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [apiMode, interacted, slides.length]);

  const goTo = (i: number) => {
    setInteracted(true);
    setIndex(((i % slides.length) + slides.length) % slides.length);
  };

  // Branded placeholder if the API is down and no photos exist yet
  if (slides.length === 0) {
    return (
      <div>
        <div className="relative aspect-[2/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col items-center justify-center gap-3">
          <span className="text-6xl">{placeholderEmoji}</span>
          <span className="text-xl font-black tracking-tight text-amber-900">{placeholderTitle}</span>
          <span className="text-xs text-amber-800/70">Photos coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={apiMode ? "flex gap-3 items-start" : ""}>
      {/* Desktop thumbnail rail — Amazon-style: hover or click swaps the
          main image. Mobile keeps swipe + dots. */}
      {apiMode && slides.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 shrink-0">
          {slides.map((img, i) => (
            <button
              key={img.src}
              onMouseEnter={() => goTo(i)}
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1}`}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 bg-white transition ${i === index ? "border-gray-900" : "border-gray-200 hover:border-gray-400"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" draggable={false} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
      <div
        // API mode: square frame, edge to edge — exactly how Amazon shows
        // its product images. Lifestyle mode: natural 2/3, no cropping.
        className={`relative overflow-hidden ${apiMode ? "aspect-square bg-white flex-1 min-w-0" : "aspect-[2/3] rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-stone-100"}`}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
        }}
      >
        {slides.map((img, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${img.contain ? "object-contain" : "object-cover"} ${i === index ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: img.pos }}
          />
        ))}

        {/* Arrows — lifestyle mode only; Amazon shows none */}
        {!apiMode && slides.length > 1 && (
          <>
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
          </>
        )}
      </div>
      </div>

      {/* Dots — mobile only in API mode (desktop has the thumbnail rail) */}
      {slides.length > 1 && (
        <div className={`flex justify-center gap-2 mt-3 ${apiMode ? "md:hidden" : ""}`}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${i === index ? "bg-amber-700 w-6" : "bg-gray-300 hover:bg-gray-400 w-2.5"}`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
