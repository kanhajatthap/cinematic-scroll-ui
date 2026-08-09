"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TESTIMONIALS = [
  {
    quote:
      "Kanha rebuilt our entire site. It loads instantly and looks like a product launch — our clients noticed within a week.",
    name: "Rahul Mehta",
    role: "Founder, Meridian Finance",
  },
  {
    quote:
      "The most detail-oriented developer we've worked with. Every animation, every pixel, every transition felt intentional.",
    name: "Sophia Turner",
    role: "Creative Director, Luxe Interiors",
  },
  {
    quote:
      "He took our WooCommerce store from dated to award-worthy. Sales conversion improved noticeably after the redesign.",
    name: "Alicia Grant",
    role: "Owner, Aurelia Jewelry",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "#05060a" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(251,191,36,0.08), transparent 45%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="eyebrow">Testimonials</span>
          <h2
            className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            What clients <span className="gold-text italic">say</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              className="glass group relative flex flex-col rounded-3xl p-8"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              whileHover={{ scale: 1.02, y: -6 }}
            >
              <FaQuoteLeft className="text-2xl text-gold/50" />
              <blockquote className="mt-5 flex-1 leading-relaxed text-white/70">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold">{t.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/45">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}