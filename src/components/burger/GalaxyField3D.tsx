"use client";

import { useEffect, useRef } from "react";

interface Star {
  theta: number;
  phi: number;
  rad: number;
  r: number;
  tw: number;
  ph: number;
}

const GOLD = [251, 191, 36];
const WARM = [254, 243, 199];
const DEEP = [180, 120, 40];

export function GalaxyField3D({
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

    const FOCAL = 760;
    const RADIUS = 340;
    let stars: Star[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const count = Math.min(260, Math.max(90, Math.round((w * h) / 5200)));
      stars = Array.from({ length: count }, () => ({
        theta: rand(0, Math.PI * 2),
        phi: Math.acos(rand(-1, 1)),
        rad: RADIUS * rand(0.45, 1),
        r: rand(0.5, 1.9),
        tw: rand(0.6, 1.8),
        ph: rand(0, Math.PI * 2),
      }));
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

    const project = (
      s: Star,
      time: number,
      rotY: number,
      rotX: number,
      px: number,
      py: number
    ) => {
      const theta = s.theta + time * 0.05 * s.tw;
      const phi = s.phi + Math.sin(time * 0.1 + s.ph) * 0.15;
      const R = s.rad;

      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);

      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);

      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const y1 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;

      const cxw = w / 2;
      const cyh = h / 2;
      const s2 = FOCAL / (FOCAL + z2);

      return {
        x: cxw + (x1 + px) * s2,
        y: cyh + (y1 + py) * s2,
        r: s.r * s2,
        z: z2,
        tw: s.tw,
        ph: s.ph,
      };
    };

    const drawPoint = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      core: boolean
    ) => {
      const col = core ? WARM : GOLD;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      grad.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${alpha})`);
      grad.addColorStop(0.4, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha * 0.5})`);
      grad.addColorStop(1, `rgba(${DEEP[0]},${DEEP[1]},${DEEP[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (t: number) => {
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);

      const px = mouseX * 20;
      const py = mouseY * 20;
      const rotY = time * 0.12 + mouseX * 0.12;
      const rotX = 0.32 + mouseY * 0.08;

      const projected = stars
        .map((s) => project(s, time, rotY, rotX, px, py))
        .sort((a, b) => a.z - b.z);

      for (const p of projected) {
        if (p.x < -30 || p.x > w + 30 || p.y < -30 || p.y > h + 30) continue;

        const depth = 1 - p.z / RADIUS / 1.6;
        const twinkle = 0.6 + 0.4 * Math.sin(time * 2.2 * p.tw + p.ph);
        const alpha = Math.max(0.05, Math.min(0.85, depth * twinkle));

        drawPoint(p.x, p.y, p.r, alpha, alpha > 0.55);
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      const drawStatic = () => {
        ctx.clearRect(0, 0, w, h);
        const proj = stars.map((s) => project(s, 0, 0, 0.32, 0, 0));
        for (const p of proj) {
          const depth = 1 - p.z / RADIUS / 1.6;
          drawPoint(p.x, p.y, p.r, Math.max(0.08, depth * 0.5), false);
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