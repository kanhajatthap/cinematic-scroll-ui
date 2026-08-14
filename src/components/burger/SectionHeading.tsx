"use client";

import { ChapterNo } from "@/components/burger/ChapterNo";
import { Reveal } from "@/components/burger/Reveal";
import type { ReactNode } from "react";

export function SectionHeading({
  n,
  label,
  children,
  sub,
  subClassName = "mt-5 text-white/50",
  align = "center",
  narrow = false,
  size = "default",
  reveal = true,
}: {
  n: string;
  label: string;
  children: ReactNode;
  sub?: ReactNode;
  subClassName?: string;
  align?: "center" | "left";
  narrow?: boolean;
  size?: "default" | "xl";
  reveal?: boolean;
}) {
  const titleSize =
    size === "xl"
      ? "text-[clamp(2.4rem,6vw,5rem)]"
      : "text-[clamp(2.2rem,5.5vw,4.5rem)]";

  const inner = (
    <div
      className={`${align === "center" ? "text-center" : ""} ${
        narrow ? "mx-auto max-w-2xl" : ""
      }`}
    >
      <ChapterNo n={n} label={label} />
      <h2
        className={`mt-6 ${titleSize} font-bold leading-[0.95] tracking-tight`}
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {children}
      </h2>
      {sub ? <p className={subClassName}>{sub}</p> : null}
    </div>
  );

  if (!reveal) return inner;

  return <Reveal>{inner}</Reveal>;
}
