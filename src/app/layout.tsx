import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

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
    default: "Kanha Jatthap — Frontend & WordPress Developer",
    template: "%s | Kanha Jatthap",
  },
  description:
    "Cinematic portfolio of Kanha Jatthap — Frontend Developer, WordPress Expert and React Developer crafting premium, award-worthy digital experiences.",
  keywords: [
    "Frontend Developer",
    "WordPress Developer",
    "React Developer",
    "Next.js",
    "UI UX Design",
    "Kanha Jatthap",
  ],
  openGraph: {
    title: "Kanha Jatthap — Frontend & WordPress Developer",
    description:
      "Cinematic portfolio. React, Next.js, WordPress. Premium digital experiences.",
    type: "website",
  },
  metadataBase: new URL("https://kanhajatthap.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#05060a] text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}