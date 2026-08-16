"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/burger/SectionHeading";
import { GlowBg } from "@/components/burger/GlowBg";
import { EmberRise } from "@/components/burger/EmberRise";
import { Reveal } from "@/components/burger/Reveal";
import { CRAFT, EASE } from "@/components/burger/data";

export function Craft() {
  const craftRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: craftScroll } = useScroll({
    target: craftRef,
    offset: ["start end", "end start"],
  });
  const craftImgY = useTransform(craftScroll, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="craft"
      ref={craftRef}
      className="relative overflow-hidden border-t border-fg/[0.06] py-24 md:py-32"
    >
      <EmberRise className="opacity-45" />
      <GlowBg at="12% 30%" opacity={0.1} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal x={-40} y={0} duration={1} className="relative">
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
            animate={reduce ? { rotate: 3 } : { rotate: 3, y: [0, -10, 0] }}
            transition={
              reduce
                ? { duration: 0.3 }
                : { y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }
            }
            className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-5 py-4 md:block"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <p className="gold-text text-3xl font-bold italic">since 2019</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
              400,000+ smashed
            </p>
          </motion.div>
        </Reveal>

        <Reveal y={40} duration={1}>
          <SectionHeading
            n="02"
            label="The Craft"
            align="left"
            reveal={false}
            sub="Great smash burgers are a study in contrast. A slowly proofed bun, a patient caramelisation, then seconds on a screaming griddle. That tension is the whole point."
            subClassName="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            Low &amp; slow, <span className="gold-text italic">then fast &amp; loud</span>
          </SectionHeading>

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
                <span className="leading-relaxed text-fg/70">{c}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}