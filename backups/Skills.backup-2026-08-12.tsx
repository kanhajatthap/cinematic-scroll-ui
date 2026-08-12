"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaWordpress,
  FaServer,
  FaCloud,
  FaTachometerAlt,
  FaPlug,
  FaPenNib,
} from "react-icons/fa";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Level = 1 | 2 | 3;

interface Tool {
  name: string;
  level: Level;
}

interface Category {
  id: string;
  title: string;
  icon: IconComponent;
  tools: Tool[];
}

// Proficiency: 3 = Expert, 2 = Intermediate, 1 = Familiar.
const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "Frontend & Development",
    icon: FaCode,
    tools: [
      { name: "React", level: 3 },
      { name: "Next.js", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "JavaScript", level: 3 },
      { name: "HTML5", level: 3 },
      { name: "CSS3", level: 3 },
      { name: "Tailwind CSS", level: 3 },
      { name: "Bootstrap", level: 2 },
      { name: "Swiper.js", level: 2 },
      { name: "GSAP", level: 2 },
      { name: "Framer Motion", level: 2 },
    ],
  },
  {
    id: "cms",
    title: "CMS & WordPress",
    icon: FaWordpress,
    tools: [
      { name: "WordPress", level: 3 },
      { name: "Elementor", level: 3 },
      { name: "Gutenberg", level: 3 },
      { name: "Divi", level: 2 },
      { name: "WooCommerce", level: 2 },
      { name: "ACF / ACF Pro", level: 2 },
      { name: "Webflow", level: 2 },
      { name: "HubSpot CMS", level: 2 },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    icon: FaServer,
    tools: [
      { name: "Node.js", level: 2 },
      { name: "MongoDB", level: 2 },
      { name: "Supabase", level: 2 },
      { name: "REST APIs", level: 3 },
      { name: "Next.js API Routes", level: 2 },
    ],
  },
  {
    id: "hosting",
    title: "Hosting & Infrastructure",
    icon: FaCloud,
    tools: [
      { name: "GoDaddy", level: 2 },
      { name: "SiteGround", level: 2 },
      { name: "Kinsta", level: 2 },
      { name: "Flywheel", level: 1 },
      { name: "WP Engine", level: 2 },
      { name: "Cloudways", level: 2 },
      { name: "Hostinger", level: 2 },
      { name: "AWS", level: 2 },
      { name: "AWS / S3", level: 2 },
      { name: "WordPress Server Management", level: 2 },
      { name: "Hosting / WordPress Management", level: 3 },
      { name: "DNS & Domain Management", level: 2 },
    ],
  },
  {
    id: "performance",
    title: "Performance & Optimization",
    icon: FaTachometerAlt,
    tools: [
      { name: "WP Rocket", level: 3 },
      { name: "NitroPack", level: 2 },
      { name: "WordPress Performance Optimization", level: 3 },
      { name: "CDN & Caching", level: 2 },
      { name: "Core Web Vitals", level: 2 },
      { name: "PageSpeed Optimization", level: 3 },
      { name: "Performance Optimization", level: 3 },
      { name: "SEO", level: 3 },
    ],
  },
  {
    id: "integrations",
    title: "Integrations & Marketing",
    icon: FaPlug,
    tools: [
      { name: "Google Analytics", level: 2 },
      { name: "Google Tag Manager", level: 2 },
      { name: "Google Search Console", level: 2 },
      { name: "HubSpot", level: 1 },
      { name: "Mailchimp", level: 2 },
      { name: "Zoho Campaigns", level: 1 },
      { name: "Stripe", level: 2 },
      { name: "PayPal", level: 2 },
      { name: "Twilio", level: 1 },
      { name: "Resend", level: 1 },
    ],
  },
  {
    id: "design",
    title: "Design & Workflow",
    icon: FaPenNib,
    tools: [
      { name: "Figma", level: 2 },
      { name: "Git", level: 3 },
      { name: "GitHub", level: 3 },
      { name: "Responsive Web Design", level: 3 },
      { name: "UI/UX Implementation", level: 3 },
    ],
  },
];

function LevelBars({ level }: { level: Level }) {
  const label =
    level === 3 ? "Expert" : level === 2 ? "Intermediate" : "Familiar";
  return (
    <span
      aria-label={`${label} proficiency`}
      className="flex shrink-0 items-center gap-1.5"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-6 rounded-full transition-colors duration-300"
          style={{
            background: i < level ? "#fbbf24" : "rgba(255,255,255,0.12)",
            boxShadow: i < level ? "0 0 8px rgba(251,191,36,0.6)" : "none",
          }}
        />
      ))}
    </span>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const Icon = category.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.1, 0.5), ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
      className="mb-6 break-inside-avoid"
    >
      <div className="group glass relative overflow-hidden rounded-2xl p-6 md:p-7">
        {/* Subtle gold glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(251,191,36,0.08), transparent 55%)",
          }}
        />
        {/* Top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Category header — icon + title */}
        <div className="relative flex items-center gap-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
            <Icon aria-hidden />
          </span>
          <h3
            className="min-w-0 text-lg font-bold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {category.title}
          </h3>
        </div>

        {/* Gold accent line under the heading */}
        <span className="relative mt-4 block h-px w-10 bg-gold/60 transition-all duration-300 group-hover:w-16" />

        {/* Tools */}
        <ul className="relative mt-6 space-y-2.5">
          {category.tools.map((tool) => (
            <li key={tool.name} className="flex items-center gap-3">
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-white/75 transition-colors duration-300 group-hover:text-white/90">
                {tool.name}
              </span>
              <LevelBars level={tool.level} />
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function Legend() {
  const rows: { label: string; level: Level }[] = [
    { label: "Expert", level: 3 },
    { label: "Intermediate", level: 2 },
    { label: "Familiar", level: 1 },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
        Proficiency Level
      </span>
      {rows.map((r) => (
        <span key={r.label} className="flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-4 rounded-full"
                style={{
                  background: i < r.level ? "#fbbf24" : "rgba(255,255,255,0.12)",
                  boxShadow:
                    i < r.level ? "0 0 6px rgba(251,191,36,0.5)" : "none",
                }}
              />
            ))}
          </span>
          <span className="font-mono text-xs text-white/50">{r.label}</span>
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "#05060a" }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.08), transparent 45%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="eyebrow">Capabilities</span>
          <h2
            className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Tools I <span className="gold-text italic">master</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            A modern toolbelt for building interfaces that are beautiful, fast
            and easy to maintain.
          </p>
        </motion.div>

        {/* Masonry category cards — 1 col mobile / 2 tablet / 3 desktop */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>

        {/* Footer — legend + micro-copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 flex flex-col gap-8 border-t border-white/5 pt-8 md:flex-row md:items-end md:justify-between"
        >
          <Legend />

          <div className="max-w-sm">
            <p
              className="text-lg leading-snug"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Always learning.{" "}
              <span className="gold-text italic">Always building.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Exploring new tools to build better digital experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}