"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/burger/SectionHeading";
import { GlowBg } from "@/components/burger/GlowBg";
import { Reveal } from "@/components/burger/Reveal";
import { MENU } from "@/components/burger/data";
export function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden py-24 md:py-32">
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <GlowBg at="85% 15%" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          n="01"
          label="The Menu"
          narrow
          sub="Every patty is hand-pressed on the griddle the moment you order. No holding, no reheating — just the sear."
        >
          Smashed <span className="gold-text italic">to order</span>
        </SectionHeading>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.12} y={40} margin="-80px">
              <motion.article
                whileHover={{ y: -8, borderColor: "rgba(251,191,36,0.45)" }}
                className="glass group relative flex flex-col overflow-hidden rounded-3xl"
              >
                <span
                  className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 70px rgba(251,191,36,0.14)" }}
                />
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-xs text-gold backdrop-blur-md">
                    {item.price}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}