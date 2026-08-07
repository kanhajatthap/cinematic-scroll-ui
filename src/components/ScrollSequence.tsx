"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["Home", "Features", "Gallery", "Contact"];

const TOTAL_FRAMES = 300;
const FRAME_PATH = "/frames/frame_";
const PAD = 4;

function frameSrc(i: number): string {
  return `${FRAME_PATH}${String(i + 1).padStart(PAD, "0")}.jpg`;
}

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const loadedRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const progress = getCurrentProgress(containerRef.current);
    const idx = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * (TOTAL_FRAMES - 1))
    );
    drawFrame(idx);
  }, [drawFrame]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedRef.current += 1;
        setLoadProgress(Math.round((loadedRef.current / TOTAL_FRAMES) * 100));
      };
      images.push(img);
    }

    imagesRef.current = images;
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const progress = getCurrentProgress(containerRef.current);
        const idx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * (TOTAL_FRAMES - 1))
        );
        drawFrame(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "300vh",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          background: "#000",
        }}
      />

      <nav
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          padding: "1.5rem 2.5rem",
          zIndex: 20,
        }}
      >
        <span
          style={{
            marginRight: "auto",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#fff",
          }}
        >
          CINEMATIC
        </span>
        {NAV_LINKS.map((label) => (
          <a key={label} href="#" style={{ position: "relative" }}>
            <motion.span
              className="text-sm uppercase tracking-widest text-white/60 transition-colors duration-300 hover:text-white"
              style={{ cursor: "pointer" }}
              whileHover={{ y: -2 }}
            >
              {label}
            </motion.span>
          </a>
        ))}
      </nav>

      {loadProgress < 100 && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontSize: "14px",
            fontFamily: "system-ui, sans-serif",
            opacity: 0.7,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          Loading frames… {loadProgress}%
        </div>
      )}
    </div>
  );
}

function getCurrentProgress(container: HTMLDivElement | null): number {
  if (!container) return 0;
  const rect = container.getBoundingClientRect();
  const totalScroll = rect.height - window.innerHeight;
  if (totalScroll <= 0) return 0;
  return Math.min(1, Math.max(0, -rect.top / totalScroll));
}
