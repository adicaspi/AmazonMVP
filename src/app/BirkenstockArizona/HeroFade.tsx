"use client";

import { useEffect, useState } from "react";

// Quiet auto-fade hero carousel: no arrows, no dots — images cross-fade
// every 4s so nothing competes with the CTA for attention.
const IMAGES = [
  { src: "/images/birkenstock/airport-3.jpg", alt: "Birkenstock Arizona Soft Footbed sandals, travel-ready at the gate" },
  { src: "/images/birkenstock/unboxing.jpg", alt: "Unboxing a fresh pair of Birkenstock Arizona sandals" },
  { src: "/images/birkenstock/cafe.jpg", alt: "Sidewalk cafe mornings in Birkenstock Arizona" },
];

export function HeroFade() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-stone-100"
      style={{ aspectRatio: "2 / 3" }}
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
        />
      ))}
    </div>
  );
}
