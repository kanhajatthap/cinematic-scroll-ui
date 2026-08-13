"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChapterNo } from "@/components/burger/ChapterNo";
import { CRAFT, EASE } from "@/components/burger/data";

export function Craft() {
  const craftRef = useRef<HTMLElement>(null);
  const { scrollYProgress: craftScroll } = useScroll({
    target: craftRef,
    offset: ["start end", "end start"],
  });
  const craftImgY = useTransform(craftScroll, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="craft"
      ref={craftRef}
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 30%, rgba(251,191,36,0.1), transparent 45%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <motion.div style={{ y: craftImgY }} className="absolute -inset-[14%]">
                <Image
                  src="/burger/art_03.svg"
                  alt="Burger on the griddle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay" />
            </div>
          </div>
          <motion.div
            animate={{ rotate: 3, y: [0, -10, 0] }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-5 py-4 md:block"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <p className="gold-text text-3xl font-bold italic">since 2019</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              400,000+ smashed
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <ChapterNo n="02" label="The Craft" />
          <h2
            className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Low & slow, <span className="gold-text italic">then fast & loud</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Great smash burgers are a study in contrast. A slowly proofed bun, a
            patient caramelisation, then seconds on a screaming griddle. That
            tension is the whole point.
          </p>

          <ul className="mt-8 space-y-4">
            {CRAFT.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: EASE }}
                className="flex items-center gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 font-mono text-[10px] text-gold">
                  0{i + 1}
                </span>
                <span className="leading-relaxed text-white/70">{c}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}