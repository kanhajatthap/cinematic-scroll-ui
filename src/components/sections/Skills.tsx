"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SKILLS = [
  { name: "React", level: 3 },
  { name: "Next.js", level: 3 },
  { name: "TypeScript", level: 3 },
  { name: "WordPress", level: 3 },
  { name: "Tailwind", level: 3 },
  { name: "GSAP", level: 2 },
  { name: "Framer Motion", level: 2 },
  { name: "Node.js", level: 2 },
  { name: "Figma", level: 2 },
  { name: "SEO", level: 2 },
];

function SkillCard({ name, level }: { name: string; level: number }) {
  return (
    <div className="glass relative flex items-center gap-4 rounded-2xl px-6 py-4 text-lg font-medium">
      <span>{name}</span>
      <span className="ml-auto flex gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-6 rounded-full"
            style={{
              background: i < level ? "#fbbf24" : "rgba(255,255,255,0.12)",
              boxShadow: i < level ? "0 0 8px rgba(251,191,36,0.6)" : "none",
            }}
          />
        ))}
      </span>
    </div>
  );
}

export default function Skills() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Cursor repulsion — each card drifts away from the cursor subtly.
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    track.style.setProperty("--dx", String(dx));
    track.style.setProperty("--dy", String(dy));
  };

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "#05060a" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.08), transparent 45%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="eyebrow">Capabilities</span>
          <h2
            className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Tools I <span className="gold-text italic">master</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            A modern toolbelt for building interfaces that are beautiful, fast
            and easy to maintain.
          </p>
        </motion.div>

        <div
          ref={trackRef}
          onMouseMove={onMouseMove}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <SkillCard name={s.name} level={s.level} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}