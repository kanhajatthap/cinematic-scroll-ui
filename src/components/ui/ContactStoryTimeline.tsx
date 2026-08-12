"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    label: "I walk in",
    caption: "Heading your way",
  },
  {
    number: "02",
    label: "I stop here",
    caption: "Got something amazing for you",
  },
  {
    number: "03",
    label: "Drop the bag",
    caption: "Let's unpack the ideas",
  },
  {
    number: "04",
    label: "A little magic",
    caption: "Chutki and here we go",
  },
  {
    number: "05",
    label: "Form appears",
    caption: "Ready to build something great",
  },
  {
    number: "06",
    label: "Let's talk",
    caption: "I'm all ears",
  },
] as const;

const GOLD = "#C6A278";

function IconWalk() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <ellipse cx="10" cy="19" rx="4.6" ry="6" transform="rotate(-14 10 19)" opacity="0.9" />
      <ellipse cx="19" cy="15" rx="4.6" ry="6" transform="rotate(12 19 15)" opacity="0.6" />
      <path d="M21 24 q4.5 -1.5 4.5 -5.5" strokeDasharray="2.5 3" opacity="0.7" />
    </svg>
  );
}

function IconStop() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <rect x="7" y="6" width="4" height="15" rx="2" fill="rgba(198,162,120,0.12)" />
      <rect x="14" y="6" width="4" height="15" rx="2" fill="rgba(198,162,120,0.12)" />
      <path d="M4.5 23.5 h19" opacity="0.7" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 10 L21.5 10 Q24 10 24 12.5 L24 20 Q24 22.5 21.5 22.5 L6.5 22.5 Q4 22.5 4 20 L4 12.5 Q4 10 6.5 10 Z" fill="rgba(198,162,120,0.1)" />
      <path d="M4 17.5 Q13 20.5 24 17.5" opacity="0.7" />
      <circle cx="14" cy="17.5" r="1.4" fill={GOLD} stroke="none" />
      <path d="M10 10 Q14 5 18 10" opacity="0.8" />
    </svg>
  );
}

function IconMagic() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3 L16.4 11.6 L25 14 L16.4 16.4 L14 25 L11.6 16.4 L3 14 L11.6 11.6 Z" fill="rgba(198,162,120,0.1)" />
      <path d="M21.5 21.5 L22.5 24" opacity="0.8" />
      <path d="M4.5 21.5 L3.8 23.8" opacity="0.8" />
      <circle cx="23.5" cy="5.5" r="1.1" fill={GOLD} stroke="none" opacity="0.8" />
    </svg>
  );
}

function IconForm() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="5" width="16" height="18" rx="2.5" fill="rgba(198,162,120,0.08)" transform="rotate(6 14 14)" />
      <path d="M9.5 11 L18.5 11 M9.5 15 L16 15 M9.5 19 L13.5 19" opacity="0.8" />
      <path d="M21 3.5 L22 6.5 L25 7.5 L22 8.5 L21 11.5 L20 8.5 L17 7.5 L20 6.5 Z" fill={GOLD} stroke="none" opacity="0.9" />
    </svg>
  );
}

function IconTalk() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7.5 Q4 5.5 6 5.5 L22 5.5 Q24 5.5 24 7.5 L24 16 Q24 18 22 18 L12.5 18 L8 22.5 L8.5 18 L6 18 Q4 18 4 16 Z" fill="rgba(198,162,120,0.1)" />
      <circle cx="9.5" cy="11.8" r="1.3" fill={GOLD} stroke="none" />
      <circle cx="14" cy="11.8" r="1.3" fill={GOLD} stroke="none" />
      <circle cx="18.5" cy="11.8" r="1.3" fill={GOLD} stroke="none" />
    </svg>
  );
}

const ICONS = [IconWalk, IconStop, IconBag, IconMagic, IconForm, IconTalk];

export function ContactStoryTimeline() {
  return (
    <div className="mx-auto mt-24 max-w-6xl lg:mt-32">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-champagne">
          The Arrival — Six Steps
        </p>
        <span className="h-px flex-1 bg-gradient-to-r from-champagne/30 to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {STEPS.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-champagne/35"
            >
              <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.2em] text-champagne/50 transition-colors group-hover:text-champagne">
                {step.number}
              </span>
              <div className="flex h-8 items-center" aria-hidden="true">
                <Icon />
              </div>
              <p className="mt-4 text-[13px] font-semibold tracking-wide text-ivory">
                {step.label}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#D8D8D8]/65">
                {step.caption}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}