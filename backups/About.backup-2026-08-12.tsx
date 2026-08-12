"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { TiltCard } from "@/components/ui/TiltCard";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "40+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "98", label: "Lighthouse Score" },
];

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { delay, duration: 0.9, ease: EASE },
});

function StatValue({ value, active }: { value: string; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [...EASE],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [active, target, suffix]);

  return (
    <div
      ref={ref}
      className="gold-text text-[clamp(2.2rem,4vw,3.2rem)] font-bold"
    >
      {value}
    </div>
  );
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "#05060a" }}
    >
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(251,191,36,0.1), transparent 45%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Photo / glass panel */}
          <div>
            <motion.div {...reveal(0)}>
              <span className="eyebrow">About Me</span>
            </motion.div>
            <motion.h2
              {...reveal(0.1)}
              className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Crafting <span className="gold-text italic">cinematic</span> web
              experiences
            </motion.h2>
            <motion.p {...reveal(0.25)} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              I design and engineer digital products that balance elegant,
              editorially crafted visuals with rock-solid performance. From
              pixel-perfect React interfaces to bespoke WordPress builds, every
              project is treated like a feature film — intentional, sparing, and
              memorable.
            </motion.p>
            <motion.p {...reveal(0.32)} className="mt-4 max-w-lg leading-relaxed text-white/40">
              My focus is on the details most people miss: typography,
              micro-interactions, colour grading, and load times under a second.
            </motion.p>
          </div>

          {/* Glass profile panel */}
          <motion.div
            {...reveal(0.3)}
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <TiltCard className="glass relative rounded-3xl p-8">
              <div className="flex items-center gap-5">
                <div className="glass flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl font-mono text-sm tracking-wide text-gold">
                  KJ
                </div>
                <div>
                  <p className="text-xl font-semibold">Kanha Jatthap</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-white/45">
                    Frontend • WordPress
                  </p>
                </div>
              </div>
              <div className="my-7 h-px bg-white/10" />
              <p className="leading-relaxed text-white/60">
                Turning complex ideas into elegant, performant interfaces that
                feel like they belong on a stage.
              </p>
            </TiltCard>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => {
            const seen = statsInView;
            return (
              <motion.div
                key={s.label}
                className="glass rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={seen ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              >
                <StatValue value={s.value} active={seen} />
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}