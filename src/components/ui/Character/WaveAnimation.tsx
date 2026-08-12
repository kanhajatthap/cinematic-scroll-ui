"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { CharacterSVG, type CharacterRefs } from "./CharacterSVG";

interface WaveAnimationProps {
  onComplete: () => void;
}

const SHL = "144px 178px";
const SHADOW = "120px 288px";

export const WaveAnimation = forwardRef<HTMLDivElement, WaveAnimationProps>(
  function WaveAnimation({ onComplete }, forwardedRef) {
    const rootRef = useRef<HTMLDivElement>(null);
    const refs: CharacterRefs = {
      headRef: useRef<SVGGElement>(null),
      torsoRef: useRef<SVGGElement>(null),
      eyeLRef: useRef<SVGGElement>(null),
      eyeRRef: useRef<SVGGElement>(null),
      armWaveRef: useRef<SVGGElement>(null),
      armSideRef: useRef<SVGGElement>(null),
      legLRef: useRef<SVGGElement>(null),
      legRRef: useRef<SVGGElement>(null),
      shadowRef: useRef<SVGEllipseElement>(null),
    };

    const { headRef, torsoRef, eyeLRef, eyeRRef, armWaveRef, shadowRef } = refs;

    const combinedRef = (el: HTMLDivElement | null) => {
      rootRef.current = el;
      if (typeof forwardedRef === "function") {
        forwardedRef(el);
      } else if (forwardedRef) {
        forwardedRef.current = el;
      }
    };

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.set(armWaveRef.current, { rotation: -10, svgOrigin: SHL });

        const blink = () =>
          gsap
            .timeline()
            .to([eyeLRef.current, eyeRRef.current], {
              scaleY: 0.1,
              svgOrigin: (i) => (i === 0 ? "106px 108px" : "134px 108px"),
              duration: 0.07,
              ease: "power2.in",
            }, 0)
            .to([eyeLRef.current, eyeRRef.current], {
              scaleY: 1,
              svgOrigin: (i) => (i === 0 ? "106px 108px" : "134px 108px"),
              duration: 0.18,
              ease: "power3.out",
            }, 0.09);

        const tl = gsap.timeline({ onComplete });

        tl.to(armWaveRef.current, {
          rotation: 26,
          svgOrigin: SHL,
          duration: 0.24,
          ease: "power2.out",
        }, 0.1)
          .to(armWaveRef.current, {
            rotation: -30,
            svgOrigin: SHL,
            duration: 0.32,
            ease: "power2.inOut",
          }, 0.34)
          .to(armWaveRef.current, {
            rotation: 22,
            svgOrigin: SHL,
            duration: 0.3,
            ease: "power2.inOut",
          }, 0.66)
          .to(armWaveRef.current, {
            rotation: -22,
            svgOrigin: SHL,
            duration: 0.3,
            ease: "power2.inOut",
          }, 0.96)
          .to(armWaveRef.current, {
            rotation: 16,
            svgOrigin: SHL,
            duration: 0.28,
            ease: "power2.inOut",
          }, 1.26)
          .to(armWaveRef.current, {
            rotation: -6,
            svgOrigin: SHL,
            duration: 0.4,
            ease: "power2.out",
          }, 1.54)
          .to(armWaveRef.current, {
            rotation: 0,
            svgOrigin: SHL,
            duration: 0.6,
            ease: "power2.out",
          }, 1.94)
          .add(blink(), 1.5)
          .to(torsoRef.current, {
            y: -5,
            duration: 0.34,
            ease: "power1.out",
          }, 2.5)
          .to(torsoRef.current, {
            y: 0,
            duration: 0.44,
            ease: "bounce.out",
          }, 2.84)
          .to(headRef.current, {
            rotation: 3,
            svgOrigin: "120px 152px",
            duration: 0.3,
            ease: "power1.out",
          }, 2.5)
          .to(headRef.current, {
            rotation: -2,
            svgOrigin: "120px 152px",
            duration: 0.3,
            ease: "power1.inOut",
          }, 2.8)
          .to(headRef.current, {
            rotation: 0,
            svgOrigin: "120px 152px",
            duration: 0.3,
            ease: "power1.out",
          }, 3.1)
          .to(shadowRef.current, {
            scaleX: 0.92,
            svgOrigin: SHADOW,
            duration: 0.34,
            ease: "power1.out",
          }, 2.5)
          .to(shadowRef.current, {
            scaleX: 1,
            svgOrigin: SHADOW,
            duration: 0.44,
            ease: "bounce.out",
          }, 2.84);

        return tl;
      }, rootRef);

      return () => ctx.revert();
    }, [
      onComplete,
      headRef,
      torsoRef,
      eyeLRef,
      eyeRRef,
      armWaveRef,
      shadowRef,
    ]);

    return (
      <div
        ref={combinedRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CharacterSVG refs={refs} />
      </div>
    );
  }
);
