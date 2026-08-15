"use client";

import Image from "next/image";
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
  id?: string;
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
  id,
  frameCount = 300,
  frameUrl,
  titleMotion,
  children,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef(0);
  const lastDrawnIdxRef = useRef(-1);
  const cacheRef = useRef<FrameEntry[]>([]);
  const frameIdxRef = useRef(0);
  const frameNumRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);
  const loadedCountRef = useRef(0);
  const readyRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [windowReady, setWindowReady] = useState(false);

  const needsProgressState =
    typeof children === "function" || titleMotion !== undefined;
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
    const ctx =
      ctxRef.current ??
      canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;
    ctxRef.current = ctx;

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

  const loadedRafRef = useRef(0);
  const bumpLoaded = useCallback(() => {
    loadedCountRef.current += 1;
    if (loadedRafRef.current) return;
    loadedRafRef.current = requestAnimationFrame(() => {
      loadedRafRef.current = 0;
      setLoaded(loadedCountRef.current);
    });
  }, []);

  const loadFrame = useCallback(
    (i: number) => {
      const cache = cacheRef.current;
      if (!cache[i]) cache[i] = { img: null, loaded: false };
      const entry = cache[i];
      if (entry.loaded || entry.img) return;

      const img = new window.Image();
      img.decoding = "async";
      entry.img = img;
      img.onload = () => {
        entry.loaded = true;
        loadedCountRef.current += 1;
        bumpLoaded();
        if (!readyRef.current && isWindowReady(frameIdxRef.current)) {
          readyRef.current = true;
          setWindowReady(true);
        }
        // Only draw if this is the currently visible frame — drawing every
        // loaded frame (including far-away preloads) wastes main-thread time.
        if (i === frameIdxRef.current) drawFrame(i);
      };
      img.src = frameUrl(i);
    },
    [drawFrame, isWindowReady, frameUrl, bumpLoaded]
  );

  const requestWindow = useCallback(
    (idx: number, radius = BUFFER) => {
      const min = Math.max(0, idx - radius);
      const max = Math.min(frameCount - 1, idx + radius);
      for (let i = min; i <= max; i++) loadFrame(i);

      // Once every frame is preloaded, stop evicting — eviction would force a
      // cold re-download + re-decode the moment the user scrolls back.
      if (loadedCountRef.current >= frameCount) return;

      const keepMin = Math.max(0, idx - BUFFER * 2);
      const keepMax = Math.min(frameCount - 1, idx + BUFFER * 2);
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
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const f = Math.min(1, 1280 / vw, 720 / vh, dpr);
    canvas.width = Math.max(1, Math.round(vw * f));
    canvas.height = Math.max(1, Math.round(vh * f));
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctxRef.current = null;
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
    let progressRaf = 0;
    let idleTimer = 0;
    let cancelled = false;

    // Persistent draw loop — reads the latest frame index every rAF and draws
    // it. No throttling, no cancel/re-request churn, no dropped frames.
    const drawLoop = () => {
      if (cancelled) return;
      const idx = frameIdxRef.current;
      if (idx !== lastDrawnIdxRef.current) {
        lastDrawnIdxRef.current = idx;
        drawFrame(idx);
      }
      rafRef.current = requestAnimationFrame(drawLoop);
    };
    rafRef.current = requestAnimationFrame(drawLoop);

    // Preload every remaining frame in the background (small chunks) so
    // scrolling never stalls on a cold network fetch.
    let preloadTimer = 0;
    const preloadAll = () => {
      const cache = cacheRef.current;
      const queue: number[] = [];
      for (let i = 0; i < frameCount; i++) {
        const e = cache[i];
        if (e && !e.loaded && !e.img) queue.push(i);
      }
      let cursor = 0;
      const step = () => {
        if (cancelled) return;
        const end = Math.min(queue.length, cursor + 5);
        while (cursor < end) {
          loadFrame(queue[cursor]);
          cursor++;
        }
        if (cursor < queue.length) preloadTimer = window.setTimeout(step, 120);
      };
      step();
    };
    const preloadDelay = window.setTimeout(preloadAll, 400);

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

      const updateHud = (p: number) => {
        const bar = progressBarRef.current;
        if (bar) bar.style.width = `${p * 100}%`;
        const hint = scrollHintRef.current;
        if (hint) hint.style.opacity = String(Math.max(0, 1 - p));
      };

      const scheduleProgress = (p: number) => {
        progressRef.current = p;
        if (!needsProgressState) return;
        if (progressRaf) return;
        progressRaf = requestAnimationFrame(() => {
          progressRaf = 0;
          setProgress(progressRef.current);
        });
      };

      const touchWindow = (idx: number) => {
        clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          requestWindow(frameIdxRef.current, BUFFER);
        }, 250);
        requestWindow(idx, 1);
      };

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self: { progress: number }) => {
              const idx = Math.round(frameProxy.current);
              frameIdxRef.current = idx;
              const p = self.progress;
              updateHud(p);
              scheduleProgress(p);
              const span = frameNumRef.current;
              if (span)
                span.textContent = String(idx + 1).padStart(3, "0");
              touchWindow(idx);
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
      cancelAnimationFrame(progressRaf);
      cancelAnimationFrame(loadedRafRef.current);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimer);
      clearTimeout(preloadTimer);
      clearTimeout(preloadDelay);
      window.removeEventListener("resize", onResize);
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
    needsProgressState,
  ]);

  const loadPct = Math.round((loaded / frameCount) * 100);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={
        reduced
          ? "relative h-screen bg-ink"
          : "relative h-[420vh] bg-ink"
      }
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(251,191,36,0.1), rgba(251,191,36,0.03) 38%, transparent 60%)",
          }}
        />

        {/* Full-screen stage */}
        <div ref={cardRef} className="absolute inset-0 overflow-hidden">
          {reduced ? (
            <Image
              src={frameUrl(0)}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-50"
            />
          ) : (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 block h-full w-full"
              style={{ background: "var(--ink)" }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(5,6,10,0.8) 100%)",
            }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.04]" />

          {/* ============================================================
              Title block (commented out on request) — "Portfolio" eyebrow
              and KANHA JATTHAP heading.
          ============================================================ */}
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
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
                fontSize: "clamp(2.25rem, 5.5vw, 6.5rem)",
              }}
            >
              <span
                className="block text-fg"
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
          </div> */}
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
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          <span ref={frameNumRef}>
            Frame 001 / {String(frameCount).padStart(3, "0")}
          </span>

          <div
            className="absolute left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden md:w-60"
            style={{ background: "var(--line)" }}
          >
            <div
              ref={progressBarRef}
              className="h-full"
              style={{
                width: 0,
                background: "linear-gradient(90deg, #fbbf24, #fef3c7)",
                boxShadow: "0 0 10px rgba(251,191,36,0.9)",
              }}
            />
          </div>

          <span ref={scrollHintRef} className="flex items-center gap-2">
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
              className="rounded-full border border-fg/10 bg-fg/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-fg/60 backdrop-blur-md"
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
