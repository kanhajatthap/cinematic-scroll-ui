"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaGlobe, FaClock } from "react-icons/fa";
import { Character, type CharacterPhase } from "@/components/ui/Character";
import { BagOnGround } from "@/components/ui/Character/BagOnGround";
import { ParticleEffect } from "@/components/ui/ParticleEffect";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactStoryTimeline } from "@/components/ui/ContactStoryTimeline";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "kanhajatthap@gmail.com";

const BEATS_DESKTOP = {
  walk: 0,
  stop: 2.1,
  bag: 2.75,
  snap: 3.75,
  burst: 4.05,
  reveal: 4.55,
  move: 5.85,
};

const BEATS_MOBILE = {
  walk: 0,
  stop: 1.5,
  bag: 2.05,
  snap: 2.85,
  burst: 3.1,
  reveal: 3.5,
  move: null,
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const bagGlowRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const formGlowRef = useRef<HTMLDivElement>(null);
  const particleTriggerRef = useRef<{ trigger: () => void } | null>(null);

  const [phase, setPhase] = useState<CharacterPhase>("WALKING");

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const handleSnapComplete = useCallback(() => setPhase("IDLE"), []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const character = characterRef.current;
    const bag = bagRef.current;
    const bagGlow = bagGlowRef.current;
    const beam = beamRef.current;
    const formWrap = formWrapRef.current;
    const formGlow = formGlowRef.current;

    if (
      !section ||
      !stage ||
      !character ||
      !bag ||
      !bagGlow ||
      !beam ||
      !formWrap ||
      !formGlow
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(character, { x: 0, opacity: 1 });
        gsap.set(bag, { opacity: 1, scale: 1, y: 0, rotation: 0 });
        gsap.set(bagGlow, { opacity: 0.3 });
        gsap.set(formGlow, { opacity: 0.4 });
        gsap.fromTo(
          formWrap,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power1.out" }
        );
        return;
      }

      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      const beats = mobile ? BEATS_MOBILE : BEATS_DESKTOP;
      const bagDropDuration = mobile ? 0.8 : 1;

      const stops: Array<{ time: number; phase: CharacterPhase }> = [
        { time: beats.stop, phase: "STOPPED" },
        { time: beats.bag, phase: "BAG_PLACED" },
        { time: beats.snap, phase: "SNAP" },
        { time: beats.reveal, phase: "IDLE" },
      ];

      gsap.set(character, { x: -620, opacity: 0 });
      gsap.set(bag, { opacity: 0, scale: 0.5, y: -70, rotation: -10 });
      gsap.set(bagGlow, { opacity: 0, scale: 0.6 });
      gsap.set(beam, { opacity: 0, scaleY: 0 });
      gsap.set(formWrap, { opacity: 0, scale: 0.94, y: 90, filter: "blur(16px)" });
      gsap.set(formGlow, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      let lastPhase: CharacterPhase = "WALKING";
      tl.eventCallback("onUpdate", () => {
        const progress = tl.progress();
        let current: CharacterPhase = "WALKING";
        for (const stop of stops) {
          if (progress >= stop.time / tl.duration()) {
            current = stop.phase;
          }
        }
        if (current !== lastPhase) {
          lastPhase = current;
          setPhase(current);
        }
      });

      tl.to(
        character,
        { x: 0, opacity: 1, duration: beats.stop, ease: "power2.out" },
        beats.walk
      )
        .to({}, { duration: beats.bag - beats.stop }, beats.stop)
        .to(
          bag,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: bagDropDuration,
            ease: "back.out(1.6)",
          },
          beats.bag
        )
        .to(
          bagGlow,
          { opacity: 0.22, scale: 1, duration: 1.1, ease: "power2.out" },
          beats.bag
        )
        .to({}, { duration: beats.snap - beats.bag }, beats.bag + bagDropDuration)
        .to({}, { duration: beats.burst - beats.snap }, beats.snap)
        .to(
          bagGlow,
          { opacity: 0.6, scale: 1.35, duration: 0.24, ease: "power4.out" },
          beats.burst - 0.04
        )
        .to(
          bagGlow,
          { opacity: 0.26, scale: 1.05, duration: 0.7, ease: "power2.out" },
          beats.burst + 0.2
        )
        .to(
          beam,
          { opacity: 0.55, scaleY: 1, duration: 0.32, ease: "power2.out" },
          beats.burst
        )
        .to(
          beam,
          { opacity: 0, scaleY: 1.12, duration: 0.7, ease: "power2.in" },
          beats.reveal + 0.75
        )
        .call(() => particleTriggerRef.current?.trigger(), undefined, beats.burst)
        .to(
          formGlow,
          { opacity: 0.5, duration: 1.3, ease: "power2.out" },
          beats.burst
        )
        .to(
          formWrap,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "expo.out",
          },
          beats.reveal
        );

      const moveBeat = beats.move;

      if (moveBeat != null) {
        tl.to(
          character,
          {
            x: () =>
              Math.min(stage.offsetWidth * 0.38, stage.offsetWidth / 2 - 150),
            duration: 1.05,
            ease: "power2.inOut",
          },
          moveBeat
        );
      }

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
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 22% 38%, rgba(198,162,120,0.13), transparent 55%)",
          filter: "blur(90px)",
        }}
      />
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div aria-hidden className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="mt-2 grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)_minmax(0,1fr)] xl:gap-14">
          <div className="order-1">
            <p className="eyebrow">Contact</p>
            <h2
              className="mt-6 max-w-md text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-ivory"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Let&apos;s build something{" "}
              <span className="gold-text italic">great</span> together.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#D8D8D8]/85">
              Have a project in mind? Tell me about it — I&apos;ll shape it with a
              designer&apos;s eye and a developer&apos;s hands, from the first sketch
              to the final deploy.
            </p>

            <div className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
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

          <div
            ref={stageRef}
            className="relative order-2 flex min-h-[440px] items-end justify-center lg:min-h-[520px]"
          >
            <Character
              ref={characterRef}
              phase={reducedMotion ? "IDLE" : phase}
              reducedMotion={reducedMotion}
              onSnapComplete={handleSnapComplete}
            />

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2" aria-hidden="true">
              <div
                ref={bagGlowRef}
                className="absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(198,162,120,0.45), transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
              <BagOnGround ref={bagRef} />
            </div>

            <div
              ref={beamRef}
              className="pointer-events-none absolute bottom-1 left-1/2 h-56 w-14 -translate-x-1/2 origin-bottom opacity-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(198,162,120,0.45), rgba(198,162,120,0))",
                filter: "blur(7px)",
              }}
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-3"
              aria-hidden="true"
            >
              <ParticleEffect
                triggerRef={particleTriggerRef}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>

          <div className="order-3 w-full max-w-xl justify-self-center lg:col-span-2 xl:col-span-1">
            <div className="relative">
              <div
                ref={formGlowRef}
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

        <ContactStoryTimeline />
      </div>
    </section>
  );
}