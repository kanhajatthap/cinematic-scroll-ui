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

const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    desc: "Fast, secure, and scalable websites designed as complete experiences, built with modern, battle-tested tooling.",
    icon: FaGlobe,
    accent: "rgba(251,191,36,0.14)",
    tags: ["React", "Next.js", "Tailwind", "Vercel"],
  },
  {
    id: "02",
    title: "WordPress",
    desc: "Fully custom WordPress builds with Elementor, WooCommerce, and ACF — so you can edit everything with ease.",
    icon: FaWordpress,
    accent: "rgba(254,243,199,0.10)",
    tags: ["Elementor", "WooCommerce", "ACF", "Custom Themes"],
  },
  {
    id: "03",
    title: "React & Next.js",
    desc: "Modern frontend with React and Next.js — blazing-fast, beautiful interactions, and dynamic applications.",
    icon: FaReact,
    accent: "rgba(251,191,36,0.10)",
    tags: ["SPA", "SSR / SSG", "API Routes", "Motion"],
  },
  {
    id: "04",
    title: "UI / UX Design",
    desc: "Visually stunning interfaces designed to improve engagement, trust, and conversion from first glance.",
    icon: FaBox,
    accent: "rgba(254,243,199,0.08)",
    tags: ["Figma", "Wireframes", "Design Systems", "Prototypes"],
  },
  {
    id: "05",
    title: "Performance",
    desc: "Core Web Vitals, image optimization, caching and code-splitting for lightning-fast load times.",
    icon: FaBolt,
    accent: "rgba(251,191,36,0.10)",
    tags: ["Lighthouse 100", "Lazy Loading", "Caching", "Splitting"],
  },
  {
    id: "06",
    title: "SEO",
    desc: "Technical SEO, schema, and analytics so your beautiful site is also perfectly discoverable.",
    icon: FaSearch,
    accent: "rgba(180,83,9,0.12)",
    tags: ["Technical SEO", "Schema", "Analytics", "Vitals"],
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
      aria-label="Services"
      className="relative"
      style={{ height: `${N * 100}vh`, background: "var(--ink)" }}
    >
      {/* progress bar */}
      <div
        className="absolute right-0 top-0 z-20 flex h-full w-px items-center justify-center"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="relative h-40 w-px overflow-hidden bg-fg/10">
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute inset-0 bg-gold"
          />
        </div>
      </div>

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
        />
        {/* Film grain */}
        <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />

        <div className="absolute left-6 top-16 lg:left-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Services</span>
          </div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity, y: hintY }}
          className="pointer-events-none absolute bottom-20 z-20 flex flex-col items-center gap-3"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/45"
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
        <div className="absolute bottom-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-fg/40">
          <ActiveNumber motionValue={activeRaw} />
          <span className="h-px w-10 bg-fg/20" />
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

  // The LAST panel holds: it fades in once and stays pinned at full opacity
  // until the section ends — so the Services section never ends on a blank.
  const isLast = index === total - 1;
  const fadeOutStart = isLast ? 1 : c(end - 0.04);
  const fadeOutEnd = isLast ? 1 : c(end);

  const opacity = useTransform(
    progress,
    isLast
      ? [fadeInStart, fadeInEnd, 1]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    isLast
      ? [fadeInStart, fadeInEnd, 1]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    isLast ? [40, 0, 0] : [40, 0, 0, -40]
  );
  const scale = useTransform(
    progress,
    isLast
      ? [fadeInStart, fadeInEnd, 1]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    isLast ? [0.96, 1, 1] : [0.96, 1, 1, 1.02]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
      className="absolute inset-0 flex items-center justify-center px-5 sm:px-6"
    >
      {/* Per-panel accent glow — cheap soft radial gradient, NO blur filter
          (a full-screen blur(70px) layer re-rasterizes every scroll frame → jank) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 will-change-opacity"
        style={{
          background: `radial-gradient(circle at 70% 38%, ${service.accent}, transparent 60%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="group glass-solid relative overflow-hidden rounded-[2rem] p-8 md:p-12 lg:p-14">
          {/* Top edge highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {/* Corner brackets */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/50"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold/50"
          />

          {/* Faint inner grid, masked toward the index number */}
          <div
            aria-hidden
            className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_65%)]"
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            {/* Index number — outlined, with mono label */}
            <div className="hidden shrink-0 select-none lg:block">
              <span
                className="block font-bold leading-[0.75]"
                style={{
                  fontSize: "clamp(10rem, 17vw, 15rem)",
                  fontFamily: "var(--font-playfair), serif",
                  WebkitTextStroke: "1.5px rgba(251,191,36,0.4)",
                  color: "transparent",
                }}
              >
                {service.id}
              </span>
              <span className="mt-5 block font-mono text-xs uppercase tracking-[0.35em] text-fg/40">
                Service / {service.id}
              </span>
            </div>

            {/* Vertical divider */}
            <div className="hidden w-px self-stretch bg-gradient-to-b from-fg/15 via-fg/5 to-transparent lg:block" />

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-5">
                <span
                  className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-gold/25 text-2xl text-gold shadow-[0_0_30px_rgba(251,191,36,0.22)]"
                  style={{ background: service.accent }}
                >
                  <Icon />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-fg/10" />
                </span>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/80 lg:hidden">
                    Service {service.id}
                  </span>
                  <h3
                    className="mt-1 text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {service.desc}
              </p>

              {/* Feature tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-fg/10 bg-fg/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/60 transition-colors duration-300 group-hover:border-gold/30 group-hover:text-fg/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="mt-9 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-gold transition-all duration-300 hover:gap-3.5 hover:text-gold-light"
              >
                Discuss this service
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Live-active counter text, driven by a MotionValue.
function ActiveNumber({ motionValue }: { motionValue: MotionValue<number> }) {
  const text = useTransform(motionValue, (v) => String(v).padStart(2, "0"));
  return <motion.span className="text-gold">{text}</motion.span>;
}