"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "#05060a" }}
    >
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div {...reveal(0)}>
          <span className="eyebrow">Journey</span>
          <h2
            className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Experience <span className="gold-text italic">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative mt-16 pl-8 md:pl-0">
          {/* Vertical line */}
          <motion.div
            className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-gold/60 via-gold/15 to-transparent md:left-1/2 md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ transformOrigin: "top" }}
          />

          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={item.year}
                className="relative mb-14 last:mb-0 md:grid md:grid-cols-2 md:gap-12"
              >
                {/* Content card — goes left then right */}
                <div
                  className={
                    isLeft
                      ? "md:pr-12 md:text-right"
                      : "md:col-start-2 md:pl-12"
                  }
                >
                  <motion.div {...reveal(i * 0.08)}>
                    <span className="font-mono text-sm text-gold">{item.year}</span>
                    <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/45">
                      {item.org}
                    </p>
                    <p className="mt-3 leading-relaxed text-muted">{item.desc}</p>
                  </motion.div>
                </div>

                {/* Dot on the line */}
                <motion.span
                  className="absolute left-3 top-2 z-10 block h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold bg-[#05060a] shadow-[0_0_12px_rgba(251,191,36,0.8)] md:left-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}