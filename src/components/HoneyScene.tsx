"use client";

import { memo } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import HoneyPot from "./HoneyPot";
import Bee from "./Bee";

const SCENE_W = 200;
// Container is just tall enough for the pot (100px) + a sliver of hover room (20px)
const SCENE_H = 120;
const POT_W = 90;

interface BeeConfig {
  size: number;
  opacity: number;
  style: CSSProperties;
  animate: { x: number[]; y: number[] };
  transition: Transition;
}

// Bees cluster immediately around the pot rim.
// Pot occupies y=20–120 in the container; bees orbit y=0–30 (just above the opening).
const bees: BeeConfig[] = [
  {
    // Primary bee — directly above the pot opening, tight hover
    size: 26,
    opacity: 0.92,
    style: { top: -8, left: SCENE_W / 2 - 13 },
    animate: { x: [-20, 0, 20, 0, -20], y: [0, -8, -2, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  {
    // Left scout — beside the pot neck/rim
    size: 20,
    opacity: 0.82,
    style: { top: "22%", left: 22 },
    animate: { x: [0, 12, 4, -8, 0], y: [0, -12, -4, 8, 0] },
    transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
  },
  {
    // Right scout — beside the pot neck/rim, slightly smaller for depth
    size: 17,
    opacity: 0.72,
    style: { top: "14%", right: 22 },
    animate: { x: [0, -12, -4, 8, 0], y: [0, 8, -12, 4, 0] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 },
  },
];

const HoneyScene = memo(function HoneyScene() {
  return (
    <div
      className="relative pointer-events-none"
      style={{ width: SCENE_W, height: SCENE_H }}
      aria-hidden="true"
    >
      {/* Golden radial glow beneath the pot */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        style={{
          width: 140,
          height: 50,
          background:
            "radial-gradient(ellipse, rgba(251,191,36,0.28) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Honey Pot — anchored to bottom-center of scene */}
      <div
        className="absolute bottom-0"
        style={{ left: (SCENE_W - POT_W) / 2 }}
      >
        <HoneyPot />
      </div>

      {/* Bees orbiting the pot */}
      {bees.map((bee, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={bee.style}
          animate={bee.animate}
          transition={bee.transition}
        >
          <Bee size={bee.size} opacity={bee.opacity} />
        </motion.div>
      ))}
    </div>
  );
});

export default HoneyScene;
