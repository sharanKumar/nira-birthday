"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ChevronUp } from "lucide-react";
import { useMusic } from "./MusicContext";

export default function MusicToggle() {
  const { isPlaying, volume, toggleMusic, setVolume } = useMusic();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Volume slider — shown when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-3 border border-bee-yellow/30 shadow-honey flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Vertical range input */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="music-volume-slider"
              aria-label="Volume"
              style={{
                writingMode: "vertical-lr",
                direction: "rtl",
                width: 24,
                height: 80,
                appearance: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            />
            <span className="text-[10px] font-body text-bee-gold-dark/60 font-semibold">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <div className="relative">
        {/* Animated glow ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute -inset-1 rounded-full bg-bee-yellow/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <motion.button
          onClick={toggleMusic}
          onDoubleClick={() => setExpanded((prev) => !prev)}
          className={`relative w-12 h-12 rounded-full backdrop-blur-sm border shadow-honey flex items-center justify-center transition-colors duration-300 ${
            isPlaying
              ? "bg-honey-gradient border-bee-yellow/50 text-bee-black"
              : "bg-white/80 border-bee-yellow/30 text-bee-gold-dark hover:text-bee-gold"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={`${isPlaying ? "Pause" : "Play"} music • Double-click for volume`}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>

        {/* Expand hint chevron */}
        <motion.button
          onClick={() => setExpanded((prev) => !prev)}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-bee-yellow/30 flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.2 }}
          aria-label={expanded ? "Hide volume" : "Show volume"}
        >
          <ChevronUp
            size={10}
            className={`text-bee-gold-dark transition-transform duration-200 ${
              expanded ? "" : "rotate-180"
            }`}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
