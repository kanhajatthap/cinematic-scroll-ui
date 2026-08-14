import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { getProject, PROJECTS } from "@/data/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.title} — Case Study`;
  const url = `${SITE_URL}/projects/${slug}`;

  return {
    title,
    description: project.desc,
    keywords: [...project.stack, "Case Study", "Portfolio", SITE_NAME],
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description: project.desc,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.desc,
    },
  };
}

const jsonLdScript = (ld: object) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(ld).replace(/</g, "\\u003c"),
    }}
  />
);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const projectUrl = `${SITE_URL}/projects/${slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — Case Study`,
    description: project.desc,
    url: projectUrl,
    datePublished: `${project.year}-01-01`,
    keywords: project.stack.join(", "),
    creator: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <main id="main-content" className="relative min-h-screen bg-ink text-fg">
      {jsonLdScript(breadcrumbJsonLd)}
      {jsonLdScript(creativeWorkJsonLd)}
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-32">
        <Link
          href="/#projects"
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/60 transition-colors hover:border-gold/40 hover:text-gold"
        >
          <FaArrowLeft className="text-[10px]" />
          All Projects
        </Link>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-fg/50">
            {project.tag}
          </span>
          <span className="font-mono text-xs text-gold">{project.year}</span>
        </div>

        <h1
          className="mt-6 text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {project.title.split(" ")[0]}{" "}
          <span className="gold-text italic">
            {project.title.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {project.desc}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-fg/10 bg-fg/5 px-4 py-1.5 font-mono text-xs text-fg/60"
            >
              {s}
            </span>
          ))}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/20"
            >
              View Live Site
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>
          )}
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-5">
          <div
            className="glass rounded-3xl p-8 lg:col-span-2"
            style={{ background: project.accent }}
          >
            <span className="eyebrow">Outcome</span>
            <p className="mt-6 text-lg leading-relaxed text-fg/80">
              {project.outcome}
            </p>
          </div>

          <div className="glass rounded-3xl p-8 lg:col-span-3">
            <span className="eyebrow">What went into it</span>
            <ul className="mt-6 space-y-4">
              {project.detail.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-4 leading-relaxed text-fg/60"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={`/projects/${next.slug}`}
          className="group relative mt-20 flex items-center justify-between overflow-hidden rounded-3xl border border-fg/10 bg-fg/[0.03] px-8 py-10 transition-colors hover:border-gold/40"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
              Next Case Study
            </span>
            <p
              className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {next.title}
            </p>
          </div>
          <span
            aria-hidden
            className="text-2xl text-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </Link>
      </div>
    </main>
  );
}