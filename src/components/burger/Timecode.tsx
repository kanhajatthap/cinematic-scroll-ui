"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  const lastRef = useRef("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const total = Math.floor((now - start) / (1000 / 24));
      const ff = total % 24;
      const ss = Math.floor(total / 24) % 60;
      const mm = Math.floor(total / (24 * 60)) % 60;
      const hh = Math.floor(total / (24 * 3600));
      const val = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
      const el = ref.current;
      if (el && val !== lastRef.current) {
        lastRef.current = val;
        el.textContent = val;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return <span ref={ref}>00:00:00:00</span>;
}
