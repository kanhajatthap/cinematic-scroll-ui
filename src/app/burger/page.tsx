"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroScrub } from "@/components/ui/hero-scrub";
import { Magnetic } from "@/components/ui/Magnetic";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const BURGER_FRAME_URL = (i: number) =>
  `/burger/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

const MARQUEE = [
  "100% Angus Beef",
  "Fire-Grilled",
  "Brioche Buns",
  "House Amber Sauce",
  "Grilled Onions",
  "Smashed To Order",
];

const SCENES = [
  {
    name: "The Sear",
    desc: "Double-pressed on a 300° griddle — caramel crust",
  },
  {
    name: "The Melt",
    desc: "Aged cheddar, molten and pulling",
  },
  {
    name: "The Sauce",
    desc: "House amber — 11 ingredients, 0 shortcuts",
  },
  {
    name: "The Bun",
    desc: "48-hour brioche, butter-seared shine",
  },
];

const NOTE_POS = [
  "left-6 top-[22%] md:left-14 md:top-[23%]",
  "right-6 top-[18%] md:right-14 md:top-[19%]",
  "left-6 bottom-[22%] md:left-14 md:bottom-[25%]",
  "right-6 bottom-[19%] md:right-14 md:bottom-[22%]",
];

const PROCESS = [
  {
    n: "01",
    name: "Smashed",
    desc: "A ball of house-ground chuck & brisket drops on the griddle and is slammed flat — the edges lace up with caramel crust.",
    img: "/burger/art_01.svg",
  },
  {
    n: "02",
    name: "Seared",
    desc: "Ninety seconds on a screaming 300° griddle. One sear, one flip, zero reheats.",
    img: "/burger/art_03.svg",
  },
  {
    n: "03",
    name: "Melted",
    desc: "Aged cheddar drapes over the patty, molten and pulling before it leaves the griddle.",
    img: "/burger/art_02.svg",
  },
  {
    n: "04",
    name: "Sauced",
    desc: "House amber sauce — 11 ingredients, 0 shortcuts — brushed over a butter-toasted brioche.",
    img: "/burger/art_04.svg",
  },
  {
    n: "05",
    name: "Served",
    desc: "Stacked, wrapped, handed over hot. Built to be eaten in the first ten minutes.",
    img: "/burger/art_05.svg",
  },
];

const STATS = [
  { value: 400000, suffix: "+", decimals: 0, label: "burgers smashed" },
  { value: 4.9, suffix: "★", decimals: 1, label: "average rating" },
  { value: 11, suffix: "", decimals: 0, label: "sauce ingredients" },
  { value: 300, suffix: "°", decimals: 0, label: "griddle heat, always" },
];

const GALLERY = [
  "/burger/art_01.svg",
  "/burger/art_03.svg",
  "/burger/art_02.svg",
  "/burger/art_05.svg",
  "/burger/art_04.svg",
];

const TESTIMONIALS = [
  {
    q: "The caramel crust on that patty is ridiculous. Best smash burger I've had without a three-hour queue.",
    name: "Marcus T.",
    role: "Local food critic",
  },
  {
    q: "Burnt butter bacon. That's it. That's the whole review.",
    name: "Priya S.",
    role: "Regular since 2019",
  },
  {
    q: "You can taste the 48-hour brioche. It's stupidly good.",
    name: "Dev K.",
    role: "Google review",
  },
  {
    q: "I asked for 'as loud as possible'. They understood the assignment.",
    name: "Jonah R.",
    role: "First-timer, won't be last",
  },
];

const MENU = [
  {
    name: "The Classic Smash",
    price: "$9.50",
    desc: "Double smashed patty, American cheese, pickles, amber sauce on toasted brioche.",
    img: "/burger/art_01.svg",
  },
  {
    name: "Burnt Butter Bacon",
    price: "$11.00",
    desc: "Smoked bacon, burnt-butter mayo, caramelised onion, aged cheddar.",
    img: "/burger/art_02.svg",
  },
  {
    name: "The Firebird",
    price: "$12.50",
    desc: "Charred jalapeño, chipotle mayo, pepper jack, crispy shallots.",
    img: "/burger/art_03.svg",
  },
  {
    name: "Truffle Melt",
    price: "$13.00",
    desc: "Wild mushroom, truffle aioli, gruyère, rocket on a butter-seared bun.",
    img: "/burger/art_04.svg",
  },
  {
    name: "The Smash Stack",
    price: "$14.00",
    desc: "Triple stack, double cheddar, house slaw, honey-butter glaze.",
    img: "/burger/art_05.svg",
  },
  {
    name: "Crispy Chicken Smash",
    price: "$10.50",
    desc: "Buttermilk-fried chicken, hot honey, slaw, brioche roll.",
    img: "/burger/art_06.svg",
  },
];

const CRAFT = [
  "Open-flame sear, 300° seasoned griddle",
  "48-hour butter brioche, baked in-house",
  "House-ground chuck & brisket blend",
  "Amber sauce — 11 ingredients, 0 shortcuts",
];

const HOURS = [
  { d: "Mon — Thu", h: "11:00 — 22:00" },
  { d: "Fri — Sat", h: "11:00 — 00:00" },
  { d: "Sunday", h: "12:00 — 21:00" },
];

const NAV = [
  { href: "#menu", label: "Menu" },
  { href: "#craft", label: "The Craft" },
  { href: "#process", label: "Process" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

function ChapterNo({ n, label }: { n: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
      <span className="text-gold">{n}</span>
      <span className="h-px w-6 bg-gold/40" />
      <span>{label}</span>
    </p>
  );
}

function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(!!reduce);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce || done) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setCount(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else doneTimer.current = setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (doneTimer.current) clearTimeout(doneTimer.current);
    };
  }, [reduce, done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060a]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40"
          >
            Smash Burger <span className="text-gold">presents</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="mt-6 text-center text-[clamp(2.6rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            SMASH<span className="gold-text italic">BURGER</span>
          </motion.h1>
          <div className="mt-10 flex items-center gap-5">
            <span className="h-px w-16 bg-gold/40" />
            <span className="font-mono text-lg text-gold">
              {String(count).padStart(3, "0")}%
            </span>
            <span className="h-px w-16 bg-gold/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("premium-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovered(
        !!el?.closest("a, button, [role='button'], article, .glass"),
      );
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("premium-cursor");
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, margin: "-3px 0 0 -3px" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-9 w-9 rounded-full border border-gold/50"
        style={{ x: ringX, y: ringY, margin: "-18px 0 0 -18px" }}
        animate={{ scale: hovered ? 1.7 : 1, opacity: hovered ? 0.9 : 0.55 }}
        transition={{ scale: { duration: 0.25 }, opacity: { duration: 0.25 } }}
      />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      4200,
    );
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.07), transparent 55%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <ChapterNo n="05" label="Reviews" />
          <h2
            className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Loud <span className="gold-text italic">praise</span>
          </h2>
        </motion.div>

        <div className="relative mt-12 flex min-h-[220px] items-center justify-center md:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-x-0"
            >
              <blockquote
                className="mx-auto max-w-3xl text-xl leading-relaxed text-white/80 md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                “{t.q}”
              </blockquote>
              <figcaption className="mt-8">
                <span className="text-base font-semibold text-gold">
                  {t.name}
                </span>
                <span className="mx-3 text-white/25">—</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {t.role}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery helpers — live timecode + sprocket film row                */
/* ------------------------------------------------------------------ */
function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  const lastRef = useRef("");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const total = Math.floor((now - start) / (1000 / 24));
      const ff = total % 24;
      const ss = Math.floor(total / 24) % 60;
      const mm = Math.floor(total / (24 * 60)) % 60;
      const hh = Math.floor(total / (24 * 3600));
      const val = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
      const el = ref.current;
      if (el && val !== lastRef.current) {
        lastRef.current = val;
        el.textContent = val;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <span ref={ref}>00:00:00:00</span>;
}

const SPROCKETS = Array.from({ length: 36 });

function GalleryFilmRow({
  items,
  duration,
  dir = 1,
  flip = false,
}: {
  items: string[];
  duration: number;
  dir?: 1 | -1;
  flip?: boolean;
}) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const holesTopRef = useRef<HTMLDivElement>(null);
  const [holeDur, setHoleDur] = useState(duration);

  useEffect(() => {
    const measure = () => {
      const cw = cardsRef.current?.scrollWidth ?? 0;
      const hw = holesTopRef.current?.scrollWidth ?? 0;
      if (cw > 0 && hw > 0) setHoleDur((duration * hw) / cw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [duration]);

  const from = dir === 1 ? "0%" : "-50%";
  const to = dir === 1 ? "-50%" : "0%";
  const loop = (d: number) => ({
    x: [from, to],
    transition: { duration: d, repeat: Infinity, ease: "linear" as const },
  });

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        ref={holesTopRef}
        className="flex w-max gap-7 px-3"
        animate={loop(holeDur)}
      >
        {[...SPROCKETS, ...SPROCKETS].map((_, i) => (
          <span
            key={i}
            className="h-2 w-4 shrink-0 rounded-[3px] bg-white/10"
          />
        ))}
      </motion.div>
      <motion.div
        ref={cardsRef}
        className="flex w-max gap-5 pr-5"
        animate={loop(duration)}
      >
        {items.map((src, i) => {
          const item = MENU[i % MENU.length];
          return (
            <div
              key={i}
              className={`group relative w-[68vw] shrink-0 overflow-hidden rounded-2xl sm:w-[40vw] lg:w-[26vw] ${
                flip
                  ? i % 2
                    ? "md:-translate-y-4"
                    : "md:translate-y-8"
                  : i % 2
                    ? "md:translate-y-8"
                    : "md:-translate-y-4"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                <motion.div
                  className="absolute -inset-[8%]"
                  animate={{ scale: [1.14, 1] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                    delay: (i % 5) * 1.2,
                  }}
                >
                  <Image
                    src={src}
                    alt={item?.name || "Burger film still"}
                    fill
                    sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 26vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060a]/85 via-[#05060a]/10 to-transparent" />
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(251,191,36,0.5), 0 0 50px rgba(251,191,36,0.15)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
                    Take {String((i % 5) + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/85">
                    {item?.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        className="flex w-max gap-7 px-3"
        animate={loop(holeDur)}
      >
        {[...SPROCKETS, ...SPROCKETS].map((_, i) => (
          <span
            key={i}
            className="h-2 w-4 shrink-0 rounded-[3px] bg-white/10"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function BurgerPage() {
  const craftRef = useRef<HTMLElement>(null);
  const stmtRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const [activeAct, setActiveAct] = useState(0);

  const { scrollYProgress: craftScroll } = useScroll({
    target: craftRef,
    offset: ["start end", "end start"],
  });
  const craftImgY = useTransform(craftScroll, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: stmtScroll } = useScroll({
    target: stmtRef,
    offset: ["start end", "end start"],
  });
  const wordY = [
    useTransform(stmtScroll, [0, 1], [100, -100]),
    useTransform(stmtScroll, [0, 1], [180, -180]),
    useTransform(stmtScroll, [0, 1], [60, -60]),
  ];

  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start start", "end end"],
  });
  const processStripRef = useRef<HTMLDivElement>(null);
  const [processTravel, setProcessTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const strip = processStripRef.current;
      if (!strip) return;
      setProcessTravel(Math.max(0, strip.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const processX = useTransform(
    processScroll,
    [0.15, 0.95],
    [0, -processTravel],
  );

  useMotionValueEvent(processScroll, "change", (v) => {
    const idx = Math.min(
      PROCESS.length - 1,
      Math.max(0, Math.round(v * (PROCESS.length - 1))),
    );
    setActiveAct(idx);
  });

  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(galleryScroll, [0, 1], [70, -70]);

  return (
    <main className="relative bg-[#05060a] text-white">
      <Preloader />
      <Cursor />
      <ScrollProgress />

      {/* ------------------------------------------------------------------ */}
      {/* Nav */}
      {/* ------------------------------------------------------------------ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-mono text-[10px] tracking-widest text-gold">
              SB
            </span>
            <span
              className="text-sm font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Smash<span className="gold-text italic">Burger</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <Magnetic>
            <a
              href="#visit"
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-xl transition-colors hover:border-gold/50 hover:text-gold"
            >
              Order
            </a>
          </Magnetic>
        </div>
      </motion.header>

      {/* ------------------------------------------------------------------ */}
      {/* Hero — scroll-scrubbed film with layered scroll content */}
      {/* ------------------------------------------------------------------ */}
      <div id="top">
        <HeroScrub
          frameCount={240}
          frameUrl={BURGER_FRAME_URL}
          titleTop="SMASH"
          titleBottom="BURGER"
          accentHex="#fbbf24"
          titleMotion={(p) => {
            const fade = Math.min(1, p * 2.2);
            return {
              eyebrow: {
                opacity: 1 - Math.min(1, p * 9),
                transform: `translateY(${-p * 50}px)`,
              },
              top: {
                opacity: 1 - fade * 0.88,
                transform: `translate(${-p * 16}vw, ${-p * 14}vh) scale(${1 - p * 0.45})`,
              },
              bottom: {
                opacity: 1 - fade * 0.88,
                transform: `translate(${p * 16}vw, ${p * 14}vh) scale(${1 - p * 0.45})`,
              },
            };
          }}
        >
          {(p) => {
            const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
            const scene = (i: number) => {
              const enter = 0.1 + i * 0.2;
              const opacity = clamp01((p - enter) / 0.12);
              return {
                opacity,
                transform: `translateY(${(1 - opacity) * 26}px)`,
                filter: `blur(${(1 - opacity) * 6}px)`,
                visibility:
                  opacity > 0.02 ? ("visible" as const) : ("hidden" as const),
              };
            };
            const finale = clamp01((p - 0.84) / 0.12);
            return (
              <>
                {/* Film frame guides */}
                <span className="pointer-events-none absolute left-5 top-5 h-7 w-7 border-l-2 border-t-2 border-white/15" />
                <span className="pointer-events-none absolute right-5 top-5 h-7 w-7 border-r-2 border-t-2 border-white/15" />
                <span className="pointer-events-none absolute bottom-5 left-5 h-7 w-7 border-b-2 border-l-2 border-white/15" />
                <span className="pointer-events-none absolute bottom-5 right-5 h-7 w-7 border-b-2 border-r-2 border-white/15" />

                {/* Storyboard scene notes — one per corner */}
                {SCENES.map((s, i) => (
                  <motion.div
                    key={s.name}
                    style={scene(i)}
                    className={`absolute z-10 max-w-[240px] ${NOTE_POS[i]}`}
                  >
                    <div
                      className={`flex items-start gap-3 ${
                        i % 2 ? "flex-row-reverse text-right" : ""
                      }`}
                    >
                      <span className="mt-2 h-px w-8 shrink-0 bg-gold/60 md:w-12" />
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold">
                          SC. 0{i + 1}
                        </p>
                        <p
                          className="mt-1.5 text-xl font-bold tracking-tight text-white"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {s.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-white/45">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Center finale — the complete burger */}
                <motion.div
                  className="absolute inset-0 z-10 grid place-items-center px-6"
                  style={{
                    opacity: finale,
                    visibility:
                      finale > 0.02 ? ("visible" as const) : ("hidden" as const),
                    transform: `scale(${0.92 + (1 - finale) * 0.08})`,
                    pointerEvents:
                      finale > 0.5 ? ("auto" as const) : ("none" as const),
                  }}
                >
                  <div className="max-w-xl text-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-gold">
                      ✓ The Smash is complete
                    </p>
                    <h2
                      className="mt-5 text-[clamp(2.2rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      Burnt. <span className="gold-text italic">Buttery.</span>{" "}
                      Bold.
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/55">
                      Patty, cheese, sauce, bun — one perfectly layered smash
                      burger, built right in front of you.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                      <a
                        href="#menu"
                        className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-colors hover:border-white/40"
                        style={{ pointerEvents: "auto" }}
                      >
                        See the Menu
                      </a>
                      <a
                        href="#visit"
                        className="rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-xl transition-colors hover:bg-gold/20"
                        style={{ pointerEvents: "auto" }}
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              </>
            );
          }}
        </HeroScrub>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Marquee */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-y border-white/[0.06] py-5">
        <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex shrink-0 items-center gap-10 pr-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...MARQUEE, ...MARQUEE].map((w, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.35em] text-white/45"
              >
                {w}
                <span className="text-gold">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Numbers — animated count-up band */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 30%, rgba(251,191,36,0.08), transparent 50%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
              className="text-center"
            >
              <p
                className="gold-text text-4xl font-bold md:text-5xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Menu */}
      {/* ------------------------------------------------------------------ */}
      <section id="menu" className="relative overflow-hidden py-24 md:py-32">
        <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 85% 15%, rgba(251,191,36,0.08), transparent 45%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <ChapterNo n="01" label="The Menu" />
            <h2
              className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Smashed <span className="gold-text italic">to order</span>
            </h2>
            <p className="mt-5 text-white/50">
              Every patty is hand-pressed on the griddle the moment you order.
              No holding, no reheating — just the sear.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MENU.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -8, borderColor: "rgba(251,191,36,0.45)" }}
                transition={{ delay: (i % 3) * 0.12, duration: 0.9, ease: EASE }}
                className="glass group relative flex flex-col overflow-hidden rounded-3xl"
              >
                <span
                  className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 70px rgba(251,191,36,0.14)" }}
                />
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-xs text-gold backdrop-blur-md">
                    {item.price}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Craft */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="craft"
        ref={craftRef}
        className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 30%, rgba(251,191,36,0.1), transparent 45%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative"
          >
            <div className="glass relative overflow-hidden rounded-3xl p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <motion.div
                  style={{ y: craftImgY }}
                  className="absolute -inset-[14%]"
                >
                  <Image
                    src="/burger/art_03.svg"
                    alt="Burger on the griddle"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay" />
              </div>
            </div>
            <motion.div
              animate={{ rotate: 3, y: [0, -10, 0] }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-5 py-4 md:block"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <p className="gold-text text-3xl font-bold italic">since 2019</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                400,000+ smashed
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE }}
          >
            <ChapterNo n="02" label="The Craft" />
            <h2
              className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Low & slow,{" "}
              <span className="gold-text italic">then fast & loud</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Great smash burgers are a study in contrast. A slowly proofed bun,
              a patient caramelisation, then seconds on a screaming griddle.
              That tension is the whole point.
            </p>

            <ul className="mt-8 space-y-4">
              {CRAFT.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: EASE }}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 font-mono text-[10px] text-gold">
                    0{i + 1}
                  </span>
                  <span className="leading-relaxed text-white/70">{c}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Process — pinned horizontal film */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="process"
        ref={processRef}
        className="relative h-[300vh] border-t border-white/[0.06]"
      >
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 60%, rgba(251,191,36,0.08), transparent 45%)",
            filter: "blur(80px)",
          }}
        />

        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <ChapterNo n="03" label="The Process" />
              <h2
                className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Five acts, <span className="gold-text italic">one burger</span>
              </h2>
            </motion.div>
          </div>

          <motion.div
            ref={processStripRef}
            style={{ x: processX }}
            className="relative z-10 mt-12 flex w-max gap-6 px-6 md:mt-16 md:gap-8 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          >
            {PROCESS.map((step, i) => (
              <motion.article
                key={step.name}
                animate={{
                  scale: i === activeAct ? 1.035 : 1,
                  borderColor:
                    i === activeAct
                      ? "rgba(251,191,36,0.45)"
                      : "var(--color-border)",
                }}
                transition={{ duration: 0.6, ease: EASE }}
                whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
                className="glass group relative w-[78vw] shrink-0 overflow-hidden rounded-3xl p-6 sm:w-[58vw] md:w-[40vw] lg:w-[32vw] md:p-8"
              >
                <span
                  aria-hidden
                  className="gold-text pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] font-bold italic leading-none opacity-[0.06]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {step.n}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    Act 0{i + 1}
                  </span>
                  <span
                    className={`gold-text text-5xl font-bold italic transition-opacity duration-500 ${
                      i === activeAct ? "opacity-100" : "opacity-40"
                    }`}
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {step.n}
                  </span>
                </div>
                <h3 className="relative mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                  {step.name}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/50">
                  {step.desc}
                </p>
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={step.img}
                    alt={step.name}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 40vw, 32vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060a]/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Frame {String(24 + i * 48).padStart(3, "0")} / 240
                  </span>
                  {i === activeAct && (
                    <span className="absolute bottom-3 right-4 h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="relative z-10 mx-auto mt-10 w-full max-w-7xl px-6">
            <div className="h-px w-full bg-white/10">
              <motion.div
                style={{ scaleX: processScroll }}
                className="h-full origin-left bg-gold"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
              <span>Keep scrolling — the film rolls on</span>
              <span className="text-gold">
                Act 0{activeAct + 1} <span className="text-white/25">/ 05</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Statement */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={stmtRef}
        className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36"
      >
        <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
        <h2
          className="relative z-10 px-6 text-center text-[clamp(2.6rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {["Burnt", "Buttery", "Bold"].map((w, i) => (
            <motion.span
              key={w}
              style={{ y: wordY[i] }}
              initial={{ opacity: 0, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 1, ease: EASE }}
              className={`block ${i === 1 ? "gold-text italic" : "text-white/90"}`}
            >
              {w}
            </motion.span>
          ))}
        </h2>
        <p className="mx-auto mt-8 max-w-lg px-6 text-center font-mono text-xs uppercase tracking-[0.35em] text-white/35">
          The three laws of our kitchen
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Gallery — drifting film strip */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="gallery"
        ref={galleryRef}
        className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
      >
        <div className="noise-overlay absolute inset-0 opacity-[0.04]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <ChapterNo n="04" label="Gallery" />
            <h2
              className="mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Moments from <span className="gold-text italic">the griddle</span>
            </h2>
          </motion.div>
        </div>

        {/* Film meta bar */}
        <div className="relative z-10 mx-auto mt-12 flex max-w-7xl items-center justify-between px-6 font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">
          <span>
            Roll 04 — <span className="text-gold">Film Grain</span>
          </span>
          <span className="hidden sm:block">35mm · Kodak 5219</span>
          <span className="flex items-center gap-2 tabular-nums">
            <span className="text-gold">TC</span>
            <Timecode />
          </span>
        </div>

        <motion.div
          style={{ y: galleryY }}
          className="relative z-10 mt-8 flex flex-col gap-14 md:gap-20 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        >
          <GalleryFilmRow items={[...GALLERY, ...GALLERY]} duration={46} dir={1} />
          <GalleryFilmRow
            items={[...GALLERY, ...GALLERY]}
            duration={38}
            dir={-1}
            flip
          />
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Reviews */}
      {/* ------------------------------------------------------------------ */}
      <Testimonials />

      {/* ------------------------------------------------------------------ */}
      {/* Visit / CTA */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="visit"
        className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
        style={{ background: "#05060a" }}
      >
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 60%, rgba(251,191,36,0.1), transparent 55%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <ChapterNo n="06" label="Visit" />
            <h2
              className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Come <span className="gold-text italic">hungry</span>
            </h2>
            <p className="mt-5 text-white/50">
              144 Fire Lane, Austin TX — the corner with the permanent queue.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {HOURS.map((h, i) => (
              <motion.div
                key={h.d}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -5, borderColor: "rgba(251,191,36,0.35)" }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
                className="glass rounded-2xl p-6 text-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                  {h.d}
                </p>
                <p className="mt-3 text-xl font-semibold text-white">{h.h}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <a
                href="#top"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative">Order Takeaway</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-xl transition-colors hover:bg-gold/20"
              >
                Get Directions
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Footer */}
      {/* ------------------------------------------------------------------ */}
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
    </main>
  );
}
