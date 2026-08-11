"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";
import { PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
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
      id="projects"
      className="relative overflow-hidden"
      style={{ background: "#05060a" }}
    >
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

      {/* Header pinned to top */}
      <div className="relative z-10 px-6 pt-20 md:pt-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2
              className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Featured <span className="gold-text italic">Projects</span>
            </h2>
          </div>
          <div className="hidden items-center gap-3 pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 sm:flex">
            <span>Scroll</span>
            <div className="h-px w-24 overflow-hidden bg-white/10 md:w-32">
              <div
                ref={progressRef}
                className="h-full origin-left bg-gold"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
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
            <Link href={`/projects/${p.slug}`} className="block">
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
                  <h3 className="text-[clamp(1.6rem,4vw,2.8rem)] font-bold tracking-tight transition-colors duration-300 group-hover:text-gold-light">
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
                  <span className="ml-auto flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold transition-transform duration-300 group-hover:translate-x-1">
                    View Case
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </TiltCard>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}