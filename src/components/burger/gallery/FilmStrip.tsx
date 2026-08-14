"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FilmCard } from "@/components/burger/gallery/FilmCard";
import { SprocketStrip } from "@/components/burger/gallery/SprocketStrip";
import { loop } from "@/components/burger/gallery/loop";

export function FilmStrip({
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

  return (
    <div className="flex flex-col gap-4">
      <SprocketStrip ref={holesTopRef} duration={holeDur} dir={dir} />
      <motion.div
        ref={cardsRef}
        className="flex w-max gap-5 pr-5"
        animate={loop(dir, duration)}
      >
        {items.map((src, i) => (
          <FilmCard key={i} src={src} index={i} flip={flip} />
        ))}
      </motion.div>
      <SprocketStrip duration={holeDur} dir={dir} />
    </div>
  );
}