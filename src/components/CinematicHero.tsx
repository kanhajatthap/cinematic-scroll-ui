"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function CinematicHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Fade-in */}
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/cinematic-bg.mp4" type="video/mp4" />
      </motion.video>

      {/* Animated Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/30"
          initial={{
            x: 200 + i * 150,
            y: 100 + i * 80,
          }}
          animate={{
            y: [100 + i * 80, -100, 100 + i * 80],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Centered Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Main Heading */}
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
            Cinematic
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl"
        >
          Experience the magic of cinema brought to life
        </motion.p>

        {/* CTA Button with Glow */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-panel relative overflow-hidden rounded-full bg-white/10 px-10 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Explore Now</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-white/60">Scroll Down</span>
            <svg
              className="h-6 w-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}