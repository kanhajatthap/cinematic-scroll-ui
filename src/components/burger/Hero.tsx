"use client";

import { motion } from "framer-motion";
import { HeroScrub } from "@/components/ui/hero-scrub";
import { PillButton } from "@/components/burger/PillButton";
import { BURGER_FRAME_URL, NOTE_POS, SCENES } from "@/components/burger/data";

export function Hero() {
  return (
    <HeroScrub
      frameCount={240}
      frameUrl={BURGER_FRAME_URL}
      titleTop="SMASH"
      titleBottom="BURGER"
      accentHex="#fbbf24"
      titleMotion={(p) => {
        const fade = Math.min(1, p * 2.2);
        return {
          eyebrow: {
            opacity: 1 - Math.min(1, p * 9),
            transform: `translateY(${-p * 50}px)`,
          },
          top: {
            opacity: 1 - fade * 0.88,
            transform: `translate(${-p * 16}vw, ${-p * 14}vh) scale(${1 - p * 0.45})`,
          },
          bottom: {
            opacity: 1 - fade * 0.88,
            transform: `translate(${p * 16}vw, ${p * 14}vh) scale(${1 - p * 0.45})`,
          },
        };
      }}
    >
      {(p) => {
        const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
        const scene = (i: number) => {
          const enter = 0.1 + i * 0.2;
          const opacity = clamp01((p - enter) / 0.12);
          return {
            opacity,
            transform: `translateY(${(1 - opacity) * 26}px)`,
            filter: `blur(${(1 - opacity) * 6}px)`,
            visibility:
              opacity > 0.02 ? ("visible" as const) : ("hidden" as const),
          };
        };
        const finale = clamp01((p - 0.84) / 0.12);
        return (
          <>
            {/* Film frame guides */}
            <span className="pointer-events-none absolute left-5 top-5 h-7 w-7 border-l-2 border-t-2 border-white/15" />
            <span className="pointer-events-none absolute right-5 top-5 h-7 w-7 border-r-2 border-t-2 border-white/15" />
            <span className="pointer-events-none absolute bottom-5 left-5 h-7 w-7 border-b-2 border-l-2 border-white/15" />
            <span className="pointer-events-none absolute bottom-5 right-5 h-7 w-7 border-b-2 border-r-2 border-white/15" />

            {/* Storyboard scene notes — one per corner */}
            {SCENES.map((s, i) => (
              <motion.div
                key={s.name}
                style={scene(i)}
                className={`absolute z-10 max-w-[240px] ${NOTE_POS[i]}`}
              >
                <div
                  className={`flex items-start gap-3 ${
                    i % 2 ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  <span className="mt-2 h-px w-8 shrink-0 bg-gold/60 md:w-12" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold">
                      SC. 0{i + 1}
                    </p>
                    <p
                      className="mt-1.5 text-xl font-bold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {s.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Center finale — the complete burger */}
            <motion.div
              className="absolute inset-0 z-10 grid place-items-center px-6"
              style={{
                opacity: finale,
                visibility:
                  finale > 0.02 ? ("visible" as const) : ("hidden" as const),
                transform: `scale(${0.92 + (1 - finale) * 0.08})`,
                pointerEvents:
                  finale > 0.5 ? ("auto" as const) : ("none" as const),
              }}
            >
              <div className="max-w-xl text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-gold">
                  ✓ The Smash is complete
                </p>
                <h2
                  className="mt-5 text-[clamp(2.2rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Burnt. <span className="gold-text italic">Buttery.</span> Bold.
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/55">
                  Patty, cheese, sauce, bun — one perfectly layered smash
                  burger, built right in front of you.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <PillButton href="#menu" style={{ pointerEvents: "auto" }}>
                    See the Menu
                  </PillButton>
                  <PillButton
                    href="#visit"
                    variant="gold"
                    style={{ pointerEvents: "auto" }}
                  >
                    Order Now
                  </PillButton>
                </div>
              </div>
            </motion.div>
          </>
        );
      }}
    </HeroScrub>
  );
}