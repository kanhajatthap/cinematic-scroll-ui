"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}

export function TiltCard({ children, className, max = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const [hover, setHover] = useState(false);

  useMotionValueEvent(gx, "change", () => {
    const el = glareRef.current;
    if (!el) return;
    el.style.background = `radial-gradient(circle at ${gx.get()}% ${gy.get()}%, rgba(255,255,255,0.12), transparent 55%)`;
  });

  const onMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * max * 2);
    ry.set((px - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        rx.set(0);
        ry.set(0);
        gx.set(50);
        gy.set(50);
      }}
      style={{ perspective: "1200px" }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: srx,
          rotateY: sry,
          transformPerspective: 1200,
          position: "relative",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: hover ? 1 : 0,
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 55%)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
