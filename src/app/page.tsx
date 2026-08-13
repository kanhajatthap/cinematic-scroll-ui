import CursorGlow from "@/components/ui/CursorGlow";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { PROJECTS } from "@/data/projects";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected Projects",
  numberOfItems: PROJECTS.length,
  itemListElement: PROJECTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
      description: p.desc,
      keywords: p.stack.join(", "),
    },
  })),
};

export default function Home() {
  return (
    <main id="main-content" className="relative bg-[#05060a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CursorGlow />
      <Hero />
      <About />
      <FeaturedProjects />
      <Services />
      <Skills />
      <Experience />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}