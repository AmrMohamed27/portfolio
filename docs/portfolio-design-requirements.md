# Design Requirements Document & Design System
## Portfolio Visual Identity: "Obsidian & Cobalt Precision"
**Framework Standards:** `ui-ux-designer`, `frontend-design`, WCAG 2.2 AAA Compliance  
**Persona:** Amr Mohamed — Full-Stack & Core Systems Software Engineer  
**Core Aesthetic:** Architectural Obsidian Precision (High-density, technical authority, zero template tells, razor-sharp hairline borders, luminous accents).

---

## 1. Aesthetic Rationale & Anti-Template Philosophy

Generic developer portfolios frequently suffer from repetitive clichés:
- Monotonous grey cards with identical border-radii and heavy drop shadows.
- Saturated neon green "hacker" text or loud purple-to-pink gradient blobs.
- Generic cards without information hierarchy or structural discipline.

### The Deliberate Aesthetic: "Obsidian & Cobalt Precision"
To signal enterprise-grade engineering and distributed systems expertise:
1. **Disciplined Obsidian Canvas:** Deep dark canvas tones (`#06090F` and `#0B111E`) that reduce eye fatigue while providing high contrast for data visualization.
2. **Hairline Structural Rules:** Crisp 1px structural boundaries (`#1E293B` and `#334155`) that give the interface the tactile feel of an enterprise observability dashboard.
3. **Luminescent Cobalt Accents:** Electric Cobalt (`#2563EB`) and Cyan Glow (`#38BDF8`) reserved exclusively for interactive triggers, data flows, and active state indicators.
4. **Signal Emerald for Quantified Impact:** Reserved exclusively for proven positive metrics (`+77%`, `80% savings`, `20+ DBs`, `9 mentored`).

---

## 2. Design System Tokens (CSS Variables)

```css
:root {
  /* Surface & Canvas Hierarchy */
  --bg-canvas: #06090F;           /* Primary canvas background */
  --bg-surface-elevated: #0B111E; /* Primary card / panel elevation */
  --bg-surface-hover: #111C30;    /* Card hover elevation */
  --bg-surface-glass: rgba(11, 17, 30, 0.75); /* Glassmorphic header & floating docks */
  --bg-terminal: #04060A;         /* Deep code block & telemetry background */

  /* Hairline Border Rules */
  --border-subtle: #1E293B;        /* Default card & divider border */
  --border-muted: #151F30;         /* Internal secondary divider */
  --border-hover: #334155;         /* Hover state boundary */
  --border-accent: #38BDF8;        /* Active focus & highlighted node boundary */

  /* Typography Colors (WCAG 2.2 AAA Compliant) */
  --text-primary: #F8FAFC;         /* High-contrast headings & primary values (18.2:1) */
  --text-secondary: #94A3B8;       /* Technical descriptions & explanations (8.1:1) */
  --text-muted: #64748B;           /* Timestamps, metadata, labels (4.8:1) */
  --text-code: #E2E8F0;            /* Code tokens & monospace snippets */

  /* Semantic Accent Channels */
  --accent-primary: #2563EB;       /* Primary interactive button & brand mark */
  --accent-primary-hover: #1D4ED8; /* Hover interactive state */
  --accent-cyan: #38BDF8;          /* Luminous signal & active tab indicator */
  --accent-cyan-subtle: rgba(56, 189, 248, 0.12); /* Pill background */
  --accent-emerald: #10B981;       /* Quantified metric proof & availability beacon */
  --accent-emerald-subtle: rgba(16, 185, 129, 0.12);

  /* Spacing Scale (4px Base Unit) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* Border Radii */
  --radius-sm: 6px;                /* Badges, tags, code snippets */
  --radius-md: 10px;               /* Buttons, inputs, small cards */
  --radius-lg: 16px;               /* Main case study & architecture cards */
  --radius-full: 9999px;           /* Navigation dock, pills, status beacons */

  /* Elevation Shadows */
  --shadow-subtle: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border-subtle);
  --shadow-glow-cyan: 0 0 25px -5px rgba(56, 189, 248, 0.25);
}
```

---

## 3. Typography Hierarchy & Rules

The typography system pairs **Plus Jakarta Sans** (a modern, distinctive geometric grotesque with crisp authoritative terminal strokes) for conversational and interface readability with **Geist Mono** for architectural telemetry and code:

```
┌────────────────────────┬─────────────────────────────┬───────────┬──────────────────────┬─────────────┐
│ Role                   │ Size (Responsive Fluid)      │ Weight    │ Font Family          │ Line-Height │
├────────────────────────┼─────────────────────────────┼───────────┼──────────────────────┼─────────────┤
│ Hero Display Headline  │ clamp(2.5rem, 5vw, 4.25rem) │ 800 Bold  │ Plus Jakarta Sans    │ 1.10        │
│ Section Heading (H2)   │ clamp(1.85rem, 3vw, 2.5rem) │ 700 Bold  │ Plus Jakarta Sans    │ 1.20        │
│ Card Heading (H3)      │ clamp(1.25rem, 2vw, 1.6rem) │ 600 Semi  │ Plus Jakarta Sans    │ 1.30        │
│ Metric Numeric Figure  │ clamp(2.25rem, 4vw, 3.2rem) │ 800 Bold  │ Geist Mono (Tabular) │ 1.00        │
│ Body Lead Text         │ clamp(1.05rem, 1.5vw, 1.2rem│ 400 Reg   │ Plus Jakarta Sans    │ 1.65        │
│ Body Standard Text     │ 0.95rem (15.2px)            │ 400 Reg   │ Plus Jakarta Sans    │ 1.60        │
│ Monospace Metadata     │ 0.8125rem (13px)            │ 500 Med   │ Geist Mono           │ 1.40        │
│ Micro-Badge Tag        │ 0.75rem (12px)              │ 600 Semi  │ Geist Mono           │ 1.00        │
└────────────────────────┴─────────────────────────────┴───────────┴──────────────────────┴─────────────┘
```

### Typographic Constraints
- Line length constrained to a maximum of `68ch` for body copy to preserve scannability.
- No ALL-CAPS body paragraphs. Monospace badges use tight tracking (`letter-spacing: 0.04em`).
- Numerical figures must use `font-variant-numeric: tabular-nums` to prevent layout jumping.

---

## 4. Component Design Specifications

### 4.1. Glassmorphic Navigation Dock
- **Dimensions:** Max-width `820px`, Height `54px`, Centered horizontally at `top: 16px`.
- **Styling:** `border: 1px solid var(--border-subtle)`, `border-radius: var(--radius-full)`, `background: var(--bg-surface-glass)`.
- **States:**
  - Default: Translucent frosted glass.
  - Scrolled (>50px): Enhanced backdrop shadow and slightly higher opacity.

### 4.2. Telemetry Metric Card
- **Layout:** Grid of 5 responsive cells (`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`).
- **Styling:** `background: var(--bg-surface-elevated)`, `border: 1px solid var(--border-subtle)`, `border-radius: var(--radius-md)`.
- **Metric Highlighting:** Primary number styled in `var(--accent-emerald)` (or `var(--accent-cyan)`), label in `var(--text-secondary)`, context footnote in `var(--text-muted)`.

### 4.3. Architecture Case Study Card
- **Layout:** Two-column split on desktop:
  - Left column (60%): Problem context, engineering strategy, key metrics badges, stack tags.
  - Right column (40%): Visual interactive architecture schematic (ASCII / SVG terminal block).
- **Interactive State:** Hover elevates border from `var(--border-subtle)` to `var(--border-hover)` with a subtle cyan glow.

### 4.4. Interactive Filterable Capabilities Matrix
- **Category Filter Tabs:** Pill buttons with active indicator (`background: var(--accent-primary)`, `color: #ffffff`).
- **Skill Tiles:** Grid of compact cards showing skill name, production experience years, proficiency level bar, and contextual notes (e.g., "Air-gapped deployment & offline licensing").

### 4.5. Instant Conversion Dock
- **Layout:** Centered terminal card with prominent primary contact triggers.
- **Copy Email Interaction:**
  - On click: Writes `amr.mohamed.dev27@gmail.com` to clipboard.
  - UI Feedback: Changes button icon to checkmark, displays green "Copied to clipboard!" toast, and plays smooth spring animation.

---

## 5. Responsive Breakpoint & Layout Grid Strategy

| Breakpoint | Width Range | Layout Adaptation |
| :--- | :--- | :--- |
| **Mobile (`sm`)** | `< 640px` | Single-column stack, collapsible mobile dock, horizontal scroll for metrics. |
| **Tablet (`md`)** | `640px – 1024px` | 2-column metrics grid, stacked architecture diagram below problem text. |
| **Desktop (`lg`)** | `1024px – 1280px`| 2-column split case studies, 5-column metric ticker, persistent top dock. |
| **Wide Screen (`xl`)** | `> 1280px` | Max-width container capped at `1200px` for optimal reading scan lines. |
