"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE, NAV } from "@/components/burger/data";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-mono text-[10px] tracking-widest text-gold">
            SB
          </span>
          <span
            className="text-sm font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Smash<span className="gold-text italic">Burger</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Magnetic>
          <a
            href="#visit"
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-xl transition-colors hover:border-gold/50 hover:text-gold"
          >
            Order
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}