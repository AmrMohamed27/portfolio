"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaseStudy,
  flagshipCaseStudies,
  selectedProjects,
} from "@/data/portfolio-data";
import {
  FlagshipCaseStudyCard,
  CompactProjectCard,
} from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { FullscreenLightbox } from "@/components/FullscreenLightbox";
import { TabSelector, TabItem } from "@/components/TabSelector";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FilterCategory = "all" | "ai-enterprise" | "fullstack" | "ecommerce-i18n";

export function CaseStudies() {
  // Active category filter for selected commercial work
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  // Dynamic filter tabs based strictly on selectedProjects
  const allCount = selectedProjects.length;
  const aiCount = selectedProjects.filter(
    (p) => p.category === "ai-enterprise"
  ).length;
  const fullstackCount = selectedProjects.filter(
    (p) => p.category === "fullstack"
  ).length;
  const ecommerceCount = selectedProjects.filter(
    (p) => p.category === "ecommerce-i18n"
  ).length;

  const projectFilterTabs: TabItem<FilterCategory>[] = [
    { id: "all", label: "All Projects", count: allCount },
    { id: "ai-enterprise", label: "AI & Enterprise", count: aiCount },
    { id: "fullstack", label: "Full-Stack", count: fullstackCount },
    { id: "ecommerce-i18n", label: "E-Commerce & i18n", count: ecommerceCount },
  ];

  // State for inspecting selected project details in a modal drawer
  const [inspectedProject, setInspectedProject] = useState<CaseStudy | null>(
    null
  );

  // State for viewing an image in fullscreen lightbox
  const [fullScreenImage, setFullScreenImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const filteredProjects = selectedProjects.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  // Active flagship case study in showcase mode
  const [activeFlagshipId, setActiveFlagshipId] = useState<string>(
    flagshipCaseStudies[0]?.id || "myquery-ai"
  );
  // Direction of tab navigation (1 for forward/right, -1 for backward/left)
  const [direction, setDirection] = useState<number>(1);
  // View mode for Tier 1: "showcase" (compact 1-card tabbed) or "list" (all 4 cards)
  const [flagshipViewMode, setFlagshipViewMode] = useState<"showcase" | "list">(
    "showcase"
  );

  const { prefersReduced } = useAccessibleMotion();

  const activeFlagshipIndex = flagshipCaseStudies.findIndex(
    (s) => s.id === activeFlagshipId
  );
  const activeFlagship =
    flagshipCaseStudies[activeFlagshipIndex] || flagshipCaseStudies[0];

  const handleSelectFlagship = (newId: string) => {
    const newIdx = flagshipCaseStudies.findIndex((s) => s.id === newId);
    if (newIdx !== -1 && newIdx !== activeFlagshipIndex) {
      setDirection(newIdx > activeFlagshipIndex ? 1 : -1);
      setActiveFlagshipId(newId);
    }
  };

  const handleNextFlagship = () => {
    setDirection(1);
    const nextIdx = (activeFlagshipIndex + 1) % flagshipCaseStudies.length;
    setActiveFlagshipId(flagshipCaseStudies[nextIdx].id);
  };

  const handlePrevFlagship = () => {
    setDirection(-1);
    const prevIdx =
      (activeFlagshipIndex - 1 + flagshipCaseStudies.length) %
      flagshipCaseStudies.length;
    setActiveFlagshipId(flagshipCaseStudies[prevIdx].id);
  };

  // Direction-aware, spring-physics showcase animation variants
  const showcaseVariants = {
    enter: (dir: number) => ({
      x: prefersReduced ? 0 : dir > 0 ? 32 : -32,
      opacity: 0,
      scale: prefersReduced ? 1 : 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: prefersReduced
        ? { duration: 0.1 }
        : {
            x: { type: "spring", stiffness: 350, damping: 28, mass: 0.7 },
            scale: { type: "spring", stiffness: 350, damping: 28, mass: 0.7 },
            opacity: { duration: 0.22, ease: "easeOut" },
          },
    },
    exit: (dir: number) => ({
      x: prefersReduced ? 0 : dir > 0 ? -32 : 32,
      opacity: 0,
      scale: prefersReduced ? 1 : 0.985,
      transition: prefersReduced
        ? { duration: 0.05 }
        : {
            x: { duration: 0.15, ease: [0.32, 0, 0.67, 0] },
            scale: { duration: 0.15, ease: [0.32, 0, 0.67, 0] },
            opacity: { duration: 0.12, ease: "easeIn" },
          },
    }),
  };

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto w-full border-t border-border-subtle"
    >
      {/* Background Ambience Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-tr from-blue-600/10 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Clean Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div className="flex flex-col items-start gap-2">
          <h2
            id="case-studies-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
          >
            Architectural Case Studies
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Production systems featuring high-throughput query pipelines,
            air-gapped government AI deployments, real-time hardware
            cryptography, and sub-second analytics engines.
          </p>
        </div>

        {/* View Mode Switcher: Showcase vs List */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-border-subtle shrink-0">
          <button
            type="button"
            onClick={() => setFlagshipViewMode("showcase")}
            aria-label="Interactive tabbed showcase view"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
              flagshipViewMode === "showcase"
                ? "bg-surface-hover text-text-primary border border-accent-cyan/30 shadow-sm font-semibold"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Showcase
          </button>
          <button
            type="button"
            onClick={() => setFlagshipViewMode("list")}
            aria-label="Expanded vertical list view"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
              flagshipViewMode === "list"
                ? "bg-surface-hover text-text-primary border border-accent-cyan/30 shadow-sm font-semibold"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            All 4 In-line
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TIER 1: 4 FLAGSHIP SYSTEMS CASE STUDIES                                    */}
      {/* ========================================================================= */}
      {flagshipViewMode === "showcase" ? (
        <div className="mb-20 flex flex-col gap-6">
          {/* Segmented Flagship Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border-subtle/70">
            {/* 4 Branded Flagship Tabs */}
            <TabSelector
              tabs={flagshipCaseStudies.map((study) => ({
                id: study.id,
                label: study.shortTitle || study.title,
                dot: true,
              }))}
              activeTab={activeFlagshipId}
              onTabChange={handleSelectFlagship}
              layoutId="flagshipSelectorTab"
              ariaLabel="Select flagship system"
            />

            {/* Quick Next / Prev & Count Indicator */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 font-mono text-xs text-text-muted shrink-0 w-full sm:w-auto pt-1 sm:pt-0">
              <div className="flex items-center font-semibold text-text-secondary h-6 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeFlagshipIndex}
                    initial={
                      prefersReduced
                        ? { opacity: 1 }
                        : { y: direction > 0 ? 10 : -10, opacity: 0 }
                    }
                    animate={{ y: 0, opacity: 1 }}
                    exit={
                      prefersReduced
                        ? { opacity: 0 }
                        : { y: direction > 0 ? -10 : 10, opacity: 0 }
                    }
                    transition={{ duration: 0.14, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    {String(activeFlagshipIndex + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="mx-1 text-text-muted">/</span>
                <span className="text-text-muted">
                  {String(flagshipCaseStudies.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevFlagship}
                  aria-label="Previous flagship case study"
                  className="p-2 sm:p-2.5 rounded-xl bg-surface border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan text-text-secondary transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextFlagship}
                  aria-label="Next flagship case study"
                  className="p-2 sm:p-2.5 rounded-xl bg-surface border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan text-text-secondary transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Flagship Card with smooth direction-aware transition */}
          <div className="relative overflow-hidden w-full rounded-2xl">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={activeFlagship.id}
                custom={direction}
                variants={showcaseVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <FlagshipCaseStudyCard
                  study={activeFlagship}
                  index={activeFlagshipIndex}
                  inShowcase
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-12 lg:gap-16 mb-20">
          {flagshipCaseStudies.map((study, idx) => (
            <FlagshipCaseStudyCard key={study.id} study={study} index={idx} />
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TIER 2: 6 EXTENDED ENGINEERING & COMMERCIAL SHOWCASE (Interactive Grid)   */}
      {/* ========================================================================= */}
      <div className="pt-12 border-t border-border-subtle">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              More Projects &amp; Commercial Work
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-text-secondary max-w-xl">
              Conversational BI, multilingual landing pages,
              educational studios, and luxury digital storefronts.
            </p>
          </div>

          {/* Reusable Interactive Category Filter Pills */}
          <TabSelector
            tabs={projectFilterTabs}
            activeTab={activeCategory}
            onTabChange={(id) => setActiveCategory(id as FilterCategory)}
            layoutId="projectFilterTab"
            ariaLabel="Filter projects by category"
            size="sm"
          />
        </div>

        {/* Selected Projects Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <CompactProjectCard
                key={project.id}
                project={project}
                onSelect={() => setInspectedProject(project)}
                onOpenImage={(img) => setFullScreenImage(img)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded Project Inspection Modal Drawer */}
      <ProjectModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
        onOpenImage={(img) => setFullScreenImage(img)}
      />

      {/* Standalone Fullscreen Image Lightbox Modal */}
      <FullscreenLightbox
        isOpen={Boolean(fullScreenImage)}
        onClose={() => setFullScreenImage(null)}
        title={fullScreenImage?.title || ""}
        images={fullScreenImage ? [fullScreenImage.src] : []}
      />
    </section>
  );
}
