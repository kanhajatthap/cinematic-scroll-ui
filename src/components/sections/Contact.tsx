"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaGlobe, FaClock } from "react-icons/fa";
import { ContactForm } from "@/components/ui/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "kanhajatthap@gmail.com";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    const section = sectionRef.current;
    const formWrap = formWrapRef.current;

    if (!section || !formWrap) {
      return;
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(formWrap, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(formWrap, { opacity: 0, scale: 0, filter: "blur(16px)" });
      gsap.set(".contact-reveal", { opacity: 0, y: 26 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(
        formWrap,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
        },
        7
      ).to(
        ".contact-reveal",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: "power2.out",
        },
        8.6
      );

      return tl;
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative overflow-hidden"
      style={{ background: "#0F0F10" }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black"
      />
      <video
        autoPlay
        muted
        playsInline
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
        style={{ objectFit: "contain" }}
        aria-hidden
        src="/video/walks2.mp4"
      />
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow contact-reveal">Contact</p>
            <h2
              className="contact-reveal mt-6 max-w-md text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-ivory"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Let&apos;s build something{" "}
              <span className="gold-text italic">great</span> together.
            </h2>
            <p className="contact-reveal mt-6 max-w-md text-[15px] leading-relaxed text-[#D8D8D8]/85">
              Have a project in mind? Tell me about it — I&apos;ll shape it with a
              designer&apos;s eye and a developer&apos;s hands, from the first sketch
              to the final deploy.
            </p>

            <div className="contact-reveal mt-10 w-[70%] space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
                  <FaEnvelope className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-champagne/80">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="block truncate text-sm text-ivory/90 transition-colors hover:text-champagne"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
                  <FaGlobe className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-champagne/80">
                    Location
                  </p>
                  <p className="truncate text-sm text-ivory/90">Remote — worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
                  <FaClock className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-champagne/80">
                    Availability
                  </p>
                  <p className="flex items-center gap-2 truncate text-sm text-ivory/90">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-champagne" />
                    </span>
                    Open for new projects
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl justify-self-center max-lg:mr-0 lg:mr-[140px]">
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-12 rounded-[2.5rem]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(198,162,120,0.16), transparent 70%)",
                  filter: "blur(28px)",
                }}
              />
              <div
                ref={formWrapRef}
                className="relative"
                style={{ willChange: "transform, opacity, filter" }}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}