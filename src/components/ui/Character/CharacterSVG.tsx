"use client";

import { useId, type RefObject } from "react";

export interface CharacterRefs {
  headRef: RefObject<SVGGElement | null>;
  torsoRef: RefObject<SVGGElement | null>;
  eyeLRef: RefObject<SVGGElement | null>;
  eyeRRef: RefObject<SVGGElement | null>;
  armWaveRef: RefObject<SVGGElement | null>;
  armSideRef: RefObject<SVGGElement | null>;
  legLRef: RefObject<SVGGElement | null>;
  legRRef: RefObject<SVGGElement | null>;
  shadowRef: RefObject<SVGEllipseElement | null>;
}

interface CharacterSVGProps {
  refs: CharacterRefs;
}

const GOLD = "#C6A278";
const DARK = "#16171B";

function Limb({ d }: { d: string }) {
  return (
    <>
      <path
        d={d}
        stroke={GOLD}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d={d}
        stroke={DARK}
        strokeWidth="7.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

export function CharacterSVG({ refs }: CharacterSVGProps) {
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

  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const glowId = `${uid}-glow`;
  const torsoGradId = `${uid}-torso`;
  const headGradId = `${uid}-head`;

  return (
    <svg
      viewBox="0 0 240 300"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="7"
            flood-color={GOLD}
            flood-opacity="0.16"
          />
        </filter>
        <linearGradient id={torsoGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23242A" />
          <stop offset="55%" stopColor="#17181C" />
          <stop offset="100%" stopColor="#121317" />
        </linearGradient>
        <linearGradient id={headGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#222329" />
          <stop offset="100%" stopColor="#191A1F" />
        </linearGradient>
      </defs>

      <g filter={`url(#${glowId})`}>
        <ellipse
          ref={shadowRef}
          cx="120"
          cy="288"
          rx="56"
          ry="7"
          fill="rgba(0,0,0,0.32)"
          opacity="0.9"
        />

        <g ref={legLRef}>
          <Limb d="M108 232 Q100 254 97 274" />
          <ellipse
            cx="95"
            cy="280"
            rx="11"
            ry="5"
            fill="#121317"
            stroke={GOLD}
            strokeWidth="1.6"
          />
        </g>

        <g ref={legRRef}>
          <Limb d="M132 232 Q140 254 143 274" />
          <ellipse
            cx="145"
            cy="280"
            rx="11"
            ry="5"
            fill="#121317"
            stroke={GOLD}
            strokeWidth="1.6"
          />
        </g>

        <g ref={torsoRef}>
          <path
            d="M120 150 C104 152 94 160 92 174 C90 194 93 214 98 228 C102 240 112 244 120 244 C128 244 138 240 142 228 C147 214 150 194 148 174 C146 160 136 152 120 150 Z"
            fill={`url(#${torsoGradId})`}
            stroke={GOLD}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M120 156 L120 242"
            stroke={GOLD}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.22"
          />
          <path
            d="M111 168 Q120 174 129 168"
            stroke={GOLD}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        <g ref={armSideRef}>
          <Limb d="M96 178 Q88 204 86 232" />
          <circle
            cx="86"
            cy="240"
            r="5.5"
            fill="#17181C"
            stroke={GOLD}
            strokeWidth="1.7"
          />
        </g>

        <g ref={armWaveRef}>
          <Limb d="M144 178 Q162 156 172 132" />
          <Limb d="M172 132 Q178 116 180 104" />
          <circle
            cx="181"
            cy="98"
            r="5.5"
            fill="#17181C"
            stroke={GOLD}
            strokeWidth="1.7"
          />
        </g>

        <g ref={headRef}>
          <circle
            cx="120"
            cy="108"
            r="44"
            fill={`url(#${headGradId})`}
            stroke={GOLD}
            strokeWidth="2"
          />
          <path
            d="M82 92 Q88 66 116 62 Q144 66 158 92"
            stroke={GOLD}
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M88 84 Q96 70 118 66"
            stroke={GOLD}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.28"
          />
          <circle cx="76" cy="108" r="5" fill="#191A1F" stroke={GOLD} strokeWidth="1.6" />
          <circle cx="164" cy="108" r="5" fill="#191A1F" stroke={GOLD} strokeWidth="1.6" />

          <g ref={eyeLRef}>
            <circle cx="106" cy="108" r="3.2" fill={GOLD} />
          </g>
          <g ref={eyeRRef}>
            <circle cx="134" cy="108" r="3.2" fill={GOLD} />
          </g>

          <path
            d="M100 98 Q106 95 112 98"
            stroke={GOLD}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M128 98 Q134 95 140 98"
            stroke={GOLD}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          <circle cx="96" cy="120" r="6" fill={GOLD} opacity="0.16" />
          <circle cx="144" cy="120" r="6" fill={GOLD} opacity="0.16" />

          <path
            d="M108 122 Q120 132 132 122"
            stroke={GOLD}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
