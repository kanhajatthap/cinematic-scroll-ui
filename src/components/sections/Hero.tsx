"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import { HeroScrub } from "@/components/ui/hero-scrub";
import { Magnetic } from "@/components/ui/Magnetic";

const FRAME_URL = (i: number) =>
  `/frames-hero/frame_${String(i + 1).padStart(4, "0")}.webp`;

const ROLES = ["Frontend Developer", "WordPress Expert", "React Developer"];

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const smooth = (p: number) => {
  const x = Math.max(0, Math.min(1, p));
  return x * x * (3 - 2 * x);
};

const reveal = (progress: number, start: number, end: number): CSSProperties => {
  if (progress <= start)
    return { opacity: 0, transform: "translateY(28px)" };
  if (progress >= end) return { opacity: 1, transform: "translateY(0px)" };
  const fade = smooth((progress - start) / (end - start));
  return {
    opacity: fade,
    transform: `translateY(${28 * (1 - fade)}px)`,
  };
};

export default function Hero() {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    getReducedSnapshot,
    () => false
  );

  const revealed: CSSProperties | undefined = reduced
    ? { opacity: 1, transform: "translateY(0px)" }
    : undefined;

  return (
    <HeroScrub
      id="home"
      frameCount={300}
      frameUrl={FRAME_URL}
      titleTop="KANHA"
      titleBottom="JATTHAP"
      accentHex="#fbbf24"
      titleMotion={(progress) => ({
        eyebrow: revealed ?? reveal(progress, 0, 0.04),
        top: revealed ?? reveal(progress, 0.04, 0.1),
        bottom: revealed ?? reveal(progress, 0.12, 0.18),
      })}
    >
      {(progress) => (
        <div className="absolute inset-x-0 bottom-[6.5rem] z-10 flex flex-col items-center gap-5 px-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {ROLES.map((role, i) => (
              <span
                key={role}
                className="flex items-center gap-6"
                style={revealed ?? reveal(progress, 0.26 + i * 0.055, 0.32 + i * 0.055)}
              >
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-fg/60 md:text-sm">
                  {role}
                </span>
                {i < ROLES.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                )}
              </span>
            ))}
          </div>

          <p
            className="mx-auto max-w-xl text-sm leading-relaxed text-fg/55 md:text-base"
            style={revealed ?? reveal(progress, 0.44, 0.52)}
          >
            I craft cinematic, high-performance digital experiences — where luxury
            design meets engineering precision.
          </p>

          <div style={revealed ?? reveal(progress, 0.56, 0.64)}>
            <Magnetic
              strength={0.25}
              className="pointer-events-auto inline-block"
            >
              <a
                href="#about"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-fg/20 bg-fg/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-fg backdrop-blur-xl transition-colors hover:border-gold/40"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-fg/15 to-transparent" />
                <span className="relative">Explore Work</span>
                <span className="relative text-gold transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      )}
    </HeroScrub>
  );
}