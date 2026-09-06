"use client";

import { useCallback, useEffect, useState } from "react";

// Lifestyle strip with a tap-to-enlarge lightbox: tap a tile → fullscreen
// view with prev/next arrows, X / backdrop / Esc to close. No dependencies.
export function LifestyleGrid({ images }: { images: { src: string; alt: string }[] }) {
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  // Esc / arrow keys + scroll lock while open
  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [idx, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Enlarge: ${img.alt}`}
            className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 cursor-zoom-in"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full aspect-square object-cover transition-transform duration-200 group-hover:scale-[1.03]" />
            <span className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0zM11 8v6M8 11h6" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {idx !== null && (
        <div className="fixed inset-0 z-[10000] bg-black/85 flex items-center justify-center" role="dialog" aria-modal="true" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[idx].src}
            alt={images[idx].alt}
            className="max-h-[86vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {idx + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}
