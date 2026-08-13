"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("premium-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovered(
        !!el?.closest("a, button, [role='button'], article, .glass"),
      );
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("premium-cursor");
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, margin: "-3px 0 0 -3px" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-9 w-9 rounded-full border border-gold/50"
        style={{ x: ringX, y: ringY, margin: "-18px 0 0 -18px" }}
        animate={{ scale: hovered ? 1.7 : 1, opacity: hovered ? 0.9 : 0.55 }}
        transition={{ scale: { duration: 0.25 }, opacity: { duration: 0.25 } }}
      />
    </>
  );
}