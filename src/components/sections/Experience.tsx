"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TIMELINE = [
  {
    year: "2021",
    role: "Freelance Web Developer",
    org: "Self-employed",
    desc: "Started building custom websites for small businesses — WordPress, and static builds.",
  },
  {
    year: "2022",
    role: "Frontend Developer",
    org: "Digital Agency",
    desc: "Shipped responsive React and animated marketing sites for clients across industries.",
  },
  {
    year: "2023",
    role: "WordPress Engineer",
    org: "Product Studio",
    desc: "Specialised in custom WordPress, WooCommerce and ACF builds with a focus on speed.",
  },
  {
    year: "2024",
    role: "React / Next.js Developer",
    org: "Independent",
    desc: "Focused on modern React + Next.js applications with cinematic motion and design.",
  },
  {
    year: "2025",
    role: "Frontend & WordPress Developer",
    org: "Your Next Project",
    desc: "Currently crafting award-grade digital experiences for ambitious brands.",
  },
];

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { delay, duration: 0.8, ease: EASE },
});

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.78", "end 0.6"],
  });

  // Glowing head that rides the tip of the drawn line.
  const lineHeadTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  // Ambient parallax — glow and ghost word drift as the section scrolls.
  const reduce = useReducedMotion();
  const glowY = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [36, -48]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "var(--ink)" }}
    >
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      {/* Film grain */}
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />
      {/* Parallax ambient gold glow */}
      {!reduce && (
        <motion.div aria-hidden style={{ y: glowY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 26%, rgba(251,191,36,0.08), transparent 46%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="relative">
          {/* Ghost word — editorial backdrop */}
          {!reduce && (
            <motion.span
              aria-hidden
              style={{ y: ghostY }}
              className="pointer-events-none absolute -top-14 left-0 hidden select-none whitespace-nowrap font-bold italic leading-none text-gold/[0.05] lg:block"
            >
              <span
                className="block text-[9rem] tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Timeline
              </span>
            </motion.span>
          )}
          <motion.div {...reveal(0)}>
            <span className="eyebrow">Journey</span>
            <h2
              id="experience-title"
              className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Experience <span className="gold-text italic">Timeline</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative mt-16 pl-8 md:pl-0">
          {/* Line track — base faint, gold draws with scroll */}
          <div className="absolute bottom-8 left-3 top-2 w-px md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 rounded-full bg-fg/[0.07]" />
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-gold via-gold/70 to-gold/30"
            />
            <motion.div
              style={{ top: lineHeadTop, x: "-50%", y: "-50%" }}
              className="absolute left-1/2"
            >
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gold shadow-[0_0_16px_rgba(251,191,36,0.9)]" />
              </span>
            </motion.div>
          </div>

          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const rowRef = useRef<HTMLDivElement>(null);

  // Card + dot react to the row crossing the viewport.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.85", "center 0.45"],
  });

  const cardX = useTransform(scrollYProgress, [0, 0.7], [isLeft ? -56 : 56, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  const dotScale = useTransform(scrollYProgress, [0.2, 0.6, 0.9], [0.5, 1.5, 1]);
  const dotShadow = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    ["0 0 6px rgba(251,191,36,0.3)", "0 0 18px rgba(251,191,36,0.95)"]
  );
  const ringScale = useTransform(scrollYProgress, [0.3, 0.75], [0.4, 2]);
  const ringOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0.7, 0]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={rowRef}
      className="relative mb-14 last:mb-0 md:grid md:grid-cols-2 md:gap-12"
    >
      {/* Ghost year — parallax on the empty side */}
      <div
        className={`pointer-events-none absolute top-1/2 z-0 hidden -translate-y-1/2 select-none md:block ${
          isLeft ? "right-0 lg:-right-6" : "left-0 lg:-left-6"
        }`}
      >
        <motion.span
          aria-hidden
          style={{ y: ghostY }}
          className="block text-[9rem] font-bold italic leading-none text-gold/[0.07]"
        >
          {item.year}
        </motion.span>
      </div>

      {/* Content card — slides from its own side */}
      <div
        className={isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}
      >
        <motion.div style={{ x: cardX, opacity: cardOpacity }}>
          <span className="font-mono text-sm text-gold">{item.year}</span>
          <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-fg/45">
            {item.org}
          </p>
          <p className="mt-3 leading-relaxed text-muted">{item.desc}</p>
        </motion.div>
      </div>

      {/* Node on the line — swells + pulses when active */}
      <motion.span
        style={{ scale: dotScale, boxShadow: dotShadow, x: "-50%" }}
        className="absolute left-3 top-2 z-10 block h-3 w-3 rounded-full border-2 border-gold bg-ink md:left-1/2"
      >
        <motion.span
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute -inset-2 rounded-full bg-gold/40"
        />
      </motion.span>
    </div>
  );
}
