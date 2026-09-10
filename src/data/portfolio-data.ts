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
  category?: "ai-enterprise" | "fullstack" | "ecommerce-i18n";
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
  tier?: 1 | 2;
  roleTag?: string;
  caseStudyRef?: {
    id: string;
    name: string;
  };
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
    detail:
      "Implemented a two-tier semantic caching pipeline with Redis & PostgreSQL indexing, eliminating redundant database round-trips for repeated analytical queries.",
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
    detail:
      "Replaced naive schema dump prompt injections with dynamic DDL introspection and selective table context extraction, reducing token load per prompt by 80%.",
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
    description:
      "Unified data access layer across diverse enterprise storage systems.",
    detail:
      "Engineered a pluggable connector gateway capable of introspecting and querying SQL, ClickHouse, Snowflake, and legacy ERP data stores via a single unified API.",
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
    description:
      "Delivered production AI tender platform with Saudi Etimad integration.",
    detail:
      "Owned full lifecycle from database modeling to responsive UI and reverse-engineered government procurement endpoints, taking the product from concept to active commercial demo in two weeks.",
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
    description:
      "Guided engineering practices and architectural standards across teams.",
    detail:
      "Led code reviews, established strict TypeScript contracts and error handling conventions, and guided junior engineers on asynchronous queues and Dockerized deployments.",
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
    subtitle: "Enterprise Data Engine & Air-Gapped Government AI Edition",
    client: "APEX Experts AI Solutions",
    role: "Core Full-Stack Architect",
    timeline: "2025 – Present",
    badge: "Air-Gapped & Enterprise",
    summary:
      "Enterprise analytics platform translating natural language to multi-dialect SQL or noSQL queries with live streaming dashboards, universal database introspection, and an air-gapped on-premise edition bundling local LLMs and offline cryptographic validation.",
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
      "Integrated Payload CMS with PostgreSQL for dynamic multi-locale content governance across regional client interfaces.",
      "Packaged an air-gapped container distribution bundling local LLMs, BGE-M3 embeddings, Whisper STT, and asymmetric offline licensing.",
    ],
    architectureDiagramAscii: `[ Client UI ]
       │
       ▼
[ NestJS API Gateway ]
       │
       ├─► (Cache Hit) ──► [ Redis Cache ] (Schema Chunks) ─┐
       │                                                    │
       └─► (Cache Miss) ─► [ Embedding Model ]              │
                                  │                         │
                                  ▼                         │
                         [ Schema Chunking ] ───────────────┤
                                                            │
            [ AI Provider ]<────────────────────────────────┘
                    │
                    | Generates a query
                    |
                    ▼
                    │
                    ▼
                  [ Connection Pooler ]
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
[Data Warehouses]                       [ Relational DBs ]
(e.g. ClickHouse/Snowflake)          (e.g. PostgreSQL/MySQL)
        └───────────────────┬───────────────────┘
                            │
                            │
                            ▼
           [ Query results stream to the Client]
`,

    architectureFlow: [
      {
        step: "01",
        component: "Client UI & API",
        detail:
          "Natural language query received by NestJS API Gateway from Client UI.",
      },
      {
        step: "02",
        component: "Cache Hit Flow",
        detail:
          "Redis immediately provides cached schema chunks directly to the AI Provider, bypassing embedding/chunking.",
      },
      {
        step: "03",
        component: "Cache Miss Flow",
        detail:
          "Query is processed by the Embedding Model and dynamically routed through Schema Chunking to extract relevant relations.",
      },
      {
        step: "04",
        component: "AI & Execution",
        detail:
          "AI Provider synthesizes query payload; Connection Pooler orchestrates execution across target database engines.",
      },
    ],
    techStack: [
      "Next.js 16",
      "TypeScript",
      "NestJS",
      "Payload CMS",
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
      logo: "/images/projects/logos/MyQuery_Mark.svg",
    },
  },
  {
    id: "trseah",
    title: "Trseah AI Proposal Studio",
    slug: "trseah-ai",
    subtitle:
      "Saudi Etimad Government Tender Ingestion & Automated Proposal Generator",
    client: "Saudi Enterprise Contractor",
    role: "Full-Stack Engineer",
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
    architectureDiagramAscii: `[ Saudi Etimad Government Portal ]
                 │ (Gov API / Webhooks)
                 ▼
[ Automated Tender Ingestion Engine ] ──► [ Arabic / English PDF Extraction ]
                 │
                 ▼
[ Multi-Document Semantic Chunking ] ──► [ Vector Store & Requirement Mapping ]
                 │
                 ▼
[ Proposal Studio UI (Next.js) ] ────► [ Dynamic Section Generator & PDF Export ]`,
    architectureFlow: [
      {
        step: "01",
        component: "Tender Ingestion",
        detail:
          "Fetches active RFPs, condition books, and BOQ documents from Saudi Etimad APIs.",
      },
      {
        step: "02",
        component: "Document Extraction",
        detail:
          "Extracts complex Arabic and English tabular criteria from tender PDFs.",
      },
      {
        step: "03",
        component: "Requirement Mapping",
        detail:
          "Performs semantic similarity searches to align bidder qualifications with RFP mandates.",
      },
      {
        step: "04",
        component: "Proposal Studio",
        detail:
          "Provides an interactive WYSIWYG editor for review, refinement, and one-click PDF generation.",
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
      logo: "/images/projects/logos/Trseah_Mark.png",
    },
  },
  {
    id: "apex-einvoicing",
    title: "APEX eInvoicing Integration Engine",
    slug: "apex-einvoicing",
    subtitle:
      "Enterprise ERP Middleware with PKCS#11 Hardware Security Module Signing",
    client: "APEX Experts & Egyptian Tax Authority (ETA) Compliance",
    role: "Software Engineer",
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
      thumbnail: "/images/projects/screenshots/eInvoicing/Hero.png",
      screenshots: ["/images/projects/screenshots/eInvoicing/Hero.png"],
      logo: "/images/projects/logos/APEX_Experts_Mark.svg",
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
    architectureDiagramAscii: `[ 500+ Field Inspectors ]
            │ (GPS Coordinate Stamp)
            ▼
[ Google Maps Geofencing Verification ] ──► [ Dynamic Form Engine ]
            │
            ▼
[ Offline Draft Caching ] ──────── (Network Restored) ────────► [ Supervisor Review Portal ]`,
    architectureFlow: [
      {
        step: "01",
        component: "Auditor Geofencing",
        detail:
          "Validates field inspector GPS coordinates within authorized boundary before unlocking audit form.",
      },
      {
        step: "02",
        component: "Dynamic Form Rendering",
        detail:
          "Generates customizable question schemas dynamically based on inspection category.",
      },
      {
        step: "03",
        component: "Local Storage Caching",
        detail:
          "Guarantees data integrity by caching form drafts offline in remote low-coverage environments.",
      },
      {
        step: "04",
        component: "Supervisor Portal",
        detail:
          "Delivers real-time compliance metrics, photo audit trails, and multi-tenant management.",
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
    category: "ai-enterprise",
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
      "Connected Payload CMS + PostgreSQL to manage multi-locale system copy and dynamic conversational prompt templates.",
    ],
    architectureDiagramAscii: `[ Executive User Interface ] ──► [ NL Intent Recognition ] ──► [ RAG Context Engine ]
                                                                        │
                                                                        ▼
[ Live Visualizations & Insights ] ◄── [ Sanitized SQL Execution ] ◄── [ Query Compiler ]`,
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Payload CMS",
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
    client: "Rewaa",
    role: "Full-Stack Architect",
    timeline: "2024 – 2025",
    badge: "Multi-Tenant Platform",
    category: "fullstack",
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
    client: "Shahbandar Seeds",
    role: "Freelance Front-End Engineer",
    timeline: "2024 – 2025",
    badge: "E-Commerce & i18n",
    category: "ecommerce-i18n",
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
    architectureDiagramAscii: `[ Regional Buyers / Farmers ] ──► [ Next.js App Router (RTL/LTR) ]
                                            │
                                            ▼
[ Edge CDN & Redis Cache ] ◄──► [ Next.js Server Actions / API ] ──► [ PostgreSQL Database ]`,
    techStack: [
      "Next.js",
      "TypeScript",
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
    category: "ai-enterprise",
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
      logo: "/images/projects/logos/Helaha_Mark.png",
    },
  },
  {
    id: "apex-experts-website",
    title: "APEX Experts Corporate Web Platform",
    slug: "apex-experts-website",
    subtitle:
      "Modern High-Performance Corporate Web Presence & Interactive Showcase",
    client: "APEX Experts AI Solutions",
    role: "Frontend Engineer & Brand Architect",
    timeline: "2025",
    badge: "Brand Platform",
    category: "fullstack",
    summary:
      "Modern brand web platform engineered for APEX Experts, delivering interactive AI solution showcases, dynamic service demonstrations, and responsive corporate positioning.",
    metrics: [
      "100 Lighthouse Performance & SEO",
      "Interactive Product Demo Walkthroughs",
      "Dynamic Fluid Typography & Dark Canvas",
    ],
    problem: [
      "The firm required a modern, authoritative digital presence that effectively communicated complex AI solutions and government integrations to enterprise stakeholders.",
    ],
    solution: [
      "Engineered a responsive Next.js web application with modern CSS tokens, dark obsidian aesthetics, and fluid typography.",
      "Built interactive UI showcases highlighting APEX's suite of AI platforms with sub-second page loads.",
      "Implemented Payload CMS with PostgreSQL for centralized multi-locale content management, enabling instant copy updates and localized marketing workflows.",
    ],
    architectureDiagramAscii: `[ Enterprise Client ] ──► [ Next.js Edge CDN ] ──► [ Optimized Web Vitals ]
                                  │
                                  ▼
                    [ Interactive AI Showcases ]`,
    techStack: [
      "Next.js",
      "TypeScript",
      "Payload CMS",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel Edge",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/APEX/image.png",
      screenshots: ["/images/projects/screenshots/APEX/image.png"],
      logo: "/images/projects/logos/APEX_Experts_Mark.svg",
    },
  },
  {
    id: "castle-rock",
    title: "Castle Rock Luxury Furniture Store",
    slug: "castle-rock",
    subtitle: "High-End Bilingual E-Commerce Storefront with Custom Checkout",
    client: "Castle Rock",
    role: "E-Commerce Full-Stack Engineer",
    timeline: "2024 – 2025",
    badge: "E-Commerce & Storefront",
    category: "ecommerce-i18n",
    summary:
      "Bilingual luxury furniture and home decor storefront engineered with custom Liquid templates, responsive product carousels, Arabic RTL layouts, and localized checkout flows.",
    metrics: [
      "Custom Shopify Liquid Components",
      "Seamless Arabic (RTL) & English Layouts",
      "Optimized High-Res Image Delivery",
    ],
    problem: [
      "High-ticket luxury home goods required a bespoke, visually rich digital catalog with smooth RTL/LTR switching and zero layout shifts on heavy imagery.",
    ],
    solution: [
      "Developed custom Liquid components with lazy-loading responsive image sets and smooth interactive hero banners.",
      "Implemented tailored typography for Arabic luxury branding alongside a streamlined mobile-first checkout flow.",
    ],
    architectureDiagramAscii: `[ High-End Shopper ] ──► [ Localized RTL / LTR Storefront ]
                                     │
                                     ▼
                      [ Custom Liquid / Shopify Engine ] ──► [ Secure Checkout Flow ]`,
    techStack: [
      "Shopify Liquid",
      "JavaScript",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "Shopify Admin API",
    ],
    media: {
      thumbnail: "/images/projects/screenshots/CastleRock/Site.png",
      screenshots: ["/images/projects/screenshots/CastleRock/Site.png"],
      logo: "/images/projects/logos/Castle_Rock_Mark.png",
    },
  },
];

// Tier 1: 4 Flagship Architectural Case Studies (Deep Dives)
export const flagshipCaseStudies: CaseStudy[] = caseStudies.slice(0, 4);

// Tier 2: 6 Extended Engineering & Commercial Projects (Interactive Showcase Grid)
export const selectedProjects: CaseStudy[] = caseStudies.slice(4);

export const technicalCapabilities: SkillItem[] = [
  // ─── TIER 1: CORE ARCHITECTURAL PILLARS (HEROES) ─────────────────────────
  {
    name: "TypeScript",
    category: "languages",
    proficiency: 95,
    experience: "3+ yrs",
    tier: 1,
    roleTag: "Primary Language",
    note: "Strict type safety, generics, AST tooling & end-to-end full-stack contract validation",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },
  {
    name: "Next.js (App Router)",
    category: "web",
    proficiency: 95,
    experience: "3+ yrs",
    tier: 1,
    roleTag: "Flagship Framework",
    note: "Server Components, dynamic streaming, Turbopack, middleware auth & edge runtimes",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },
  {
    name: "React 19",
    category: "web",
    proficiency: 95,
    experience: "3+ yrs",
    tier: 1,
    roleTag: "UI Runtime",
    note: "Concurrent features, custom hooks, micro-animations & high-performance interactive SPAs",
    caseStudyRef: { id: "y-verify", name: "Y-Verify" },
  },
  {
    name: "Python",
    category: "languages",
    proficiency: 88,
    experience: "2+ yrs",
    tier: 1,
    roleTag: "AI & Distributed Services",
    note: "FastAPI, Django, LangChain, autonomous agent orchestration & vector embedding pipelines",
    caseStudyRef: { id: "trseah", name: "Trseah" },
  },
  {
    name: "PostgreSQL",
    category: "data",
    proficiency: 92,
    experience: "3+ yrs",
    tier: 1,
    roleTag: "Relational Persistence",
    note: "Connection pooling, CTEs, schema migrations, indexing & multi-tenant isolation",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },
  {
    name: "Redis",
    category: "data",
    proficiency: 90,
    experience: "3+ yrs",
    tier: 1,
    roleTag: "Cache & Distributed State",
    note: "Two-tier semantic caching, pub/sub event fan-out & high-throughput rate limiting",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },
  {
    name: "Docker & Containers",
    category: "systems",
    proficiency: 90,
    experience: "2+ yrs",
    tier: 1,
    roleTag: "Containerization Engine",
    note: "Multi-stage builds, compose stacks, rootless isolation & air-gapped bundles",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI Air-Gapped" },
  },
  {
    name: "Agentic Coding",
    category: "systems",
    proficiency: 96,
    experience: "2+ yrs",
    tier: 1,
    roleTag: "Autonomous Workflows",
    note: "AI agent orchestrations, automated scaffolding, AST transformations & test synthesis",
    caseStudyRef: { id: "apex-experts-website", name: "APEX AI Systems" },
  },

  {
    name: "Node.js",
    category: "web",
    proficiency: 92,
    experience: "3+ yrs",
    tier: 1,
    roleTag: "Backend Runtime",
    note: "High-concurrency REST/WebSocket/SSE backends, event loops & enterprise microservices",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },

  // ─── TIER 2: EXTENDED PRODUCTION CAPABILITIES & ECOSYSTEM ────────────────
  // Languages & Core
  {
    name: "JavaScript (ESNext)",
    category: "languages",
    proficiency: 95,
    experience: "3+ yrs",
    tier: 2,
    roleTag: "Web Runtime",
    note: "Async runtimes, event loops & Node internals",
  },
  {
    name: "SQL",
    category: "languages",
    proficiency: 92,
    experience: "3+ yrs",
    tier: 2,
    roleTag: "Query Language",
    note: "Complex joins, indexing, CTEs & multi-dialect SQL",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },

  // Frameworks & Web
  {
    name: "NestJS",
    category: "web",
    proficiency: 92,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Modular Architecture",
    note: "Enterprise modular architectures, microservices & DI",
    caseStudyRef: { id: "apex-einvoicing", name: "APEX eInvoicing" },
  },
  {
    name: "Django",
    category: "web",
    proficiency: 88,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Full-Stack Python",
    note: "ORM modeling, admin architecture, REST framework & auth",
  },
  {
    name: "FastAPI",
    category: "web",
    proficiency: 88,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Microservices",
    note: "Async Python backends & AI agent orchestration",
    caseStudyRef: { id: "trseah", name: "Trseah" },
  },
  {
    name: "GraphQL & REST API Designs",
    category: "web",
    proficiency: 94,
    experience: "3+ yrs",
    tier: 2,
    roleTag: "API Architecture",
    note: "Contract-first schemas, resolvers, pagination & idempotency",
  },
  {
    name: "Framer Motion",
    category: "web",
    proficiency: 92,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Motion System",
    note: "Spring physics, layoutId morphs & accessible choreography",
    caseStudyRef: { id: "apex-experts-website", name: "APEX Website" },
  },
  {
    name: "GSAP & Three.js",
    category: "web",
    proficiency: 82,
    experience: "1 yr",
    tier: 2,
    roleTag: "WebGL & Canvas",
    note: "Interactive WebGL scenes, timeline orchestration & shaders",
  },
  {
    name: "Tailwind CSS v4",
    category: "web",
    proficiency: 95,
    experience: "3+ yrs",
    tier: 2,
    roleTag: "Design Engineering",
    note: "Design tokens, modern CSS properties & responsive grids",
  },
  {
    name: "Shopify",
    category: "web",
    proficiency: 90,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "E-Commerce Engine",
    note: "Custom Liquid templates, Storefront API & localized checkout",
    caseStudyRef: { id: "castle-rock", name: "Castle Rock" },
  },
  {
    name: "Payload CMS",
    category: "web",
    proficiency: 92,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Headless Content",
    note: "Headless CMS, multi-locale dynamic copy & Postgres integration",
    caseStudyRef: { id: "apex-experts-website", name: "APEX Site" },
  },

  // Databases & Storage
  {
    name: "NoSQL (MongoDB & Elasticsearch)",
    category: "data",
    proficiency: 88,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Document & Search",
    note: "Document models, aggregations, full-text index & cluster search",
  },
  {
    name: "S3 Storage & Integrations",
    category: "data",
    proficiency: 90,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Object Storage",
    note: "Multipart uploads, presigned URLs, lifecycle policies & CDN distribution",
  },

  // Systems, AI & DevOps
  {
    name: "System Design",
    category: "systems",
    proficiency: 92,
    experience: "3+ yrs",
    tier: 2,
    roleTag: "Architecture Planning",
    note: "Distributed architectures, caching layers & high-availability failover",
  },
  {
    name: "Prompt Engineering",
    category: "systems",
    proficiency: 94,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "LLM Protocols",
    note: "Structured output extraction, few-shot prompting & evaluation loops",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },
  {
    name: "LangChain & RAG",
    category: "systems",
    proficiency: 90,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Retrieval Pipeline",
    note: "Multi-document chunking, embeddings & context pruning",
    caseStudyRef: { id: "trseah", name: "Trseah" },
  },
  {
    name: "VPS Deployments",
    category: "systems",
    proficiency: 92,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Infrastructure Hosting",
    note: "Linux hardening, Nginx/Caddy reverse proxy & systemd automation",
  },
  {
    name: "GitHub Actions",
    category: "systems",
    proficiency: 90,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "CI/CD Automation",
    note: "Automated lint/test CI, container registries & continuous deployment",
  },
  {
    name: "Git",
    category: "systems",
    proficiency: 95,
    experience: "3+ yrs",
    tier: 2,
    roleTag: "VCS & Branching",
    note: "Trunk-based development, rebasing, bisect & release branching",
  },
  {
    name: "Google Cloud",
    category: "systems",
    proficiency: 85,
    experience: "1+ yr",
    tier: 2,
    roleTag: "Cloud Platform",
    note: "Cloud Run, Compute Engine, IAM roles, Cloud Storage & Artifact Registry",
    caseStudyRef: { id: "myquery", name: "MyQuery.AI" },
  },
  {
    name: "Email SMTP Servers",
    category: "systems",
    proficiency: 88,
    experience: "2+ yrs",
    tier: 2,
    roleTag: "Deliverability",
    note: "Postfix/Mailgun setup, SPF/DKIM/DMARC records & transactional delivery",
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
      "Integrated Payload CMS with PostgreSQL across platforms (MyQuery, Asklyze, APEX Site) for dynamic multi-locale content control.",
      "Mentored 9 junior and mid-level engineers across architecture standards and code reviews.",
    ],
    tags: [
      "Software Engineer",
      "Full-Stack",
      "AI Platforms",
      "Payload CMS",
      "Air-Gapped",
      "Enterprise SaaS",
    ],
    logo: "/images/projects/logos/APEX_Experts_Mark.svg",
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
