"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  tw: number;
  ph: number;
}

const GOLD = [251, 191, 36];
const WHITE = [254, 243, 199];

export function ParticleField3D({
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
    let mouseX = 0;
    let mouseY = 0;

    const FOCAL = 700;
    const DEPTH = 420;
    let embers: Ember[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (near: boolean): Ember => {
      const d = near ? rand(80, 200) : rand(180, DEPTH);
      return {
        x: rand(-d, d),
        y: rand(-d, d),
        z: rand(0, DEPTH),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.15, 0.15),
        vz: near ? rand(0.4, 0.9) : rand(0.15, 0.45),
        r: near ? rand(0.9, 2.2) : rand(0.5, 1.4),
        tw: rand(0.002, 0.012),
        ph: Math.random() * Math.PI * 2,
      };
    };

    const count = () =>
      Math.min(140, Math.max(48, Math.round((w * h) / 11000)));

    const build = () => {
      embers = Array.from({ length: count() }, () => spawn(true));
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

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("resize", resize);

    const frame = (t: number) => {
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);

      const px = mouseX * 26;
      const py = mouseY * 26;
      const rotY = mouseX * 0.1;
      const rotX = mouseY * 0.08;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const draw = embers
        .map((e) => {
          e.x += e.vx + (reduce ? 0 : Math.sin(time * 0.4 + e.ph) * 0.06);
          e.y += e.vy + (reduce ? 0 : Math.cos(time * 0.35 + e.ph) * 0.06);
          e.z += e.vz;
          if (e.z > DEPTH) Object.assign(e, spawn(false));
          if (e.z < 0) e.z = DEPTH;

          let x = e.x;
          let y = e.y;
          let z = e.z;

          const x1 = x * cosY + z * sinY;
          const z1 = -x * sinY + z * cosY;
          const y1 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;

          x = x1 + px;
          y = y1 + py;
          z = z2;

          const s = FOCAL / (FOCAL + z);
          const cx = w / 2;
          const cy = h / 2;

          return {
            x: cx + x * s,
            y: cy + y * s,
            r: e.r * s,
            z,
            tw: e.tw,
            ph: e.ph,
          };
        })
        .sort((a, b) => a.z - b.z);

      for (const p of draw) {
        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) continue;

        const flicker = 0.65 + 0.35 * Math.sin(time * 6 * p.tw * 40 + p.ph);
        const fade = Math.max(0.08, 1 - p.z / DEPTH);
        const a = flicker * fade;
        const alpha = Math.min(0.85, a);

        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 3.2
        );
        const hot = a > 0.55;
        const col = hot ? WHITE : GOLD;
        grad.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${alpha})`);
        grad.addColorStop(
          0.45,
          `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha * 0.45})`
        );
        grad.addColorStop(1, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      const drawStatic = () => {
        ctx.clearRect(0, 0, w, h);
        for (const e of embers) {
          const s = FOCAL / (FOCAL + e.z);
          const cx = w / 2;
          const cy = h / 2;
          const x = cx + e.x * s;
          const y = cy + e.y * s;
          const alpha = Math.max(0.15, 1 - e.z / DEPTH) * 0.5;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, e.r * s * 3);
          grad.addColorStop(0, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha})`);
          grad.addColorStop(1, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, e.r * s * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
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