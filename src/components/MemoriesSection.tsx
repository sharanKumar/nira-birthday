"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import BeeDecorations from "./BeeDecorations";
import PhotoCarousel from "./PhotoCarousel";
import MemoryTimeline from "./MemoryTimeline";
import HighlightBanner from "./HighlightBanner";
import PhotoLightbox from "./PhotoLightbox";
import { Photo } from "@/data/photos";
import { letterVariants } from "@/animations/variants";

// ─── Animated letter-by-letter title ─────────────────────────────────────────

function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.05 },
        },
        hidden: {},
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block font-display font-bold text-3xl md:text-5xl lg:text-6xl text-amber-900"
          style={{ minWidth: char === " " ? "0.3em" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─── Flying bee across title ─────────────────────────────────────────────────

function TitleBee() {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      initial={{ left: "-10%", opacity: 0 }}
      whileInView={{
        left: "110%",
        opacity: [0, 1, 1, 1, 0],
      }}
      viewport={{ once: true }}
      transition={{
        duration: 3,
        delay: 1,
        ease: "easeInOut",
      }}
    >
      <motion.span
        className="text-2xl block"
        animate={{ y: [0, -8, 0, 4, 0], rotate: [0, 5, -3, 5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        🐝
      </motion.span>
    </motion.div>
  );
}

// ─── Honey drip section divider ──────────────────────────────────────────────

function HoneyDivider() {
  return (
    <div className="relative max-w-sm mx-auto py-8">
      <div className="h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
        {["🍯", "🐝", "🍯"].map((e, i) => (
          <motion.span
            key={i}
            className="text-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {e}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Memories Section ───────────────────────────────────────────────────

export default function MemoriesSection() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = useCallback((photo: Photo) => {
    setLightboxPhoto(photo);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxPhoto(null);
  }, []);

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* ── Background ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 30%, #FDE68A40 60%, #FFFBEB 100%)",
          }}
        />
        <div className="absolute inset-0 honeycomb-pattern opacity-[0.04]" />

        {/* Floating bee decorations */}
        <BeeDecorations density="normal" />

        {/* ── Content ── */}
        <div className="relative z-10">
          {/* Section intro */}
          <motion.div
            className="text-center px-6 mb-16"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-amber-100/60 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-amber-200/40"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg">🐝</span>
              <span className="text-sm font-body font-semibold text-amber-700">
                Photo Album
              </span>
            </motion.div>

            {/* Letter-by-letter title with flying bee */}
            <div className="relative inline-block w-full">
              <AnimatedTitle text="Memories with Nira" />
              <TitleBee />
            </div>

            <motion.div className="flex justify-center gap-1 mt-2">
              <span className="text-2xl">💛</span>
              <span className="text-2xl">🐝</span>
            </motion.div>

            <motion.p
              className="mt-4 text-lg text-amber-700/70 font-body max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              A sweet journey from tiny smiles to two amazing years 🍯
            </motion.p>
          </motion.div>

          {/* Photo carousel */}
          <PhotoCarousel onPhotoClick={handlePhotoClick} />

          <HoneyDivider />

          {/* Memory timeline */}
          <MemoryTimeline />

          <HoneyDivider />

          {/* Highlight banner: dress code + date */}
          <HighlightBanner />
        </div>
      </section>

      {/* Lightbox (rendered outside section for proper z-index) */}
      <PhotoLightbox photo={lightboxPhoto} onClose={handleCloseLightbox} />
    </>
  );
}
