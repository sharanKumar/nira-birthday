"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

interface BeeProps {
  size?: number;
  opacity?: number;
  blur?: boolean;
}

/** High-quality inline SVG bee with animated wings */
const Bee = memo(function Bee({ size = 32, opacity = 1, blur = false }: BeeProps) {
  return (
    <motion.div
      style={{ opacity, filter: blur ? "blur(1.5px)" : "none" }}
      animate={{ scaleX: [1, 1.12, 1] }}
      transition={{ duration: 0.12, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Wings — animated via parent scaleX for buzz effect */}
        <ellipse cx="11" cy="10" rx="5" ry="7" fill="white" opacity="0.75" />
        <ellipse cx="21" cy="10" rx="5" ry="7" fill="white" opacity="0.75" />
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
        <path d="M13 8 Q11 3 9 2" stroke="#1C1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M19 8 Q21 3 23 2" stroke="#1C1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <circle cx="9" cy="2" r="1.2" fill="#1C1917" />
        <circle cx="23" cy="2" r="1.2" fill="#1C1917" />
      </svg>
    </motion.div>
  );
});

export default Bee;
