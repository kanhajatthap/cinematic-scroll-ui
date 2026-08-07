"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/frames/frame_";
const PAD = 4;

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: EASE },
});

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
  const [progress, setProgress] = useState(0);

  const frameNumber = String(
    Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
  ).padStart(3, "0");

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
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
    setProgress(progress);
  }, [drawFrame]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedRef.current += 1;
        setLoadProgress(Math.round((loadedRef.current / TOTAL_FRAMES) * 100));
        const progress = getCurrentProgress(containerRef.current);
        const idx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * (TOTAL_FRAMES - 1))
        );
        drawFrame(idx);
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
        setProgress(progress);
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
        background: "#000",
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

      {/* Sticky stage */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,           
          }}
        />

        {/* Film grain */}
        <motion.div
          animate={{ opacity: [0.05, 0.11, 0.06, 0.1, 0.05] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 6,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
            mixBlendMode: "overlay",
          }}
        />

        {/* Headline */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 2rem",
            zIndex: 20,
            transform: `translateY(${progress * -70}px)`,
          }}
        >
          <motion.h1
            {...entrance(0.3)}
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#fff",
              textShadow: "0 10px 60px rgba(0,0,0,0.65)",
              marginBottom: "1.5rem",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #fef9c3, #ffffff, #fef9c3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cinematic
            </span>
          </motion.h1>

          <motion.p
            {...entrance(0.5)}
            style={{
              maxWidth: "42rem",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "#d1d5db",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            Experience the magic of cinema brought to life
          </motion.p>

          <motion.button
            {...entrance(0.7)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "999px",
              padding: "1.1rem 2.9rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#fff",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              pointerEvents: "auto",
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Explore Now</span>
          </motion.button>
        </motion.div>

        {/* HUD */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "clamp(2.5rem, 5vh, 4rem)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2.5rem",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
          }}
        >
          <span>Frame {frameNumber} / {String(TOTAL_FRAMES).padStart(3, "0")}</span>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(240px, 30vw)",
              height: 1,
              background: "rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #fbbf24, #fef3c7)",
                boxShadow: "0 0 10px rgba(251,191,36,0.9)",
              }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.span
            animate={{ opacity: 1 - progress }}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
          >
            Scroll
            <motion.svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M1 1 L5 5 L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </motion.svg>
          </motion.span>
        </div>
      </div>

      {loadProgress < 100 && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "10px",
            letterSpacing: "0.35em",
            fontFamily: "var(--font-geist-mono), monospace",
            textTransform: "uppercase",
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          Loading Frames — {loadProgress}%
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
