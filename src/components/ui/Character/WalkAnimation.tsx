"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CharacterSVG, type CharacterRefs } from "./CharacterSVG";

interface WalkAnimationProps {
  bag?: boolean;
}

export function WalkAnimation({ bag = true }: WalkAnimationProps) {
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
    legLUppRef,
    legLShinRef,
    legRUppRef,
    legRShinRef,
    bagRef,
    shadowRef,
  } = refs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to(legLUppRef.current, {
        rotation: -22,
        svgOrigin: "131px 274px",
        duration: 0.46,
        ease: "power1.inOut",
      }, 0)
        .to(legRUppRef.current, {
          rotation: 20,
          svgOrigin: "149px 274px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0)
        .to(legLShinRef.current, {
          rotation: 15,
          svgOrigin: "125px 330px",
          duration: 0.4,
          ease: "power1.inOut",
        }, 0.06)
        .to(legRShinRef.current, {
          rotation: -13,
          svgOrigin: "155px 330px",
          duration: 0.4,
          ease: "power1.inOut",
        }, 0.06);

      tl.to(armLUppRef.current, {
        rotation: 18,
        svgOrigin: "120px 210px",
        duration: 0.46,
        ease: "power1.inOut",
      }, 0)
        .to(armRUppRef.current, {
          rotation: -16,
          svgOrigin: "160px 210px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0)
        .to(armLForeRef.current, {
          rotation: -16,
          svgOrigin: "110px 251px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0)
        .to(armRForeRef.current, {
          rotation: 14,
          svgOrigin: "170px 251px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0);

      tl.to(torsoRef.current, {
        y: -3.5,
        rotation: 1.6,
        svgOrigin: "140px 292px",
        duration: 0.46,
        ease: "power1.inOut",
      }, 0)
        .to(headRef.current, {
          y: -1.5,
          rotation: -2.6,
          svgOrigin: "140px 175px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0)
        .to(bagRef.current, {
          rotation: -7,
          svgOrigin: "161px 212px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0.08)
        .to(shadowRef.current, {
          scaleX: 0.96,
          svgOrigin: "140px 402px",
          duration: 0.46,
          ease: "power1.inOut",
        }, 0);

      return tl;
    }, rootRef);

    return () => ctx.revert();
  }, [
    torsoRef,
    headRef,
    armLUppRef,
    armLForeRef,
    armRUppRef,
    armRForeRef,
    legLUppRef,
    legLShinRef,
    legRUppRef,
    legRShinRef,
    bagRef,
    shadowRef,
  ]);

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      <CharacterSVG refs={refs} bag={bag} />
    </div>
  );
}