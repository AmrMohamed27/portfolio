'use client';

import { useReducedMotion } from 'framer-motion';
import { motionTokens } from '@/lib/motion-tokens';

/**
 * useAccessibleMotion
 *
 * Hook to unconditionally honor operating system prefers-reduced-motion preferences.
 * - Prevents vestibular strain and disorienting translations.
 * - When reduced motion is active:
 *   1. Spatial translations (y/x axis offsets) are completely zeroed out.
 *   2. Scales default to static 1.
 *   3. Transitions collapse to instantaneous or gentle opacity-only changes.
 *   4. Infinite/ambient loops are disabled.
 */
export function useAccessibleMotion() {
  const prefersReduced = useReducedMotion();

  return {
    prefersReduced: Boolean(prefersReduced),
    // Transition token with graceful instantaneous fallback
    revealTransition: prefersReduced
      ? { duration: 0.01 }
      : motionTokens.revealSpring,
    microTransition: prefersReduced
      ? { duration: 0.01 }
      : motionTokens.microSpring,
    // Spatial translations safely zeroed out when reduced motion is preferred
    slideTransform: prefersReduced ? { y: 0 } : { y: 16 },
    slideTransformHeader: prefersReduced ? { y: 0 } : { y: 20 },
    // Hover transformation (e.g. y: -3 -> y: 0)
    hoverLift: prefersReduced ? 0 : -3,
    // Hover / tap scale safely clamped
    hoverScale: prefersReduced ? 1 : 1.02,
    tapScale: prefersReduced ? 1 : 0.97,
    // Whether ambient pulsing should execute
    allowAmbientPulse: !prefersReduced,
  };
}
