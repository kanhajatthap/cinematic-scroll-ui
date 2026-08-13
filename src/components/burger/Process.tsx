"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChapterNo } from "@/components/burger/ChapterNo";
import { EASE, PROCESS } from "@/components/burger/data";

export function Process() {
  const processRef = useRef<HTMLDivElement>(null);
  const processStripRef = useRef<HTMLDivElement>(null);
  const [processTravel, setProcessTravel] = useState(0);
  const [activeAct, setActiveAct] = useState(0);

  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const strip = processStripRef.current;
      if (!strip) return;
      setProcessTravel(Math.max(0, strip.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const processX = useTransform(
    processScroll,
    [0.15, 0.95],
    [0, -processTravel],
  );

  useMotionValueEvent(processScroll, "change", (v) => {
    const idx = Math.min(
      PROCESS.length - 1,
      Math.max(0, Math.round(v * (PROCESS.length - 1))),
    );
    setActiveAct(idx);
  });

  return (
    <section
      id="process"
      ref={processRef}
      className="relative h-[300vh] border-t border-white/[0.06]"
    >
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 60%, rgba(251,191,36,0.08), transparent 45%)",
          filter: "blur(80px)",
        }}
      />

      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <ChapterNo n="03" label="The Process" />
            <h2
              className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Five acts, <span className="gold-text italic">one burger</span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          ref={processStripRef}
          style={{ x: processX }}
          className="relative z-10 mt-12 flex w-max gap-6 px-6 md:mt-16 md:gap-8 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {PROCESS.map((step, i) => (
            <motion.article
              key={step.name}
              animate={{
                scale: i === activeAct ? 1.035 : 1,
                borderColor:
                  i === activeAct
                    ? "rgba(251,191,36,0.45)"
                    : "var(--color-border)",
              }}
              transition={{ duration: 0.6, ease: EASE }}
              whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
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
                  Act 0{i + 1}
                </span>
                <span
                  className={`gold-text text-5xl font-bold italic transition-opacity duration-500 ${
                    i === activeAct ? "opacity-100" : "opacity-40"
                  }`}
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {step.n}
                </span>
              </div>
              <h3 className="relative mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                {step.name}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/50">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060a]/60 to-transparent" />
                <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  Frame {String(24 + i * 48).padStart(3, "0")} / 240
                </span>
                {i === activeAct && (
                  <span className="absolute bottom-3 right-4 h-1.5 w-1.5 rounded-full bg-gold" />
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-7xl px-6">
          <div className="h-px w-full bg-white/10">
            <motion.div
              style={{ scaleX: processScroll }}
              className="h-full origin-left bg-gold"
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            <span>Keep scrolling — the film rolls on</span>
            <span className="text-gold">
              Act 0{activeAct + 1} <span className="text-white/25">/ 05</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}