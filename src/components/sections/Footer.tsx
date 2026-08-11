"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaGlobe, FaEnvelope } from "react-icons/fa";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "/burger", label: "Burger" },
];

const SOCIALS = [
  { href: "https://github.com/kanhajatthap", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/kanha-jatthap", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://kanhajatthap.vercel.app/", label: "Website", Icon: FaGlobe },
  { href: "mailto:kanhajatthap@gmail.com", label: "Email", Icon: FaEnvelope },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/[0.06] py-16"
      style={{ background: "#05060a" }}
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Kanha <span className="gold-text italic">Jatthap</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Frontend & WordPress Developer crafting cinematic digital
              experiences.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                whileHover={{ y: -2, color: "#fbbf24" }}
                transition={{ duration: 0.2 }}
                className="text-sm uppercase tracking-[0.2em] text-white/50 hover:text-gold"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-gold"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-white/35">
            © {new Date().getFullYear()} Kanha Jatthap. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            Designed & built with care
          </p>
        </div>
      </div>
    </footer>
  );
}