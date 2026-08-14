"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/burger/data";

export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(!!reduce);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce || done) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setCount(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else doneTimer.current = setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (doneTimer.current) clearTimeout(doneTimer.current);
    };
  }, [reduce, done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[10px] uppercase tracking-[0.5em] text-fg/40"
          >
            Smash Burger <span className="text-gold">presents</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="mt-6 text-center text-[clamp(2.6rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            SMASH<span className="gold-text italic">BURGER</span>
          </motion.h1>
          <div className="mt-10 flex items-center gap-5">
            <span className="h-px w-16 bg-gold/40" />
            <span className="font-mono text-lg text-gold">
              {String(count).padStart(3, "0")}%
            </span>
            <span className="h-px w-16 bg-gold/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}