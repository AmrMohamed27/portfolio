import { Transition, Variants } from 'framer-motion';

/**
 * Spring physics token definitions adhering to engineering motion specifications
 * - Snappy over dramatic: micro-interactions resolve swiftly (<180ms)
 * - Natural spring physics replace linear/cubic curves
 * - GPU-compositor friendly
 */
export const motionTokens = {
  // Micro-interactions (Buttons, links, filter pills, copy triggers)
  microSpring: {
    type: 'spring',
    stiffness: 450,
    damping: 28,
    mass: 0.6,
  } as const satisfies Transition,

  // Structural Entrance & Scroll Reveals (Section cards, metric cells)
  revealSpring: {
    type: 'spring',
    stiffness: 280,
    damping: 24,
    mass: 0.8,
  } as const satisfies Transition,

  // Snappy transition for UI tabs and swift state morphs
  snappy: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  } as const satisfies Transition,

  // Ambient Telemetry Pulses (Live status beacon, network data nodes)
  ambientPulse: {
    duration: 2.2,
    repeat: Infinity,
    ease: 'easeInOut',
  } as const satisfies Transition,

  // Toast / Notification Pops
  toastSpring: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  } as const satisfies Transition,
} as const;

/**
 * Orchestrated animation variants for standardized component sequences
 */

// Hero section staggered staging sequence
export const heroStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const heroChildVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTokens.revealSpring,
  },
};

// Section header reveal
export const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTokens.revealSpring,
  },
};

// Grid container with viewport-aware staggered reveals
export const staggerGridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

// Metric card / Card reveal variant
export const cardRevealVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTokens.revealSpring,
  },
};

// Interactive card hover physics
export const interactiveCardHover = {
  rest: { y: 0, transition: motionTokens.microSpring },
  hover: { y: -3, transition: motionTokens.microSpring },
  tap: { scale: 0.99, transition: motionTokens.microSpring },
};

// Interactive button micro-springs
export const buttonTapSpring = {
  whileHover: { scale: 1.02, transition: motionTokens.microSpring },
  whileTap: { scale: 0.97, transition: motionTokens.microSpring },
};
