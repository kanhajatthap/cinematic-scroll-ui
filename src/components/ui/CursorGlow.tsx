"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 90, damping: 25 });
  const glowY = useSpring(y, { stiffness: 90, damping: 25 });
  const dotX = useSpring(x, { stiffness: 500, damping: 35 });
  const dotY = useSpring(y, { stiffness: 500, damping: 35 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovered(!!target?.closest("a, button, [data-tilt]"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          left: -540,
          top: -540,
          width: 1080,
          height: 1080,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.08), transparent 60%)",
          x: glowX,
          y: glowY,
          willChange: "transform",
        }}
      />
      <motion.div
        aria-hidden
        className="rounded-full border border-gold/50"
        style={{
          position: "fixed",
          left: -6,
          top: -6,
          width: 12,
          height: 12,
          zIndex: 1000,
          x: dotX,
          y: dotY,
          willChange: "transform",
        }}
        animate={{
          scale: hovered ? 2.2 : 1,
          opacity: hovered ? 0.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    </div>
  );
}
