"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cake, Star, Gift, Heart } from "lucide-react";
import { letterVariants, popIn, fadeIn } from "@/animations/variants";
import { BeeSvg } from "./BeeDecorations";

interface StorySequenceProps {
  onComplete: () => void;
}

function AnimatedLetters({ text }: { text: string }) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-1"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block font-display font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-bee-gold-dark via-bee-honey to-bee-gold bg-clip-text text-transparent"
          style={{ minWidth: char === " " ? "0.3em" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

const floatingIcons = [
  { Icon: Cake, color: "text-bee-gold", x: -80, y: -60 },
  { Icon: Star, color: "text-bee-yellow", x: 90, y: -40 },
  { Icon: Gift, color: "text-bee-gold-dark", x: -70, y: 60 },
  { Icon: Heart, color: "text-bee-amber", x: 80, y: 50 },
];

export default function StorySequence({ onComplete }: StorySequenceProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FFFDE7 0%, #FFF8E1 25%, #FFD54F40 50%, #FFF8E1 75%, #FFFDE7 100%)",
      }}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Honeycomb overlay */}
      <div className="absolute inset-0 honeycomb-pattern opacity-[0.04]" />

      {/* Animated bee flying across */}
      <motion.div
        className="absolute"
        animate={{
          x: ["-10vw", "110vw"],
          y: ["40vh", "35vh", "45vh", "38vh"],
        }}
        transition={{ duration: 5, ease: "easeInOut" }}
        style={{ opacity: 0.35 }}
      >
        <BeeSvg size={24} />
      </motion.div>

      <div className="relative text-center px-6">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div exit={{ opacity: 0, y: -20 }}>
              <AnimatedLetters text="Nira Turns Two!" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {floatingIcons.map(({ Icon, color, x, y }, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${color}`}
                  variants={popIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.15 }}
                  style={{ x, y }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon size={36} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              className="mt-8 text-xl md:text-2xl text-bee-gold-dark/80 font-body font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Let&apos;s celebrate together! 🍯
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
