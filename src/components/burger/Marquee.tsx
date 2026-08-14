"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MARQUEE } from "@/components/burger/data";

export function Marquee() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-5">
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={
            reduce ? undefined : { x: ["0%", "-50%"] }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.35em] text-white/45"
            >
              {w}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}