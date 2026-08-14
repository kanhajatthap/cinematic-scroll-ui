"use client";

import { motion, useReducedMotion } from "framer-motion";
import { loop } from "@/components/burger/gallery/loop";
import type { Ref } from "react";

const SPROCKETS = Array.from({ length: 36 });

export function SprocketStrip({
  duration,
  dir = 1,
  ref,
}: {
  duration: number;
  dir?: 1 | -1;
  ref?: Ref<HTMLDivElement>;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex w-max gap-7 px-3"
      animate={reduce ? undefined : loop(dir, duration)}
    >
      {[...SPROCKETS, ...SPROCKETS].map((_, i) => (
        <span
          key={i}
          className="h-2 w-4 shrink-0 rounded-[3px] bg-white/10"
        />
      ))}
    </motion.div>
  );
}