"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { photos, Photo } from "@/data/photos";

interface PhotoLightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

export default function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Sync index when photo changes from external
  useEffect(() => {
    if (photo) {
      const idx = photos.findIndex((p) => p.id === photo.id);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [photo]);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return photos.length - 1;
        if (next >= photos.length) return 0;
        return next;
      });
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [photo, onClose, navigate]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) navigate(1);
    else if (info.offset.x > 80) navigate(-1);
  };

  // Reset img error when navigating to a different photo
  useEffect(() => {
    setImgError(false);
  }, [currentIndex]);

  const currentPhoto = photos[currentIndex];

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Honeycomb overlay on backdrop */}
            <div className="absolute inset-0 honeycomb-pattern opacity-[0.03]" />
          </motion.div>

          {/* Close button */}
          <motion.button
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center border border-white/20"
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          {/* Navigation arrows */}
          <motion.button
            className="absolute left-4 md:left-8 z-10 w-10 h-10 rounded-full bg-amber-400/80 text-white flex items-center justify-center shadow-lg"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={22} />
          </motion.button>
          <motion.button
            className="absolute right-4 md:right-8 z-10 w-10 h-10 rounded-full bg-amber-400/80 text-white flex items-center justify-center shadow-lg"
            onClick={() => navigate(1)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={22} />
          </motion.button>

          {/* Photo display */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 200 : -200,
                  opacity: 0,
                  scale: 0.8,
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
                  x: dir > 0 ? -200 : 200,
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.25 },
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              className="relative z-10 cursor-grab active:cursor-grabbing"
            >
              {/* Golden glow border */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-400/40 via-yellow-300/30 to-amber-500/40 blur-lg" />

              <div className="relative w-80 h-[28rem] md:w-96 md:h-[32rem] rounded-3xl overflow-hidden border-2 border-amber-300/50 shadow-2xl">
                {!imgError ? (
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.caption}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${currentPhoto.gradient} flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 honeycomb-pattern opacity-[0.05]" />
                    <div className="text-center relative z-10">
                      <span className="text-8xl">{currentPhoto.emoji}</span>
                      <p className="mt-4 text-amber-800/70 font-body text-sm">
                        {currentPhoto.age}
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-display font-bold text-xl">
                    {currentPhoto.caption}
                  </p>
                  <p className="text-amber-200 font-body text-sm mt-1">
                    {currentPhoto.age}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Photo counter */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 font-body text-sm border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentIndex + 1} / {photos.length}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
