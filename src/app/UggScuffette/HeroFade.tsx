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

// frameAspect: match the product images' own canvas — "4/3" for the
// 500x375 shoe shots, "square" for 500x500 canvases (e.g. GrandeLash) —
// so the image always fills the frame edge to edge.
export function HeroFade({ apiImages, placeholderEmoji = "\ud83d\udc11", placeholderTitle = "UGG Scuffette II", frameAspect = "4/3" }: { apiImages?: { url: string; alt: string }[]; placeholderEmoji?: string; placeholderTitle?: string; frameAspect?: "4/3" | "square" }) {
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
  // Amazon-style hover zoom (desktop): magnify around the cursor position
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
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
        <div className="hidden md:flex flex-col gap-[9px] shrink-0 pt-1">
          {slides.map((img, i) => (
            <button
              key={img.src}
              onMouseEnter={() => goTo(i)}
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1}`}
              // Amazon-exact thumbs: small, rounded, hairline gray border;
              // the selected one gets Amazon's blue ring
              className={`w-14 h-14 rounded-lg overflow-hidden bg-white transition ${i === index ? "border-2 border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.15)]" : "border border-gray-300 hover:border-gray-500"}`}
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
        className={`relative overflow-hidden ${apiMode ? `${frameAspect === "square" ? "aspect-square" : "aspect-[4/3]"} bg-white flex-1 min-w-0 md:cursor-zoom-in` : "aspect-[2/3] rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-stone-100"}`}
        onMouseMove={(e) => {
          if (!apiMode) return;
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
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
            style={{
              objectPosition: img.pos,
              ...(apiMode && zoom && i === index
                ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : {}),
            }}
          />
        ))}

        {/* Share button — Amazon's circular top-right control */}
        {apiMode && (
          <button
            onClick={() => {
              const url = typeof window !== "undefined" ? window.location.href.split("?")[0] : "";
              if (navigator.share) {
                navigator.share({ url }).catch(() => { /* user cancelled */ });
              } else {
                navigator.clipboard?.writeText(url).catch(() => { /* noop */ });
              }
            }}
            aria-label="Share"
            className="hidden md:flex absolute right-3 top-3 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center z-10 transition"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V4m0 0L8 8m4-4l4 4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v7a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0019 19v-7" />
            </svg>
          </button>
        )}

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
