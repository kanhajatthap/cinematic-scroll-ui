export interface Project {
  slug: string;
  title: string;
  tag: string;
  year: string;
  desc: string;
  stack: string[];
  accent: string;
  outcome: string;
  detail: string[];
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "smash-burger-co",
    title: "Smash Burger Co.",
    tag: "Cinematic Landing Page",
    year: "2026",
    desc: "A film-like landing experience for a fire-grilled burger joint — video hero, scroll choreography and editorial menus.",
    stack: ["Next.js", "GSAP", "Framer Motion"],
    accent: "rgba(251,191,36,0.18)",
    liveUrl: "/burger",
    outcome: "A scroll-driven launch film that turned a local burger drop into a queue-out-the-door launch weekend.",
    detail: [
      "Video hero with poster frame and lazy video loading",
      "Scroll choreography with GSAP ScrollTrigger and camera pans",
      "Editorial menu layout with magnetic interactions",
      "Lighthouse performance budget kept under 1.5s LCP",
    ],
  },
  {
    slug: "luxe-interiors",
    title: "Luxe Interiors",
    tag: "Web Development",
    year: "2025",
    desc: "A cinematic showroom for a luxury interior studio.",
    stack: ["React", "Next.js", "GSAP"],
    accent: "rgba(251,191,36,0.16)",
    outcome: "A showroom-style site that doubled qualified project enquiries in the first quarter.",
    detail: [
      "Full-screen visual storytelling with parallax galleries",
      "Smooth scroll semantics with Lenis",
      "Custom CMS integration for portfolio updates",
    ],
  },
  {
    slug: "aurelia-jewelry",
    title: "Aurelia Jewelry",
    tag: "WordPress + WooCommerce",
    year: "2024",
    desc: "Bespoke e-commerce with editorial storytelling.",
    stack: ["WordPress", "WooCommerce", "Elementor"],
    accent: "rgba(254,243,199,0.12)",
    outcome: "An editorial storefront whose redesigned product pages lifted conversion by 30%.",
    detail: [
      "Custom WooCommerce theme with editorial typography",
      "ACF-driven product storytelling blocks",
      "Payment, shipping and inventory automation",
    ],
  },
  {
    slug: "meridian-finance",
    title: "Meridian Finance",
    tag: "Dashboard UI",
    year: "2024",
    desc: "A data-heavy fintech dashboard with a calm, premium feel.",
    stack: ["React", "Next.js", "Tailwind"],
    accent: "rgba(251,191,36,0.12)",
    outcome: "A dashboard suite that reduced user task time by 40% through clearer data hierarchy.",
    detail: [
      "Design system with 60+ reusable components",
      "Data-heavy tables with virtualized rows",
      "Dark-mode-first visual identity",
    ],
  },
  {
    slug: "nomad-studio",
    title: "Nomad Studio",
    tag: "UI / UX Design",
    year: "2023",
    desc: "Brand identity and product design for a creative studio.",
    stack: ["Figma", "Design System", "Prototyping"],
    accent: "rgba(180,83,9,0.14)",
    outcome: "A brand system and design language shipped across web, social and print.",
    detail: [
      "Brand identity, typography and colour systems",
      "Interactive prototypes validated with users",
      "Design-to-code handoff documentation",
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}