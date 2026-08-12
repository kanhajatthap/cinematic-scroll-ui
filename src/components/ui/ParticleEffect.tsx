"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

const PARTICLE_COUNT = 22;

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),
  gold: i % 3 !== 0,
}));

interface ParticleEffectProps {
  className?: string;
  triggerRef?: RefObject<{ trigger: () => void } | null>;
  reducedMotion?: boolean;
}

export function ParticleEffect({
  className,
  triggerRef,
  reducedMotion = false,
}: ParticleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const withTimeline = container as HTMLDivElement & {
      __contactParticleTl?: gsap.core.Timeline;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      PARTICLES.forEach((p) => {
        const angle = (p.id / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.7;
        const distance = 44 + Math.random() * 90;
        const duration = 0.8 + Math.random() * 0.6;
        const delay = Math.random() * 0.15;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        const target = `#contact-particle-${p.id}`;

        tl.to(
          target,
          {
            x: endX,
            y: endY,
            opacity: p.gold ? 0.9 : 0.6,
            scale: 1,
            duration,
            delay,
            ease: "power2.out",
          }
        ).to(
          target,
          {
            opacity: 0,
            scale: 0.2,
            duration: 0.4,
            delay: delay + duration - 0.35,
            ease: "power2.out",
          }
        );
      });

      withTimeline.__contactParticleTl = tl;
    }, container);

    return () => {
      ctx.revert();
      withTimeline.__contactParticleTl?.kill();
    };
  }, [reducedMotion]);

  const trigger = useCallback(() => {
    if (reducedMotion) return;
    const container = containerRef.current as (HTMLDivElement & {
      __contactParticleTl?: gsap.core.Timeline;
    }) | null;
    container?.__contactParticleTl?.restart();
  }, [reducedMotion]);

  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = { trigger };
    }
  }, [triggerRef, trigger]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          id={`contact-particle-${p.id}`}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: p.gold
              ? "radial-gradient(circle at 30% 30%, #F3EFE8, #C6A278)"
              : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
            boxShadow: p.gold
              ? "0 0 12px rgba(198,162,120,0.9), 0 0 24px rgba(198,162,120,0.4)"
              : "0 0 8px rgba(255,255,255,0.4)",
            willChange: "transform, opacity",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {p.gold && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 40%, rgba(198,162,120,0.3) 100%)",
                filter: "blur(2px)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}