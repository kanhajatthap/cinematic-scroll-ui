"use client";

import { forwardRef, useEffect, useRef } from "react";
import { WalkAnimation } from "./Character/WalkAnimation";
import { BagAnimation } from "./Character/BagAnimation";
import { SnapAnimation } from "./Character/SnapAnimation";
import { IdleAnimation } from "./Character/IdleAnimation";

export type CharacterPhase = "WALKING" | "STOPPED" | "BAG_PLACED" | "SNAP" | "IDLE";

interface CharacterProps {
  phase: CharacterPhase;
  reducedMotion: boolean;
  onSnapComplete: () => void;
}

const CARRIES_BAG: CharacterPhase[] = ["WALKING", "STOPPED", "BAG_PLACED"];

export const Character = forwardRef<HTMLDivElement, CharacterProps>(
  function Character({ phase, reducedMotion, onSnapComplete }, ref) {
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

    const carriesBag = CARRIES_BAG.includes(phase);

    return (
      <div
        ref={rootRef}
        className="relative h-[420px] w-[280px] sm:w-[320px]"
        data-character-phase={phase}
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        {phase === "WALKING" && !reducedMotion && (
          <div className="absolute inset-0">
            <WalkAnimation bag={carriesBag} />
          </div>
        )}

        <div className={overlay(phase === "STOPPED")}>
          <IdleAnimation staticPose bag={carriesBag} />
        </div>

        {phase === "BAG_PLACED" && (
          <div className="absolute inset-0">
            <BagAnimation bag={carriesBag} />
          </div>
        )}

        {phase === "SNAP" && (
          <div className="absolute inset-0">
            <SnapAnimation onComplete={onSnapComplete} />
          </div>
        )}

        <div className={overlay(phase === "IDLE")}>
          <IdleAnimation staticPose={reducedMotion} />
        </div>
      </div>
    );
  }
);