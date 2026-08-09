"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  tag: string;
  year: string;
  desc: string;
  stack: string[];
  accent: string;
  href?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Smash Burger Co.",
    tag: "Cinematic Landing Page",
    year: "2026",
    desc: "A film-like landing experience for a fire-grilled burger joint — video hero, scroll choreography and editorial menus.",
    stack: ["Next.js", "GSAP", "Framer Motion"],
    accent: "rgba(251,191,36,0.18)",
    href: "/burger",
  },
  {
    title: "Luxe Interiors",
    tag: "Web Development",
    year: "2025",
    desc: "A cinematic showroom for a luxury interior studio.",
    stack: ["React", "Next.js", "GSAP"],
    accent: "rgba(251,191,36,0.16)",
  },
  {
    title: "Aurelia Jewelry",
    tag: "WordPress + WooCommerce",
    year: "2024",
    desc: "Bespoke e-commerce with editorial storytelling.",
    stack: ["WordPress", "WooCommerce", "Elementor"],
    accent: "rgba(254,243,199,0.12)",
  },
  {
    title: "Meridian Finance",
    tag: "Dashboard UI",
    year: "2024",
    desc: "A data-heavy fintech dashboard with a calm, premium feel.",
    stack: ["React", "Next.js", "Tailwind"],
    accent: "rgba(251,191,36,0.12)",
  },
  {
    title: "Nomad Studio",
    tag: "UI / UX Design",
    year: "2023",
    desc: "Brand identity and product design for a creative studio.",
    stack: ["Figma", "Design System", "Prototyping"],
    accent: "rgba(180,83,9,0.14)",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const getScroll = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getScroll(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => `+=${getScroll()}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#05060a" }}
    >
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

      {/* Header pinned to top */}
      <div className="relative z-10 px-6 pt-20 md:pt-28">
        <span className="eyebrow">Selected Work</span>
        <h2
          className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Featured <span className="gold-text italic">Projects</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="relative z-10 flex items-center gap-10 px-6 py-10 will-change-transform"
      >
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="w-[85vw] shrink-0 sm:w-[70vw] md:w-[52vw] lg:w-[42vw]"
          >
            <TiltCard className="glass group relative flex h-[32rem] flex-col justify-between overflow-hidden rounded-3xl p-8">
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  background: p.accent,
                  filter: "blur(60px)",
                  opacity: 0,
                }}
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                  {p.tag}
                </span>
                <span className="font-mono text-xs text-gold">{p.year}</span>
              </div>

              <div className="relative">
                <h3 className="text-[clamp(1.6rem,4vw,2.8rem)] font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/50">
                  {p.desc}
                </p>
              </div>

              <div className="relative flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60"
                  >
                    {s}
                  </span>
                ))}
                {p.href ? (
                  <Link
                    href={p.href}
                    className="ml-auto flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold transition-opacity hover:opacity-80"
                  >
                    View Case
                    <span aria-hidden>↗</span>
                  </Link>
                ) : (
                  <span className="ml-auto flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    View Case
                  </span>
                )}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}