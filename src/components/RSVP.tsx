"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { Send, CheckCircle, Gift } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { scaleIn, popIn, buttonVariants } from "@/animations/variants";
import BeeDecorations from "./BeeDecorations";

export default function RSVP() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, guests, attending }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send RSVP");
      }

      setShowConfetti(true);
      setTimeout(() => setSubmitted(true), 300);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-bee-yellow/15 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-bee-amber/10 rounded-full blur-3xl translate-x-1/3" />
      <BeeDecorations density="light" />

      <AnimatePresence>
        {showConfetti && <HoneyConfetti />}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-bee-yellow/30 shadow-honey-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Gift size={18} className="text-bee-gold" />
              <span className="text-sm font-body font-semibold text-bee-gold-dark">
                RSVP
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-bold bg-gradient-to-r from-bee-gold-dark via-bee-honey to-bee-gold bg-clip-text text-transparent">
              Will You Join Us?
            </h2>
            <p className="mt-4 text-lg text-bee-dark/60 font-body">
              We&apos;d love to see you there! Let us know if you can make it. 🐝
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variants={scaleIn}>
          <motion.div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-bee-yellow/20 shadow-honey">
            <div className="absolute inset-0 honeycomb-pattern opacity-[0.02] rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-bee-gold via-bee-yellow to-bee-gold rounded-t-3xl" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="relative space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-body font-semibold text-bee-dark/70 mb-2">
                      Your Name
                    </label>
                    <motion.input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-5 py-3.5 rounded-xl bg-white/80 border-2 border-bee-yellow/20 font-body text-bee-black placeholder-bee-dark/30 outline-none transition-all duration-300 focus:border-bee-yellow focus:ring-4 focus:ring-bee-yellow/20"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Number of guests */}
                  <div>
                    <label className="block text-sm font-body font-semibold text-bee-dark/70 mb-2">
                      Number of Guests
                    </label>
                    <motion.select
                      required
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/80 border-2 border-bee-yellow/20 font-body text-bee-black outline-none transition-all duration-300 focus:border-bee-yellow focus:ring-4 focus:ring-bee-yellow/20 appearance-none cursor-pointer"
                      whileFocus={{ scale: 1.01 }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  {/* Will you attend? */}
                  <div>
                    <label className="block text-sm font-body font-semibold text-bee-dark/70 mb-3">
                      Will you attend?
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: "yes", label: "Yes, I'll be there!", emoji: "🐝" },
                        { value: "no", label: "Sorry, can't make it", emoji: "😢" },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => setAttending(option.value)}
                          className={`flex-1 py-3.5 px-4 rounded-xl font-body font-semibold text-sm border-2 transition-all duration-300 ${
                            attending === option.value
                              ? option.value === "yes"
                                ? "bg-honey-gradient text-bee-black border-transparent shadow-honey"
                                : "bg-gray-100 text-bee-dark/60 border-gray-200"
                              : "bg-white/80 text-bee-dark/50 border-bee-yellow/15 hover:border-bee-yellow/40"
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {option.emoji} {option.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-sm text-red-500 font-body text-center">{error}</p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={!name || !attending || loading}
                    className="w-full py-4 rounded-xl bg-honey-gradient text-bee-black font-body font-bold text-lg shadow-honey disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    variants={buttonVariants}
                    initial="idle"
                    whileHover={name && attending && !loading ? "hover" : "idle"}
                    whileTap={name && attending && !loading ? "tap" : "idle"}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-bee-black/30 border-t-bee-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send RSVP
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="relative text-center py-8"
                  variants={popIn}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-honey-gradient mb-6 shadow-honey-lg"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <CheckCircle size={40} className="text-bee-black" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-bee-black mb-3">
                    {attending === "yes" ? "Yay! See You There!" : "We'll Miss You!"}
                  </h3>
                  <p className="text-bee-dark/60 font-body text-lg">
                    {attending === "yes"
                      ? `Thank you, ${name}! We can't wait to celebrate with you!`
                      : `Thank you for letting us know, ${name}. We'll save you some cake!`}
                  </p>
                  <motion.div
                    className="flex justify-center gap-2 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {["🍯", "🐝", "🎂", "🌻", "💛"].map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Honey-themed Confetti ──────────────────────────────────────────────────

function HoneyConfetti() {
  const colors = [
    "#FFD54F", "#FFC107", "#F59E0B", "#FDE68A",
    "#FBBF24", "#D97706", "#FFF3C4", "#FFE082",
    "#1A1A1A",
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (Math.random() * 360 * Math.PI) / 180;
        const velocity = 300 + Math.random() * 500;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity - 200;
        const rotation = Math.random() * 720 - 360;
        const size = 6 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: size,
              height: size * (i % 3 === 0 ? 1 : 0.6),
              backgroundColor: colors[i % colors.length],
              borderRadius: i % 4 === 0 ? "50%" : "2px",
              left: "50%",
              top: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x, y: y + 600, opacity: 0, rotate: rotation }}
            transition={{
              duration: 1.5 + Math.random(),
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            exit={{ opacity: 0 }}
          />
        );
      })}
    </div>
  );
}
