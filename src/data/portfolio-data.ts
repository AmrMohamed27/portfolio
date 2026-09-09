export interface ProjectMedia {
  thumbnail?: string;
  screenshots?: string[];
  video?: string;
  logo?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface MetricTelemetry {
  id: string;
  value: string;
  label: string;
  description: string;
  detail?: string;
  tag?: string;
  highlight?: boolean;
  project?: {
    name: string;
    href?: string;
  };
}

export interface ArchitectureNode {
  step: string;
  component: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  client: string;
  role: string;
  timeline: string;
  badge?: string;
  summary: string;
  metrics: string[];
  problem: string[];
  solution: string[];
  architectureDiagramAscii: string;
  architectureFlow?: ArchitectureNode[];
  techStack: string[];
  media: ProjectMedia;
}

export interface SkillItem {
  name: string;
  category: "languages" | "web" | "data" | "systems";
  proficiency: number;
  experience: string;
  note: string;
}

export interface TimelineMilestone {
  period: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time Anchor" | "Contract / Freelance" | "Academic Milestone";
  description: string;
  impacts: string[];
  tags: string[];
  logo?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  availability: {
    status: "Available for high-impact roles";
    beaconActive: boolean;
    location: "Alexandria, Egypt (Remote / Relocation)";
    timezone: "UTC+2 / UTC+3 (Egypt & Gulf Aligned)";
  };
  contact: {
    email: string;
    phone: string;
    whatsappUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    resumePdfUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Amr Mohamed",
  title: "Amr Mohamed | Software Engineer (Full-Stack & Systems)",
  headline:
    "Building high-performance web platforms and reliable backend systems.",
  subheadline:
    "Software Engineer experienced in fast-paced, high-stakes startup environments. Working closely alongside founders, I've owned products end-to-end—from backend architectures and database performance to responsive frontends and DevOps pipelines—building production platforms from the ground up.",
  availability: {
    status: "Available for high-impact roles",
    beaconActive: true,
    location: "Alexandria, Egypt (Remote / Relocation)",
    timezone: "UTC+2 / UTC+3 (Egypt & Gulf Aligned)",
  },
  contact: {
    email: "amrmohamed2766@gmail.com",
    phone: "+201281618964",
    whatsappUrl:
      "https://wa.me/201281618964?text=Hi%20Amr%2C%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect%21",
    linkedinUrl: "https://www.linkedin.com/in/amr-mohamed-07615024b",
    githubUrl: "https://github.com/amr-mohamed27",
    resumePdfUrl: "/resume.pdf",
  },
};

export const telemetryMetrics: MetricTelemetry[] = [
  {
    id: "latency",
    value: "-77%",
    label: "Query Latency Reduction",
    description: "Slashed analytical report generation from 35s down to 8s.",
    detail: "Implemented a two-tier semantic caching pipeline with Redis & PostgreSQL indexing, eliminating redundant database round-trips for repeated analytical queries.",
    tag: "Performance Engineering",
    highlight: true,
    project: {
      name: "MyQuery.AI",
      href: "#case-studies",
    },
  },
  {
    id: "cost",
    value: "-80%",
    label: "LLM Token Cost Cut",
    description: "Drastically lowered API overhead through schema chunking.",
    detail: "Replaced naive schema dump prompt injections with dynamic DDL introspection and selective table context extraction, reducing token load per prompt by 80%.",
    tag: "AI Architecture",
    highlight: true,
    project: {
      name: "MyQuery.AI",
      href: "#case-studies",
    },
  },
  {
    id: "connectors",
    value: "20+",
    label: "Database Engines Supported",
    description: "Unified data access layer across diverse enterprise storage systems.",
    detail: "Engineered a pluggable connector gateway capable of introspecting and querying SQL, ClickHouse, Snowflake, and legacy ERP data stores via a single unified API.",
    tag: "Core Systems",
    highlight: false,
    project: {
      name: "MyQuery.AI",
      href: "#case-studies",
    },
  },
  {
    id: "speed",
    value: "14 Days",
    label: "Zero-to-One Delivery Sprint",
    description: "Delivered production AI tender platform with Saudi Etimad integration.",
    detail: "Owned full lifecycle from database modeling to responsive UI and reverse-engineered government procurement endpoints, taking the product from concept to active commercial demo in two weeks.",
    tag: "Product Ownership",
    highlight: false,
    project: {
      name: "Trseah AI",
      href: "#case-studies",
    },
  },
  {
    id: "leadership",
    value: "9",
    label: "Engineers Mentored",
    description: "Guided engineering practices and architectural standards across teams.",
    detail: "Led code reviews, established strict TypeScript contracts and error handling conventions, and guided junior engineers on asynchronous queues and Dockerized deployments.",
    tag: "Team Leadership",
    highlight: false,
    project: {
      name: "APEX Experts",
      href: "#experience",
    },
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "myquery",
    title: "MyQuery.AI Core Platform",
    slug: "myquery-ai",
    subtitle: "Enterprise Data Engine & Air-Gapped UAE Government AI Edition",
    client: "APEX Experts AI Solutions (UAE Government Deployment)",
    role: "Core Full-Stack Architect",
    timeline: "2025 – Present",
    badge: "Air-Gapped & Enterprise",
    summary:
      "Enterprise analytics platform translating natural language to multi-dialect SQL with live streaming dashboards, universal database introspection, and an air-gapped on-premise edition bundling local LLMs and offline cryptographic validation.",
    metrics: [
      "77% Query Latency Drop (35s → 8s)",
      "80% LLM Token Cost Reduction",
      "Deployed Air-Gapped to UAE Gov Entity",
      "20+ Database Engines Supported",
      "200+ Active Enterprise Users",
    ],
    problem: [
      "Enterprise clients connecting high-volume analytics databases experienced heavy report generation bottlenecks taking 35–45 seconds per query.",
      "Redundant natural language queries caused high LLM token waste by re-submitting complete database schemas repeatedly.",
      "Strict government compliance required zero internet egress: the platform had to run fully air-gapped on-premise with offline cryptographic license validation.",
    ],
    solution: [
      "Architected a two-tier Redis semantic cache where exact queries resolve in sub-10ms memory fetches and semantic vector hashes evaluate query similarity before invoking the LLM.",
      "Engineered dynamic schema introspection that injects only relevant table relations into prompts rather than whole-database DDLs, slashing token payload by 80%.",
      "Decoupled heavy query executions to BullMQ background workers with Server-Sent Events (SSE) streaming live progress to the Next.js frontend.",
      "Packaged an air-gapped container distribution bundling local LLMs, BGE-M3 embeddings, Whisper STT, and asymmetric offline licensing.",
    ],
    architectureDiagramAscii: `[ Next.js Client Dashboard ]
         │ (SSE / Real-time Progress Stream)
         ▼
[ NestJS API Gateway ] ──────── (Cache Hit: <10ms) ────────► [ Redis Cache ]
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
            [ PostgreSQL ]        [ ClickHouse ]        [ Snowflake / DB2 ]`,
    architectureFlow: [
      {
        step: "01",
        component: "Client Interaction",
        detail:
          "Natural language query input streamed via Next.js with optimistic UI.",
      },
      {
        step: "02",
        component: "Two-Tier Cache",
        detail:
          "Exact hash lookup in Redis (<10ms) followed by semantic vector similarity evaluation.",
      },
      {
        step: "03",
        component: "Context Chunking",
        detail:
          "Schema AST parser extracts only active foreign key relations into prompt payload.",
      },
      {
        step: "04",
        component: "Async Worker Pool",
        detail:
          "BullMQ queue routes execution across 20+ dialect-specific connectors with SSE progress updates.",
      },
    ],
    techStack: [
      "Next.js 16",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "ClickHouse",
      "Snowflake",
      "Docker",
      "BullMQ",
      "GCP",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/MyQuery/Hero.png",
      screenshots: ["/images/projects/screenshots/MyQuery/Hero.png"],
      video: "/videos/MyQuery.mp4",
      logo: "/images/projects/logos/MyQuery.svg",
    },
  },
  {
    id: "trseah",
    title: "Trseah AI Proposal Studio",
    slug: "trseah-ai",
    subtitle:
      "Saudi Etimad Government Tender Ingestion & Automated Proposal Generator",
    client: "Saudi Enterprise Contractor Ecosystem",
    role: "Lead Full-Stack Architect",
    timeline: "2025 (14-Day Delivery Sprint)",
    badge: "14-Day Sprint Delivery",
    summary:
      "Enterprise tender bidding and technical proposal platform integrated with Saudi government Etimad API, multi-document PDF RAG parsing, and an interactive proposal studio.",
    metrics: [
      "14-Day Zero-to-One Delivery Sprint",
      "Saudi Etimad Government API Integration",
      "Multi-Document Arabic/English PDF RAG",
      "Instant Automated Proposal Generation",
    ],
    problem: [
      "Enterprise contractors spent days manually reviewing massive RFPs, condition books, and bill-of-quantities across Saudi government tenders.",
      "Manual proposal authoring caused missed submission deadlines, inconsistent technical compliance, and high operational overhead.",
    ],
    solution: [
      "Engineered an automated ingestion worker directly integrating Saudi Etimad government API endpoints for real-time tender feeds.",
      "Built a specialized PDF RAG pipeline combining Arabic/English text extraction, semantic chunking, and requirement compliance mapping.",
      "Constructed a high-productivity Next.js Proposal Studio allowing engineers to edit, refine, and compile ready-to-submit proposals with live PDF export.",
      "Delivered the complete full-stack architecture from zero to production launch in a 14-day execution cycle.",
    ],
    architectureDiagramAscii: `[ Etimad Government API ] ──► [ Ingestion Worker ] ──► [ Multi-Doc PDF Parser ]
                                                               │
                                                               ▼
[ Next.js Proposal Studio ] ◄── [ FastAPI / LangChain ] ◄── [ Vector Chunks ]
             │
             ▼
[ Client Review & 1-Click PDF Export ]`,
    architectureFlow: [
      {
        step: "01",
        component: "API Ingestion",
        detail:
          "Automated webhook and polling pipeline syncs Etimad tender notices and RFPs.",
      },
      {
        step: "02",
        component: "Multi-Doc Parser",
        detail:
          "Extracts Arabic/English condition books and tables of quantities into semantic vectors.",
      },
      {
        step: "03",
        component: "LangChain Studio",
        detail:
          "Generates tailored technical methodology and compliance matrices based on tender specs.",
      },
      {
        step: "04",
        component: "Interactive Studio",
        detail:
          "Next.js rich editor gives bid managers real-time review and formatted PDF generation.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "FastAPI",
      "Python",
      "LangChain",
      "PostgreSQL",
      "Docker",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/Trseah/Proposal_Studio.png",
      screenshots: [
        "/images/projects/screenshots/Trseah/Proposal_Studio.png",
        "/images/projects/screenshots/Trseah/Proposal_Studio_preview.png",
        "/images/projects/screenshots/Trseah/Tenders_List.png",
      ],
      logo: "/images/projects/logos/Trseah.png",
    },
  },
  {
    id: "apex-einvoicing",
    title: "APEX eInvoicing Integration Engine",
    slug: "apex-einvoicing",
    subtitle:
      "Enterprise ERP Middleware with PKCS#11 Hardware Security Module Signing",
    client: "APEX Experts & Egyptian Tax Authority (ETA) Compliance",
    role: "Lead Systems Architect",
    timeline: "2025",
    badge: "Government Compliant Middleware",
    summary:
      "Enterprise integration engine designed to connect legacy ERPs (SAP, Oracle, Microsoft Dynamics) with Egyptian Tax Authority (ETA) APIs featuring PKCS#11 hardware token signing and asynchronous retry queues.",
    metrics: [
      "Full Egyptian Tax Authority (ETA) Compliance",
      "Zero Data Loss Across High Transaction Volumes",
      "PKCS#11 USB/HSM Hardware Cryptographic Signing",
      "Multi-Tenant Isolation with Zero Data Leakage",
    ],
    problem: [
      "Legacy enterprise ERPs lacked native capabilities to sign, validate, and serialize invoices to meet mandatory ETA JSON/XML cryptographic requirements.",
      "Network instability and strict government rate limits caused submission drops, exposing enterprise clients to severe non-compliance penalties.",
    ],
    solution: [
      "Implemented a native PKCS#11 hardware token interface supporting USB tokens and network HSMs for real-time cryptographic digital signing.",
      "Engineered a canonicalization pipeline enforcing strict schema transformation, UUID generation, and SHA-256 hash chaining.",
      "Built a resilient BullMQ asynchronous queue with exponential backoff and dead-letter queues to guarantee idempotent submissions with zero drop-off.",
    ],
    architectureDiagramAscii: `[ Enterprise ERPs (SAP / Oracle) ]
                │ (JSON / Webhooks)
                ▼
[ NestJS Ingestion Engine ] ──► [ Schema Validation & Canonicalization ]
                │
                ▼
[ PKCS#11 HSM / USB Token ] ──► (Hardware Digital Signing & SHA-256 Chaining)
                │
                ▼
[ BullMQ Resilient Queue ] ──► (Rate-limited Submission & Exponential Retries)
                │
                ▼
[ Egyptian Tax Authority (ETA) Gateway ]`,
    architectureFlow: [
      {
        step: "01",
        component: "ERP Ingestion",
        detail:
          "Receives raw invoice payloads via authenticated REST webhooks.",
      },
      {
        step: "02",
        component: "Canonicalization",
        detail:
          "Normalizes data into standard government schema and computes document hash.",
      },
      {
        step: "03",
        component: "Hardware Signing",
        detail:
          "Interfaces with physical PKCS#11 USB/HSM tokens for cryptographic digital signatures.",
      },
      {
        step: "04",
        component: "Queue Submission",
        detail:
          "BullMQ queue dispatches signed payloads to ETA API with automated retry resilience.",
      },
    ],
    techStack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "BullMQ",
      "Redis",
      "PKCS#11 HSM",
      "Docker",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/MyQuery/Hero.png", // Graceful fallback handled by visual architecture view
      logo: "/images/projects/logos/APEX_Experts.svg",
    },
  },
  {
    id: "y-verify",
    title: "Y-Verify Field Audit & Compliance",
    slug: "y-verify",
    subtitle:
      "AI-Assisted Field Audit Web Platform with Geolocation Verification",
    client: "Y-Verify Audit & Compliance",
    role: "Freelance Full-Stack Engineer",
    timeline: "2025",
    badge: "500+ Distributed Operators",
    summary:
      "Enterprise audit platform supporting 500+ field operators with Google Maps geolocation verification, dynamic schema-driven audit questionnaires, and strict role-based access control.",
    metrics: [
      "500+ Field Operators Supported",
      "Google Maps Geofence Verification",
      "Dynamic Schema-Driven Form Generation",
      "Offline-First Audit Draft Caching",
    ],
    problem: [
      "Field compliance inspectors faced difficulty recording inspections in remote sites with spotty network coverage, leading to lost audit logs.",
      "Auditing firms lacked proof of physical presence at the specified inspection premises.",
    ],
    solution: [
      "Integrated Google Maps Geolocation verification to enforce and log physical auditor coordinates at the exact moment of inspection submission.",
      "Designed dynamic, schema-driven audit questionnaires rendered dynamically with client-side offline draft saving.",
      "Constructed a role-based dashboard for supervisors to review audit submissions, inspect geofence validations, and track compliance metrics.",
    ],
    architectureDiagramAscii: `[ Field Operator Mobile Web ]
            │ (Offline Draft Cache & GPS Geofence)
            ▼
[ Google Maps Verification API ] ──► (Coordinate Validation Check)
            │
            ▼
[ Node.js / Express API ] ────────► [ Dynamic Schema Engine ]
            │
            ▼
[ PostgreSQL Database ] ──────────► [ Supervisor Live Dashboard ]`,
    architectureFlow: [
      {
        step: "01",
        component: "GPS Verification",
        detail:
          "Browser Geolocation coordinates verified against client premises boundaries.",
      },
      {
        step: "02",
        component: "Dynamic Questionnaire",
        detail:
          "Form fields rendered from JSON schemas with client-side offline storage.",
      },
      {
        step: "03",
        component: "Audit Submission",
        detail:
          "Inspection evidence and media uploaded with cryptographic timestamping.",
      },
      {
        step: "04",
        component: "Supervisor Review",
        detail:
          "Live dashboard with status tracking, audit approval flows, and exportable reports.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Google Maps APIs",
      "Tailwind CSS",
      "Docker",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/Y-verify/Hero.png",
      screenshots: [
        "/images/projects/screenshots/Y-verify/Hero.png",
        "/images/projects/screenshots/Y-verify/Dashboard.png",
      ],
      logo: "/images/projects/logos/Y-Verify.png",
    },
  },
  {
    id: "asklyze",
    title: "Asklyze Conversational Analytics",
    slug: "asklyze",
    subtitle: "AI Business Intelligence & Natural Language Knowledge Retrieval",
    client: "APEX Experts AI Solutions",
    role: "Software Engineer – Core Systems",
    timeline: "2025",
    badge: "AI Analytics",
    summary:
      "Conversational BI platform enabling non-technical stakeholders to query internal databases and knowledge bases using conversational natural language with multi-modal responses.",
    metrics: [
      "Sub-Second Intent Resolution",
      "Enterprise Multi-Tenant Security",
      "Context-Aware Follow-Up Queries",
    ],
    problem: [
      "Business executives faced steep delays waiting for BI and data engineering teams to write ad-hoc SQL reports for routine operational questions.",
    ],
    solution: [
      "Engineered natural-language intent recognition and conversational context tracking for iterative business questions.",
      "Integrated secure read-only SQL generation with strict role-level data access constraints.",
    ],
    architectureDiagramAscii: `[ Executive User Interface ] ──► [ NL Intent Recognition ] ──► [ RAG Context Engine ]
                                                                        │
                                                                        ▼
[ Live Visualizations & Insights ] ◄── [ Sanitized SQL Execution ] ◄── [ Query Compiler ]`,
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "LangChain",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/Asklyze/Hero.png",
      screenshots: ["/images/projects/screenshots/Asklyze/Hero.png"],
      logo: "/images/projects/logos/Asklyze.svg",
    },
  },
  {
    id: "rewaa",
    title: "Rewaa Education Management",
    slug: "rewaa",
    subtitle: "Multi-Tenant Learning Center & Booking Platform",
    client: "Regional Educational Centers",
    role: "Full-Stack Architect",
    timeline: "2024 – 2025",
    badge: "Multi-Tenant Platform",
    summary:
      "Multi-tenant learning center and course management platform with automated scheduling, transaction-safe booking, and automated zero-downtime CI/CD deployment.",
    metrics: [
      "Concurrency-Safe Schedule Booking",
      "Multi-Tenant Tenant Isolation",
      "Zero-Downtime Docker CI/CD",
    ],
    problem: [
      "Learning centers experienced frequent double-booking conflicts and high administrative burden tracking student schedules manually.",
    ],
    solution: [
      "Built concurrency-safe schedule reservation avoiding race conditions using database transactions.",
      "Implemented a clean, multi-tenant administrative portal and automated deployment on Dockerized VPS.",
    ],
    architectureDiagramAscii: `[ Student Booking App ] ──► [ Transaction Lock ] ──► [ PostgreSQL ]
                                                                │
[ Admin Portal ] ◄────── [ Docker VPS Container ] ◄─────────────┘`,
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
    media: {
      thumbnail: "/images/projects/screenshots/Rewaa/Dashboard.png",
      screenshots: ["/images/projects/screenshots/Rewaa/Dashboard.png"],
      logo: "/images/projects/logos/Rewaa.svg",
    },
  },
  {
    id: "shahbandar",
    title: "Shahbandar Seeds Commerce Platform",
    slug: "shahbandar-seeds",
    subtitle:
      "High-Performance Regional Agricultural E-Commerce & Distribution Engine",
    client: "Shahbandar Agricultural Group",
    role: "Lead Freelance Full-Stack Engineer",
    timeline: "2024 – 2025",
    badge: "E-Commerce & i18n",
    summary:
      "Full-stack agricultural seed commerce and distribution management web platform featuring bidirectional Arabic/English internationalization, Redis caching, and fast catalog search.",
    metrics: [
      "Sub-100ms Catalog Page Loads",
      "Full Bidirectional Arabic (RTL) & English (LTR) i18n",
      "Redis Caching Layer for Fast Inventory Lookup",
    ],
    problem: [
      "Agricultural distributors needed a responsive, dual-language platform capable of handling complex wholesale product catalogs, high-concurrency order surges, and regional logistics tracking.",
    ],
    solution: [
      "Engineered high-performance Next.js application with Redis caching layer for rapid product indexing and inventory queries.",
      "Implemented seamless RTL/LTR layout transitions and localized typography tailored for Arabic agricultural commerce.",
      "Configured automated zero-downtime CI/CD pipeline on Dockerized VPS infrastructure.",
    ],
    architectureDiagramAscii: `[ Regional Buyers / Farmers ] ──► [ Next.js RTL/LTR Frontend ]
                                            │
                                            ▼
[ Edge CDN & Redis Cache ] ◄──► [ Node.js API Service ] ──► [ PostgreSQL Database ]`,
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "Docker",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/Shahbandar/Hero.png",
      screenshots: ["/images/projects/screenshots/Shahbandar/Hero.png"],
      logo: "/images/projects/logos/Shahbandar.png",
    },
  },
  {
    id: "helaha",
    title: "Helaha AI Math & Education Studio",
    slug: "helaha-ai",
    subtitle:
      "Interactive AI Math Problem Solving & Step-by-Step Educational Platform",
    client: "Helaha EdTech",
    role: "Full-Stack Software Engineer",
    timeline: "2025",
    badge: "EdTech & AI",
    summary:
      "Interactive mathematical reasoning platform combining AI problem-solving, LaTeX rendering, step-by-step pedagogical explanations, and PDF result exports.",
    metrics: [
      "Interactive Step-by-Step AI Solutions",
      "Dynamic LaTeX Formula Rendering",
      "Exportable Solution Reports & PDF Generator",
    ],
    problem: [
      "Students and educators struggled with generic AI chat outputs that failed to format complex mathematical equations accurately or provide structured pedagogical steps.",
    ],
    solution: [
      "Built dynamic mathematical formula rendering using LaTeX / KaTeX with interactive step-by-step guidance.",
      "Constructed a clean, high-density dashboard for practice tests, homework generation, and automated PDF export.",
    ],
    architectureDiagramAscii: `[ Student Input / Camera Upload ] ──► [ AI Math Parsing Engine ]
                                                 │
                                                 ▼
[ Step-by-Step LaTeX Visualizer ] ◄── [ Structured Reasoning Pipeline ]
               │
               ▼
[ 1-Click PDF Report Export ]`,
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python / FastAPI",
      "LaTeX / KaTeX",
      "PostgreSQL",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/Helaha/Dashboard.png",
      screenshots: ["/images/projects/screenshots/Helaha/Dashboard.png"],
      logo: "/images/projects/logos/Helaha.png",
    },
  },
];

export const technicalCapabilities: SkillItem[] = [
  // Languages & Core
  {
    name: "TypeScript",
    category: "languages",
    proficiency: 95,
    experience: "3+ yrs",
    note: "Strict type safety, generics & AST tooling",
  },
  {
    name: "JavaScript (ESNext)",
    category: "languages",
    proficiency: 95,
    experience: "3+ yrs",
    note: "Async runtimes, event loops & Node internals",
  },
  {
    name: "SQL",
    category: "languages",
    proficiency: 92,
    experience: "3+ yrs",
    note: "Complex joins, indexing, CTEs & multi-dialect SQL",
  },
  {
    name: "Python",
    category: "languages",
    proficiency: 88,
    experience: "2+ yrs",
    note: "FastAPI, LangChain, data pipelines & AI tooling",
  },

  // Frameworks & Web
  {
    name: "Next.js (App Router)",
    category: "web",
    proficiency: 95,
    experience: "3+ yrs",
    note: "Server Components, streaming, Turbopack & routing",
  },
  {
    name: "React 19",
    category: "web",
    proficiency: 95,
    experience: "3+ yrs",
    note: "Hooks, concurrent rendering, state machines & UI",
  },
  {
    name: "NestJS",
    category: "web",
    proficiency: 92,
    experience: "2+ yrs",
    note: "Enterprise modular architectures, microservices & DI",
  },
  {
    name: "Node.js",
    category: "web",
    proficiency: 92,
    experience: "3+ yrs",
    note: "High-concurrency REST/WebSocket/SSE backends",
  },
  {
    name: "FastAPI",
    category: "web",
    proficiency: 88,
    experience: "2+ yrs",
    note: "Async Python backends & AI agent orchestration",
  },
  {
    name: "Tailwind CSS v4",
    category: "web",
    proficiency: 95,
    experience: "3+ yrs",
    note: "Design tokens, modern CSS properties & responsive grids",
  },

  // Databases & Storage
  {
    name: "PostgreSQL",
    category: "data",
    proficiency: 92,
    experience: "3+ yrs",
    note: "Connection pooling, schema migrations & optimization",
  },
  {
    name: "Redis",
    category: "data",
    proficiency: 90,
    experience: "3+ yrs",
    note: "Two-tier semantic caching, pub/sub & rate limiting",
  },
  {
    name: "ClickHouse",
    category: "data",
    proficiency: 85,
    experience: "1+ yrs",
    note: "Analytical columnar storage & high-speed aggregations",
  },
  {
    name: "Drizzle & Prisma ORM",
    category: "data",
    proficiency: 92,
    experience: "2+ yrs",
    note: "Type-safe database queries & automated migrations",
  },

  // Systems, AI & DevOps
  {
    name: "Docker & Containers",
    category: "systems",
    proficiency: 90,
    experience: "2+ yrs",
    note: "Multi-stage builds, compose stacks & air-gapped bundles",
  },
  {
    name: "LangChain & RAG",
    category: "systems",
    proficiency: 90,
    experience: "2+ yrs",
    note: "Multi-document chunking, embeddings & context pruning",
  },
  {
    name: "BullMQ & Queues",
    category: "systems",
    proficiency: 90,
    experience: "2+ yrs",
    note: "Idempotent background jobs & failure recovery",
  },
  {
    name: "Linux & CI/CD",
    category: "systems",
    proficiency: 88,
    experience: "2+ yrs",
    note: "GitHub Actions, automated testing & VPS operation",
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    period: "2025-05 – Present",
    title: "Software Engineer – Core Systems",
    company: "APEX Experts AI Solutions",
    location: "UAE / Regional",
    type: "Full-Time Anchor",
    description:
      "Serving as core technical anchor guiding 9 engineers across flagship enterprise SaaS platforms (MyQuery.AI, Asklyze, APEX eInvoicing). Owning frontend, backend, air-gapped on-premise deployments, and DevOps end-to-end.",
    impacts: [
      "Architected MyQuery.AI serving 200+ enterprise users and deployed air-gapped edition to UAE government entity with offline cryptographic licensing.",
      "Slashed query latency by 77% (35s → 8s) via two-tier semantic caching and cut LLM token costs by 80%.",
      "Engineered universal connector gateway spanning 20+ SQL/NoSQL database engines.",
      "Mentored 9 junior and mid-level engineers across architecture standards and code reviews.",
    ],
    tags: [
      "Software Engineer",
      "Full-Stack",
      "AI Platforms",
      "Air-Gapped",
      "Enterprise SaaS",
    ],
    logo: "/images/projects/logos/APEX_Experts.svg",
  },
  {
    period: "2025-07 – 2025-09",
    title: "Freelance Full-Stack Engineer",
    company: "Y-Verify Audit & Compliance",
    location: "Remote",
    type: "Contract / Freelance",
    description:
      "Delivered an AI-assisted field audit and compliance management web application supporting 500+ distributed operators.",
    impacts: [
      "Engineered Google Maps API geolocation verification ensuring verifiable on-premise auditor presence.",
      "Designed dynamic schema-driven audit flows with offline-first client draft caching.",
      "Built multi-tenant role-based access control (RBAC) across inspectors and supervisors.",
    ],
    tags: ["Freelance", "Next.js", "Compliance", "Google Maps", "Audit"],
    logo: "/images/projects/logos/Y-Verify.png",
  },
  {
    period: "2024-08 – 2025-04",
    title: "Freelance Full-Stack Software Engineer",
    company: "Global & Regional Clients",
    location: "Remote",
    type: "Contract / Freelance",
    description:
      "Architected, built, and deployed full-stack web platforms and e-commerce solutions for global and regional clients (HoxDEX, Shahbandar Seeds, Castle Rock).",
    impacts: [
      "Delivered high-performance Next.js web applications with Redis caching layers.",
      "Engineered comprehensive internationalization (i18n) with bidirectional RTL/LTR support.",
      "Configured automated zero-downtime CI/CD pipelines on Dockerized VPS infrastructure.",
    ],
    tags: ["Next.js", "Redis", "i18n RTL/LTR", "Full-Stack", "PostgreSQL"],
    logo: "/images/projects/logos/Shahbandar.png",
  },
  {
    period: "2024-06",
    title: "B.Sc. in Communications & Electronics Engineering",
    company: "Alexandria University, Faculty of Engineering",
    location: "Alexandria, Egypt",
    type: "Academic Milestone",
    description:
      "Graduated from Alexandria University with rigorous training in computing systems, networks, algorithms, signal processing, and mathematics.",
    impacts: [
      "Strong systems engineering fundamentals, computing architecture, and mathematical algorithms.",
    ],
    tags: ["Degree", "Engineering", "Systems", "Alexandria University"],
  },
];
