"use client";

import { useId, type RefObject } from "react";

export interface CharacterRefs {
  torsoRef: RefObject<SVGGElement | null>;
  headRef: RefObject<SVGGElement | null>;
  eyeLRef: RefObject<SVGGElement | null>;
  eyeRRef: RefObject<SVGGElement | null>;
  armLUppRef: RefObject<SVGGElement | null>;
  armLForeRef: RefObject<SVGGElement | null>;
  handLRef: RefObject<SVGGElement | null>;
  armRUppRef: RefObject<SVGGElement | null>;
  armRForeRef: RefObject<SVGGElement | null>;
  handRRef: RefObject<SVGGElement | null>;
  legLUppRef: RefObject<SVGGElement | null>;
  legLShinRef: RefObject<SVGGElement | null>;
  legRUppRef: RefObject<SVGGElement | null>;
  legRShinRef: RefObject<SVGGElement | null>;
  bagRef: RefObject<SVGGElement | null>;
  shadowRef: RefObject<SVGEllipseElement | null>;
}

interface CharacterSVGProps {
  refs: CharacterRefs;
  bag?: boolean;
}

const GOLD = "#C6A278";
const DARK = "#16171B";
const DARK_HEAD = "#18191D";

function Limb({ d }: { d: string }) {
  return (
    <>
      <path
        d={d}
        stroke={GOLD}
        strokeWidth="11.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d={d}
        stroke={DARK}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

export function CharacterSVG({ refs, bag = true }: CharacterSVGProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const glowId = `${uid}-glow`;
  const torsoGradId = `${uid}-torso`;
  const bagGradId = `${uid}-bag`;

  return (
    <svg
      viewBox="0 0 280 420"
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
            flood-opacity="0.18"
          />
        </filter>
        <linearGradient id={torsoGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23242A" />
          <stop offset="55%" stopColor="#17181C" />
          <stop offset="100%" stopColor="#121317" />
        </linearGradient>
        <linearGradient id={bagGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1F24" />
          <stop offset="100%" stopColor="#131418" />
        </linearGradient>
      </defs>

      <g filter={`url(#${glowId})`}>
        <ellipse
          ref={refs.shadowRef}
          cx="140"
          cy="402"
          rx="52"
          ry="7"
          fill="rgba(0,0,0,0.32)"
          opacity="0.9"
        />

        <g ref={refs.legLUppRef}>
          <Limb d="M131 274 Q126 302 125 330" />
          <g ref={refs.legLShinRef}>
            <Limb d="M125 330 Q122 358 120 386" />
            <ellipse
              cx="119"
              cy="395"
              rx="13.5"
              ry="5.5"
              fill="#121317"
              stroke={GOLD}
              strokeWidth="1.7"
            />
          </g>
        </g>

        <g ref={refs.legRUppRef}>
          <Limb d="M149 274 Q154 302 155 330" />
          <g ref={refs.legRShinRef}>
            <Limb d="M155 330 Q158 358 160 386" />
            <ellipse
              cx="161"
              cy="395"
              rx="13.5"
              ry="5.5"
              fill="#121317"
              stroke={GOLD}
              strokeWidth="1.7"
            />
          </g>
        </g>

        <g ref={refs.torsoRef}>
          <path
            d="M140 184 C122 186 110 194 108 210 C107 232 112 252 116 270 C120 284 132 290 140 290 C148 290 160 284 164 270 C168 252 173 232 172 210 C170 194 158 186 140 184 Z"
            fill={`url(#${torsoGradId})`}
            stroke={GOLD}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M118 206 Q114 226 112 244"
            stroke={GOLD}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M137 178 Q140 183 143 178"
            stroke={GOLD}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {bag && (
          <g ref={refs.bagRef}>
            <path
              d="M161 212 Q150 228 126 247"
              stroke={GOLD}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            <rect
              x="97"
              y="240"
              width="32"
              height="25"
              rx="7"
              fill={`url(#${bagGradId})`}
              stroke={GOLD}
              strokeWidth="2"
            />
            <path
              d="M97 251 Q113 258 129 251"
              stroke={GOLD}
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="113" cy="251" r="2.6" fill={GOLD} />
          </g>
        )}

        <g ref={refs.armLUppRef}>
          <Limb d="M118 209 Q113 227 110 251" />
          <g ref={refs.armLForeRef}>
            <Limb d="M110 251 Q114 272 116 301" />
            <g ref={refs.handLRef}>
              <circle cx="117" cy="308" r="5.5" fill="#17181C" stroke={GOLD} strokeWidth="1.8" />
            </g>
          </g>
        </g>

        <g ref={refs.armRUppRef}>
          <Limb d="M162 209 Q167 227 170 251" />
          <g ref={refs.armRForeRef}>
            <Limb d="M170 251 Q166 272 164 301" />
            <g ref={refs.handRRef}>
              <circle cx="163" cy="308" r="5.5" fill="#17181C" stroke={GOLD} strokeWidth="1.8" />
            </g>
          </g>
        </g>

        <g ref={refs.headRef}>
          <circle
            cx="140"
            cy="147"
            r="27"
            fill={DARK_HEAD}
            stroke={GOLD}
            strokeWidth="2"
          />
          <path
            d="M121 131 Q132 121 147 124"
            stroke={GOLD}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.22"
          />
          <path
            d="M121 145 Q114 143 111 148"
            stroke={GOLD}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M159 145 Q166 143 169 148"
            stroke={GOLD}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle
            cx="131"
            cy="147"
            r="8.5"
            fill="rgba(198,162,120,0.06)"
            stroke={GOLD}
            strokeWidth="1.5"
            opacity="0.9"
          />
          <circle
            cx="149"
            cy="147"
            r="8.5"
            fill="rgba(198,162,120,0.06)"
            stroke={GOLD}
            strokeWidth="1.5"
            opacity="0.9"
          />
          <path
            d="M140 139 L140 155"
            stroke={GOLD}
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.7"
          />
          <g ref={refs.eyeLRef}>
            <ellipse cx="131" cy="147" rx="1.9" ry="2.4" fill={GOLD} />
          </g>
          <g ref={refs.eyeRRef}>
            <ellipse cx="149" cy="147" rx="1.9" ry="2.4" fill={GOLD} />
          </g>
          <path
            d="M124 134 Q131 130 138 134"
            stroke={GOLD}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M142 134 Q149 130 156 134"
            stroke={GOLD}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M132 165 Q140 169 148 165"
            stroke={GOLD}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      </g>
    </svg>
  );
}