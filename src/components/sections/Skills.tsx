"use client";

import {
  useRef,
  type ComponentType,
  type MouseEvent,
  type SVGProps,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor spotlight — a soft gold glow that follows the pointer inside the card.
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    el.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.1, 0.5), ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.35, ease: EASE } }}
      className="mb-6 break-inside-avoid"
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        className="group glass relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-gold/25 md:p-7"
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(150px circle at var(--mx, 50%) var(--my, 50%), rgba(251,191,36,0.09), transparent 65%)",
          }}
        />
        {/* Sheen sweep on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 ease-linear group-hover:translate-x-full"
        />
        {/* Top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Category header — index + icon + title */}
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
              <Icon aria-hidden />
            </span>
            <div className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70">
                Category {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className="mt-1 text-lg font-bold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {category.title}
              </h3>
            </div>
          </div>
          <span className="shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            {category.tools.length} tools
          </span>
        </div>

        {/* Gold accent line under the heading */}
        <span className="relative mt-4 block h-px w-10 bg-gold/60 transition-all duration-300 group-hover:w-16" />

        {/* Tools */}
        <ul className="relative mt-5 space-y-1">
          {category.tools.map((tool, ti) => (
            <li
              key={tool.name}
              className="group/tool -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <span className="w-5 shrink-0 font-mono text-[10px] text-white/25 transition-colors duration-300 group-hover/tool:text-gold/80">
                {String(ti + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-white/75 transition-colors duration-300 group-hover/tool:text-white">
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

const TICKER = [
  "Frontend",
  "WordPress",
  "CMS",
  "Backend & APIs",
  "Hosting",
  "Performance",
  "Integrations",
  "Design",
];

function SectionHeader({
  ghostY,
  reduce,
}: {
  ghostY: MotionValue<number>;
  reduce: boolean;
}) {
  const toolCount = CATEGORIES.reduce((n, c) => n + c.tools.length, 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="relative">
        {/* Ghost word — large, parallax, behind the heading */}
        {!reduce && (
          <motion.span
            aria-hidden
            style={{ y: ghostY }}
            className="pointer-events-none absolute -top-14 left-0 hidden select-none whitespace-nowrap font-bold italic leading-none text-gold/[0.05] lg:block"
          >
            <span
              className="block text-[10rem] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Toolkit
            </span>
          </motion.span>
        )}

        <div className="relative flex items-start justify-between gap-8">
          <div className="max-w-3xl">
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="eyebrow">Capabilities</span>
            </span>
            <h2
              className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Tools I <span className="gold-text italic">master</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              A modern toolbelt for building interfaces that are beautiful, fast
              and easy to maintain.
            </p>
          </div>

          {/* Editorial metadata */}
          <div className="hidden shrink-0 flex-col items-end gap-1.5 border-l border-white/10 pl-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 lg:flex">
            <span className="text-gold/90">{"// Toolkit"}</span>
            <span>{String(CATEGORIES.length).padStart(2, "0")} Categories</span>
            <span>{String(toolCount).padStart(2, "0")} Tools</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Marquee({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return (
      <div className="relative mt-16 overflow-hidden border-y border-white/10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {TICKER.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.35em] text-white/40"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative mt-16 overflow-hidden border-y border-white/10 py-4">
      <motion.div
        aria-hidden
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-10 pr-10 will-change-transform"
      >
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
              {t}
            </span>
            <span className="text-[10px] text-gold/70">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Ambient parallax — glow and ghost word drift as the section scrolls.
  const glowY = useTransform(scrollYProgress, [0, 1], [160, -160]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [36, -48]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "#05060a" }}
    >
      {/* Fine grid texture */}
      <div
        aria-hidden
        className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />

      {/* Parallax ambient gold glow */}
      {!reduce && (
        <motion.div aria-hidden style={{ y: glowY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 24% 28%, rgba(251,191,36,0.09), transparent 46%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      )}

      {/* Film grain */}
      <div
        aria-hidden
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.035]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader ghostY={ghostY} reduce={reduce} />

        <Marquee reduce={reduce} />

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
          className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between"
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