"use client";

import { useEffect, useRef } from "react";

// A tiny GIF-style clip: 3s, muted, looping, autoplaying. Weighs ~270KB so it
// starts instantly and shows the product working above the fold without
// pushing the CTA off-screen. Muted is re-applied via ref because React SSR
// can drop the attribute, which blocks autoplay on some browsers.
export function MiniLoop({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}
