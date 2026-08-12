"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { CharacterSVG, type CharacterRefs } from "./CharacterSVG";

interface BagAnimationProps {
  bag?: boolean;
}

export const BagAnimation = forwardRef<HTMLDivElement, BagAnimationProps>(
  function BagAnimation({ bag = true }, forwardedRef) {
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

    const {
      torsoRef,
      headRef,
      armLUppRef,
      armLForeRef,
      armRUppRef,
      armRForeRef,
      legRUppRef,
      bagRef,
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
        const tl = gsap.timeline();

        tl.to(torsoRef.current, {
          rotation: -5,
          svgOrigin: "140px 292px",
          y: 4,
          duration: 0.5,
          ease: "power2.out",
        }, 0)
          .to(headRef.current, {
            rotation: -9,
            svgOrigin: "140px 175px",
            y: 6,
            duration: 0.5,
            ease: "power2.out",
          }, 0)
          .to(armLUppRef.current, {
            rotation: -30,
            svgOrigin: "120px 210px",
            duration: 0.55,
            ease: "power2.out",
          }, 0)
          .to(armLForeRef.current, {
            rotation: -42,
            svgOrigin: "110px 251px",
            duration: 0.55,
            ease: "power2.out",
          }, 0.05)
          .to(bagRef.current, {
            rotation: -14,
            svgOrigin: "161px 212px",
            duration: 0.35,
            ease: "power1.out",
          }, 0.1)
          .to(bagRef.current, {
            y: 62,
            x: 12,
            rotation: 16,
            svgOrigin: "161px 212px",
            duration: 0.55,
            ease: "power2.inOut",
          }, 0.35)
          .to(bagRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.35,
            ease: "power1.in",
          }, 0.9)
          .to(armLUppRef.current, {
            rotation: 0,
            svgOrigin: "120px 210px",
            duration: 0.6,
            ease: "power2.out",
          }, 0.7)
          .to(armLForeRef.current, {
            rotation: 0,
            svgOrigin: "110px 251px",
            duration: 0.6,
            ease: "power2.out",
          }, 0.75)
          .to(torsoRef.current, {
            rotation: 0,
            y: 0,
            svgOrigin: "140px 292px",
            duration: 0.6,
            ease: "power2.out",
          }, 0.7)
          .to(headRef.current, {
            rotation: 0,
            y: 0,
            svgOrigin: "140px 175px",
            duration: 0.6,
            ease: "power2.out",
          }, 0.7)
          .to(armRUppRef.current, {
            rotation: 8,
            svgOrigin: "160px 210px",
            duration: 0.35,
            ease: "power1.out",
          }, 0.3)
          .to(armRUppRef.current, {
            rotation: 0,
            duration: 0.6,
            ease: "power2.out",
          }, 0.7)
          .to(legRUppRef.current, {
            rotation: 3,
            svgOrigin: "149px 274px",
            duration: 0.4,
            ease: "power2.out",
          }, 0.2)
          .to(legRUppRef.current, {
            rotation: 0,
            duration: 0.5,
            ease: "power2.out",
          }, 0.7);

        return tl;
      }, rootRef);

      return () => ctx.revert();
    }, [torsoRef, headRef, armLUppRef, armLForeRef, armRUppRef, legRUppRef, bagRef]);

    return (
      <div
        ref={combinedRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CharacterSVG refs={refs} bag={bag} />
      </div>
    );
  }
);