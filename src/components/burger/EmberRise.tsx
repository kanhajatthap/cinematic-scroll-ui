"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vy: number;
  vx: number;
  r: number;
  life: number;
  max: number;
  ph: number;
}

const GOLD = [251, 191, 36];
const WARM = [254, 243, 199];
const ORANGE = [245, 158, 11];
const EMBER = [180, 83, 9];

export function EmberRise({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let sparks: Spark[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (): Spark => {
      const max = rand(160, 420);
      return {
        x: rand(0, 1),
        y: rand(0.85, 1.15),
        vy: rand(-0.9, -0.45),
        vx: rand(-0.18, 0.18),
        r: rand(0.6, 2.1),
        life: 0,
        max,
        ph: rand(0, Math.PI * 2),
      };
    };

    const build = () => {
      const count = Math.min(70, Math.max(26, Math.round(w / 24)));
      sparks = Array.from({ length: count }, spawn);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    resize();

    window.addEventListener("resize", resize);

    const drawSpark = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      heat: number
    ) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
      grad.addColorStop(0, `rgba(${WARM[0]},${WARM[1]},${WARM[2]},${alpha})`);
      grad.addColorStop(
        0.35,
        `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha * 0.6})`
      );
      grad.addColorStop(
        0.7,
        `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${alpha * heat})`
      );
      grad.addColorStop(1, `rgba(${EMBER[0]},${EMBER[1]},${EMBER[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r * 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (t: number) => {
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);

      for (const s of sparks) {
        s.life += 1;
        const p = s.life / s.max;
        if (p >= 1) Object.assign(s, spawn());

        s.x += s.vx + (reduce ? 0 : Math.sin(time * 2 + s.ph) * 0.008);
        s.y += s.vy * (reduce ? 0.4 : 1);

        const fadeOut = p > 0.75 ? 1 - (p - 0.75) / 0.25 : 1;
        const fadeIn = p < 0.08 ? p / 0.08 : 1;
        const alpha = Math.min(0.7, fadeIn * fadeOut * 0.65);
        const heat = 0.25 + (1 - p) * 0.75;

        drawSpark(s.x * w, s.y * h, s.r * (1 + p * 1.4), alpha, heat);
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      const drawStatic = () => {
        ctx.clearRect(0, 0, w, h);
        for (const s of sparks) {
          drawSpark(s.x * w, s.y * h, s.r * 2, 0.3, 0.5);
        }
      };
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}