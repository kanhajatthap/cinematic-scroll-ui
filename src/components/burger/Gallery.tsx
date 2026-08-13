"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChapterNo } from "@/components/burger/ChapterNo";
import { EASE, GALLERY, MENU } from "@/components/burger/data";

function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  const lastRef = useRef("");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const total = Math.floor((now - start) / (1000 / 24));
      const ff = total % 24;
      const ss = Math.floor(total / 24) % 60;
      const mm = Math.floor(total / (24 * 60)) % 60;
      const hh = Math.floor(total / (24 * 3600));
      const val = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
      const el = ref.current;
      if (el && val !== lastRef.current) {
        lastRef.current = val;
        el.textContent = val;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <span ref={ref}>00:00:00:00</span>;
}

const SPROCKETS = Array.from({ length: 36 });

function GalleryFilmRow({
  items,
  duration,
  dir = 1,
  flip = false,
}: {
  items: string[];
  duration: number;
  dir?: 1 | -1;
  flip?: boolean;
}) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const holesTopRef = useRef<HTMLDivElement>(null);
  const [holeDur, setHoleDur] = useState(duration);

  useEffect(() => {
    const measure = () => {
      const cw = cardsRef.current?.scrollWidth ?? 0;
      const hw = holesTopRef.current?.scrollWidth ?? 0;
      if (cw > 0 && hw > 0) setHoleDur((duration * hw) / cw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [duration]);

  const from = dir === 1 ? "0%" : "-50%";
  const to = dir === 1 ? "-50%" : "0%";
  const loop = (d: number) => ({
    x: [from, to],
    transition: { duration: d, repeat: Infinity, ease: "linear" as const },
  });

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        ref={holesTopRef}
        className="flex w-max gap-7 px-3"
        animate={loop(holeDur)}
      >
        {[...SPROCKETS, ...SPROCKETS].map((_, i) => (
          <span
            key={i}
            className="h-2 w-4 shrink-0 rounded-[3px] bg-white/10"
          />
        ))}
      </motion.div>
      <motion.div
        ref={cardsRef}
        className="flex w-max gap-5 pr-5"
        animate={loop(duration)}
      >
        {items.map((src, i) => {
          const item = MENU[i % MENU.length];
          return (
            <div
              key={i}
              className={`group relative w-[68vw] shrink-0 overflow-hidden rounded-2xl sm:w-[40vw] lg:w-[26vw] ${
                flip
                  ? i % 2
                    ? "md:-translate-y-4"
                    : "md:translate-y-8"
                  : i % 2
                    ? "md:translate-y-8"
                    : "md:-translate-y-4"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                <motion.div
                  className="absolute -inset-[8%]"
                  animate={{ scale: [1.14, 1] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                    delay: (i % 5) * 1.2,
                  }}
                >
                  <Image
                    src={src}
                    alt={item?.name || "Burger film still"}
                    fill
                    sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 26vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060a]/85 via-[#05060a]/10 to-transparent" />
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(251,191,36,0.5), 0 0 50px rgba(251,191,36,0.15)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
                    Take {String((i % 5) + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/85">
                    {item?.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div className="flex w-max gap-7 px-3" animate={loop(holeDur)}>
        {[...SPROCKETS, ...SPROCKETS].map((_, i) => (
          <span
            key={i}
            className="h-2 w-4 shrink-0 rounded-[3px] bg-white/10"
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Gallery() {
  const galleryRef = useRef<HTMLElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(galleryScroll, [0, 1], [70, -70]);

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <ChapterNo n="04" label="Gallery" />
          <h2
            className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Moments from <span className="gold-text italic">the griddle</span>
          </h2>
        </motion.div>
      </div>

      {/* Film meta bar */}
      <div className="relative z-10 mx-auto mt-12 flex max-w-7xl items-center justify-between px-6 font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">
        <span>
          Roll 04 — <span className="text-gold">Film Grain</span>
        </span>
        <span className="hidden sm:block">35mm · Kodak 5219</span>
        <span className="flex items-center gap-2 tabular-nums">
          <span className="text-gold">TC</span>
          <Timecode />
        </span>
      </div>

      <motion.div
        style={{ y: galleryY }}
        className="relative z-10 mt-8 flex flex-col gap-14 md:gap-20 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      >
        <GalleryFilmRow items={[...GALLERY, ...GALLERY]} duration={46} dir={1} />
        <GalleryFilmRow
          items={[...GALLERY, ...GALLERY]}
          duration={38}
          dir={-1}
          flip
        />
      </motion.div>
    </section>
  );
}