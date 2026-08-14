"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

const WATCH_IDS = ["about", "projects", "services", "experience", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && overlay) {
        const focusables = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    overlay?.querySelector<HTMLElement>("a[href], button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sections = WATCH_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#05060a]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        >
          <Link
            href="/#main-content"
            className="group flex items-center gap-3"
            aria-label="Kanha Jatthap — Home"
            onClick={() => setOpen(false)}
          >
            <span className="glass flex h-9 w-9 items-center justify-center rounded-xl font-mono text-xs font-semibold text-gold transition-colors group-hover:border-gold/40">
              KJ
            </span>
            <span
              className="hidden text-sm font-semibold tracking-tight sm:block"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Kanha <span className="gold-text italic">Jatthap</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`group relative font-mono text-[11px] uppercase tracking-[0.25em] transition-colors ${
                    active === l.href.replace("/#", "")
                      ? "text-gold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      active === l.href.replace("/#", "")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="hidden rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all hover:border-gold/70 hover:bg-gold/20 lg:inline-flex"
            >
              Let&apos;s Talk
            </Link>

            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
            >
              <span
                className={`h-px w-4 bg-white transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-white transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#05060a]/95 px-8 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {LINKS.map((l, i) => (
            <li
              key={l.label}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-3"
              >
                <span className="font-mono text-xs text-gold/70">
                  0{i + 1}
                </span>
                <span
                  className="text-4xl font-bold tracking-tight text-white/85 transition-colors group-hover:text-gold"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Kanha Jatthap — Frontend & WordPress
        </p>
      </div>
    </>
  );
}