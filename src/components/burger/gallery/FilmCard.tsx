"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MENU } from "@/components/burger/data";

export function FilmCard({
  src,
  index,
  flip,
}: {
  src: string;
  index: number;
  flip: boolean;
}) {
  const reduce = useReducedMotion();
  const item = MENU[index % MENU.length];

  return (
    <div
      className={`group relative w-[68vw] shrink-0 overflow-hidden rounded-2xl sm:w-[40vw] lg:w-[26vw] ${
        flip
          ? index % 2
            ? "md:-translate-y-4"
            : "md:translate-y-8"
          : index % 2
            ? "md:translate-y-8"
            : "md:-translate-y-4"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-fg/10">
        <motion.div
          className="absolute -inset-[8%]"
          animate={reduce ? undefined : { scale: [1.14, 1] }}
          transition={{
            duration: 10,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            delay: (index % 5) * 1.2,
          }}
        >
          <Image
            src={src}
            alt={item?.name || "Burger film still"}
            fill
            sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 26vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(251,191,36,0.5), 0 0 50px rgba(251,191,36,0.15)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4 text-left">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
            Take {String((index % 5) + 1).padStart(2, "0")}
          </p>
          <p className="mt-1 text-sm font-semibold text-fg/85">
            {item?.name}
          </p>
        </div>
      </div>
    </div>
  );
}