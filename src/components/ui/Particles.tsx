"use client";

import { motion } from "framer-motion";

interface Particle {
  left: string;
  top: string;
  size: number;
  dur: number;
  delay: number;
  gold: boolean;
}

interface ParticlesProps {
  count?: number;
  seed?: number;
  className?: string;
}

export function Particles({ count = 16, seed = 7, className }: ParticlesProps) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => {
    const n = i * seed + 3;
    return {
      left: `${(n * 6.7) % 100}%`,
      top: `${(n * 9.3 + 5) % 100}%`,
      size: 1.5 + (i % 3) * 1.2,
      dur: 7 + (i % 6) * 1.7,
      delay: i * 0.45,
      gold: i % 2 === 0,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -160, 0], opacity: [0, p.gold ? 0.5 : 0.3, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.gold ? "#fbbf24" : "rgba(255,255,255,0.6)",
            boxShadow: p.gold ? "0 0 12px rgba(251,191,36,0.9)" : "none",
          }}
        />
      ))}
    </div>
  );
}