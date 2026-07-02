"use client";

import { useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export function BeforeAfterSlider({ before, after, beforeAlt = "Before", afterAlt = "After" }: Props) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-xl select-none cursor-ew-resize touch-none"
      style={{ aspectRatio: "516 / 880" }}
      onPointerDown={(e) => {
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => { if (dragging) updateFromClientX(e.clientX); }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* After image (full, underneath) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterAlt} draggable={false} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before image (clipped to reveal the left `pos%`) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={beforeAlt} draggable={false} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Divider + handle */}
      <div className="absolute top-0 bottom-0 z-10 pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="h-full w-1 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.4)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      {/* Drag hint (fades once interacted) */}
      {pos > 46 && pos < 54 && !dragging && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none animate-pulse">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
          Drag to reveal
        </div>
      )}
    </div>
  );
}
