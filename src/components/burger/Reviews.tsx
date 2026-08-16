"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/burger/SectionHeading";
import { GlowBg } from "@/components/burger/GlowBg";
import { EASE, TESTIMONIALS } from "@/components/burger/data";

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      4200,
    );
    return () => clearInterval(t);
  }, [reduce, paused]);

  const t = TESTIMONIALS[idx];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-fg/[0.06] py-24 md:py-32"
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
      {/* Soft cinematic spotlight behind the quote */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(720px, 90vw)",
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.10), rgba(251,191,36,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <GlowBg at="50% 0%" size="55%" opacity={0.07} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <SectionHeading n="05" label="Reviews">
          Loud <span className="gold-text italic">praise</span>
        </SectionHeading>

        <div
          aria-live="polite"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="relative mx-auto mt-12 flex min-h-[220px] w-full max-w-3xl items-center justify-center md:min-h-[200px]"
        >
          {/* Opening quote mark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-6 select-none text-[7rem] font-bold leading-none text-gold/15 md:left-0"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-x-0"
            >
              <blockquote
                className="mx-auto max-w-3xl px-6 text-xl leading-relaxed text-fg/85 md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                “{t.q}”
              </blockquote>
              <figcaption className="mt-8">
                <span className="text-base font-semibold text-gold">
                  {t.name}
                </span>
                <span className="mx-3 text-fg/25">—</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
                  {t.role}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-gold" : "w-1.5 bg-fg/20 hover:bg-fg/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}