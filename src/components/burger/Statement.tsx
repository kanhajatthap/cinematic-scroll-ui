"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/components/burger/data";

export function Statement() {
  const stmtRef = useRef<HTMLElement>(null);
  const { scrollYProgress: stmtScroll } = useScroll({
    target: stmtRef,
    offset: ["start end", "end start"],
  });
  const wordY = [
    useTransform(stmtScroll, [0, 1], [100, -100]),
    useTransform(stmtScroll, [0, 1], [180, -180]),
    useTransform(stmtScroll, [0, 1], [60, -60]),
  ];

  return (
    <section
      ref={stmtRef}
      className="relative overflow-hidden border-t border-fg/[0.06] py-24 md:py-36"
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
      <h2
        className="relative z-10 px-6 text-center text-[clamp(2.6rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {["Burnt", "Buttery", "Bold"].map((w, i) => (
          <motion.span
            key={w}
            style={{ y: wordY[i] }}
            initial={{ opacity: 0, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.15, duration: 1, ease: EASE }}
            className={`block ${i === 1 ? "gold-text italic" : "text-fg/90"}`}
          >
            {w}
          </motion.span>
        ))}
      </h2>
      <p className="mx-auto mt-8 max-w-lg px-6 text-center font-mono text-xs uppercase tracking-[0.35em] text-fg/35">
        The three laws of our kitchen
      </p>
    </section>
  );
}