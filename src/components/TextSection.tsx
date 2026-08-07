"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const HEADING_WORDS = ["Stories", "That", "Live", "Forever"];

const LINKS = ["Watch Trailer", "Explore Collection", "Contact Us"];

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 6.7 + 2) % 100}%`,
  top: `${(i * 9.3 + 6) % 100}%`,
  size: 2 + (i % 3) * 1.4,
  dur: 6 + (i % 6) * 1.6,
  delay: i * 0.5,
}));

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function TextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24"
      style={{ background: "#05060a" }}
    >
      <motion.div
        animate={{ x: [0, 70, -50, 0], y: [0, -60, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-15%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.17), transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,83,9,0.12), transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 40, -70, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254,243,199,0.1), transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 78%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -160, 0], opacity: [0, 0.55, 0] }}
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
            background: "#fbbf24",
            boxShadow: "0 0 12px rgba(251,191,36,0.9)",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-5 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.45em] text-amber-200/80"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-200/70" />
            Next Chapter
          </motion.p>

          <h2
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl"
            style={{ lineHeight: 1.08 }}
          >
            {HEADING_WORDS.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: 0.15 + i * 0.1,
                  duration: 0.75,
                  ease: EASE,
                }}
                style={{
                  display: "inline-block",
                  marginRight: "0.18em",
                  fontStyle: i === HEADING_WORDS.length - 1 ? "italic" : "normal",
                  fontFamily:
                    i === HEADING_WORDS.length - 1
                      ? "var(--font-display), serif"
                      : undefined,
                  background:
                    i === HEADING_WORDS.length - 1
                      ? "linear-gradient(120deg, #fef3c7, #fbbf24 45%, #fde68a)"
                      : undefined,
                  WebkitBackgroundClip:
                    i === HEADING_WORDS.length - 1 ? "text" : undefined,
                  WebkitTextFillColor:
                    i === HEADING_WORDS.length - 1 ? "transparent" : undefined,
                }}
              >
                {w}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
            className="mb-12 max-w-xl text-lg leading-relaxed text-gray-400"
          >
            From the first frame to the final cut, every moment is crafted to
            move you. Dive into a world where cinema meets emotion, and discover
            your next favourite story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-10"
          >
            {LINKS.map((label) => (
              <Magnetic key={label}>
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="group relative block text-lg font-medium tracking-wide text-white/70 transition-colors duration-300 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    {label}
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      →
                    </motion.span>
                  </span>
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-gradient-to-r from-amber-200 to-white transition-transform duration-300 group-hover:origin-left group-hover:scale-x-0" />
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber-200 to-white transition-transform duration-300 group-hover:origin-right group-hover:scale-x-100" />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.45, duration: 1, ease: EASE }}
          style={{ position: "relative" }}
        >
          <motion.div
            animate={{ x: parallax.x * -14, y: parallax.y * -14 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ position: "relative" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "8% -4% -6% 10%",
                  borderRadius: 28,
                  background:
                    "radial-gradient(ellipse at center, rgba(251,191,36,0.28), transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
                  transform: "rotate(-2deg)",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="/cinematic-bg.mp4"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "52vh",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(5,6,10,0.65), transparent 45%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.09,
                    mixBlendMode: "overlay",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "120px 120px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1.1rem",
                    left: "1.3rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#fbbf24",
                      boxShadow: "0 0 12px rgba(251,191,36,0.9)",
                    }}
                  />
                  NOW PLAYING
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.2rem",
                    left: "1.3rem",
                    right: "1.3rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.18)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      animate={{ width: ["15%", "92%", "40%", "78%"] }}
                      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        background:
                          "linear-gradient(90deg, #fbbf24, #fef3c7)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    02:14
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
