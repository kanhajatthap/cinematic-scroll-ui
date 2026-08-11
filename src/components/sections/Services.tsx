"use client";

import { useRef } from "react";
import {
  FaGlobe,
  FaWordpress,
  FaReact,
  FaBolt,
  FaSearch,
  FaBox,
} from "react-icons/fa";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    desc: "Fast, secure, and scalable websites designed as complete experiences, built with modern, battle-tested tooling.",
    icon: FaGlobe,
    accent: "rgba(251,191,36,0.14)",
  },
  {
    id: "02",
    title: "WordPress",
    desc: "Fully custom WordPress builds with Elementor, WooCommerce, and ACF — so you can edit everything with ease.",
    icon: FaWordpress,
    accent: "rgba(254,243,199,0.10)",
  },
  {
    id: "03",
    title: "React & Next.js",
    desc: "Modern frontend with React and Next.js — blazing-fast, beautiful interactions, and dynamic applications.",
    icon: FaReact,
    accent: "rgba(251,191,36,0.10)",
  },
  {
    id: "04",
    title: "UI / UX Design",
    desc: "Visually stunning interfaces designed to improve engagement, trust, and conversion from first glance.",
    icon: FaBox,
    accent: "rgba(254,243,199,0.08)",
  },
  {
    id: "05",
    title: "Performance",
    desc: "Core Web Vitals, image optimization, caching and code-splitting for lightning-fast load times.",
    icon: FaBolt,
    accent: "rgba(251,191,36,0.10)",
  },
  {
    id: "06",
    title: "SEO",
    desc: "Technical SEO, schema, and analytics so your beautiful site is also perfectly discoverable.",
    icon: FaSearch,
    accent: "rgba(180,83,9,0.12)",
  },
];

const N = SERVICES.length;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Live active index for the counter — derived from progress.
  const activeRaw = useTransform(scrollYProgress, (v) =>
    Math.min(N, Math.max(1, Math.floor(v * N) + 1))
  );

  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const hintY = useTransform(scrollYProgress, [0, 0.15], [0, -16]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ height: `${N * 100}vh`, background: "#05060a" }}
    >
      {/* progress bar */}
      <div
        className="absolute right-0 top-0 z-20 flex h-full w-px items-center justify-center"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="relative h-40 w-px overflow-hidden bg-white/10">
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute inset-0 bg-gold"
          />
        </div>
      </div>

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute left-6 top-16 lg:left-14">
          <span className="eyebrow">Services</span>
        </div>

        <motion.div
          style={{ opacity: hintOpacity, y: hintY }}
          className="pointer-events-none absolute bottom-20 z-20 flex flex-col items-center gap-3"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45"
          >
            Keep Scrolling
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-gold"
          >
            <span className="block h-6 w-px bg-gradient-to-b from-gold to-transparent" />
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path
                d="M1 1 L5 5 L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.span>
        </motion.div>

        {/* Panels stack — one visible at a time, sequential crossfade */}
        <div className="absolute inset-0">
          {SERVICES.map((s, i) => (
            <ServicePanel
              key={s.id}
              service={s}
              index={i}
              total={N}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* counter */}
        <div className="absolute bottom-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
          <ActiveNumber motionValue={activeRaw} />
          <span className="h-px w-10 bg-white/20" />
          <span>0{N}</span>
        </div>
      </div>
    </section>
  );
}

function ServicePanel({
  service,
  index,
  total,
  progress,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = service.icon;
  const start = index / total;
  const end = (index + 1) / total;
  const c = (v: number) => Math.min(1, Math.max(0, v));

  // Sequential: the previous panel is fully gone before the next one starts
  // fading in — no overlapping titles. Offsets strictly increasing (WAAPI).
  const fadeInStart = c(start);
  const fadeInEnd = c(start + 0.06);
  const fadeOutStart = c(end - 0.04);
  const fadeOutEnd = c(end);

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [40, 0, 0, -40]
  );
  const scale = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.96, 1, 1, 1.02]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="relative mx-auto flex w-full max-w-5xl items-center gap-10 lg:gap-20">
        {/* Large number background */}
        <div
          className="hidden shrink-0 select-none font-bold text-white/[0.05] lg:block"
          style={{
            fontSize: "clamp(14rem, 30vw, 26rem)",
            fontFamily: "var(--font-playfair), serif",
            lineHeight: 0.7,
          }}
        >
          {service.id}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex-1"
        >
          <div className="flex items-center gap-5">
            <span
              className="glass flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl text-gold"
              style={{ background: service.accent }}
            >
              <Icon />
            </span>
            <h3
              className="text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {service.title}
            </h3>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {service.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Live-active counter text, driven by a MotionValue.
function ActiveNumber({ motionValue }: { motionValue: MotionValue<number> }) {
  const text = useTransform(motionValue, (v) => String(v).padStart(2, "0"));
  return <motion.span className="text-gold">{text}</motion.span>;
}