"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Particles } from "@/components/ui/Particles";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const EMAIL = "kanhajatthap@gmail.com";

export default function CTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
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
          className="mt-12 flex flex-col items-center gap-6"
        >
          <Magnetic>
            <motion.button
              type="button"
              onClick={copyEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              aria-live="polite"
              className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-gold/40 bg-gold/10 px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <span className="relative">{copied ? "Copied!" : "Start a Project"}</span>
              <span
                className={`relative text-gold transition-all duration-300 ${
                  copied ? "translate-x-0" : "group-hover:translate-x-1"
                }`}
              >
                {copied ? "✓" : "→"}
              </span>
            </motion.button>
          </Magnetic>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            or write to{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-gold underline-offset-4 transition-colors hover:text-gold-light hover:underline"
            >
              {EMAIL}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}