"use client";

import { useEffect, useRef, useState } from "react";

// Hero carousel: swipeable, with arrows + dots so it's obviously browsable.
// Auto-advances every 4s until the user interacts.
// [USER ASSET] When the demo video arrives, add it as slide 0:
// { type: "video", src: "/videos/birkenstock/demo.mp4", poster: "..." }
// pos = object-position: crops bias toward where the sandals are in each
// frame, so the shorter mobile crop never cuts the product out.
// Slide 0 = the exact image used in the ads (message match).
const IMAGES = [
  { src: "/images/birkenstock/hero-airport.jpg", alt: "Birkenstock Arizona Soft Footbed sandals at the airport", pos: "50% 50%" },
  { src: "/images/birkenstock/boardwalk-pov.jpg", alt: "Birkenstock Arizona sandals on a beach boardwalk", pos: "50% 55%" },
  { src: "/images/birkenstock/cafe.jpg", alt: "Sidewalk cafe mornings in Birkenstock Arizona", pos: "50% 84%" },
  { src: "/images/birkenstock/unboxing.jpg", alt: "Unboxing a fresh pair of Birkenstock Arizona sandals", pos: "50% 40%" },
];

export function HeroFade() {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (interacted) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(t);
  }, [interacted]);

  const goTo = (i: number) => {
    setInteracted(true);
    setIndex(((i % IMAGES.length) + IMAGES.length) % IMAGES.length);
  };

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
