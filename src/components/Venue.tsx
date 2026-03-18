"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { scaleIn, buttonVariants } from "@/animations/variants";

export default function Venue() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-bee-yellow/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-bee-amber/8 rounded-full blur-3xl translate-x-1/3" />

      <div className="max-w-3xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-bee-yellow/30 shadow-honey-sm"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={18} className="text-bee-gold" />
              <span className="text-sm font-body font-semibold text-bee-gold-dark">
                Venue
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-bold bg-gradient-to-r from-bee-gold-dark via-bee-honey to-bee-gold bg-clip-text text-transparent">
              Where to Find Us
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal variants={scaleIn}>
          <motion.div
            className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-bee-yellow/20 shadow-honey overflow-hidden"
            whileHover={{ boxShadow: "0 20px 60px rgba(245,158,11,0.15)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Honeycomb accent overlay */}
            <div className="absolute inset-0 honeycomb-pattern opacity-[0.03]" />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-bee-gold via-bee-yellow to-bee-gold rounded-t-3xl" />

            <div className="relative flex flex-col md:flex-row gap-8 items-start">
              <motion.div
                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-bee-gold to-bee-gold-dark flex items-center justify-center shadow-honey"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={32} className="text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-bee-black">
                  Indian Hut Restaurant
                </h3>
                <p className="text-bee-dark/60 font-body mt-2 text-lg">
                  Exton, PA - 19341
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href="https://www.google.com/maps/search/?api=1&query=Indian+Hut+Restaurant+Exton+PA+19341"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-honey-gradient text-bee-black font-body font-semibold rounded-xl px-6 py-3 shadow-honey"
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Navigation size={18} />
                    Get Directions
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <motion.div
              className="relative mt-8 rounded-2xl overflow-hidden bg-bee-cream border border-bee-yellow/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-bee-cream to-bee-yellow-light flex items-center justify-center">
                <div className="absolute inset-0 honeycomb-pattern opacity-[0.05]" />
                <div className="text-center relative z-10">
                  <MapPin size={40} className="text-bee-gold/40 mx-auto mb-2" />
                  <p className="text-bee-dark/40 font-body text-sm">
                    Indian Hut Restaurant
                  </p>
                  <p className="text-bee-dark/30 font-body text-xs mt-1">
                    Exton, PA - 19341
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
