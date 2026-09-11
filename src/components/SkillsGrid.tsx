"use client";

import { SkillItem, technicalCapabilities } from "@/data/portfolio-data";
import {
  cardRevealVariant,
  motionTokens,
  staggerGridContainer,
} from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Layers,
  Search,
  Sparkles,
  Terminal,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { TabSelector } from "@/components/TabSelector";

type CategoryFilter = "all" | "languages" | "web" | "data" | "systems";

interface CategoryTab {
  id: CategoryFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", label: "All Ecosystem", icon: Layers },
  { id: "languages", label: "Languages & Core", icon: Code2 },
  { id: "web", label: "Web & Frameworks", icon: Globe },
  { id: "data", label: "Databases & Storage", icon: Database },
  { id: "systems", label: "Systems & AI", icon: Terminal },
];

const categoryColorMap: Record<
  SkillItem["category"],
  { badge: string; text: string; dot: string }
> = {
  languages: {
    badge: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  web: {
    badge: "bg-accent-cyan-subtle border-accent-cyan/30 text-accent-cyan",
    text: "text-accent-cyan",
    dot: "bg-accent-cyan",
  },
  data: {
    badge: "bg-emerald-500/10 border-emerald-500/30 text-accent-emerald",
    text: "text-accent-emerald",
    dot: "bg-accent-emerald",
  },
  systems: {
    badge: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    text: "text-purple-400",
    dot: "bg-purple-400",
  },
};

export function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEcosystemExpanded, setIsEcosystemExpanded] = useState(false);
  const { prefersReduced, hoverLift, allowAmbientPulse } = useAccessibleMotion();

  // Tier 1: Core Architectural Pillars (9 flagship technologies)
  const tierOnePillars = useMemo(
    () => technicalCapabilities.filter((s) => s.tier === 1),
    []
  );

  // Tier 2: Extended Ecosystem (Filtered by category & live instant search)
  const tierTwoEcosystem = useMemo(
    () => technicalCapabilities.filter((s) => s.tier === 2),
    []
  );

  const filteredEcosystem = useMemo(() => {
    return tierTwoEcosystem.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.category === activeCategory;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery === "" ||
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.note.toLowerCase().includes(normalizedQuery) ||
        (skill.roleTag &&
          skill.roleTag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesSearch;
    });
  }, [tierTwoEcosystem, activeCategory, searchQuery]);

  const getCategoryCount = (catId: CategoryFilter) => {
    if (catId === "all") return tierTwoEcosystem.length;
    return tierTwoEcosystem.filter((s) => s.category === catId).length;
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-border-muted"
    >
      {/* ─── SECTION HEADER ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <h2
            id="skills-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-3"
          >
            Technical Architecture & Systems Matrix
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Battle-tested runtimes, distributed storage engines, and enterprise
            AI systems running in mission-critical environments. Organized by
            core operational tier.
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="hidden lg:flex flex-col items-end gap-1.5 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle font-mono text-xs text-text-secondary">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
            <span>
              <strong className="text-text-primary font-semibold">
                {technicalCapabilities.length}
              </strong>{" "}
              Production Technologies
            </span>
          </div>
          <span className="text-[11px] font-mono text-text-muted">
            {tierOnePillars.length} Core Pillars · {tierTwoEcosystem.length}{" "}
            Ecosystem Tools
          </span>
        </div>
      </div>

      {/* ─── TIER 1: CORE ARCHITECTURAL PILLARS (HERO GRID) ─────────────── */}
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border-muted/70">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-2 w-2 rounded-full bg-accent-cyan ${
                allowAmbientPulse ? "animate-pulse" : ""
              } motion-reduce:animate-none`}
            />
            <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-text-primary">
              Tier 1: Core Architectural Pillars
            </h3>
          </div>
          <span className="text-xs text-text-muted font-mono">
            Primary Daily Stack
          </span>
        </div>

        <motion.div
          variants={prefersReduced ? undefined : staggerGridContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {tierOnePillars.map((pillar) => (
            <TierOneCard
              key={pillar.name}
              pillar={pillar}
              hoverLift={hoverLift}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      </div>

      {/* ─── TIER 2: PRODUCTION CAPABILITIES & ECOSYSTEM ─────────────────── */}
      <div className="pt-8 border-t border-border-muted">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-accent-emerald" />
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-text-primary">
                Tier 2: Production Capabilities & Tooling
              </h3>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Complementary distributed ecosystem, full-stack frameworks, and
              CI/CD operations.
            </p>
          </div>

          {/* Instant Search Bar & Toggle */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsEcosystemExpanded((prev) => !prev)}
              aria-expanded={isEcosystemExpanded}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-border-subtle bg-surface hover:bg-surface-hover text-text-primary transition-colors cursor-pointer shrink-0"
            >
              {isEcosystemExpanded
                ? "Collapse Ecosystem"
                : `Explore All Tools (${tierTwoEcosystem.length})`}
            </button>

            {isEcosystemExpanded && (
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  aria-label="Search technologies"
                  className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-surface/90 border border-border-subtle focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan text-xs text-text-primary placeholder:text-text-muted outline-none transition-all font-mono"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {isEcosystemExpanded ? (
          <>
            {/* Interactive Category Filter Tabs */}
            <div className="mb-8">
              <TabSelector
                tabs={CATEGORY_TABS.map((tab) => ({
                  id: tab.id,
                  label: tab.label,
                  icon: tab.icon,
                  count: getCategoryCount(tab.id),
                  dot: false,
                }))}
                activeTab={activeCategory}
                onTabChange={(id) => setActiveCategory(id as CategoryFilter)}
                layoutId="activeSkillTab"
                ariaLabel="Filter ecosystem by engineering domain"
                size="sm"
              />
            </div>

            {/* Tier 2 Dense Capabilities Matrix */}
            <div
              role="tabpanel"
              id={`panel-${activeCategory}`}
              aria-labelledby={`tab-${activeCategory}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredEcosystem.length > 0 ? (
                  filteredEcosystem.map((skill) => (
                    <TierTwoPillCard
                      key={skill.name}
                      skill={skill}
                      hoverLift={hoverLift}
                      prefersReduced={prefersReduced}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-text-muted text-xs font-mono">
                    No matching technologies found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-border-subtle bg-surface/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
            <span>
              22+ complementary tools, message brokers, cloud engines &amp; CI/CD
              pipelines available for inspection.
            </span>
            <button
              type="button"
              onClick={() => setIsEcosystemExpanded(true)}
              className="text-accent-cyan hover:underline font-semibold cursor-pointer shrink-0"
            >
              Show all ecosystem tools →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* TIER 1 HERO CARD COMPONENT                                                */
/* ───────────────────────────────────────────────────────────────────────── */

interface TierOneCardProps {
  pillar: SkillItem;
  hoverLift: number;
  prefersReduced: boolean;
}

function TierOneCard({ pillar, hoverLift, prefersReduced }: TierOneCardProps) {
  const colors = categoryColorMap[pillar.category];

  return (
    <motion.div
      layout
      variants={cardRevealVariant}
      whileHover={{ y: hoverLift }}
      transition={
        prefersReduced ? { duration: 0.01 } : motionTokens.microSpring
      }
      className="group relative flex flex-col justify-between p-5 rounded-xl bg-surface/80 border border-border-subtle hover:border-accent-cyan/40 hover:bg-surface-hover/90 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden"
    >
      {/* Top ambient color edge accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.dot === "bg-accent-cyan" ? "#38bdf8" : colors.dot === "bg-accent-emerald" ? "#10b981" : colors.dot === "bg-purple-400" ? "#c084fc" : "#60a5fa"}, transparent)`,
        }}
      />

      <div>
        {/* Role Tag & Experience Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border ${colors.badge}`}
          >
            {pillar.roleTag || "Core Pillar"}
          </span>
          <span className="font-mono text-[11px] text-text-muted font-medium">
            {pillar.experience}
          </span>
        </div>

        {/* Technology Title */}
        <h4 className="font-sans text-base font-bold text-text-primary tracking-tight group-hover:text-accent-cyan transition-colors mb-2">
          {pillar.name}
        </h4>

        {/* Real-world production impact note */}
        <p className="font-sans text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4">
          {pillar.note}
        </p>
      </div>

      {/* Card Footer: Case study cross-reference */}
      <div className="pt-3 border-t border-border-muted/70 flex items-center justify-between text-xs font-mono">
        {pillar.caseStudyRef ? (
          <a
            href={`#${pillar.caseStudyRef.id}`}
            className="inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:text-accent-cyan-hover font-semibold transition-colors group/link"
          >
            <Sparkles className="w-3 h-3 text-accent-cyan" />
            <span>{pillar.caseStudyRef.name}</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        ) : (
          <span className="text-[11px] text-text-muted">Enterprise Core</span>
        )}

        <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-text-muted">
          Tier 1
        </span>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* TIER 2 DENSE PILL CARD COMPONENT                                         */
/* ───────────────────────────────────────────────────────────────────────── */

interface TierTwoPillCardProps {
  skill: SkillItem;
  hoverLift: number;
  prefersReduced: boolean;
}

function TierTwoPillCard({
  skill,
  hoverLift,
  prefersReduced,
}: TierTwoPillCardProps) {
  const colors = categoryColorMap[skill.category];

  return (
    <motion.div
      layout="position"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      whileHover={prefersReduced ? undefined : { y: hoverLift }}
      transition={
        prefersReduced
          ? { duration: 0.01 }
          : {
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              layout: motionTokens.revealSpring,
              y: motionTokens.microSpring,
            }
      }
      className="group relative flex flex-col justify-between p-3.5 rounded-lg bg-surface/50 border border-border-subtle hover:border-border-hover hover:bg-surface-hover/70 transition-colors duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
          <h5 className="font-sans text-xs sm:text-sm font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
            {skill.name}
          </h5>
        </div>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-text-muted shrink-0">
          {skill.experience}
        </span>
      </div>

      <p className="font-sans text-[11px] text-text-secondary leading-snug line-clamp-2 mb-2 pl-3.5">
        {skill.note}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-border-muted/50 text-[10px] font-mono pl-3.5">
        <span className="text-text-muted capitalize">
          {skill.roleTag || skill.category}
        </span>

        {skill.caseStudyRef ? (
          <a
            href={`#${skill.caseStudyRef.id}`}
            className="inline-flex items-center gap-0.5 text-accent-cyan hover:underline"
          >
            <span>{skill.caseStudyRef.name}</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        ) : (
          <span className="text-text-muted/60">Production Tool</span>
        )}
      </div>
    </motion.div>
  );
}
