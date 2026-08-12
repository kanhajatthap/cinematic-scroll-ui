"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { CharacterSVG, type CharacterRefs } from "./CharacterSVG";

interface IdleAnimationProps {
  staticPose?: boolean;
}

export const IdleAnimation = forwardRef<HTMLDivElement, IdleAnimationProps>(
  function IdleAnimation({ staticPose = false }, forwardedRef) {
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

    const {
      headRef,
      torsoRef,
      eyeLRef,
      eyeRRef,
      armWaveRef,
      armSideRef,
      legLRef,
      legRRef,
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
        const blink = () => {
          const t = gsap.timeline();
          t.to([eyeLRef.current, eyeRRef.current], {
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
          return t;
        };

        const breathTl = gsap.timeline({ repeat: -1, yoyo: true });
        breathTl.to(torsoRef.current, {
          scaleY: 1.014,
          svgOrigin: "120px 244px",
          duration: 3.6,
          ease: "sine.inOut",
        }, 0)
          .to(headRef.current, {
            y: -2,
            duration: 3.6,
            ease: "sine.inOut",
          }, 0)
          .to(shadowRef.current, {
            scaleX: 0.97,
            svgOrigin: "120px 288px",
            duration: 3.6,
            ease: "sine.inOut",
          }, 0);

        const swayTl = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.1 });
        swayTl.to(torsoRef.current, {
          x: 1.6,
          rotation: 0.8,
          svgOrigin: "120px 244px",
          duration: 4.8,
          ease: "sine.inOut",
        }, 0)
          .to(headRef.current, {
            rotation: 2.4,
            svgOrigin: "120px 152px",
            duration: 4.8,
            ease: "sine.inOut",
          }, 0)
          .to(legLRef.current, {
            rotation: 1.2,
            svgOrigin: "108px 232px",
            duration: 4.8,
            ease: "sine.inOut",
          }, 0)
          .to(legRRef.current, {
            rotation: -1.2,
            svgOrigin: "132px 232px",
            duration: 4.8,
            ease: "sine.inOut",
          }, 0)
          .to(armSideRef.current, {
            rotation: -2,
            svgOrigin: "96px 178px",
            duration: 4.8,
            ease: "sine.inOut",
          }, 0)
          .to(armWaveRef.current, {
            rotation: 3,
            svgOrigin: "144px 178px",
            duration: 4.8,
            ease: "sine.inOut",
          }, 0);

        const blinkTl = gsap.timeline({ repeat: -1 });
        blinkTl
          .add(blink(), 2.4)
          .add(blink(), 5.8)
          .add(blink(), 9.2)
          .add(blink(), 11.1)
          .add(blink(), 14.4);

        return () => {
          breathTl.kill();
          swayTl.kill();
          blinkTl.kill();
        };
      }, rootRef);

      return () => ctx.revert();
    }, [
      staticPose,
      headRef,
      torsoRef,
      eyeLRef,
      eyeRRef,
      armWaveRef,
      armSideRef,
      legLRef,
      legRRef,
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
