"use client";

import { memo, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heroExit, pulseVariants } from "@/animations/variants";
import BeeSwarm from "./BeeSwarm";
import Bee from "./Bee";
import HoneyScene from "./HoneyScene";
import { useMusic } from "./MusicContext";

interface LandingProps {
  onEnter: () => void;
}

// Deterministic PRNG
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Pre-compute pollen sparkle data (reduced to 15 for perf)
const sparkleData = Array.from({ length: 15 }, (_, i) => ({
  size: 3 + seededRandom(i * 4) * 6,
  x: seededRandom(i * 4 + 1) * 100,
  y: seededRandom(i * 4 + 2) * 100,
  delay: seededRandom(i * 4 + 3) * 3,
  duration: 2 + seededRandom(i * 4 + 4) * 3,
}));

const PollenParticle = memo(function PollenParticle({ index }: { index: number }) {
  const { size, x, y, delay, duration } = sparkleData[index];
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: "radial-gradient(circle, rgba(255,213,79,0.6) 0%, rgba(255,213,79,0) 70%)",
      }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
      transition={{
        duration,
        delay: delay + index * 0.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
});

export default function Landing({ onEnter }: LandingProps) {
  const { startMusic } = useMusic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = useCallback(() => {
    startMusic();
    onEnter();
  }, [startMusic, onEnter]);

  return (
    <motion.div
      variants={heroExit}
      initial="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FFFDE7 0%, #FFF8E1 25%, #FFD54F 50%, #FFF8E1 75%, #FFFDE7 100%)",
      }}
    >
      {/* Honeycomb overlay */}
      <div className="absolute inset-0 honeycomb-pattern opacity-[0.05]" />

      {/* Pollen particles — client-only to avoid SSR hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {sparkleData.map((_, i) => (
            <PollenParticle key={i} index={i} />
          ))}
        </div>
      )}

      {/* ── Premium flying bee swarm with mouse parallax ── */}
      <BeeSwarm />

      {/* Main CTA */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.p
          className="text-lg md:text-xl text-bee-gold-dark/80 font-display font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          You&apos;re Invited! 🐝
        </motion.p>

        <motion.div
          onClick={handleEnter}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleEnter()}
          className="relative group cursor-pointer"
          variants={pulseVariants}
          animate="animate"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Honey glow behind */}
          <div className="absolute -inset-4 rounded-[2rem] bg-bee-yellow/30 blur-2xl group-hover:bg-bee-yellow/50 transition-colors duration-500" />

          <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl px-8 py-6 md:px-12 md:py-8 shadow-honey-lg border border-bee-yellow/30">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-bee-yellow/20 via-bee-amber/10 to-bee-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-transparent leading-tight">
                <span className="bg-gradient-to-r from-bee-gold-dark via-bee-honey to-bee-gold bg-clip-text">
                  Welcome to Nira&apos;s
                  <br />
                  2nd{" "}
                </span>
                <motion.span
                  className="inline-block bg-gradient-to-r from-bee-gold via-bee-amber to-bee-yellow bg-clip-text"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                  }}
                >
                  Bee-Day
                </motion.span>
                <span className="bg-gradient-to-r from-bee-gold-dark via-bee-honey to-bee-gold bg-clip-text">
                  {" "}Bash 🐝
                </span>
              </h1>

              {/* Featured bee orbiting the CTA */}
              <motion.div
                className="absolute -right-4 -top-4"
                animate={{
                  x: [30, -60, -260, -260, -60, 30],
                  y: [-20, -40, -10, 20, 40, -20],
                  rotate: [0, -20, -180, -180, -340, -360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
              >
                <Bee size={24} opacity={0.7} />
              </motion.div>

            </div>
          </div>

          <div className="flex justify-center">
            <HoneyScene />
          </div>

          <motion.p
            className="mt-6 text-sm text-bee-gold-dark/60 font-body"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to open 🍯
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
