"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    const initGsap = async () => {
      try {
        const [{ default: gsap }, { default: ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } catch {
        // GSAP unavailable — Lenis still runs on its own raf.
        const loop = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      }
    };
    initGsap();

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}