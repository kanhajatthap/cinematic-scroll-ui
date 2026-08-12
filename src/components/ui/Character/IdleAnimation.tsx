"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { CharacterSVG, type CharacterRefs } from "./CharacterSVG";

interface IdleAnimationProps {
  staticPose?: boolean;
  bag?: boolean;
}

export const IdleAnimation = forwardRef<HTMLDivElement, IdleAnimationProps>(
  function IdleAnimation({ staticPose = false, bag = false }, forwardedRef) {
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
      eyeLRef,
      eyeRRef,
      armLUppRef,
      armLForeRef,
      handLRef,
      armRUppRef,
      armRForeRef,
      handRRef,
      legLUppRef,
      legLShinRef,
      legRUppRef,
      legRShinRef,
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
      if (staticPose) return;

      const ctx = gsap.context(() => {
        const blink = (at: number) => {
          const t = gsap.timeline();
          t.to([eyeLRef.current, eyeRRef.current], {
            scaleY: 0.08,
            svgOrigin: "131px 147px",
            duration: 0.06,
            ease: "power2.in",
          }, 0)
            .to([eyeLRef.current, eyeRRef.current], {
              scaleY: 1,
              svgOrigin: "131px 147px",
              duration: 0.16,
              ease: "power3.out",
            }, 0.08);
          return t;
        };

        const breathTl = gsap.timeline({ repeat: -1, yoyo: true });
        breathTl.to(torsoRef.current, {
          scaleY: 1.012,
          svgOrigin: "140px 292px",
          duration: 3.6,
          ease: "sine.inOut",
        }, 0)
          .to(headRef.current, {
            y: -2,
            duration: 3.6,
            ease: "sine.inOut",
          }, 0);

        const shiftTl = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.4 });
        shiftTl.to(torsoRef.current, {
          x: 2.4,
          rotation: 0.9,
          svgOrigin: "140px 292px",
          duration: 4.6,
          ease: "sine.inOut",
        }, 0)
          .to(legLUppRef.current, {
            rotation: 1.5,
            svgOrigin: "131px 274px",
            duration: 4.6,
            ease: "sine.inOut",
          }, 0)
          .to(legRUppRef.current, {
            rotation: -1.5,
            svgOrigin: "149px 274px",
            duration: 4.6,
            ease: "sine.inOut",
          }, 0)
          .to(legLShinRef.current, {
            rotation: -1.2,
            svgOrigin: "125px 330px",
            duration: 4.6,
            ease: "sine.inOut",
          }, 0)
          .to(legRShinRef.current, {
            rotation: 1.2,
            svgOrigin: "155px 330px",
            duration: 4.6,
            ease: "sine.inOut",
          }, 0)
          .to(shadowRef.current, {
            scaleX: 1.03,
            svgOrigin: "140px 402px",
            duration: 4.6,
            ease: "sine.inOut",
          }, 0);

        const headTl = gsap.timeline({ repeat: -1, delay: 2.4 });
        headTl.to(headRef.current, {
          rotation: 4.5,
          svgOrigin: "140px 175px",
          duration: 1.6,
          ease: "sine.inOut",
        }, 0)
          .to(headRef.current, {
            rotation: -3,
            svgOrigin: "140px 175px",
            duration: 2.2,
            ease: "sine.inOut",
          }, 1.6)
          .to(headRef.current, {
            rotation: 0,
            svgOrigin: "140px 175px",
            duration: 1.7,
            ease: "sine.inOut",
          }, 3.8);

        const armTl = gsap.timeline({ repeat: -1, yoyo: true, delay: 0.9 });
        armTl.to(handLRef.current, {
          rotation: -6,
          svgOrigin: "117px 308px",
          duration: 3.4,
          ease: "sine.inOut",
        }, 0)
          .to(handRRef.current, {
            rotation: 5,
            svgOrigin: "163px 308px",
            duration: 4.2,
            ease: "sine.inOut",
          }, 0.8)
          .to(armLForeRef.current, {
            rotation: -4,
            svgOrigin: "110px 251px",
            duration: 4,
            ease: "sine.inOut",
          }, 1.6)
          .to(armRUppRef.current, {
            rotation: 2,
            svgOrigin: "160px 210px",
            duration: 4.4,
            ease: "sine.inOut",
          }, 2.1)
          .to(armLUppRef.current, {
            rotation: -2,
            svgOrigin: "120px 210px",
            duration: 3.8,
            ease: "sine.inOut",
          }, 1.2)
          .to(armRForeRef.current, {
            rotation: 3,
            svgOrigin: "170px 251px",
            duration: 3.6,
            ease: "sine.inOut",
          }, 1.8);

        const blinkTl = gsap.timeline({ repeat: -1, delay: 0 });
        blinkTl.add(blink(0), 2.6)
          .add(blink(0), 5.9)
          .add(blink(0), 9.4)
          .add(blink(0), 11.2)
          .add(blink(0), 14.6);

        return () => {
          breathTl.kill();
          shiftTl.kill();
          headTl.kill();
          armTl.kill();
          blinkTl.kill();
        };
      }, rootRef);

      return () => ctx.revert();
    }, [
      staticPose,
      torsoRef,
      headRef,
      eyeLRef,
      eyeRRef,
      armLUppRef,
      armLForeRef,
      handLRef,
      armRUppRef,
      armRForeRef,
      handRRef,
      legLUppRef,
      legLShinRef,
      legRUppRef,
      legRShinRef,
      shadowRef,
    ]);

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