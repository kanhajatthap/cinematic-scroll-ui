"use client";

import { Counter } from "@/components/burger/Counter";
import { GlowBg } from "@/components/burger/GlowBg";
import { Reveal } from "@/components/burger/Reveal";
import { STATS } from "@/components/burger/data";

export function Stats() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
      <GlowBg at="80% 30%" size="50%" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            y={30}
            duration={0.8}
            margin="-80px"
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}