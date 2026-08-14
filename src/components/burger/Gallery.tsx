"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/burger/SectionHeading";
import { FilmStrip } from "@/components/burger/gallery/FilmStrip";
import { Timecode } from "@/components/burger/Timecode";
import { GALLERY } from "@/components/burger/data";

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
        <SectionHeading n="04" label="Gallery">
          Moments from <span className="gold-text italic">the griddle</span>
        </SectionHeading>
      </div>

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
        <FilmStrip items={[...GALLERY, ...GALLERY]} duration={46} dir={1} />
        <FilmStrip
          items={[...GALLERY, ...GALLERY]}
          duration={38}
          dir={-1}
          flip
        />
      </motion.div>
    </section>
  );
}