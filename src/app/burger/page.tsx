"use client";

import { Preloader } from "@/components/burger/Preloader";
import { Cursor } from "@/components/burger/Cursor";
import { ScrollProgress } from "@/components/burger/ScrollProgress";
import { Navbar } from "@/components/burger/Navbar";
import { Hero } from "@/components/burger/Hero";
import { Marquee } from "@/components/burger/Marquee";
import { Stats } from "@/components/burger/Stats";
import { Menu } from "@/components/burger/Menu";
import { Craft } from "@/components/burger/Craft";
import { Process } from "@/components/burger/Process";
import { Statement } from "@/components/burger/Statement";
import { Gallery } from "@/components/burger/Gallery";
import { Reviews } from "@/components/burger/Reviews";
import { Visit } from "@/components/burger/Visit";
import { Footer } from "@/components/burger/Footer";

export default function BurgerPage() {
  return (
    <main className="relative bg-[#05060a] text-white">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <div id="top">
        <Hero />
      </div>
      <Marquee />
      <Stats />
      <Menu />
      <Craft />
      <Process />
      <Statement />
      <Gallery />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  );
}