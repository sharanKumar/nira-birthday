"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "@/components/Landing";
import StorySequence from "@/components/StorySequence";
import EventDetails from "@/components/EventDetails";
import Venue from "@/components/Venue";
import RSVP from "@/components/RSVP";
import FloatingElements from "@/components/FloatingElements";
import MusicToggle from "@/components/MusicToggle";
import Footer from "@/components/Footer";
import MemoriesSection from "@/components/MemoriesSection";

type AppState = "landing" | "story" | "main";

// ─── Honey Drip Section Divider ──────────────────────────────────────────────

function HoneyDripDivider() {
  return (
    <div className="relative max-w-xs mx-auto py-6">
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-bee-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
        {["🍯", "🐝", "🍯"].map((e, i) => (
          <motion.span
            key={i}
            className="text-sm"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 2,
              delay: i * 0.25,
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

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");

  const handleEnter = useCallback(() => {
    setAppState("story");
  }, []);

  const handleStoryComplete = useCallback(() => {
    setAppState("main");
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {appState === "landing" && (
          <Landing key="landing" onEnter={handleEnter} />
        )}
        {appState === "story" && (
          <StorySequence key="story" onComplete={handleStoryComplete} />
        )}
      </AnimatePresence>

      {appState === "main" && (
        <>
          <FloatingElements />

          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Top bee decoration */}
            <div className="w-full flex justify-center py-4">
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {["🐝", "🍯", "🐝"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <EventDetails />
            <HoneyDripDivider />
            <Venue />
            <HoneyDripDivider />
            <MemoriesSection />
            <HoneyDripDivider />
            <RSVP />
            <Footer />
          </motion.main>

        </>
      )}

      {/* Music toggle — always visible once music starts, persists across all states */}
      <MusicToggle />
    </>
  );
}
