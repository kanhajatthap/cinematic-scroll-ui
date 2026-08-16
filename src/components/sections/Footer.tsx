"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaGlobe, FaEnvelope } from "react-icons/fa";

const CLOUDWAYS = {
  url: "https://www.cloudways.com/en/wordpress-hosting.php?id=2159571&a_bid=4869f424",
  banner:
    "https://www.cloudways.com/affiliate/accounts/default1/banners/4869f424.jpg",
  pixel:
    "https://www.cloudways.com/affiliate/scripts/imp.php?id=2159571&a_bid=4869f424",
};

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
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
      className="relative overflow-hidden border-t border-fg/[0.06] py-16"
      style={{ background: "var(--ink)" }}
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
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
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-fg/70 hover:text-gold"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="eyebrow">Quick Links</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <motion.a
                    href={l.href}
                    whileHover={{ x: 4, color: "#fbbf24" }}
                    transition={{ duration: 0.2 }}
                    className="inline-block text-sm text-fg/50 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="eyebrow">Recommended Hosting</h3>
            <a
              href={CLOUDWAYS.url}
              target="_blank"
              rel="noreferrer noopener sponsored"
              aria-label="Load WordPress Sites in as fast as 37ms — Cloudways"
              className="group relative mt-5 block max-w-sm overflow-hidden rounded-xl border border-fg/10 transition-colors hover:border-gold/40"
            >
              <Image
                src={CLOUDWAYS.banner}
                alt="Load WordPress Sites in as fast as 37ms!"
                title="Load WordPress Sites in as fast as 37ms!"
                width={728}
                height={90}
                unoptimized
                className="max-w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-fg/10 transition-colors group-hover:ring-gold/30"
              />
            </a>
            <img
              src={CLOUDWAYS.pixel}
              alt=""
              width={1}
              height={1}
              className="pointer-events-none absolute"
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-fg/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-fg/35">
            © {new Date().getFullYear()} Kanha Jatthap. All rights reserved.
          </p>
<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/25">
              Made with <span className="animate-pulse text-gold" aria-hidden>♥</span>{" "}
              <span className="text-fg/45 transition-colors hover:text-gold">
                Kanha Jatthap
              </span>
            </p>
        </div>
      </div>
    </footer>
  );
}