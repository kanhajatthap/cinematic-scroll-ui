import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smash Burger Co. — Cinematic Landing",
  description:
    "A cinematic landing page for Smash Burger Co. — fire-grilled smash burgers, brioche buns, and house sauce. Design by Kanha Jatthap.",
};

export default function BurgerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
