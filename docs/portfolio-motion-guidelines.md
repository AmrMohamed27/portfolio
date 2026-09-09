# Motion, Interaction & Animation Guidelines
## Engineering Motion System & Framer Motion Specification
**Reference Standards:** `framer-motion-animator`, WCAG 2.2 Accessible Motion Guidelines  
**Core Purpose:** Provide purposeful spatial orientation, snappy feedback, and system comprehension. Zero superfluous delays.  
**Execution Environment:** Next.js 16 (React 19) + Framer Motion.

---

## 1. Core Motion Principles & UX Performance

1. **Snappy Over Dramatic:** Standard micro-interactions and button hover responses must resolve in under **180ms**. Technical recruiters must never wait for an animation to complete before they can click or scroll.
2. **Physics-Driven Springs:** Natural spring mechanics replace static ease-in/ease-out curves to create a responsive, tactile interface.
3. **Strict GPU Acceleration:** Only animate compositor-friendly properties: `opacity` and `transform` (`x`, `y`, `scale`). Never animate layout properties like `height`, `width`, `padding`, or `margin`.
4. **First-Class Accessibility (`prefers-reduced-motion`):** System accessibility settings are honored unconditionally using Framer Motion's `useReducedMotion()`. If enabled, all spatial translations (`y: 20 -> 0`) are disabled, and elements appear instantly or via gentle opacity fades.

---

## 2. Motion Token Catalog (Spring Physics Presets)

```typescript
// src/lib/motion-tokens.ts
export const motionTokens = {
  // Micro-interactions (Buttons, links, filter pills, copy triggers)
  microSpring: {
    type: 'spring',
    stiffness: 450,
    damping: 28,
    mass: 0.6,
  },

  // Structural Entrance & Scroll Reveals (Section cards, metric cells)
  revealSpring: {
    type: 'spring',
    stiffness: 280,
    damping: 24,
    mass: 0.8,
  },

  // Ambient Telemetry Pulses (Live status beacon, network data nodes)
  ambientPulse: {
    duration: 2.2,
    repeat: Infinity,
    ease: 'easeInOut',
  },

  // Toast / Notification Pops
  toastSpring: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  }
};
```

---

## 3. Coordinated Motion Blueprints by Component

### 3.1. Hero Entrance Sequence (Staggered Staging)
Instead of disjointed components flashing on screen, the Hero uses a single orchestrated stagger container:

```tsx
export const heroStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const heroChildVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTokens.revealSpring,
  },
};
```

### 3.2. Metrics Telemetry Cards (Viewport Stagger)
- **Trigger:** When scrolled into view (`viewport: { once: true, margin: '-60px' }`).
- **Effect:** Each of the 5 metric cards elevates sequentially with a `0.06s` stagger delay.
- **Numbers:** Tabular font figures render cleanly with an opacity ramp.

### 3.3. Interactive Architecture Case Study Cards
- **Hover Micro-Interaction:**
  - Card boundary shifts from `var(--border-subtle)` to `var(--border-hover)`.
  - Elevation: `y: -3px` with subtle shadow expansion.
  - Duration: `160ms`.
- **System Schematic Interaction:**
  - Active data-flow path lights up with a subtle cyan glow on hover.

### 3.4. Interactive Capabilities Filter Matrix
- **Tab Selection Transition:**
  - The active pill background uses Framer Motion's `layoutId="activeFilterTab"` to smoothly glide across tabs without layout thrash.
- **Grid Reordering:**
  - Filtered skill tiles animate in and out with `<AnimatePresence mode="popLayout">`:
  - Entering items: `opacity: 0, scale: 0.95` -> `opacity: 1, scale: 1`.
  - Exiting items: `opacity: 0, scale: 0.95`.

### 3.5. Instant Conversion Dock & Toast Micro-Interaction
- **Email Copy Button:**
  - On click: Button scales to `0.96` on tap, then returns to `1.0`.
  - Icon smoothly morphs from `Copy` to `Check` (green indicator).
  - Floating toast slides in from bottom: `y: 10 -> 0`, `opacity: 0 -> 1` with a 2.5-second auto-dismiss.

---

## 4. Reduced Motion Fallback Implementation

```tsx
'use client';
import { useReducedMotion } from 'framer-motion';

export function useAccessibleMotion() {
  const prefersReduced = useReducedMotion();

  return {
    prefersReduced,
    revealTransition: prefersReduced ? { duration: 0.01 } : motionTokens.revealSpring,
    slideTransform: prefersReduced ? { y: 0 } : { y: 16 },
  };
}
```
If `prefers-reduced-motion: reduce` is detected in the operating system:
1. Positional movements (`y`, `x`) are eliminated.
2. Only instantaneous or subtle opacity transitions (`duration: 0.15s`) are allowed.
3. No infinite pulsing animations that could trigger vestibular distress.
