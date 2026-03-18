"use client";

import { motion } from "framer-motion";

// ─── Deterministic PRNG ──────────────────────────────────────────────────────
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ─── Inline Bee SVG ──────────────────────────────────────────────────────────
function BeeSvg({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wings */}
      <ellipse cx="11" cy="10" rx="5" ry="7" fill="white" opacity="0.7" />
      <ellipse cx="21" cy="10" rx="5" ry="7" fill="white" opacity="0.7" />
      {/* Body */}
      <ellipse cx="16" cy="18" rx="8" ry="10" fill="#FBBF24" />
      {/* Stripes */}
      <rect x="8" y="14" width="16" height="2.5" rx="1" fill="#1C1917" />
      <rect x="8" y="19" width="16" height="2.5" rx="1" fill="#1C1917" />
      <rect x="9" y="24" width="14" height="2" rx="1" fill="#1C1917" />
      {/* Eyes */}
      <circle cx="13" cy="12" r="1.5" fill="#1C1917" />
      <circle cx="19" cy="12" r="1.5" fill="#1C1917" />
      {/* Antennae */}
      <path
        d="M13 8 Q11 3 9 2"
        stroke="#1C1917"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M19 8 Q21 3 23 2"
        stroke="#1C1917"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="9" cy="2" r="1.2" fill="#1C1917" />
      <circle cx="23" cy="2" r="1.2" fill="#1C1917" />
    </svg>
  );
}

// ─── Pre-computed floating bee data ──────────────────────────────────────────
const beeData = Array.from({ length: 6 }, (_, i) => ({
  startX: seededRandom(i * 5 + 300) * 100,
  startY: seededRandom(i * 5 + 301) * 80 + 10,
  driftX: (seededRandom(i * 5 + 302) - 0.5) * 120,
  driftY: (seededRandom(i * 5 + 303) - 0.5) * 80,
  duration: 10 + seededRandom(i * 5 + 304) * 12,
  size: 16 + seededRandom(i * 5 + 305) * 16,
  delay: seededRandom(i * 5 + 306) * 5,
}));

// ─── Pre-computed pollen particle data ───────────────────────────────────────
const pollenData = Array.from({ length: 15 }, (_, i) => ({
  x: seededRandom(i * 3 + 400) * 100,
  y: seededRandom(i * 3 + 401) * 100,
  size: 3 + seededRandom(i * 3 + 402) * 5,
  duration: 3 + seededRandom(i * 3 + 403) * 4,
  delay: seededRandom(i * 3 + 404) * 6,
}));

// ─── Pre-computed honey drip data ────────────────────────────────────────────
const dripData = Array.from({ length: 4 }, (_, i) => ({
  x: 15 + seededRandom(i * 2 + 500) * 70,
  duration: 4 + seededRandom(i * 2 + 501) * 3,
  delay: seededRandom(i * 2 + 502) * 8,
  width: 4 + seededRandom(i * 2 + 503) * 4,
}));

// ─── Main Component ─────────────────────────────────────────────────────────

interface BeeDecorationsProps {
  density?: "light" | "normal" | "dense";
}

export default function BeeDecorations({ density = "normal" }: BeeDecorationsProps) {
  const beeCount = density === "light" ? 3 : density === "dense" ? 6 : 4;
  const pollenCount = density === "light" ? 6 : density === "dense" ? 15 : 10;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating bees */}
      {beeData.slice(0, beeCount).map((bee, i) => (
        <motion.div
          key={`bee-${i}`}
          className="absolute"
          style={{
            left: `${bee.startX}%`,
            top: `${bee.startY}%`,
          }}
          animate={{
            x: [0, bee.driftX, -bee.driftX * 0.5, bee.driftX * 0.3, 0],
            y: [0, bee.driftY, -bee.driftY * 0.7, bee.driftY * 0.5, 0],
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
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ opacity: 0.35 }}
          >
            <BeeSvg size={bee.size} />
          </motion.div>
        </motion.div>
      ))}

      {/* Pollen / sparkle particles */}
      {pollenData.slice(0, pollenCount).map((p, i) => (
        <motion.div
          key={`pollen-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background:
              "radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(251,191,36,0) 70%)",
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Honey drips from top */}
      {dripData.map((drip, i) => (
        <motion.div
          key={`drip-${i}`}
          className="absolute top-0 rounded-b-full"
          style={{
            left: `${drip.x}%`,
            width: drip.width,
            background: "linear-gradient(to bottom, #F59E0B, #FBBF24, transparent)",
          }}
          animate={{
            height: [0, 40, 60, 0],
            opacity: [0, 0.3, 0.2, 0],
          }}
          transition={{
            duration: drip.duration,
            delay: drip.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Exportable small bee for inline use ─────────────────────────────────────
export { BeeSvg };
