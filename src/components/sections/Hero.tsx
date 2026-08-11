"use client";

import { HeroScrub } from "@/components/ui/hero-scrub";
import { Magnetic } from "@/components/ui/Magnetic";

const FRAME_URL = (i: number) =>
  `/frames-opt/frame_${String(i + 1).padStart(4, "0")}.jpg`;

const ROLES = ["Frontend Developer", "WordPress Expert", "React Developer"];

export default function Hero() {
  return (
    <HeroScrub
      id="home"
      frameCount={300}
      frameUrl={FRAME_URL}
      titleTop="KANHA"
      titleBottom="JATTHAP"
      accentHex="#fbbf24"
    >
      <div className="absolute inset-x-0 bottom-[6.5rem] z-10 flex flex-col items-center gap-5 px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {ROLES.map((role, i) => (
            <span key={role} className="flex items-center gap-6">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/60 md:text-sm">
                {role}
              </span>
              {i < ROLES.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-gold/60" />
              )}
            </span>
          ))}
        </div>

        <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
          I craft cinematic, high-performance digital experiences — where luxury
          design meets engineering precision.
        </p>

        <Magnetic strength={0.25} className="pointer-events-auto inline-block">
          <a
            href="#about"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-colors hover:border-gold/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">Explore Work</span>
            <span className="relative text-gold transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </Magnetic>
      </div>
    </HeroScrub>
  );
}