"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaseStudy,
  flagshipCaseStudies,
  selectedProjects,
} from "@/data/portfolio-data";
import { motionTokens } from "@/lib/motion-tokens";
import {
  FlagshipCaseStudyCard,
  CompactProjectCard,
} from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { FullscreenLightbox } from "@/components/FullscreenLightbox";

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

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: "all", label: `All Projects (${allCount})` },
    { id: "ai-enterprise", label: `AI & Enterprise (${aiCount})` },
    { id: "fullstack", label: `Full-Stack Platforms (${fullstackCount})` },
    { id: "ecommerce-i18n", label: `E-Commerce & i18n (${ecommerceCount})` },
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
      <div className="flex flex-col items-start gap-2 mb-12 sm:mb-16">
        <h2
          id="case-studies-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary"
        >
          Architectural Case Studies
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
          Production systems featuring high-throughput query pipelines,
          air-gapped government AI deployments, real-time hardware cryptography,
          and sub-second analytics engines.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* TIER 1: 4 FLAGSHIP SYSTEMS CASE STUDIES (Two-Column Deep Architecture)    */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-12 lg:gap-16 mb-20">
        {flagshipCaseStudies.map((study, idx) => (
          <FlagshipCaseStudyCard key={study.id} study={study} index={idx} />
        ))}
      </div>

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
              Conversational BI, high-traffic internationalized stores,
              educational studios, and luxury digital storefronts.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-surface border border-border-subtle">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-text-primary font-semibold"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectFilterTab"
                      className="absolute inset-0 rounded-lg bg-accent/30 border border-accent-cyan/40 shadow-sm"
                      transition={motionTokens.snappy}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Projects Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <CompactProjectCard
                key={project.id}
                project={project}
                onSelect={() => setInspectedProject(project)}
                onOpenImage={(img) => setFullScreenImage(img)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
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
