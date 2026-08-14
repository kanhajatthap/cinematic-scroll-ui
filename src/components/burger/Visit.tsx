"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/burger/SectionHeading";
import { GlowBg } from "@/components/burger/GlowBg";
import { Reveal } from "@/components/burger/Reveal";
import { PillButton } from "@/components/burger/PillButton";
import { HOURS } from "@/components/burger/data";

export function Visit() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
      style={{ background: "#05060a" }}
    >
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <GlowBg at="50% 60%" size="55%" opacity={0.1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          n="06"
          label="Visit"
          narrow
          size="xl"
          sub="144 Fire Lane, Austin TX — the corner with the permanent queue."
        >
          Come <span className="gold-text italic">hungry</span>
        </SectionHeading>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {HOURS.map((h, i) => (
            <Reveal
              key={h.d}
              delay={i * 0.12}
              y={30}
              duration={0.8}
              margin="-60px"
            >
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(251,191,36,0.35)" }}
                className="glass rounded-2xl p-6 text-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                  {h.d}
                </p>
                <p className="mt-3 text-xl font-semibold text-white">{h.h}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal y={30} duration={0.8} margin="-60px">
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <PillButton href="#top" magnetic shine>
              Order Takeaway
            </PillButton>
            <PillButton
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              variant="gold"
              magnetic
            >
              Get Directions
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}