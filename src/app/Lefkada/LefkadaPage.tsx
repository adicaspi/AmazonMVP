"use client";

import { useEffect } from "react";
import { LEFKADA_HTML } from "./lefkada-html";

export function LefkadaPage() {
  useEffect(() => {
    const root = document.getElementById("lfk-root");
    if (!root) return;
    // Marks JS as available so the reveal-on-scroll styles kick in; without
    // JS everything stays visible.
    root.classList.add("js");

    const counter = document.querySelector("#countdown b");
    if (counter) {
      const departure = new Date(2027, 5, 19); // 19 June 2027
      const days = Math.max(0, Math.ceil((departure.getTime() - Date.now()) / 86400000));
      counter.textContent = days.toLocaleString("he-IL");
    }

    const targets = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: LEFKADA_HTML }} />;
}
