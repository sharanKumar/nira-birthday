"use client";

import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import BeeFlightPath from "./BeeFlightPath";

// Deterministic PRNG
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/** Pre-computed swarm configuration — 8 bees at 3 depth layers */
const SWARM = Array.from({ length: 8 }, (_, i) => {
  const r = (s: number) => seededRandom(i * 7 + s);

  // Depth layer: 0 = far, 1 = mid, 2 = near
  const layer = i < 3 ? 0 : i < 6 ? 1 : 2;

  const sizeMap = [14, 22, 30] as const;
  const opacityMap = [0.2, 0.35, 0.5] as const;
  const parallaxMap = [0.3, 0.6, 1.0] as const;

  return {
    seed: i,
    size: sizeMap[layer] + r(0) * 6,
    opacity: opacityMap[layer],
    blur: layer === 0,
    duration: 12 + r(1) * 10, // 12–22s per loop
    phaseOffset: r(2),
    amplitudeY: 30 + r(3) * 50, // 30–80px wave height
    parallaxFactor: parallaxMap[layer],
    direction: (r(4) > 0.5 ? 1 : -1) as 1 | -1,
    centerY: 10 + r(5) * 70, // 10%–80% of viewport
  };
});

const BeeSwarm = memo(function BeeSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize to -1..1
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {mounted && SWARM.map((bee) => (
        <BeeFlightPath
          key={bee.seed}
          {...bee}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      ))}
    </div>
  );
});

export default BeeSwarm;
