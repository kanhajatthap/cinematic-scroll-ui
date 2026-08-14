"use client";

import { Magnetic } from "@/components/ui/Magnetic";
import type { CSSProperties, ReactNode } from "react";

export function PillButton({
  href,
  variant = "ghost",
  magnetic = false,
  shine = false,
  target,
  rel,
  style,
  className,
  children,
}: {
  href: string;
  variant?: "ghost" | "gold";
  magnetic?: boolean;
  shine?: boolean;
  target?: string;
  rel?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] backdrop-blur-xl transition-colors";
  const variantClass =
    variant === "gold"
      ? "border border-gold/40 bg-gold/10 text-gold hover:bg-gold/20"
      : "border border-fg/20 bg-fg/5 text-fg hover:border-fg/40";

  const link = (
    <a
      href={href}
      target={target}
      rel={rel}
      style={style}
      className={`${base} ${variantClass} relative ${className ?? ""}`}
    >
      {shine ? (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-fg/15 to-transparent" />
      ) : null}
      <span className="relative">{children}</span>
    </a>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
