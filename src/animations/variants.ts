import { Variants, Transition } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// Bee Theme — Centralized Animation System
// ═══════════════════════════════════════════════════════════════════════════

// ─── Shared Transitions ─────────────────────────────────────────────────────

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const slowReveal: Transition = {
  duration: 1,
  ease: "easeOut",
};

export const honeySpring: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

// ─── Page / Section Transitions ─────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smoothTransition },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: smoothTransition },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: smoothTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springTransition },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

// ─── Stagger Containers ─────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

// ─── Letter Animation ───────────────────────────────────────────────────────

export const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 200 },
  },
};

// ─── Card Hover (Honey Glow) ────────────────────────────────────────────────

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 20px rgba(245,158,11,0.1)",
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 40px rgba(245,158,11,0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

// ─── Button System ──────────────────────────────────────────────────────────

export const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Hero Exit ──────────────────────────────────────────────────────────────

export const heroExit: Variants = {
  visible: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 1.5,
    filter: "blur(10px)",
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

// ─── Honey Glow Pulse (for key highlights) ──────────────────────────────────

export const honeyGlow: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(255,213,79,0.3)",
      "0 0 40px rgba(255,213,79,0.6)",
      "0 0 20px rgba(255,213,79,0.3)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Float / Decorative ─────────────────────────────────────────────────────

export const gentleFloat: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};
