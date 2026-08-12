"use client";

import { forwardRef, useEffect, useRef } from "react";
import { WaveAnimation } from "./Character/WaveAnimation";
import { IdleAnimation } from "./Character/IdleAnimation";

export type CharacterPhase = "WAVE" | "IDLE";

interface CharacterProps {
  phase: CharacterPhase;
  reducedMotion: boolean;
  onWaveComplete: () => void;
}

export const Character = forwardRef<HTMLDivElement, CharacterProps>(
  function Character({ phase, reducedMotion, onWaveComplete }, ref) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    }, [ref]);

    const overlay = (active: boolean) =>
      `pointer-events-none absolute inset-0 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0"
      }`;

    return (
      <div
        ref={rootRef}
        className="relative h-[300px] w-[240px] sm:h-[320px] sm:w-[256px]"
        data-character-phase={phase}
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        {phase === "WAVE" && !reducedMotion && (
          <div className="absolute inset-0">
            <WaveAnimation onComplete={onWaveComplete} />
          </div>
        )}

        <div className={overlay(phase === "IDLE")}>
          <IdleAnimation staticPose={reducedMotion} />
        </div>
      </div>
    );
  }
);
