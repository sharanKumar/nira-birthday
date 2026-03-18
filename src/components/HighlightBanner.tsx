"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Shirt } from "lucide-react";
import { BeeSvg } from "./BeeDecorations";

// Deterministic PRNG for bee positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const bannerBees = Array.from({ length: 5 }, (_, i) => ({
  x: seededRandom(i * 3 + 600) * 100,
  y: seededRandom(i * 3 + 601) * 100,
  driftX: (seededRandom(i * 3 + 602) - 0.5) * 60,
  driftY: (seededRandom(i * 3 + 603) - 0.5) * 40,
  duration: 6 + seededRandom(i * 3 + 604) * 6,
  size: 14 + seededRandom(i * 3 + 605) * 10,
}));

export default function HighlightBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto px-6 py-12">
      <motion.div
        className="relative overflow-hidden rounded-3xl border-2 border-amber-300/60"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 40, scale: 0.95 }
        }
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-400" />
        <div className="absolute inset-0 honeycomb-pattern opacity-[0.08]" />

        {/* Animated glow pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-white/30 to-yellow-200/0"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Floating bees around banner */}
        {bannerBees.map((bee, i) => (
          <motion.div
            key={`banner-bee-${i}`}
            className="absolute"
            style={{
              left: `${bee.x}%`,
              top: `${bee.y}%`,
            }}
            animate={{
              x: [0, bee.driftX, 0],
              y: [0, bee.driftY, 0],
            }}
            transition={{
              duration: bee.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div style={{ opacity: 0.3 }}>
              <BeeSvg size={bee.size} />
            </div>
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 px-8 py-10 md:px-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Dress Code */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shirt size={16} className="text-amber-900" />
                <span className="text-xs font-body font-bold text-amber-900 uppercase tracking-widest">
                  Dress Code
                </span>
              </motion.div>

              <h3 className="text-3xl md:text-5xl font-display font-bold text-amber-900">
                Wear Yellow
              </h3>
              <p className="text-xl mt-1">💛</p>

              {/* Pulsing glow highlight */}
              <motion.div
                className="mt-4 inline-block bg-white/40 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/50"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(251,191,36,0.3)",
                    "0 0 40px rgba(251,191,36,0.6)",
                    "0 0 20px rgba(251,191,36,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-amber-900/80 font-body font-semibold text-sm md:text-base">
                  Let&apos;s make Nira&apos;s day brighter with yellow!
                </p>
              </motion.div>
            </motion.div>

            {/* Date highlight */}
            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4"
              >
                <Calendar size={16} className="text-amber-900" />
                <span className="text-xs font-body font-bold text-amber-900 uppercase tracking-widest">
                  Save the Date
                </span>
              </motion.div>

              <motion.div
                className="relative inline-block"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <h3 className="text-4xl md:text-6xl font-display font-bold text-amber-900">
                  April 11
                </h3>
                <p className="text-lg font-body font-semibold text-amber-800/70 mt-1">
                  Saturday Evening
                </p>
              </motion.div>

              {/* Animated calendar icon */}
              <motion.div
                className="mt-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <p className="text-xs font-bold text-amber-900 uppercase leading-none">
                    Apr
                  </p>
                  <p className="text-2xl font-display font-bold text-amber-900 leading-none mt-0.5">
                    11
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom hex accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600/60 via-yellow-500/80 to-amber-600/60" />
      </motion.div>
    </div>
  );
}
