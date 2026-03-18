"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="py-12 px-6 text-center relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          className="flex items-center justify-center gap-2 text-bee-dark/50 font-body text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>Made with</span>
          <Heart size={14} className="text-bee-gold fill-bee-gold" />
          <span>for Nira</span>
        </motion.div>
        <div className="mt-4 flex justify-center gap-1">
          {["🐝", "🍯", "🌻", "💛", "🐝"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
