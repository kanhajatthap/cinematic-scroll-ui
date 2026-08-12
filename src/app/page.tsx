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

export default function Home() {
  return (
    <main id="main-content" className="relative bg-[#05060a] text-white">
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