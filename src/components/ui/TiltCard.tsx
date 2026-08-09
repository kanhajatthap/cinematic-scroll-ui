"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}

export function TiltCard({ children, className, max = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hover, setHover] = useState(false);

  const onMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
      }}
      style={{ perspective: "1200px" }}
      className={className}
    >
      <motion.div
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          transformPerspective: 1200,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: hover ? 1 : 0,
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.12), transparent 55%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}