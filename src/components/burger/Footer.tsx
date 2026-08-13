import Link from "next/link";
import { NAV } from "@/components/burger/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] py-16">
      <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Smash<span className="gold-text italic">Burger</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Burnt, buttery, bold. Smashed to order since 2019.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-xl transition-colors hover:border-gold/50 hover:text-gold"
          >
            ← Back to Portfolio
          </Link>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-white/35">
            © {new Date().getFullYear()} Smash Burger Co.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            A cinematic concept by Kanha Jatthap
          </p>
        </div>
      </div>
    </footer>
  );
}