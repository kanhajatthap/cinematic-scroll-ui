"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, STATS } from "@/components/burger/data";

function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(251,191,36,0.08), transparent 50%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
            className="text-center"
          >
            <p
              className="gold-text text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}