import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Smash Burger Co. — Cinematic Landing",
  description:
    "A cinematic landing page for Smash Burger Co. — fire-grilled smash burgers, brioche buns, and house sauce. Design by Kanha Jatthap.",
  alternates: { canonical: "/portfolio/burger" },
  openGraph: {
    title: "Smash Burger Co. — Cinematic Landing",
    description:
      "A cinematic landing page for Smash Burger Co. — fire-grilled smash burgers, brioche buns, and house sauce. Design by Kanha Jatthap.",
    url: `${SITE_URL}/portfolio/burger`,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smash Burger Co. — Cinematic Landing",
    description:
      "A cinematic landing page for Smash Burger Co. — fire-grilled smash burgers, brioche buns, and house sauce. Design by Kanha Jatthap.",
  },
};

const burgerJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/portfolio/burger#webpage`,
  name: "Smash Burger Co. — Cinematic Landing",
  url: `${SITE_URL}/portfolio/burger`,
  description:
    "A cinematic landing page for Smash Burger Co. — fire-grilled smash burgers, brioche buns, and house sauce.",
  inLanguage: "en",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  creator: { "@id": `${SITE_URL}/#person` },
};

export default function BurgerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(burgerJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
