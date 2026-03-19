"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { gentleFloat } from "@/animations/variants";

const dripTiming = {
  duration: 3,
  repeat: Infinity,
  repeatDelay: 2.5,
  ease: "easeIn" as const,
  times: [0, 0.45, 0.75, 1],
};

const HoneyPot = memo(function HoneyPot() {
  return (
    <motion.div className="relative" variants={gentleFloat} animate="animate">
      {/* Pulsing glow beneath the pot */}
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: 72,
          height: 14,
          background:
            "radial-gradient(ellipse, rgba(251,191,36,0.55) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.85, 1.15, 0.85] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        width="90"
        height="100"
        viewBox="0 0 90 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Honey pot"
      >
        <defs>
          <linearGradient id="hp-body" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="hp-neck" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="hp-honey" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>

        {/* Drop shadow */}
        <ellipse cx="45" cy="102" rx="28" ry="4" fill="rgba(146,64,14,0.12)" />

        {/* Pot body */}
        <path
          d="M16 43 C10 60 9 78 14 95 Q45 107 76 95 C81 78 80 60 74 43 Z"
          fill="url(#hp-body)"
        />

        {/* Left body highlight */}
        <path
          d="M23 50 C20 64 20 76 23 91"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left handle */}
        <path
          d="M16 56 Q3 56 3 68 Q3 80 16 80"
          stroke="#D97706"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 59 Q7 59 7 68 Q7 77 16 77"
          stroke="rgba(254,240,138,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right handle */}
        <path
          d="M74 56 Q87 56 87 68 Q87 80 74 80"
          stroke="#D97706"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M74 59 Q83 59 83 68 Q83 77 74 77"
          stroke="rgba(254,240,138,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Neck */}
        <rect x="20" y="27" width="50" height="20" rx="10" fill="#FCD34D" />

        {/* Rim */}
        <ellipse cx="45" cy="27" rx="28" ry="8" fill="url(#hp-neck)" />

        {/* Honey surface */}
        <ellipse cx="45" cy="27" rx="22" ry="5.5" fill="url(#hp-honey)" />
        <ellipse cx="39" cy="25" rx="8" ry="2.5" fill="rgba(255,255,255,0.45)" />

        {/* Label backing */}
        <ellipse
          cx="45"
          cy="73"
          rx="20"
          ry="12"
          fill="rgba(255,255,255,0.2)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        {/* HONEY label */}
        <text
          x="45"
          y="70"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fill="#92400E"
          letterSpacing="1.5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          HONEY
        </text>

        {/* Honey drop dots */}
        <circle cx="39" cy="78" r="1.8" fill="#D97706" opacity="0.65" />
        <circle cx="45" cy="79.5" r="2" fill="#D97706" opacity="0.65" />
        <circle cx="51" cy="78" r="1.8" fill="#D97706" opacity="0.65" />

        {/* Honey drip trail — pathLength grows from rim down */}
        <motion.path
          d="M 63 27 Q 65 35 64 43 Q 63 51 62 57"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={dripTiming}
        />

        {/* Drip teardrop — falls after trail is fully drawn */}
        <motion.ellipse
          cx="62"
          cy="57"
          rx="3.5"
          ry="5"
          fill="#F59E0B"
          animate={{ y: [0, 0, 18, 36], opacity: [0, 1, 0.7, 0] }}
          transition={dripTiming}
        />
      </svg>
    </motion.div>
  );
});

export default HoneyPot;
