"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photos, Photo } from "@/data/photos";

interface PhotoCarouselProps {
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotoCarousel({ onPhotoClick }: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return photos.length - 1;
        if (next >= photos.length) return 0;
        return next;
      });
    },
    []
  );

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => paginate(1), 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, paginate]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      paginate(1);
    } else if (info.offset.x > threshold) {
      paginate(-1);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.3 },
    }),
  };

  const getVisibleIndices = () => {
    const prev = current === 0 ? photos.length - 1 : current - 1;
    const next = current === photos.length - 1 ? 0 : current + 1;
    return { prev, next };
  };

  const { prev, next } = getVisibleIndices();

  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel container */}
      <div className="relative flex items-center justify-center gap-3 md:gap-6 py-8">
        {/* Previous photo (side) */}
        <motion.div
          className="hidden md:block flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden opacity-40 blur-[1px] cursor-pointer"
          whileHover={{ opacity: 0.6, scale: 1.02 }}
          onClick={() => paginate(-1)}
        >
          <PhotoPlaceholder photo={photos[prev]} />
        </motion.div>

        {/* Active photo */}
        <div className="relative w-72 h-96 md:w-80 md:h-[28rem] flex-shrink-0">
          {/* Honey glow behind */}
          <div className="absolute inset-0 rounded-3xl bg-amber-300/30 blur-2xl scale-110" />

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              onClick={() => onPhotoClick(photos[current])}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-amber-200/60 shadow-2xl shadow-amber-200/30">
                <PhotoPlaceholder photo={photos[current]} large />

                {/* Caption overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-white font-display font-bold text-lg">
                    {photos[current].caption}
                  </p>
                  <p className="text-amber-200 font-body text-sm mt-1">
                    {photos[current].age}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next photo (side) */}
        <motion.div
          className="hidden md:block flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden opacity-40 blur-[1px] cursor-pointer"
          whileHover={{ opacity: 0.6, scale: 1.02 }}
          onClick={() => paginate(1)}
        >
          <PhotoPlaceholder photo={photos[next]} />
        </motion.div>
      </div>

      {/* Arrow controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-0 pointer-events-none">
        <motion.button
          onClick={() => paginate(-1)}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-400/90 backdrop-blur-sm text-white shadow-lg flex items-center justify-center border border-amber-300/50"
          whileHover={{ scale: 1.15, backgroundColor: "rgba(245,158,11,1)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={22} />
        </motion.button>
        <motion.button
          onClick={() => paginate(1)}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-400/90 backdrop-blur-sm text-white shadow-lg flex items-center justify-center border border-amber-300/50"
          whileHover={{ scale: 1.15, backgroundColor: "rgba(245,158,11,1)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {photos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`rounded-full transition-colors duration-300 ${
              i === current
                ? "bg-amber-400 w-8 h-3"
                : "bg-amber-200/60 w-3 h-3 hover:bg-amber-300/80"
            }`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Photo Placeholder ──────────────────────────────────────────────────────

function PhotoPlaceholder({
  photo,
  large = false,
}: {
  photo: Photo;
  large?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <div className="w-full h-full relative">
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${photo.gradient} flex items-center justify-center relative`}
    >
      {/* Honeycomb subtle overlay */}
      <div className="absolute inset-0 opacity-[0.06] honeycomb-pattern" />
      <div className="text-center">
        <span className={`${large ? "text-6xl" : "text-4xl"}`}>
          {photo.emoji}
        </span>
        {large && (
          <p className="mt-3 text-amber-700/60 font-body text-sm font-medium">
            {photo.age}
          </p>
        )}
      </div>
    </div>
  );
}
