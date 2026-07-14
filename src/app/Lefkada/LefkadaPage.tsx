"use client";

import { useEffect } from "react";
import { LEFKADA_HTML } from "./lefkada-html";

export function LefkadaPage() {
  // Fill in the "days until departure" counter after mount so the value is
  // always current rather than frozen at build time.
  useEffect(() => {
    const el = document.querySelector("#countdown b");
    if (!el) return;
    const departure = new Date(2027, 5, 19); // 19 June 2027
    const days = Math.max(0, Math.ceil((departure.getTime() - Date.now()) / 86400000));
    el.textContent = days.toLocaleString("he-IL");
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: LEFKADA_HTML }} />;
}
