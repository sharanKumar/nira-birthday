"use client";

import { motion } from "framer-motion";
import { BeeSvg } from "./BeeDecorations";

// Deterministic PRNG
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Pre-compute floating bee data (replaces balloons)
const floatingBees = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: seededRandom(i * 6 + 100) * 100,
  size: 16 + seededRandom(i * 6 + 101) * 14,
  duration: 14 + seededRandom(i * 6 + 102) * 10,
  delay: seededRandom(i * 6 + 103) * 8,
  driftX: (seededRandom(i * 6 + 104) - 0.5) * 120,
  driftY: (seededRandom(i * 6 + 105) - 0.5) * 80,
}));

// Pre-compute pollen dots
const pollenDots = Array.from({ length: 12 }, (_, i) => ({
  left: 5 + seededRandom(i * 4 + 200) * 90,
  top: 5 + seededRandom(i * 4 + 201) * 90,
  size: 3 + seededRandom(i * 4 + 202) * 5,
  duration: 3 + seededRandom(i * 4 + 203) * 3,
  delay: seededRandom(i * 4 + 204) * 5,
}));

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating bees */}
      {floatingBees.map((bee) => (
        <motion.div
          key={bee.id}
          className="absolute"
          style={{
            left: `${bee.x}%`,
            top: `${30 + seededRandom(bee.id + 50) * 40}%`,
            opacity: 0.15,
          }}
          animate={{
            x: [0, bee.driftX, -bee.driftX * 0.5, 0],
            y: [0, bee.driftY, -bee.driftY * 0.7, 0],
          }}
          transition={{
            duration: bee.duration,
            delay: bee.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <BeeSvg size={bee.size} />
          </motion.div>
        </motion.div>
      ))}

      {/* Pollen / sparkle particles */}
      {pollenDots.map((dot, i) => (
        <motion.div
          key={`pollen-${i}`}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            background: "radial-gradient(circle, rgba(255,213,79,0.4) 0%, rgba(255,213,79,0) 70%)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
