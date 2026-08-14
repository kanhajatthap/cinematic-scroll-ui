"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/burger/data";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  blur = 0,
  duration = 0.9,
  margin = "-100px",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  blur?: number;
  duration?: number;
  margin?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin }}
      transition={{ delay, duration, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
