# Product Requirements Document (PRD)
## Project: High-Conversion Developer Portfolio
**Target Persona:** Software Engineer / Full-Stack Developer (Amr Mohamed)  
**Target Audience:** CTOs, VP of Engineering, Engineering Managers, and Technical Recruiters (Fast scanning, 30-second test).  
**Primary Outcome:** Convert visits into interviews, technical conversations, and high-value opportunities.

---

## 1. Core Objectives & The 30-Second Rule

Within the first 30 seconds of landing, any technical visitor must immediately understand:
1. **Who you are & Role Level:** Software Engineer / Full-Stack Developer with high-impact systems experience.
2. **Core Specialization & Stack:** TypeScript, Next.js, Node.js/NestJS, PostgreSQL, Distributed/Data Systems, AI integration.
3. **Hard Evidence of Impact:** Quantified metrics (77% latency reduction, 80% token cost reduction, 20+ database connectors, 14-day delivery sprint, 9 engineers mentored).
4. **Frictionless Action Path:** Direct resume download, one-click email copy, interactive case study inspection.

---

## 2. Information Architecture & Page Flow

The portfolio is architected as a **Single-Page Progressive Disclosure Experience** with modal/drawer deep-dives for system design case studies:

```
┌────────────────────────────────────────────────────────┐
│ 1. Floating Global Navigation (Sticky Glass Bar)       │
├────────────────────────────────────────────────────────┤
│ 2. Hero Section (Immediate Identity + Direct CTAs)     │
├────────────────────────────────────────────────────────┤
│ 3. Social Proof & Quantified Metrics Ticker            │
├────────────────────────────────────────────────────────┤
│ 4. Featured Architectural Case Studies (Deep Evidence) │
├────────────────────────────────────────────────────────┤
│ 5. Technical Capabilities Matrix (Categorized)         │
├────────────────────────────────────────────────────────┤
│ 6. Career Timeline & Engineering Leadership Record     │
├────────────────────────────────────────────────────────┤
│ 7. Conversion Contact Dock & Footer                    │
└────────────────────────────────────────────────────────┘
```

---

## 3. Section-by-Section Specifications

### Section 1: Floating Navigation Header
* **Functional Purpose:** Persistent navigation and rapid conversion access.
* **Key Components:**
  * **Brand Mark:** Monogram identity (`AM`) with subtle status ping indicator ("Available for high-impact roles").
  * **Section Anchors:** Smooth jump links (`#work`, `#architecture`, `#skills`, `#experience`).
  * **High-Priority Action:** Prominent `Resume (PDF)` download button.
  * **Behavior:** Disappears on scroll down, reappears with glassmorphic blur on scroll up.

### Section 2: Hero Section (The Hook)
* **Functional Purpose:** Instant role identification and differentiation without generic buzzwords.
* **Key Components:**
  * **Role Eyebrow / Signal:** Clean technical role definition (Sentence case, no tacky sparkles).
  * **Primary Value Headline:** Clear statement of engineering strengths (distributed backends + high-performance web apps).
  * **Supporting Synopsis:** 2-sentence narrative on shipping SaaS from zero-to-one and mentoring teams.
  * **Dual CTAs:**
    * Primary CTA: "Inspect Case Studies" (smooth scroll to architecture cards).
    * Secondary CTA: "Contact Directly" (triggers contact drawer / email copy).

### Section 3: High-Impact Metrics Ticker (Proof-First Bar)
* **Functional Purpose:** Instant social proof anchoring credibility before reading prose.
* **Key Components:**
  * 5 discrete KPI cards displaying quantified wins:
    * `77% Latency Cut` (Query report reduction from 35s to 8s).
    * `80% Token Cost Reduction` (Context chunking and caching).
    * `20+ DB Connectors` (Universal dialect engine).
    * `14-Day Delivery` (Saudi Etimad AI tender platform from scratch).
    * `9 Engineers Mentored` (Architecture reviews, API specs).

### Section 4: Deep-Dive Architectural Case Studies (The Core Differentiator)
* **Functional Purpose:** Prove solid architectural reasoning, practical trade-off analysis, and system execution.
* **Structure for Each Case Study:**
  1. **Header & Context:** Client/product, role, tech stack chips.
  2. **The Challenge:** Real-world constraint (concurrency bottleneck, strict compliance, tight timeline).
  3. **The Solution & Trade-offs:** Exact engineering strategies implemented.
  4. **Interactive Architecture Blueprint:** Visual interactive node/flow diagram (rendering data flows, cache hits/misses, worker queues).
  5. **Quantified Outcomes:** Measured performance and business impact.
  6. **Live Action:** Link to live product / demo or expandable modal for technical schema details.

### Section 5: Technical Capabilities Matrix
* **Functional Purpose:** Replace boring progress bars with scannable, categorized technology competencies.
* **Categories:**
  * **Core Languages & Runtimes:** TypeScript, Node.js, Python, SQL.
  * **Frontend Engineering:** Next.js (App Router), React, Tailwind CSS, State & Cache.
  * **Backend & Distributed Systems:** NestJS, FastAPI, BullMQ, Redis, PostgreSQL, ClickHouse, Docker.
  * **AI Engineering & Workflows:** LangChain, Vector Embeddings, Semantic Caching, RAG, Ollama.

### Section 6: Career Milestones & Leadership Journey
* **Functional Purpose:** Show chronological growth from engineering foundation to technical lead guiding teams.
* **Key Components:**
  * Interactive vertical timeline showing roles at APEX Experts AI, Y-Verify, Freelance, and Engineering degree.
  * Tagged by scope: Architecture, Leadership, Enterprise On-Premise, Rapid PoC.

### Section 7: Conversion Contact Dock & Footer
* **Functional Purpose:** Zero-friction conversion for busy recruiters and hiring managers, offering multi-channel contact options without UI clutter or phone scraping vulnerabilities.
* **Key Components:**
  * **Primary:** One-click "Copy Email" with instant toast confirmation (`amr...`).
  * **Direct Chat (WhatsApp):** Dedicated `Chat on WhatsApp` action using pre-filled URL scheme (`https://wa.me/<number>?text=Hi%20Amr,%20I%20reviewed%20your%20portfolio...`), eliminating raw plain-text phone scraping while providing high-conversion instant messaging for regional/MENA founders and recruiters.
  * **Professional Network:** Direct verified links to LinkedIn and GitHub.
  * **Availability & Timezone:** Time zone indicator ("Cairo / UTC+3, available for global remote & relocation").
  * **Clean Footer Badge:** Minimal copyright & tech stack indicator ("Built with Next.js, Framer Motion & Tailwind").

---

## 4. Non-Functional Requirements
1. **Performance:** Sub-1s Largest Contentful Paint (LCP); 95+ score on mobile and desktop Lighthouse.
2. **SEO & Meta OpenGraph:** Rich preview cards when shared on LinkedIn, WhatsApp, X, and Slack.
3. **Accessibility (a11y):** Keyboard navigable throughout; WCAG AA color contrast; `prefers-reduced-motion` compliance.
4. **Zero Layout Shifts:** Explicit image aspect ratios and smooth layout animations.
