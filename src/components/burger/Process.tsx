"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/burger/SectionHeading";
import { GlowBg } from "@/components/burger/GlowBg";
import { ActCard } from "@/components/burger/process/ActCard";
import { FilmProgress } from "@/components/burger/process/FilmProgress";
import { PROCESS } from "@/components/burger/data";

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
      <GlowBg at="15% 60%" />

      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <SectionHeading n="03" label="The Process" align="left">
            Five acts, <span className="gold-text italic">one burger</span>
          </SectionHeading>
        </div>

        <motion.div
          ref={processStripRef}
          style={{ x: processX }}
          className="relative z-10 mt-12 flex w-max gap-6 px-6 md:mt-16 md:gap-8 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {PROCESS.map((step, i) => (
            <ActCard
              key={step.name}
              step={step}
              index={i}
              active={i === activeAct}
            />
          ))}
        </motion.div>

        <FilmProgress progress={processScroll} activeAct={activeAct} />
      </div>
    </section>
  );
}