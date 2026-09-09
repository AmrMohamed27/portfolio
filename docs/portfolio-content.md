# Portfolio Content & System Architecture Blueprints
## Professional Narrative & Verifiable Case Studies
**Persona:** Amr Mohamed — Full-Stack & Core Systems Software Engineer  
**Contact:** `amr.mohamed.dev27@gmail.com` | WhatsApp: `+201026046755` | [LinkedIn](https://linkedin.com/in/amr-mohamed-07615024b) | [GitHub](https://github.com/amr-mohamed27)  
**Location / Availability:** Cairo / Remote Global & Gulf (UTC+2 / UTC+3) — Immediate Availability

---

## 1. Executive Headline & Value Proposition

### Primary Headline
**Amr Mohamed — Full-Stack & Core Systems Software Engineer**

### Value Proposition Thesis
> Technical anchor bridging high-throughput distributed backends with high-performance web applications. Specializing in TypeScript, Next.js, NestJS, and PostgreSQL. Proven track record slashing query latency by 77%, engineering air-gapped AI platforms for government clients, and mentoring engineering teams from concept to production.

---

## 2. Hard-Evidence Telemetry (The Social Proof Ticker)

```
┌─────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Metric Figure   │ Verifiable Technical Context                                           │
├─────────────────┼────────────────────────────────────────────────────────────────────────┤
│ 77% Latency ↓   │ Slashed report generation from 35s to 8s via two-tier semantic caching │
│ 80% Cost ↓      │ Cut enterprise LLM token overhead via dynamic context chunking         │
│ 20+ DB Engines  │ Engineered universal connector gateway (Postgres, ClickHouse, DB2)     │
│ 14-Day Delivery │ Shipped zero-to-one production AI platform with Etimad API integration │
│ 9 Engineers     │ Guided team across architectural standards, API contracts & reviews    │
└─────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Flagship Architectural Case Studies

---

### Case Study 1: MyQuery.AI (Cloud & On-Premise Enterprise Edition)
- **Role:** Core Full-Stack Architect
- **Product:** Natural-language to multi-dialect SQL enterprise analytics platform
- **Stack:** Next.js, TypeScript, NestJS, PostgreSQL, Redis, ClickHouse, Snowflake, Docker, GCP
- **Scale:** 200+ active enterprise users, deployed air-gapped to UAE government entity.

#### The Problem & Bottleneck
Enterprise users running queries against high-volume databases experienced severe report generation latency (35–45 seconds per report). Redundant natural-language queries caused massive LLM token waste by re-submitting complete database schemas repeatedly, driving up cloud inference costs and exhausting connection pools.

#### The Architectural Solution
1. **Two-Tier Semantic Caching Layer:** Architected a hybrid Redis cache. Exact query hashes resolve in `<10ms`, while semantic vector embeddings evaluate query similarity before invoking the LLM or database cluster.
2. **Dynamic Schema Introspection & Context Chunking:** Engineered an intelligent DDL parser that inspects and injects only relevant table relations into the LLM prompt rather than whole-database schemas, cutting token payload size by 80%.
3. **Decoupled Asynchronous Workers:** Shifted execution to BullMQ queue workers with real-time SSE (Server-Sent Events) streaming progress indicators directly to the Next.js frontend.
4. **Air-Gapped Government Edition:** Packaged the entire platform for on-premise UAE government deployment with local LLMs, BGE-M3 embeddings, Whisper STT, and an offline cryptographic asymmetric license validator.

#### System Architecture Schematic
```
[ Next.js Client Dashboard ]
         │ (SSE / Real-time Progress Stream)
         ▼
[ NestJS API Gateway ] ────────── (Exact Hit: <10ms) ────────► [ Redis Cache ]
         │
    (Cache Miss)
         ▼
[ Context-Chunking Pipeline ] ──► [ Semantic Vector Index ] ──► [ BGE-M3 / LLM ]
         │
         ▼
[ BullMQ Execution Queue ] ────► [ Connection Pooler ]
                                         │
                   ┌─────────────────────┼─────────────────────┐
                   ▼                     ▼                     ▼
            [ PostgreSQL ]        [ ClickHouse ]        [ Snowflake / DB2 ]
```

---

### Case Study 2: Trseah AI Proposal Studio
- **Role:** Lead Full-Stack Architect
- **Product:** Saudi Government tender bidding & technical proposal generation platform
- **Stack:** Next.js, NestJS, FastAPI, Python, LangChain, PostgreSQL, Docker
- **Impact:** 14-day zero-to-one delivery sprint; automated RFP ingestion and Etimad API integration.

#### The Problem & Bottleneck
Navigating Saudi government Etimad tenders required manual parsing of hundreds of pages of complex RFPs, tender conditions, and bill-of-quantities, creating high turnaround delays and manual bidding errors for enterprise contractors.

#### The Architectural Solution
1. **Multi-Document PDF RAG Pipeline:** Built a chunking and vector indexing engine capable of parsing Arabic/English tender documents and specifications.
2. **Etimad API Integration:** Connected directly with Saudi government tender endpoints to ingest tender announcements in real time.
3. **Interactive AI Proposal Studio:** Developed a Next.js interactive editor allowing bidding engineers to review, adjust, and generate formatted PDF technical proposals with one click.
4. **Rapid Zero-to-One Sprint:** Delivered the entire production-grade platform end-to-end within a tight 14-day client milestone.

#### System Architecture Schematic
```
[ Etimad Government API ] ──► [ Ingestion Worker ] ──► [ Multi-Doc PDF Parser ]
                                                               │
                                                               ▼
[ Next.js Proposal Studio ] ◄── [ FastAPI / LangChain ] ◄── [ Vector Chunks ]
             │
             ▼
[ Client Review & 1-Click PDF Export ]
```

---

### Case Study 3: APEX eInvoicing Integration Platform
- **Role:** Lead Systems Architect
- **Product:** Enterprise ERP-to-Government tax compliance middleware
- **Stack:** NestJS, TypeScript, PostgreSQL, Drizzle ORM, BullMQ, Redis, PKCS#11 HSM, Docker
- **Impact:** Full Egyptian Tax Authority (ETA) compliance; zero data loss across millions in transactional volume.

#### The Problem & Bottleneck
Legacy ERP systems (SAP, Oracle, Microsoft Dynamics) lacked native mechanisms to sign, validate, and submit invoices according to strict Egyptian Tax Authority (ETA) cryptographic formatting requirements, causing submission rejections and penalty risks.

#### The Architectural Solution
1. **Hardware Cryptographic Signing:** Integrated PKCS#11 hardware security modules (HSM) and USB tokens for real-time digital document signing.
2. **Document Canonicalization:** Implemented strict schema transformation and SHA-256 hash chaining to ensure tamper-proof invoice structures.
3. **Idempotent Asynchronous Retry Engine:** Built a resilient BullMQ and Redis queue handling network failures and ETA rate limits with zero invoice drops.

---

### Case Study 4: Y-Verify Field Audit & Compliance
- **Role:** Freelance Full-Stack Engineer
- **Product:** AI-assisted field audit and compliance management system
- **Stack:** Next.js, Node.js, PostgreSQL, Google Maps APIs, RBAC
- **Scale:** 500+ distributed field operators conducting real-time site compliance audits.

#### The Architectural Solution
- Integrated Google Maps Geolocation verification to validate operator presence at audit coordinates.
- Designed dynamic, schema-driven audit questionnaires with offline draft caching.
- Enforced strict role-based access control (RBAC) across auditors, supervisors, and compliance directors.

---

## 4. Technical Capabilities Matrix

```typescript
export const technicalCapabilities = [
  // Core Languages
  { name: "TypeScript", category: "languages", proficiency: 95, exp: "3+ yrs", note: "Strict type safety & AST tooling" },
  { name: "JavaScript (ESNext)", category: "languages", proficiency: 95, exp: "3+ yrs", note: "Async runtimes & event loops" },
  { name: "Python", category: "languages", proficiency: 88, exp: "2+ yrs", note: "Data pipelines & AI integrations" },
  { name: "SQL", category: "languages", proficiency: 92, exp: "3+ yrs", note: "Complex joins, indexing & CTEs" },

  // Frameworks & Web
  { name: "Next.js (App Router)", category: "web", proficiency: 95, exp: "3+ yrs", note: "Server components & streaming" },
  { name: "React 19", category: "web", proficiency: 95, exp: "3+ yrs", note: "Hooks, state machines & accessible UI" },
  { name: "NestJS", category: "web", proficiency: 92, exp: "2+ yrs", note: "Microservices & enterprise architecture" },
  { name: "Node.js", category: "web", proficiency: 92, exp: "3+ yrs", note: "High-concurrency event-driven APIs" },
  { name: "FastAPI", category: "web", proficiency: 88, exp: "2+ yrs", note: "Asynchronous Python REST backends" },
  { name: "Tailwind CSS v4", category: "web", proficiency: 95, exp: "3+ yrs", note: "Modern design token architectures" },

  // Databases & Storage
  { name: "PostgreSQL", category: "data", proficiency: 92, exp: "3+ yrs", note: "Connection pooling & schema design" },
  { name: "Redis", category: "data", proficiency: 90, exp: "3+ yrs", note: "Semantic caching & pub/sub channels" },
  { name: "ClickHouse", category: "data", proficiency: 85, exp: "1+ yrs", note: "Analytical columnar query engine" },
  { name: "Drizzle / Prisma ORM", category: "data", proficiency: 92, exp: "2+ yrs", note: "Type-safe database migrations" },

  // Systems, AI & DevOps
  { name: "Docker & Containers", category: "systems", proficiency: 90, exp: "2+ yrs", note: "Multi-stage builds & containerization" },
  { name: "LangChain & RAG", category: "systems", proficiency: 90, exp: "2+ yrs", note: "Vector embeddings & context chunking" },
  { name: "BullMQ & Queues", category: "systems", proficiency: 90, exp: "2+ yrs", note: "Reliable background job orchestration" },
  { name: "Linux & CI/CD", category: "systems", proficiency: 88, exp: "2+ yrs", note: "GitHub Actions & automated deployments" }
];
```

---

## 5. Career & Engineering Leadership Record

### Software Engineer – Core Systems @ APEX Experts AI Solutions
*May 2025 – Present | Full-Time | Core Technical Anchor*
- Guiding 9 engineers across flagship enterprise products (MyQuery.AI, Asklyze, APEX eInvoicing).
- Architected air-gapped on-premise AI platform deployed to a UAE government client with offline cryptographic validation.
- Engineered two-tier semantic caching layer cutting query latency by 77% (35s -> 8s) and LLM costs by 80%.
- Integrated universal database introspector spanning 20+ SQL and NoSQL engines.

### Freelance Full-Stack Engineer @ Y-Verify Audit & Compliance
*July 2025 – September 2025 | Contract*
- Built field audit web platform supporting 500+ operators with Google Maps geolocation verification and dynamic schema-driven audit flows.

### Freelance Full-Stack Engineer (HoxDEX, Shahbandar Seeds, Castle Rock)
*August 2024 – April 2025 | Global & Regional Clients*
- Delivered high-performance web platforms, Redis caching layers, and bilingual RTL/LTR internationalization.

### B.Sc. in Communications and Electronics Engineering
*Graduated June 2024 | Alexandria University, Faculty of Engineering*
- Strong foundational training in computing systems, signal processing, networks, algorithms, and mathematics.
