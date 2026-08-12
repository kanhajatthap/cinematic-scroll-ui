"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { CharacterSVG, type CharacterRefs } from "./CharacterSVG";

interface SnapAnimationProps {
  onComplete: () => void;
}

export const SnapAnimation = forwardRef<HTMLDivElement, SnapAnimationProps>(
  function SnapAnimation({ onComplete }, forwardedRef) {
    const rootRef = useRef<HTMLDivElement>(null);
    const refs: CharacterRefs = {
      torsoRef: useRef<SVGGElement>(null),
      headRef: useRef<SVGGElement>(null),
      eyeLRef: useRef<SVGGElement>(null),
      eyeRRef: useRef<SVGGElement>(null),
      armLUppRef: useRef<SVGGElement>(null),
      armLForeRef: useRef<SVGGElement>(null),
      handLRef: useRef<SVGGElement>(null),
      armRUppRef: useRef<SVGGElement>(null),
      armRForeRef: useRef<SVGGElement>(null),
      handRRef: useRef<SVGGElement>(null),
      legLUppRef: useRef<SVGGElement>(null),
      legLShinRef: useRef<SVGGElement>(null),
      legRUppRef: useRef<SVGGElement>(null),
      legRShinRef: useRef<SVGGElement>(null),
      bagRef: useRef<SVGGElement>(null),
      shadowRef: useRef<SVGEllipseElement>(null),
    };

    const ringRef = useRef<SVGGElement>(null);
    const flashRef = useRef<SVGGElement>(null);

    const {
      torsoRef,
      headRef,
      armLUppRef,
      armLForeRef,
      armRUppRef,
      armRForeRef,
      legLUppRef,
      legRUppRef,
      shadowRef,
    } = refs;

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
        gsap.set(ringRef.current, { scale: 0.4, opacity: 0, svgOrigin: "184px 240px" });
        gsap.set(flashRef.current, { scale: 0.3, opacity: 0, svgOrigin: "184px 240px" });

        const tl = gsap.timeline({ onComplete });

        tl.to(armRUppRef.current, {
          rotation: -14,
          svgOrigin: "160px 210px",
          duration: 0.28,
          ease: "power2.in",
        }, 0)
          .to(armRForeRef.current, {
            rotation: 30,
            svgOrigin: "170px 251px",
            duration: 0.28,
            ease: "power2.in",
          }, 0)
          .to(torsoRef.current, {
            rotation: -6,
            svgOrigin: "140px 292px",
            y: -4,
            duration: 0.28,
            ease: "power2.in",
          }, 0)
          .to(headRef.current, {
            rotation: 5,
            svgOrigin: "140px 175px",
            duration: 0.28,
            ease: "power2.in",
          }, 0)
          .to(legLUppRef.current, {
            rotation: -3,
            svgOrigin: "131px 274px",
            duration: 0.28,
            ease: "power2.in",
          }, 0)
          .to(legRUppRef.current, {
            rotation: 3,
            svgOrigin: "149px 274px",
            duration: 0.28,
            ease: "power2.in",
          }, 0)

          .to(armRUppRef.current, {
            rotation: -88,
            svgOrigin: "160px 210px",
            duration: 0.12,
            ease: "power4.out",
          }, 0.28)
          .to(armRForeRef.current, {
            rotation: 96,
            svgOrigin: "170px 251px",
            duration: 0.12,
            ease: "power4.out",
          }, 0.28)
          .to(torsoRef.current, {
            rotation: 5,
            y: 0,
            duration: 0.12,
            ease: "power4.out",
          }, 0.28)
          .to(headRef.current, {
            rotation: -3,
            duration: 0.12,
            ease: "power4.out",
          }, 0.28)
          .to(shadowRef.current, {
            scaleX: 0.9,
            svgOrigin: "140px 402px",
            duration: 0.12,
            ease: "power4.out",
          }, 0.28)
          .to(flashRef.current, {
            scale: 1.6,
            opacity: 1,
            rotation: 90,
            duration: 0.08,
            ease: "power4.out",
          }, 0.28)
          .to(ringRef.current, {
            scale: 1.5,
            opacity: 1,
            duration: 0.09,
            ease: "power4.out",
          }, 0.3)
          .to(ringRef.current, {
            scale: 2.6,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          }, 0.4)
          .to(flashRef.current, {
            scale: 2.2,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          }, 0.38)

          .to(armRUppRef.current, {
            rotation: 0,
            svgOrigin: "160px 210px",
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(armRForeRef.current, {
            rotation: 0,
            svgOrigin: "170px 251px",
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(torsoRef.current, {
            rotation: 0,
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(headRef.current, {
            rotation: 0,
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(legLUppRef.current, {
            rotation: 0,
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(legRUppRef.current, {
            rotation: 0,
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(shadowRef.current, {
            scaleX: 1,
            duration: 0.45,
            ease: "back.out(1.6)",
          }, 0.55)
          .to(armLUppRef.current, {
            rotation: -6,
            svgOrigin: "120px 210px",
            duration: 0.3,
            ease: "power1.out",
          }, 0.3)
          .to(armLUppRef.current, {
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          }, 0.6)
          .to(armLForeRef.current, {
            rotation: -4,
            duration: 0.3,
            ease: "power1.out",
          }, 0.35)
          .to(armLForeRef.current, {
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          }, 0.6);

        return tl;
      }, rootRef);

      return () => ctx.revert();
    }, [
      onComplete,
      torsoRef,
      headRef,
      armLUppRef,
      armLForeRef,
      armRUppRef,
      armRForeRef,
      legLUppRef,
      legRUppRef,
      shadowRef,
    ]);

    return (
      <div
        ref={combinedRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 280 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g ref={ringRef}>
            <circle cx="184" cy="240" r="10" stroke="#C6A278" strokeWidth="2" fill="none" opacity="0.9" />
            <circle cx="184" cy="240" r="18" stroke="#C6A278" strokeWidth="1.5" fill="none" opacity="0.55" />
            <circle cx="184" cy="240" r="26" stroke="#C6A278" strokeWidth="1" fill="none" opacity="0.3" />
          </g>
          <g ref={flashRef}>
            <circle cx="184" cy="240" r="4" fill="#F3EFE8" />
            <circle cx="184" cy="240" r="8" fill="rgba(198,162,120,0.35)" />
          </g>
        </svg>
        <CharacterSVG refs={refs} />
      </div>
    );
  }
);