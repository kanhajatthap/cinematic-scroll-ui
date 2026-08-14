"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/components/burger/data";

export function ActCard({
  step,
  index,
  active,
}: {
  step: { n: string; name: string; desc: string; img: string };
  index: number;
  active: boolean;
}) {
  return (
    <motion.article
      animate={{
        scale: active ? 1.035 : 1,
        borderColor: active
          ? "rgba(251,191,36,0.45)"
          : "var(--color-border)",
      }}
      transition={{ duration: 0.6, ease: EASE }}
      whileHover={{ y: -6, rotate: index % 2 ? 1 : -1 }}
      className="glass group relative w-[78vw] shrink-0 overflow-hidden rounded-3xl p-6 sm:w-[58vw] md:w-[40vw] lg:w-[32vw] md:p-8"
    >
      <span
        aria-hidden
        className="gold-text pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] font-bold italic leading-none opacity-[0.06]"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {step.n}
      </span>

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          Act 0{index + 1}
        </span>
        <span
          className={`gold-text text-5xl font-bold italic transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-40"
          }`}
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {step.n}
        </span>
      </div>
      <h3 className="relative mt-5 text-2xl font-bold tracking-tight md:text-3xl">
        {step.name}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-fg/50">
        {step.desc}
      </p>
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={step.img}
          alt={step.name}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 40vw, 32vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/60">
          Frame {String(24 + index * 48).padStart(3, "0")} / 240
        </span>
        {active && (
          <span className="absolute bottom-3 right-4 h-1.5 w-1.5 rounded-full bg-gold" />
        )}
      </div>
    </motion.article>
  );
}