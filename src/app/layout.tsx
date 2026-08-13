import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIALS,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Kanha Jatthap",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Frontend Developer",
    "WordPress Developer",
    "React Developer",
    "Next.js",
    "UI UX Design",
    "Kanha Jatthap",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      "Cinematic portfolio. React, Next.js, WordPress. Premium digital experiences.",
    url: SITE_URL,
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Cinematic portfolio. React, Next.js, WordPress. Premium digital experiences.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Frontend & WordPress Developer",
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Frontend Developer, WordPress Expert and React Developer crafting cinematic, high-performance digital experiences.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "WordPress",
    "WooCommerce",
    "GSAP",
    "UI/UX Design",
  ],
  sameAs: [SOCIALS.github, SOCIALS.linkedin, SITE_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#05060a] text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-gold/40 focus:bg-[#05060a] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-gold"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ScrollProgress />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}