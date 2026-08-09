"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

type HeroScrubProps = {
  frameCount?: number;
  frameUrl: (index: number) => string;
  titleTop: string;
  titleBottom: string;
  accentHex?: string;
  titleMotion?: (progress: number) => {
    eyebrow?: CSSProperties;
    top?: CSSProperties;
    bottom?: CSSProperties;
  };
  children?: ReactNode | ((progress: number) => ReactNode);
};

type FrameEntry = { img: HTMLImageElement | null; loaded: boolean };

const BUFFER = 12;

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroScrub({
  frameCount = 300,
  frameUrl,
  titleTop,
  titleBottom,
  accentHex = "#fbbf24",
  titleMotion,
  children,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const cacheRef = useRef<FrameEntry[]>([]);
  const frameIdxRef = useRef(0);

  const [frameNum, setFrameNum] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [windowReady, setWindowReady] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    getReducedSnapshot,
    () => false
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const entry = cacheRef.current[index];
    if (
      !canvas ||
      !entry ||
      !entry.img ||
      !entry.loaded ||
      !entry.img.naturalWidth
    )
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = entry.img.naturalWidth;
    const ih = entry.img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(entry.img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  const isWindowReady = useCallback(
    (idx: number) => {
      const cache = cacheRef.current;
      const min = Math.max(0, idx - BUFFER);
      const max = Math.min(frameCount - 1, idx + BUFFER);
      for (let i = min; i <= max; i++) {
        const entry = cache[i];
        if (!entry || !entry.loaded) return false;
      }
      return true;
    },
    [frameCount]
  );

  const loadFrame = useCallback(
    (i: number) => {
      const cache = cacheRef.current;
      if (!cache[i]) cache[i] = { img: null, loaded: false };
      const entry = cache[i];
      if (entry.loaded || entry.img) return;

      const img = new Image();
      entry.img = img;
      img.onload = () => {
        entry.loaded = true;
        setLoaded((n) => n + 1);
        setWindowReady(isWindowReady(frameIdxRef.current));
        drawFrame(i);
      };
      img.src = frameUrl(i);
    },
    [drawFrame, isWindowReady, frameUrl]
  );

  const requestWindow = useCallback(
    (idx: number) => {
      const min = Math.max(0, idx - BUFFER);
      const max = Math.min(frameCount - 1, idx + BUFFER);
      for (let i = min; i <= max; i++) loadFrame(i);

      const keepMin = Math.max(0, idx - BUFFER * 3);
      const keepMax = Math.min(frameCount - 1, idx + BUFFER * 3);
      for (let i = 0; i < frameCount; i++) {
        if (i >= keepMin && i <= keepMax) continue;
        const entry = cacheRef.current[i];
        if (entry && entry.img) {
          entry.img.src = "";
          entry.img = null;
          entry.loaded = false;
        }
      }
    },
    [loadFrame, frameCount]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    drawFrame(frameIdxRef.current);
  }, [drawFrame]);

  useEffect(() => {
    if (reduced) return;

    cacheRef.current = Array.from({ length: frameCount }, () => ({
      img: null,
      loaded: false,
    }));
    requestWindow(0);
    resizeCanvas();

    const scope = sectionRef.current;
    if (!scope) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);

    (async () => {
      if (cancelled) return;
      const [{ default: gsap }, { default: ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const frameProxy = { current: 0 };

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self: { progress: number }) => {
              setProgress(self.progress);
              const idx = Math.round(frameProxy.current);
              frameIdxRef.current = idx;
              setFrameNum(idx + 1);
              requestWindow(idx);
              cancelAnimationFrame(rafRef.current);
              rafRef.current = requestAnimationFrame(() => drawFrame(idx));
            },
          },
        });

        tl.to(
          frameProxy,
          { current: frameCount - 1, ease: "none", duration: 1 },
          0
        );
      }, scope);
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      if (ctx) ctx.revert();
      cacheRef.current.forEach((entry) => {
        if (entry?.img) entry.img.src = "";
      });
    };
  }, [
    reduced,
    frameCount,
    requestWindow,
    resizeCanvas,
    drawFrame,
  ]);

  const loadPct = Math.round((loaded / frameCount) * 100);

  return (
    <section
      ref={sectionRef}
      className={
        reduced
          ? "relative h-screen bg-[#05060a]"
          : "relative h-[420vh] bg-[#05060a]"
      }
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#05060a]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(251,191,36,0.08), transparent 55%)",
            filter: "blur(70px)",
          }}
        />

        {/* Full-screen stage */}
        <div ref={cardRef} className="absolute inset-0 overflow-hidden">
          {reduced ? (
            <img
              src={frameUrl(0)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
          ) : (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 block h-full w-full"
              style={{ background: "#05060a" }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(5,6,10,0.8) 100%)",
            }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span
              className="eyebrow mb-6"
              style={titleMotion ? titleMotion(progress).eyebrow : undefined}
            >
              Portfolio
            </span>
            <h1
              className="font-bold leading-[0.9] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(3rem, 10vw, 11rem)",
              }}
            >
              <span
                className="block text-white"
                style={{
                  textShadow: "0 10px 60px rgba(0,0,0,0.65)",
                  ...(titleMotion ? titleMotion(progress).top : {}),
                }}
              >
                {titleTop}
              </span>
              <span
                className="block italic"
                style={{
                  color: accentHex,
                  ...(titleMotion ? titleMotion(progress).bottom : {}),
                }}
              >
                {titleBottom}
              </span>
            </h1>
          </div>
        </div>

        {/* Fixed overlay content */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {typeof children === "function" ? children(progress) : children}
        </div>

        {/* HUD */}
        <div
          className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-between px-6 md:px-10"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
          }}
        >
          <span>
            Frame {String(frameNum).padStart(3, "0")} /{" "}
            {String(frameCount).padStart(3, "0")}
          </span>

          <div
            className="absolute left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden md:w-60"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #fbbf24, #fef3c7)",
                boxShadow: "0 0 10px rgba(251,191,36,0.9)",
              }}
            />
          </div>

          <span className="flex items-center gap-2" style={{ opacity: 1 - progress }}>
            Scroll
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path
                d="M1 1 L5 5 L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </span>
        </div>

        {/* Loading indicator */}
        {!windowReady && !reduced && (
          <div className="pointer-events-none absolute inset-x-0 bottom-14 z-30 flex justify-center">
            <span
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/60 backdrop-blur-md"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Loading Film — {loadPct}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
