"use client";

import { motion, type MotionValue } from "framer-motion";

export function FilmProgress({
  progress,
  activeAct,
}: {
  progress: MotionValue<number>;
  activeAct: number;
}) {
  return (
    <div className="relative z-10 mx-auto mt-10 w-full max-w-7xl px-6">
      <div className="h-px w-full bg-fg/10">
        <motion.div
          style={{ scaleX: progress }}
          className="h-full origin-left bg-gold"
        />
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-fg/35">
        <span>Keep scrolling — the film rolls on</span>
        <span className="text-gold">
          Act 0{activeAct + 1} <span className="text-fg/25">/ 05</span>
        </span>
      </div>
    </div>
  );
}