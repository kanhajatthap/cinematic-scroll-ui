"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const ITEM_H = 96;

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const GOLD = "#fbbf24";

const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    desc: "We build fast, secure, and scalable websites tailored to your business needs using the latest web technologies.",
    features: ["Responsive Design", "Clean Code", "SEO Friendly", "Lightning Fast", "Mobile Optimized"],
  },
  {
    id: "02",
    title: "WordPress Development",
    desc: "Create fully customized WordPress websites with Elementor, Gutenberg, WooCommerce, and advanced custom fields.",
    features: ["Elementor Pro", "WooCommerce", "ACF", "Speed Optimization", "Security"],
  },
  {
    id: "03",
    title: "React & Next.js",
    desc: "Modern frontend development using React and Next.js with blazing-fast performance and beautiful user experiences.",
    features: ["React.js", "Next.js", "Tailwind CSS", "API Integration", "Dynamic Applications"],
  },
  {
    id: "04",
    title: "UI / UX Design",
    desc: "Design visually stunning interfaces that improve user engagement and increase conversions.",
    features: ["Wireframes", "Prototypes", "Mobile UI", "Dashboard Design", "Design Systems"],
  },
  {
    id: "05",
    title: "Performance Optimization",
    desc: "Improve loading speed, Core Web Vitals, and overall website performance for better user satisfaction.",
    features: ["PageSpeed", "Image Optimization", "Lazy Loading", "Caching", "Code Splitting"],
  },
  {
    id: "06",
    title: "SEO Optimization",
    desc: "Boost your online visibility with technical SEO and performance improvements that help your website rank higher.",
    features: ["Technical SEO", "Schema", "Meta Tags", "Sitemap", "Analytics"],
  },
];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 8.3 + 2) % 100}%`,
  top: `${(i * 13.7 + 7) % 100}%`,
  size: 2 + (i % 3) * 1.3,
  dur: 7 + (i % 5) * 1.8,
  delay: i * 0.5,
}));

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floatIdx = Math.max(0, (progress - 0.18) * 6);
  const activeIndex = Math.min(
    SERVICES.length - 1,
    Math.max(0, Math.round(floatIdx))
  );
  const service = SERVICES[activeIndex];
  const headingOpacity = clamp01(1 - progress * 4.5);
  const panelOpacity = clamp01((progress - 0.04) / 0.11);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setParallax({
      x: (e.clientX / rect.width - 0.5) * 2,
      y: (e.clientY / rect.height - 0.5) * 2,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      style={{ position: "relative", height: "700vh", background: "#05060a" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "#05060a" }} />

        <div
          style={{
            position: "absolute",
            top: "-25%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.12), transparent 62%)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-12%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,83,9,0.1), transparent 62%)",
            filter: "blur(90px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />

        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -150, 0], opacity: [0, 0.4, 0] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: GOLD,
              boxShadow: `0 0 10px ${GOLD}88`,
            }}
          />
        ))}

        <motion.div
          style={{
            position: "absolute",
            top: "8vh",
            left: "6vw",
            zIndex: 5,
            opacity: headingOpacity,
            transform: `translateY(${(1 - headingOpacity) * -40}px)`,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.55em",
              color: GOLD,
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            SERVICES
          </span>
          <h2
            style={{
              marginTop: "1.2rem",
              fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#fff",
              maxWidth: "18ch",
              lineHeight: 1.12,
            }}
          >
            We build high-performance digital experiences
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "44ch",
            }}
          >
            We create premium digital products with modern technologies.
          </p>
        </motion.div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
            gap: "4.5rem",
            alignItems: "center",
            padding: "19vh 6vw 4vh",
            opacity: panelOpacity,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              height: `${SERVICES.length * ITEM_H}px`,
              transform: `translateY(${110 - floatIdx * ITEM_H}px)`,
            }}
          >
            {SERVICES.map((s, i) => {
              const dist = i - floatIdx;
              const isActive = Math.abs(dist) < 0.5;
              return (
                <div
                  key={s.id}
                  style={{
                    height: ITEM_H,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 1.2rem",
                    gap: "1rem",
                    opacity: Math.max(0.1, 1 - Math.abs(dist) * 0.5),
                    transform: `scale(${isActive ? 1 : 0.95})`,
                    transition:
                      "opacity 0.4s ease, transform 0.4s ease",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: isActive ? GOLD : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? `0 0 16px ${GOLD}` : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: isActive ? GOLD : "rgba(255,255,255,0.25)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {s.id}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(1.2rem, 1.7vw, 1.55rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              position: "relative",
              height: "100%",
              display: "flex",
              alignItems: "center",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "4% 4% 38% 4%",
                borderRadius: 28,
                background:
                  "radial-gradient(ellipse at center, rgba(251,191,36,0.14), transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <motion.div
              animate={{ x: parallax.x * 14, y: parallax.y * 14 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ position: "relative", width: "100%" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <ServiceVisual index={activeIndex} />
                  <div style={{ marginTop: "1.6rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.9rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "var(--font-geist-mono), monospace",
                          color: GOLD,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {service.id}
                      </span>
                      <h3
                        style={{
                          fontSize: "clamp(1.35rem, 1.9vw, 1.8rem)",
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        marginTop: "0.55rem",
                        fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.55)",
                        maxWidth: "52ch",
                      }}
                    >
                      {service.desc}
                    </p>
                    <div
                      style={{
                        marginTop: "0.85rem",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.45rem",
                      }}
                    >
                      {service.features.map((f) => (
                        <span
                          key={f}
                          style={{
                            fontSize: 11,
                            padding: "0.3rem 0.75rem",
                            borderRadius: 999,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.65)",
                            fontFamily: "var(--font-geist-mono), monospace",
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <LaptopMockup />;
    case 1:
      return <DashboardVisual />;
    case 2:
      return <CodeEditorVisual />;
    case 3:
      return <FigmaVisual />;
    case 4:
      return <SpeedMeterVisual />;
    default:
      return <AnalyticsVisual />;
  }
}

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "42vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01))",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function LaptopMockup() {
  return (
    <VisualFrame>
      <div style={{ width: "76%", maxWidth: 500 }}>
        <div
          style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "#0b0d12",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "0.7rem 1rem",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span
                key={c}
                style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
              />
            ))}
          </div>
          <div style={{ padding: "1.1rem 1.2rem", display: "flex", gap: "0.9rem" }}>
            <div
              style={{
                width: "34%",
                borderRadius: 8,
                background: `linear-gradient(160deg, ${GOLD}, rgba(180,83,9,0.7))`,
                opacity: 0.9,
              }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {[70, 100, 82, 55].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 8,
                    width: `${w}%`,
                    borderRadius: 4,
                    background:
                      i === 0
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.13)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "22%",
            height: 10,
            margin: "0 auto",
            background: "rgba(255,255,255,0.14)",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
      </div>
    </VisualFrame>
  );
}

function DashboardVisual() {
  return (
    <VisualFrame>
      <div
        style={{
          width: "78%",
          maxWidth: 500,
          height: "72%",
          display: "flex",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#0b0d12",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            width: "24%",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            padding: "0.9rem 0.7rem",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ height: 7, width: "80%", borderRadius: 4, background: GOLD }} />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: 6,
                width: `${70 - i * 8}%`,
                borderRadius: 4,
                background: "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            padding: "0.9rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0.7rem",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div style={{ height: 6, width: "55%", borderRadius: 4, background: "rgba(255,255,255,0.22)" }} />
              <div
                style={{
                  height: 12,
                  width: "85%",
                  borderRadius: 4,
                  background: i % 2 === 0 ? GOLD : `${GOLD}55`,
                }}
              />
              <div style={{ height: 5, width: "40%", borderRadius: 4, background: "rgba(255,255,255,0.1)" }} />
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function CodeEditorVisual() {
  const lines = [
    { w: 55, c: "rgba(255,255,255,0.3)" },
    { w: 80, c: GOLD },
    { w: 65, c: "rgba(255,255,255,0.15)" },
    { w: 72, c: GOLD },
    { w: 45, c: "rgba(255,255,255,0.15)" },
    { w: 88, c: "rgba(255,255,255,0.3)" },
    { w: 60, c: GOLD },
  ];
  return (
    <VisualFrame>
      <div
        style={{
          width: "76%",
          maxWidth: 500,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#0b0d12",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.7rem 1rem",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
            />
          ))}
          <span
            style={{
              marginLeft: "auto",
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: `2px solid ${GOLD}`,
              boxShadow: `0 0 0 3px ${GOLD}18`,
            }}
          />
        </div>
        <div style={{ padding: "1.1rem 1.2rem", display: "flex", flexDirection: "column", gap: 10 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.2)" }}>
                {i + 1}
              </span>
              <div style={{ height: 7, width: `${l.w}%`, borderRadius: 4, background: l.c }} />
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function FigmaVisual() {
  return (
    <VisualFrame>
      <div style={{ position: "relative", width: "70%", height: "78%", maxWidth: 480 }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${20 + i * 30}%`,
              top: `${10 + i * 16}%`,
              width: "44%",
              height: "62%",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.12)",
              background: `linear-gradient(170deg, ${GOLD}22, #0b0d12 70%)`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              transform: `rotate(${-6 + i * 12}deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "18% 12%",
                borderRadius: 10,
                border: `1.5px solid ${GOLD}`,
                opacity: 0.45,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "12%",
                right: "12%",
                height: 7,
                borderRadius: 4,
                background: GOLD,
                opacity: 0.7,
              }}
            />
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

function SpeedMeterVisual() {
  return (
    <VisualFrame>
      <div style={{ width: "62%", maxWidth: 400 }}>
        <svg viewBox="0 0 200 118" style={{ width: "100%" }}>
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <motion.path
            d="M 20 100 A 80 80 0 0 1 132 34"
            fill="none"
            stroke={GOLD}
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 10px ${GOLD}88)` }}
          />
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="32"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ rotate: -60, transformOrigin: "100px 100px" }}
            animate={{ rotate: 18 }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.25 }}
          />
          <circle cx="100" cy="100" r="7" fill="#fff" />
        </svg>
        <div
          style={{
            marginTop: "0.8rem",
            textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            color: GOLD,
            letterSpacing: "0.25em",
          }}
        >
          98 / 100
        </div>
      </div>
    </VisualFrame>
  );
}

function AnalyticsVisual() {
  const bars = [38, 52, 44, 66, 58, 78, 70, 92];
  return (
    <VisualFrame>
      <div
        style={{
          width: "78%",
          maxWidth: 500,
          height: "72%",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#0b0d12",
          padding: "1.1rem 1.2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ height: 8, width: "40%", borderRadius: 4, background: "rgba(255,255,255,0.22)" }} />
          <div style={{ height: 8, width: "18%", borderRadius: 4, background: GOLD, opacity: 0.8 }} />
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "0.6rem" }}>
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0, transformOrigin: "bottom" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 5,
                background:
                  i === bars.length - 1
                    ? GOLD
                    : `linear-gradient(to top, ${GOLD}33, ${GOLD}77)`,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"].map((d, i) => (
            <span
              key={i}
              style={{
                fontSize: 8,
                fontFamily: "var(--font-geist-mono), monospace",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}
