# Motion, Animation & Aesthetics Guidelines
## Engineering Motion System & Framer Motion Specification
**Primary Reference:** `framer-motion-animator` skill  
**Philosophy:** Motion serves comprehension, spatial continuity, and technical feedback—never passive decoration.  
**Tone:** Snappy, physics-based, disciplined, and purposeful.

---

## 1. Core Motion Principles (The "Why")

1. **Answer Action, Don't Distract:** Motion should be the direct result of a user gesture (clicking, hovering, scrolling, toggling) or a single coordinated arrival on initial load.
2. **Speed Over Drama:** Standard interactions must complete within `150ms–250ms`. Never make a hiring manager wait for a slow 800ms float animation before they can click your resume or case study.
3. **Hardware Acceleration First:** Only animate `transform` (`x`, `y`, `scale`) and `opacity`. Never animate `width`, `height`, `margin`, or `top` to prevent expensive CPU layout recalculations.
4. **Strict Accessibility (Prefers-Reduced-Motion):** Always honor system accessibility settings using Framer Motion's `useReducedMotion()`. When active, eliminate positional movement and fallback to simple instant opacity changes or zero transitions.

---

## 2. Animation Token Catalog & Spring Physics

Instead of artificial cubic beziers, we use natural spring physics tailored to interactive elements:

```typescript
// Motion Token Presets
export const motionTokens = {
  // Snappy micro-interactions (Buttons, tabs, chips)
  snappySpring: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  },
  // Smooth structural transitions (Cards, modal drawers)
  gentleSpring: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
  // Linear easing for continuous indicators (Pulse pings, stream flows)
  linearPulse: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
```

---

## 3. Component-by-Component Framer Motion Blueprint

### A. Coordinated Initial Page Entrance (Hero Sequence)
* **Design Intent:** A single orchestrated entrance stagger rather than scattered chaotic elements popping in.
* **Framer Motion Pattern:**
```tsx
export const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const heroChildVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};
```

### B. Interactive Case Study Cards
* **Design Intent:** Tactile feedback on hover; subtle lift that clarifies clickable hit area.
* **Rule:** Restrict scaling to maximum `1.015` or `y: -3px`. Extreme card floating or 3D tilt effects look juvenile and distract from technical copy.
* **Framer Motion Pattern:**
```tsx
<motion.div
  whileHover={{ y: -3, borderColor: 'var(--border-focus)' }}
  whileTap={{ scale: 0.99 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-xl p-6"
>
  {/* Card Content */}
</motion.div>
```

### C. Live Architecture Blueprint Animations
* **Design Intent:** Visually illustrate query flows, Redis cache hits vs. database misses, and SSE worker queues.
* **Rule:** Keep data packets subtle. Tiny glowing pulses traveling across connector pathways, giving life to system diagrams.
* **Implementation:** Animate SVG `strokeDashoffset` or moving dot coordinates along predefined paths on scroll into view (`whileInView`).

### D. Deep-Dive Modal / Case Study Drawer
* **Design Intent:** Spatial continuity when drilling down into full architecture blueprints.
* **Framer Motion Pattern (`AnimatePresence`):**
```tsx
<AnimatePresence>
  {selectedCaseStudy && (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
      />
      <motion.div
        key="drawer"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="fixed inset-x-4 top-16 bottom-16 md:inset-x-auto md:max-w-3xl z-50 overflow-y-auto"
      >
        {/* Case Study Details */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### E. Floating Navigation Bar (Scroll-Aware)
* **Design Intent:** Get out of the user's way when reading down; instantly present conversion actions when scrolling up.
* **Pattern:** Track `useScroll()` delta. Animate `y: -100%` when scrolling down, `y: 0` when scrolling up.

---

## 4. What TO Do vs. What NOT To Do

| What TO Do (Best Practices) | What NOT To Do (Avoid at all costs) |
| :--- | :--- |
| **Do:** Keep durations snappy (`150ms–250ms`). | **Don't:** Long, sluggish transitions (`> 500ms`) that delay interaction. |
| **Do:** Use `AnimatePresence` with unique `key` props for clean unmounts. | **Don't:** Leave elements abruptly popping in/out without layout continuity. |
| **Do:** Use subtle spring damping (`damping: 20-30`, `stiffness: 300-400`). | **Don't:** Bouncy rubber-band wobble effects that feel like a cartoon. |
| **Do:** Animate only `transform` and `opacity`. | **Don't:** Animate `height`, `width`, `padding`, or `border-width` (jank). |
| **Do:** Respect `prefers-reduced-motion` via `useReducedMotion()`. | **Don't:** Force heavy motion onto users with vestibular motion sensitivity. |
| **Do:** Limit hover micro-motion to `< 3px` translation or `< 1.02` scale. | **Don't:** Extreme 3D card tilts, mouse-following spotlights that lag the cursor. |
| **Do:** Stagger lists by small increments (`staggerChildren: 0.05s`). | **Don't:** Long staggered chains where the last element takes 3 seconds to appear. |
| **Do:** Provide instant tactile feedback on click (`whileTap={{ scale: 0.98 }}`). | **Don't:** Dead buttons with no active or focus states. |
