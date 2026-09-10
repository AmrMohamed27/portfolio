# Product Requirements Document (PRD)
## Project: High-Conversion Developer Portfolio & Systems Experience
**Persona:** Amr Mohamed — Full-Stack & Core Systems Software Engineer  
**Target Audience:** CTOs, VPs of Engineering, Engineering Directors, Staff Engineers & Senior Technical Recruiters  
**Design Standard:** Grounded in `ui-ux-designer`, `interactive-portfolio`, and modern design systems.  
**Core Conversion Goal:** Convert 30-second executive scans into scheduled technical interviews and high-impact engineering opportunities.

---

## 1. Executive Summary & The 30-Second UX Law

Technical leaders and executive recruiters spend an average of **30 to 45 seconds** scanning an engineering portfolio before deciding whether to move a candidate forward.

### The 30-Second Cognitive Funnel
To guarantee maximum conversion, the user experience must answer four critical questions in progressive stages:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 00s - 05s │ [IMMEDIATE CLARITY]                                             │
│           │ Who is this? Amr Mohamed — Full-Stack & Systems Engineer.       │
│           │ What is his core stack? TypeScript, Next.js, NestJS, Postgres.  │
├───────────┼─────────────────────────────────────────────────────────────────┤
│ 05s - 15s │ [QUANTIFIED PROOF OF VALUE]                                     │
│           │ 77% query latency drop (35s -> 8s)                              │
│           │ 80% LLM token cost reduction                                    │
│           │ Air-gapped on-premise AI deployed to UAE government client      │
│           │ 9 engineers guided/mentored                                     │
├───────────┼─────────────────────────────────────────────────────────────────┤
│ 15s - 30s │ [ARCHITECTURAL DEPTH & ARTIFACTS]                               │
│           │ Interactive system design inspection: data flows, caching       │
│           │ strategies, failover queues, and real-world trade-offs.         │
├───────────┼─────────────────────────────────────────────────────────────────┤
│ 30s+      │ [FRICTIONLESS ACTION]                                           │
│           │ Instant PDF Resume, 1-click email copy (w/ feedback toast),     │
│           │ WhatsApp direct connect, and LinkedIn profile.                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Information Architecture (IA) & Page Hierarchy

The portfolio is structured as a **Single-Page Progressive Disclosure Hub** with integrated deep-dive interactive states (expandable architecture schematics and capability drawers):

```
┌───────────────────────────────────────────────────────────────────────┐
│ 1. Persistent Glassmorphic Header Dock                                │
│    - Brand Monogram [AM] + Real-Time Status Beacon ("Available Now")  │
│    - Semantic Anchors: #overview, #case-studies, #skills, #experience │
│    - Primary CTA: Direct Download Resume (PDF)                        │
├───────────────────────────────────────────────────────────────────────┤
│ 2. Command Hero Section (Identity & Core Value Proposition)           │
│    - System Architect badge + High-impact headline                    │
│    - Supporting value thesis: Distributed backends + slick web apps   │
│    - Fast Actions: [Inspect Architecture] [Download CV] [Copy Email]  │
├───────────────────────────────────────────────────────────────────────┤
│ 3. Quantified Impact & Systems Telemetry Ticker                       │
│    - Live-style metrics cards: -77% Latency, -80% Token Cost,        │
│      20+ DB Connectors, 14-Day Delivery, 9 Engineers Mentored         │
├───────────────────────────────────────────────────────────────────────┤
│ 4. Flagship Architectural Case Studies (System Deep-Dives)            │
│    - 1. MyQuery.AI (Cloud & UAE Government Air-Gapped Edition)        │
│    - 2. Trseah AI Proposal Studio (14-day zero-to-one, Etimad API)    │
│    - 3. APEX eInvoicing Integration Engine (HSM PKCS#11 / ETA API)    │
│    - 4. Y-Verify Field Audit & Compliance (500+ operators, Geo-verify)│
│    * Includes: Architecture Diagrams, Trade-offs, Concrete Metrics    │
├───────────────────────────────────────────────────────────────────────┤
│ 5. Technical Capabilities & Systems Matrix (Categorized Filter)       │
│    - Interactive Category Filter: All | Core Languages | Systems & AI │
│      | Frontend & UI | Cloud & DevOps                                 │
│    - Visual proficiency bars + Years in production + Contextual notes │
├───────────────────────────────────────────────────────────────────────┤
│ 6. Career Timeline & Engineering Leadership Track Record              │
│    - Chronological milestone nodes with verified impact bullets       │
│    - Education (B.Sc. Communications & Electronics Engineering)       │
├───────────────────────────────────────────────────────────────────────┤
│ 7. High-Conversion Contact Dock & Terminal Footer                     │
│    - Interactive contact card with instant email copy                 │
│    - WhatsApp direct link, GitHub, LinkedIn                          │
│    - Timezone indicator (UTC+2 / UTC+3 Cairo/Gulf-ready)              │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Component Specifications

### 3.1. Floating Glassmorphic Header Dock
- **UX Goal:** Immediate brand recognition and perpetual access to the resume and contact actions regardless of scroll position.
- **Visual Design:** Ultra-thin frosted glass pill (`backdrop-filter: blur(16px)`, `background: rgba(11, 17, 30, 0.75)`), hairline border (`rgba(255, 255, 255, 0.08)`).
- **Interactive Elements:**
  - **Availability Beacon:** Pulsing emerald LED dot indicating "Open to High-Impact Opportunities".
  - **Smooth Scroll Anchors:** `#overview`, `#case-studies`, `#skills`, `#experience`.
  - **Quick Action:** `Download Resume (PDF)` with download icon.
- **Scroll Behavior:** Smoothly transitions elevation and shadow when scrolling past the hero boundary.

### 3.2. Command Hero (Above the Fold)
- **UX Goal:** Instantly communicate technical depth, eliminating generic buzzwords like "Passionate Coder" in favor of crisp engineering authority.
- **Copy Structure:**
  - *Eyebrow Badge:* "SOFTWARE ENGINEER • FULL-STACK & CORE SYSTEMS"
  - *Primary Headline:* "Architecting high-throughput distributed systems & high-performance web platforms."
  - *Supporting Narrative:* "Technical lead specializing in TypeScript, Next.js, NestJS, and PostgreSQL. Proven track record slashing query latency by 77%, engineering air-gapped AI platforms for government clients, and mentoring teams from concept to production."
  - *Action Bar:*
    - Primary CTA: `Explore Case Studies` (Smooth scroll to `#case-studies`)
    - Secondary CTA: `Download Resume` (Direct PDF access)
    - Fast Action: `amr.mohamed.dev27@gmail.com` with 1-click clipboard copy and toast alert.

### 3.3. Quantified Impact Telemetry Ticker
- **UX Goal:** Provide hard, numerical proof of commercial and technical impact immediately below the hero fold.
- **Metrics Presented:**
  1. **77% Latency Reduction** — Semantic caching & Redis indexing slashed report generation from 35s to 8s.
  2. **80% LLM Cost Reduction** — Dynamic context-chunking and schema introspection pipelines.
  3. **20+ DB Connectors** — Universal query engine spanning PostgreSQL, ClickHouse, Snowflake, and legacy DB2.
  4. **14-Day Delivery Sprint** — Zero-to-one delivery of enterprise government-integrated AI platforms.
  5. **9 Engineers Mentored** — Setting architectural standards, API contracts, and code review rituals.

### 3.4. Architectural Case Studies & Extended Showcase (The Conversion Driver)
- **UX Goal:** Demonstrate systems thinking, architectural design, trade-offs, and production engineering maturity without cognitive overload.
- **Tiered Presentation Strategy:**
  - **Tier 1: 4 Flagship Deep Dives** (`MyQuery.AI`, `Trseah AI`, `APEX eInvoicing`, `Y-Verify`):
    - **Header:** Project Name, Client, Role, Production Timeline.
    - **Quantified Badges:** High-contrast verified KPI tags.
    - **Problem Statement:** Real commercial or infrastructural bottleneck.
    - **Architectural Solution:** Specific patterns utilized (BullMQ async workers, SSE streaming, two-tier cache, air-gapped distribution, PKCS#11 HSM).
    - **Visual System Schematic:** Interactive ASCII/box architecture diagram depicting the client-to-storage data pipeline.
    - **Stack Matrix:** Precise technology pills.
  - **Tier 2: Extended Engineering Showcase** (`Asklyze`, `APEX Experts Website`, `Rewaa`, `Shahbandar Seeds`, `Helaha`, `Castle Rock Store`):
    - **Category Filters:** `All Projects`, `AI & Enterprise`, `Full-Stack Platforms`, `E-Commerce & i18n`.
    - **Responsive Grid:** High-density card preview with project logos, screenshots, badges, and quick metrics.
    - **Interactive Deep Dive Drawer/Modal:** 1-click modal overlay revealing problem/solution breakdown, ASCII schematic, and verified highlights.

### 3.5. Technical Capabilities Matrix
- **UX Goal:** Prevent "wall-of-tags" fatigue with an interactive, categorized filter.
- **Filter Categories:**
  - `All Capabilities`
  - `Languages & Core` (TypeScript, JavaScript, Python, SQL)
  - `Frameworks & Web` (React, Next.js, Node.js, NestJS, FastAPI, Tailwind CSS, Payload CMS)
  - `Data & Storage` (PostgreSQL, Redis, ClickHouse, Drizzle ORM, Prisma)
  - `Systems, AI & DevOps` (Docker, Linux, LangChain, RAG, BullMQ, Git, CI/CD)
- **Visual Design:** Monospace metadata tags, proficiency indicators, and production experience context.

### 3.6. Career & Leadership Timeline
- **UX Goal:** Showcase rapid career trajectory, technical anchor responsibilities, and leadership impact.
- **Milestones Included:**
  - *2025-05 – Present:* Software Engineer – Core Systems @ APEX Experts AI Solutions
  - *2025-07 – 2025-09:* Freelance Full-Stack Engineer @ Y-Verify Audit & Compliance
  - *2024-08 – 2025-04:* Freelance Full-Stack Engineer (HoxDEX, Shahbandar Seeds, Castle Rock)
  - *2024-06:* B.Sc. in Communications and Electronics Engineering (Alexandria University)

### 3.7. Conversion Dock & Footer
- **UX Goal:** Eliminate friction for interview scheduling or direct inquiries.
- **Contact Channels:**
  - One-click copy email button with visual confirmation.
  - WhatsApp chat link with pre-composed introduction message.
  - LinkedIn profile link.
  - GitHub repositories link.
  - Local timezone clock indicator (UTC+2 Cairo / Regional Alignment).

---

## 4. Accessibility & Quality Benchmarks (WCAG 2.2 AAA Target)

1. **Color Contrast:** Every text element must strictly satisfy minimum contrast ratios:
   - Primary text (`#F8FAFC`) on canvas (`#06090F`): **18.2:1** (Exceeds AAA requirement).
   - Secondary text (`#94A3B8`) on surface (`#0E1626`): **8.1:1** (Exceeds AAA requirement).
2. **Keyboard Navigation:** Full keyboard operability (`Tab`, `Shift+Tab`, `Enter`, `Space`) across all interactive cards, filters, and CTAs. Clear, high-contrast focus rings (`outline: 2px solid #38BDF8`, `outline-offset: 2px`).
3. **Screen Reader Architecture:**
   - Single semantic `<h1>` on the page.
   - Distinct, descriptive landmark regions (`<header>`, `<main>`, `<section aria-labelledby="...">`, `<footer>`).
   - Accessible names on all icon buttons (`aria-label="Copy email address"`).
   - Live region feedback (`aria-live="polite"`) when copying email to clipboard.
4. **Motion Accommodations:** Full support for `prefers-reduced-motion` media queries. Positional spring animations are cleanly converted to simple opacity fades.
5. **Performance Budget:**
   - Lighthouse Performance Score: 95+
   - Largest Contentful Paint (LCP): < 1.2s
   - First Input Delay / Interaction to Next Paint (INP): < 50ms
   - Cumulative Layout Shift (CLS): 0.00
