"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Cake } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  cardHover,
} from "@/animations/variants";
import BeeDecorations from "./BeeDecorations";

const details = [
  {
    icon: Cake,
    title: "Celebration",
    value: "Nira's 2nd Birthday",
    color: "from-bee-gold to-bee-honey",
    bg: "bg-bee-cream",
  },
  {
    icon: Calendar,
    title: "Date",
    value: "April 11, 2026",
    color: "from-bee-gold-dark to-bee-gold",
    bg: "bg-bee-yellow-light",
  },
  {
    icon: Clock,
    title: "Time",
    value: "6:30 PM (Evening)",
    color: "from-bee-amber to-bee-gold",
    bg: "bg-bee-cream-warm",
  },
  {
    icon: MapPin,
    title: "Venue",
    value: "Indian Hut Restaurant",
    subtitle: "Exton, PA - 19341",
    color: "from-bee-honey to-bee-gold-dark",
    bg: "bg-bee-cream-deep/40",
  },
];

export default function EventDetails() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-bee-yellow/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-bee-amber/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <BeeDecorations density="light" />

      <div className="max-w-4xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-bee-yellow/30 shadow-honey-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Cake size={18} className="text-bee-gold" />
              <span className="text-sm font-body font-semibold text-bee-gold-dark">
                Party Details
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-bold bg-gradient-to-r from-bee-gold-dark via-bee-honey to-bee-gold bg-clip-text text-transparent">
              Nira Turns Two!
            </h2>
            <p className="mt-4 text-lg text-bee-dark/60 font-body max-w-md mx-auto">
              Buzz on over for Nira&apos;s 2nd Bee-Day where sweet giggles, a hive full of laughter and honey sweet cake awaits!! 🐝
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {details.map((item, index) => (
            <motion.div
              key={item.title}
              variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
              className="group"
            >
              <motion.div
                className={`relative ${item.bg} rounded-2xl p-6 md:p-8 border border-bee-yellow/20 backdrop-blur-sm cursor-default overflow-hidden`}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`}
                />

                <div className="flex items-start gap-4">
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-honey-sm`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon size={22} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-body font-semibold text-bee-gold-dark/60 uppercase tracking-wider">
                      {item.title}
                    </p>
                    <p className="text-lg md:text-xl font-display font-bold text-bee-black mt-1">
                      {item.value}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm text-bee-dark/50 font-body mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
