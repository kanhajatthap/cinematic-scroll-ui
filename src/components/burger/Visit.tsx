"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { ChapterNo } from "@/components/burger/ChapterNo";
import { EASE, HOURS } from "@/components/burger/data";

export function Visit() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
      style={{ background: "#05060a" }}
    >
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(251,191,36,0.1), transparent 55%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <ChapterNo n="06" label="Visit" />
          <h2
            className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Come <span className="gold-text italic">hungry</span>
          </h2>
          <p className="mt-5 text-white/50">
            144 Fire Lane, Austin TX — the corner with the permanent queue.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {HOURS.map((h, i) => (
            <motion.div
              key={h.d}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -5, borderColor: "rgba(251,191,36,0.35)" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                {h.d}
              </p>
              <p className="mt-3 text-xl font-semibold text-white">{h.h}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#top"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="relative">Order Takeaway</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-xl transition-colors hover:bg-gold/20"
            >
              Get Directions
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}