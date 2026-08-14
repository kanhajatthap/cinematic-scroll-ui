"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { useTheme } from "@/components/providers/ThemeProvider";
import { EASE, NAV } from "@/components/burger/data";

export function Navbar() {
  const { theme, toggle } = useTheme();

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
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/55 transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic>
            <a
              href="#visit"
              className="rounded-full border border-fg/20 bg-fg/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fg backdrop-blur-xl transition-colors hover:border-gold/50 hover:text-gold"
            >
              Order
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={theme === "light"}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/20 bg-fg/5 text-fg/80 backdrop-blur-xl transition-colors hover:border-gold/50 hover:text-gold"
          >
            {theme === "light" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}