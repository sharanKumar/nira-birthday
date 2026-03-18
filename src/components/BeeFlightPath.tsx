"use client";

import React, { memo, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Bee from "./Bee";

interface BeeFlightPathProps {
  /** Unique seed for deterministic randomness */
  seed: number;
  /** Size of the bee in px */
  size: number;
  /** Opacity (depth cue) */
  opacity: number;
  /** Apply blur for depth effect */
  blur: boolean;
  /** Duration of one full loop in seconds */
  duration: number;
  /** Starting phase offset (0–1) */
  phaseOffset: number;
  /** Amplitude of vertical sine wave (px) */
  amplitudeY: number;
  /** Mouse position for parallax (normalised -1 to 1) */
  mouseX: number;
  mouseY: number;
  /** Parallax strength multiplier */
  parallaxFactor: number;
  /** Direction: 1 = left-to-right, -1 = right-to-left */
  direction: 1 | -1;
  /** Vertical center as % of viewport height */
  centerY: number;
  /** Whether this is the featured CTA bee */
  isFeatured?: boolean;
}

const BeeFlightPath = memo(function BeeFlightPath({
  seed,
  size,
  opacity,
  blur,
  duration,
  phaseOffset,
  amplitudeY,
  mouseX,
  mouseY,
  parallaxFactor,
  direction,
  centerY,
  isFeatured = false,
}: BeeFlightPathProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotation = useMotionValue(0);
  const startTime = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (startTime.current === null) startTime.current = time;

    const elapsed = (time - startTime.current) / 1000; // seconds
    const progress = ((elapsed / duration) + phaseOffset) % 1;

    // Horizontal: full screen traverse with overflow
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const pad = size * 3; // fly off-screen before looping
    const totalW = screenW + pad * 2;
    const rawX = direction === 1
      ? -pad + progress * totalW
      : screenW + pad - progress * totalW;

    // Vertical: sinusoidal wave with secondary harmonic for organic feel
    const sinPrimary = Math.sin(progress * Math.PI * 2) * amplitudeY;
    const sinSecondary = Math.sin(progress * Math.PI * 4 + seed) * (amplitudeY * 0.3);
    const rawY = sinPrimary + sinSecondary;

    // Parallax offset from mouse
    const px = mouseX * parallaxFactor * 30;
    const py = mouseY * parallaxFactor * 20;

    x.set(rawX + px);
    y.set(rawY + py);

    // Tilt bee in direction of vertical movement
    const dY = Math.cos(progress * Math.PI * 2) * amplitudeY
      + Math.cos(progress * Math.PI * 4 + seed) * (amplitudeY * 0.3);
    const tilt = (dY / amplitudeY) * 12 * direction;
    rotation.set(direction === -1 ? 180 + tilt : tilt);
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: `${centerY}%`,
        left: 0,
        x,
        y,
        rotate: rotation,
        willChange: "transform",
      }}
    >
      <Bee size={size} opacity={opacity} blur={blur} />
    </motion.div>
  );
});

export default BeeFlightPath;
