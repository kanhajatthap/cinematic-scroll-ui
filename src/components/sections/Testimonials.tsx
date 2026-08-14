"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TESTIMONIALS = [
  {
    quote:
      "Kanha rebuilt our entire site. It loads instantly and looks like a product launch — our clients noticed within a week.",
    name: "Rahul Mehta",
    role: "Founder, Meridian Finance",
    rating: 5,
  },
  {
    quote:
      "The most detail-oriented developer we've worked with. Every animation, every pixel, every transition felt intentional.",
    name: "Sophia Turner",
    role: "Creative Director, Luxe Interiors",
    rating: 5,
  },
  {
    quote:
      "He took our WooCommerce store from dated to award-worthy. Sales conversion improved noticeably after the redesign.",
    name: "Alicia Grant",
    role: "Owner, Aurelia Jewelry",
    rating: 5,
  },
  {
    quote:
      "Rare mix of design taste and engineering discipline. He shipped what he promised, faster than promised.",
    name: "Alessandro Rossi",
    role: "CTO, Nimbus Labs",
    rating: 5,
  },
];

const HERO_WORDS =
  "Every pixel felt intentional. The site does not just load — it performs. That is the difference between a build and a launch.".split(
    " "
  );

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  // Measure how far the film strip can slide (pinned scroll distance).
  useEffect(() => {
    const measure = () => {
      const el = stripRef.current;
      const viewport = el?.parentElement;
      if (!el || !viewport) return;
      setTravel(Math.max(0, el.scrollWidth - viewport.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // NOTE: all transforms keep 0 and 1 in their input ranges — fractional-only
  // windows break framer's WAAPI path (values snap back after completing).
  const stripX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -travel]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 1], [1, 1, 0, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06, 1], [0, 1, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.06, 1], [20, 0, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [140, -140]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative h-[350vh]"
      style={{ background: "var(--ink)" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* parallax glow */}
        <motion.div aria-hidden style={{ y: glowY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 72% 24%, rgba(251,191,36,0.09), transparent 46%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>

        {/* Film grain */}
        <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />

        {/* header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute left-6 top-16 lg:left-14"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-12 left-0 hidden select-none whitespace-nowrap font-bold italic leading-none text-gold/[0.05] lg:block"
          >
            <span
              className="block text-[8rem] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Voices
            </span>
          </span>
          <span className="eyebrow">Testimonials</span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Voices <span className="gold-text italic">of trust</span>
          </h2>
        </motion.div>

        {/* Phase 1 — word-by-word scrubbed quote */}
        <QuoteScrub progress={scrollYProgress} />

        {/* Phase 2→3 — pinned film strip */}
        <motion.div
          ref={stripRef}
          style={{ x: stripX }}
          className="relative z-10 flex w-max items-stretch gap-6 px-6 md:gap-8"
        >
          {TESTIMONIALS.map((t, i) => (
            <Card key={t.name} t={t} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* scroll hint */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.35em] text-fg/40"
        >
          Keep scrolling
        </motion.p>

        {/* hairline progress */}
        <div className="absolute bottom-7 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden rounded-full bg-fg/10">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full origin-left bg-gold"
          />
        </div>
      </div>
    </section>
  );
}

function QuoteScrub({ progress }: { progress: MotionValue<number> }) {
  const containerOpacity = useTransform(
    progress,
    [0, 0.34, 0.44, 1],
    [1, 1, 0, 0]
  );
  const containerY = useTransform(progress, [0, 0.34, 0.44, 1], [0, 0, -60, -60]);
  const creditOpacity = useTransform(
    progress,
    [0, 0.24, 0.3, 1],
    [0, 0, 1, 1]
  );
  const iconOpacity = useTransform(progress, [0, 0.02, 0.08, 1], [0, 0, 1, 1]);

  return (
    <motion.div
      style={{ opacity: containerOpacity, y: containerY }}
      className="absolute inset-0 z-20 flex items-center justify-center px-6"
    >
      <div className="max-w-5xl text-center">
        <motion.div
          style={{ opacity: iconOpacity }}
          className="mb-8 flex justify-center text-gold"
        >
          <FaQuoteLeft style={{ fontSize: "1.6rem" }} />
        </motion.div>

        <p
          className="text-[clamp(1.5rem,3.6vw,2.9rem)] font-medium italic leading-[1.35] text-fg/90"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {HERO_WORDS.map((w, i) => (
            <Word key={i} word={w} i={i} progress={progress} />
          ))}
        </p>

        <motion.p
          style={{ opacity: creditOpacity }}
          className="mt-9 font-mono text-xs uppercase tracking-[0.3em] text-gold"
        >
          — Sophia Turner · Creative Director, Luxe Interiors
        </motion.p>
      </div>
    </motion.div>
  );
}

function Word({
  word,
  i,
  progress,
}: {
  word: string;
  i: number;
  progress: MotionValue<number>;
}) {
  const start = 0.05 + i * 0.011;
  const opacity = useTransform(
    progress,
    [0, start, start + 0.03, 1],
    [0.1, 0.1, 1, 1]
  );
  const y = useTransform(progress, [0, start, start + 0.03, 1], [12, 12, 0, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

function Card({
  t,
  i,
  progress,
}: {
  t: (typeof TESTIMONIALS)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const enterStart = 0.44 + i * 0.02;
  const opacity = useTransform(
    progress,
    [0, enterStart, enterStart + 0.06, 1],
    [0, 0, 1, 1]
  );
  const y = useTransform(
    progress,
    [0, enterStart, enterStart + 0.06, 1],
    [80, 80, 0, 0]
  );
  const scale = useTransform(
    progress,
    [0, enterStart, enterStart + 0.06, 1],
    [0.94, 0.94, 1, 1]
  );

  return (
    <motion.figure
      style={{ opacity, y, scale }}
      className="glass relative flex w-[82vw] shrink-0 flex-col rounded-3xl p-8 sm:w-[56vw] md:p-10 lg:w-[33vw]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-7 select-none text-[7rem] font-bold italic leading-none text-gold/[0.06]"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, s) => (
          <FaStar
            key={s}
            style={{
              fontSize: "0.95rem",
              color: s < t.rating ? "#fbbf24" : "var(--line)",
            }}
          />
        ))}
      </div>

      <blockquote className="mt-6 flex-1 leading-relaxed text-fg/75">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-fg/10 pt-6">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 font-mono text-sm font-semibold text-gold">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <span>
          <p className="font-semibold text-fg">{t.name}</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45">
            {t.role}
          </p>
        </span>
      </figcaption>
    </motion.figure>
  );
}
