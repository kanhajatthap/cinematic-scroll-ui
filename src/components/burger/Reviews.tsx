"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChapterNo } from "@/components/burger/ChapterNo";
import { EASE, TESTIMONIALS } from "@/components/burger/data";

export function Reviews() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      4200,
    );
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.07), transparent 55%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <ChapterNo n="05" label="Reviews" />
          <h2
            className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Loud <span className="gold-text italic">praise</span>
          </h2>
        </motion.div>

        <div className="relative mt-12 flex min-h-[220px] items-center justify-center md:min-h-[200px]">
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
                className="mx-auto max-w-3xl text-xl leading-relaxed text-white/80 md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                “{t.q}”
              </blockquote>
              <figcaption className="mt-8">
                <span className="text-base font-semibold text-gold">
                  {t.name}
                </span>
                <span className="mx-3 text-white/25">—</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
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
                i === idx ? "w-8 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}