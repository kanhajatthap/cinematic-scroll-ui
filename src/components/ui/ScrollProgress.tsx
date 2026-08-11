"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #fbbf24, #fef3c7)",
        boxShadow: "0 0 12px rgba(251,191,36,0.8)",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    />
  );
}