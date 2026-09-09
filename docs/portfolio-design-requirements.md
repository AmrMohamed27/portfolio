# Design Requirements Document
## Portfolio Visual Identity & Design System
**Design Principles Grounded In:** `frontend-design` skill  
**Persona:** Amr Mohamed — Software Engineer / Full-Stack Developer  
**Aesthetic Direction:** Industrial Engineering Modernism (Precise, high-density, authoritative, zero boilerplate or AI-template tells).

---

## 1. Design Direction & Anti-Template Rationale

According to `frontend-design`, default AI-generated pages cluster around:
- Warm cream backgrounds (`#F4F1EA`) with terracotta accents.
- Near-black backgrounds with screaming neon acid-green or vermilion accents.
- All-caps tracked-out eyebrow labels on every card (`WORD — fragment`).
- Monotonous SaaS rounded cards with identical border-radius and soft drop-shadows.

### Our Deliberate Direction: "Engineered Precision"
Instead of generic SaaS cards or cliché neon hacker aesthetics, the portfolio will reflect **systems engineering clarity**:
- Clean, disciplined slate/charcoal tones with crisp hairline data rules.
- Electric cobalt/cyan accent (`#0284C7` / `#38BDF8`) signaling high-throughput networks and distributed infrastructure.
- High scannability: Typography hierarchy does the heavy lifting rather than heavy decorative boxes.
- Asymmetry and functional dividers rather than uniform card grids.

---

## 2. Core Color Palette Tokens

A strictly curated 5-step palette balancing high contrast and optical softness:

| Token Name | Hex Code | Role / Usage | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| **`--bg-canvas`** | `#0B0F17` | Deep obsidian blue-black canvas base | Base |
| **`--bg-surface`** | `#111827` | Secondary surface elevation & modals | 1.2:1 against canvas |
| **`--border-subtle`** | `#1F2937` | Crisp hairline dividers & structural boundaries | Structural |
| **`--border-focus`** | `#334155` | Interactive hover & active border states | Focus indicator |
| **`--text-primary`** | `#F8FAFC` | Primary headlines, metrics, critical values | 15.8:1 (AAA) |
| **`--text-secondary`**| `#94A3B8` | Explanatory copy, architecture descriptions | 7.2:1 (AAA) |
| **`--text-muted`** | `#64748B` | Timestamps, metadata, footnotes | 4.8:1 (AA) |
| **`--accent-primary`**| `#0284C7` | Primary interactive buttons, active tab states | Solid action |
| **`--accent-glow`** | `#38BDF8` | System signal indicators, data flow accents | Optical glow |
| **`--accent-success`**| `#10B981` | Quantified metric highlight (+77%, +80%) | Metric proof |

---

## 3. Typography System

Typography must express technical authority and readability. We use **2 complementary typefaces**:
1. **Primary Interface & Editorial:** `Inter` (or `Geist Sans` in Next.js) — Clean, neutral, high x-height for effortless legibility.
2. **Technical & Data Display:** `JetBrains Mono` (or `Geist Mono`) — Dedicated to code snippets, metrics, latency numbers, and architecture labels.

### Typographic Hierarchy & Scale

```
Display / Hero:    clamp(2.5rem, 5vw, 4.25rem) | Weight: 700 | Tracking: -0.03em | Line-height: 1.1
Section Title:     clamp(1.75rem, 3vw, 2.5rem)  | Weight: 600 | Tracking: -0.02em | Line-height: 1.2
Case Study Title:  1.5rem (24px)               | Weight: 600 | Tracking: -0.01em | Line-height: 1.3
Metric Numbers:    clamp(2rem, 4vw, 3rem)       | Weight: 700 | Font: Mono        | Line-height: 1.0
Body Large:        1.125rem (18px)              | Weight: 400 | Line-height: 1.6  | Max-width: 68ch
Body Standard:     0.9375rem (15px)             | Weight: 400 | Line-height: 1.6  | Max-width: 72ch
Technical Metadata:0.8125rem (13px)             | Weight: 500 | Font: Mono        | Tracking: 0.01em
```

**Typographic Rules Enforced:**
- Sentence case by default (Avoid tracked-out uppercase `ALL CAPS EYEBROWS`).
- No accenting a single random word with italics or mismatching colors in headlines.
- Line length constrained to `< 75 characters` to prevent reading fatigue.

---

## 4. Spacing, Grid & Layout Foundation

A mathematical 8pt spatial grid providing clean rhythm:

| Token | Value | Applied To |
| :--- | :--- | :--- |
| `space-1` | `4px` | Fine badge padding, icon offsets |
| `space-2` | `8px` | Chip internal padding, tight gap elements |
| `space-3` | `12px`| Button vertical padding, list item gaps |
| `space-4` | `16px`| Standard container padding on mobile |
| `space-6` | `24px`| Card internal padding, desktop gutter |
| `space-8` | `32px`| Gap between related architectural blocks |
| `space-12`| `48px`| Component separation |
| `space-16`| `64px`| Standard section vertical spacing on tablet |
| `space-24`| `96px`| Section vertical margins on large displays |

### Container Constraints
- **Max Content Width:** `1200px` (Prevents wide-screen distortion while preserving tight reading columns).
- **Prose Reading Column:** `680px` max-width.
- **Architecture Blueprint Canvas:** `100%` within parent container with horizontal pan/scroll support on mobile viewports.

---

## 5. Component Styling & Visual Treatment

### Case Study Cards (The Architectural Showcase)
- **Border:** `1px solid var(--border-subtle)`.
- **Background:** Subtle vertical gradient `linear-gradient(180deg, rgba(17,24,39,0.7) 0%, rgba(11,15,23,0.9) 100%)`.
- **Elevation:** Zero heavy fuzzy drop shadows; instead, subtle 1px inner highlight `box-shadow: inset 0 1px 0 rgba(255,255,255,0.05)`.
- **Corner Radius:** Strict `8px` for inner elements, `12px` for outer cards (prevents childlike rounded corners).

### Architecture Blueprints
- Modeled after terminal-grade engineering schematics.
- Monospaced labels with connecting hairline pathways and animated pulse indicator nodes.
- High-contrast visual distinctions between Client, Gateway, Workers, and Storage layers.

### Contact Dock & WhatsApp Action Pill
- **Dock Positioning:** Floating bottom center dock or sleek full-width footer with glassmorphic backing (`backdrop-filter: blur(12px)`).
- **Email Copy Pill:** Single-click button displaying email address with an interactive copy icon that smoothly swaps to a green checkmark (`#10B981`) upon copy.
- **WhatsApp Action:** Secondary contact pill with WhatsApp green subtle accent border (`#22C55E` at 20% opacity) and hover highlight, opening a new tab directly to the pre-filled `wa.me` chat URL. Protects against scrapers while providing zero-friction messaging.

### Accessibility Standards
- Minimum focus ring: `2px solid var(--accent-glow)` with `2px offset`.
- Color alone never conveys state (all alerts/statuses pair color with text or shape).
- Full screen-reader support via semantic HTML (`<main>`, `<article>`, `<header>`, `<nav>`).
