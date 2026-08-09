"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      setHovered(!!target?.closest("a, button, [data-tilt]"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

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
          background: "radial-gradient(circle, rgba(251,191,36,0.08), transparent 60%)",
        }}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 90, damping: 25 }}
      />
      <motion.div
        aria-hidden
        className="rounded-full border border-gold/50"
        style={{ position: "fixed", left: -6, top: -6, width: 12, height: 12, zIndex: 1000 }}
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovered ? 2.2 : 1,
          opacity: hovered ? 0.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    </div>
  );
}