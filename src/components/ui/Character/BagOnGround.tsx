"use client";

import { forwardRef } from "react";

export const BagOnGround = forwardRef<HTMLDivElement>(function BagOnGround(
  _props,
  ref
) {
  return (
    <div ref={ref} className="relative h-10 w-14" aria-hidden="true">
      <div
        className="absolute inset-x-0 bottom-0 top-1 rounded-[10px]"
        style={{
          border: "1px solid rgba(198,162,120,0.55)",
          background:
            "linear-gradient(165deg, rgba(198,162,120,0.30), rgba(198,162,120,0.08))",
        }}
      />
      <div className="absolute left-1/2 top-1 h-2.5 w-[3px] -translate-x-1/2 rounded-full bg-[#C6A278]/60" />
      <div className="absolute left-1/2 top-1/2 h-[3px] w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A278]/85" />
      <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3EFE8]/80" />
      <div
        className="absolute -bottom-1.5 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full"
        style={{
          background: "rgba(0,0,0,0.35)",
          filter: "blur(3px)",
        }}
      />
    </div>
  );
});