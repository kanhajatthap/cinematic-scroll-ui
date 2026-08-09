"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Particles } from "@/components/ui/Particles";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function CTA() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-28"
      style={{ background: "#05060a" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(251,191,36,0.16), transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white/[0.03]"
        style={{
          fontSize: "clamp(8rem, 30vw, 26rem)",
          fontFamily: "var(--font-playfair), serif",
          lineHeight: 1,
        }}
      >
        KJ
      </div>
      <Particles count={14} className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="eyebrow justify-center"
        >
          Let&apos;s Collaborate
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-8 text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Let&apos;s Build Something
          <br />
          <span className="gold-text italic">Amazing</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <Magnetic>
            <motion.a
              href="mailto:hello@kanhajatthap.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold/40 bg-gold/10 px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <span className="relative">Start a Project</span>
              <span className="relative text-gold transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}