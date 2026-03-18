"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { milestones, photos } from "@/data/photos";
import { BeeSvg } from "./BeeDecorations";

export default function MemoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Progress line height fills as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto px-6 py-12">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-2xl md:text-4xl font-display font-bold text-amber-900">
          A Sweet Journey
        </h3>
        <p className="mt-2 text-amber-700/60 font-body">
          From tiny smiles to two amazing years
        </p>
      </motion.div>

      {/* Timeline container */}
      <div className="relative">
        {/* Background nectar trail (static) */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-amber-100/60 rounded-full" />

        {/* Animated progress line */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-1 rounded-full origin-top"
          style={{
            height: lineHeight,
            background:
              "linear-gradient(to bottom, #F59E0B, #FBBF24, #FCD34D)",
          }}
        />

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <TimelineItem
            key={milestone.age}
            milestone={milestone}
            index={index}
            isLeft={index % 2 === 0}
            photo={photos[milestone.photoIndex]}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Timeline Item ──────────────────────────────────────────────────────────

interface TimelineItemProps {
  milestone: (typeof milestones)[0];
  index: number;
  isLeft: boolean;
  photo: (typeof photos)[0];
}

function TimelineItem({ milestone, index, isLeft, photo }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-16 last:mb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:flex-row`}
    >
      {/* Content card */}
      <motion.div
        className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-center md:text-inherit`}
        initial={{
          opacity: 0,
          x: isLeft ? -50 : 50,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isLeft ? -50 : 50 }
        }
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="inline-block bg-white/70 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-amber-100/60 shadow-lg shadow-amber-100/20">
          <span className="text-3xl mb-2 block">{milestone.emoji}</span>
          <p className="text-xs font-body font-bold text-amber-500 uppercase tracking-widest">
            {milestone.age}
          </p>
          <h4 className="text-lg md:text-xl font-display font-bold text-amber-900 mt-1">
            {milestone.title}
          </h4>
          <p className="text-sm text-amber-700/70 font-body mt-2 max-w-xs">
            {milestone.description}
          </p>
        </div>
      </motion.div>

      {/* Center dot with bee */}
      <motion.div
        className="relative z-10 flex-shrink-0 my-4 md:my-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-4 border-white shadow-lg flex items-center justify-center">
          <BeeSvg size={18} />
        </div>
        {/* Honey glow */}
        <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md scale-150" />
      </motion.div>

      {/* Photo thumbnail */}
      <motion.div
        className={`flex-1 ${isLeft ? "md:pl-12" : "md:pr-12"} flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
        initial={{
          opacity: 0,
          x: isLeft ? 50 : -50,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isLeft ? 50 : -50 }
        }
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          className="w-24 h-28 md:w-28 md:h-32 rounded-xl overflow-hidden border-2 border-amber-200/50 shadow-md"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {!imgError ? (
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}
            >
              <span className="text-3xl">{photo.emoji}</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
