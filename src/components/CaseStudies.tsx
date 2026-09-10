"use client";

import { ProjectMediaViewer } from "@/components/ProjectMediaViewer";
import {
  CaseStudy,
  flagshipCaseStudies,
  selectedProjects,
} from "@/data/portfolio-data";
import { motionTokens } from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Maximize2,
  Server,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type FilterCategory = "all" | "ai-enterprise" | "fullstack" | "ecommerce-i18n";

export function CaseStudies() {
  const { prefersReduced, revealTransition } = useAccessibleMotion();

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

  // Handle Escape key navigation for open dialogs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullScreenImage) {
          setFullScreenImage(null);
        } else if (inspectedProject) {
          setInspectedProject(null);
        }
      }
    };
    if (inspectedProject || fullScreenImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectedProject, fullScreenImage]);

  return (
    <section
      id="case-studies"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full border-t border-border-subtle"
    >
      {/* Background Ambience Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-tr from-blue-600/10 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Clean, Human Section Header - Zero AI Eyebrows */}
      <div className="flex flex-col items-start gap-2 mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
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
          <motion.article
            key={study.id}
            id={study.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              ...revealTransition,
              delay: prefersReduced ? 0 : idx * 0.08,
            }}
            className="group relative rounded-2xl border border-border-subtle bg-surface/90 backdrop-blur-md p-5 sm:p-7 lg:p-8 transition-all duration-300 hover:border-border-hover hover:shadow-2xl hover:shadow-blue-500/5 scroll-mt-24"
          >
            {/* Ambient accent hairline indicator */}
            <div className="absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* LEFT COLUMN: Narrative, Problem, Solution & Metrics (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Top Metadata Strip: Clean Client, Role, Timeline (No badge clutter) */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    {study.media.logo && (
                      <div className="relative w-5 h-5 shrink-0 rounded bg-canvas border border-border-muted p-0.5 flex items-center justify-center">
                        <Image
                          src={study.media.logo}
                          alt=""
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {study.client}
                    </span>
                    <span className="text-text-muted">•</span>
                    <span className="font-mono text-xs text-accent-cyan">
                      {study.role}
                    </span>
                    <span className="text-text-muted hidden sm:inline">•</span>
                    <span className="font-mono text-xs text-text-muted hidden sm:inline">
                      {study.timeline}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent-cyan transition-colors duration-200">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                    {study.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {study.summary}
                  </p>

                  {/* Quantified Metrics (clean pills) */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.metrics.map((metric, mIdx) => (
                      <span
                        key={mIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-terminal border border-border-subtle text-accent-cyan"
                      >
                        <Zap className="w-3 h-3 text-accent-emerald shrink-0" />
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Problem & Architectural Solution Grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-border-muted">
                    {/* The Bottleneck / Problem */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-rose-400/90">
                        <Activity className="w-3.5 h-3.5 text-rose-400" />
                        <span>The Challenge</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-text-secondary leading-relaxed">
                        {study.problem.map((prob, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-rose-400/60 mt-0.5 font-mono">
                              ▸
                            </span>
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* The Architectural Solution */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-accent-cyan">
                        <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
                        <span>Solution</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-text-secondary leading-relaxed">
                        {study.solution.map((sol, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-accent-cyan/70 mt-0.5 font-mono">
                              ▸
                            </span>
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-4 border-t border-border-muted flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-text-muted mr-1.5 flex items-center gap-1">
                    <Server className="w-3 h-3" />
                    Stack:
                  </span>
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-terminal text-text-code border border-border-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Media Viewer & ASCII Schematic (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                {/* Media Preview (Screenshots / UI Terminal) */}
                <ProjectMediaViewer
                  media={study.media}
                  title={study.title}
                  fallbackAscii={study.architectureDiagramAscii}
                  className="shadow-lg shadow-black/40"
                />

                {/* ASCII Architecture Topology Card */}
                <div className="rounded-lg border border-border-subtle bg-terminal p-3.5 font-mono text-xs flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-muted text-text-muted">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                      <span className="text-[11px] font-mono text-text-secondary">
                        system-topology.spec
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-accent-emerald flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                      Active Flow
                    </span>
                  </div>

                  <pre className="text-[10px] sm:text-[11px] leading-relaxed text-accent-cyan/90 overflow-x-auto whitespace-pre selection:bg-accent-cyan/20 py-1.5">
                    {study.architectureDiagramAscii}
                  </pre>

                  {/* Architecture Flow Stepper (if present) */}
                  {study.architectureFlow &&
                    study.architectureFlow.length > 0 && (
                      <div className="mt-2.5 pt-2.5 border-t border-border-muted space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                          Pipeline Stages:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          {study.architectureFlow.map((flow) => (
                            <div
                              key={flow.step}
                              className="p-2 rounded bg-surface/60 border border-border-muted"
                            >
                              <div className="flex items-start gap-1.5 text-accent-cyan font-semibold">
                                <span className="text-[10px] opacity-70 mt-px">
                                  [{flow.step}]
                                </span>
                                <span>{flow.component}</span>
                              </div>
                              <p className="mt-0.5 text-[10px] text-text-muted leading-tight">
                                {flow.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </motion.article>
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
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
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

        {/* Selected Projects Responsive 3-Column Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                id={project.id}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onClick={() => setInspectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setInspectedProject(project);
                  }
                }}
                initial={
                  prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }
                }
                transition={motionTokens.revealSpring}
                className="group flex flex-col justify-between rounded-xl border border-border-subtle bg-surface p-4 sm:p-5 transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/5 scroll-mt-24 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <div>
                  {/* Card Thumbnail / Header */}
                  <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden border border-border-muted bg-terminal mb-3.5 group/thumb">
                    {project.media.thumbnail ? (
                      <>
                        <Image
                          src={project.media.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.media.thumbnail) {
                              setFullScreenImage({
                                src: project.media.thumbnail,
                                title: project.title,
                              });
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-surface/85 backdrop-blur-sm border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface opacity-0 group-hover/thumb:opacity-100 transition-all shadow-md z-10"
                          aria-label={`View ${project.title} image in full screen`}
                          title="View Fullscreen"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-linear-to-br from-surface to-terminal">
                        {project.media.logo && (
                          <div className="relative w-10 h-10 mb-2">
                            <Image
                              src={project.media.logo}
                              alt=""
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="font-mono text-xs text-accent-cyan font-medium">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex items-center gap-2 mb-1.5">
                    {project.media.logo && (
                      <div className="relative w-3.5 h-3.5 shrink-0">
                        <Image
                          src={project.media.logo}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="font-mono text-[11px] text-text-muted truncate">
                      {project.client}
                    </span>
                    <span className="text-text-muted">•</span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {project.timeline}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-3.5 space-y-1.5">
                    {project.metrics.slice(0, 2).map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-center gap-2 text-xs font-mono text-accent-cyan"
                      >
                        <CheckCircle2 className="w-3 h-3 text-accent-emerald shrink-0" />
                        <span className="truncate">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Tech & Deep-Dive Button */}
                <div className="mt-5 pt-3.5 border-t border-border-muted flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden max-w-[70%]">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-terminal text-text-code border border-border-muted truncate"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono text-text-muted shrink-0">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div
                    aria-hidden="true"
                    className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* EXPANDED PROJECT INSPECTION MODAL DRAWER                                  */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* EXPANDED PROJECT INSPECTION MODAL DRAWER                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Backdrop with dedicated swift fade exit (< 200ms) to eliminate lingering blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={() => setInspectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10"
              aria-hidden="true"
            />

            <motion.div
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.95, y: 16 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: 8,
                      transition: { duration: 0.15, ease: "easeIn" },
                    }
              }
              transition={motionTokens.toastSpring}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border-hover bg-surface p-6 sm:p-8 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover border border-border-subtle transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-2">
                {inspectedProject.media.logo && (
                  <div className="relative w-8 h-8 rounded bg-canvas border border-border-muted p-1">
                    <Image
                      src={inspectedProject.media.logo}
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="font-mono text-xs text-accent-cyan font-medium">
                    {inspectedProject.client} • {inspectedProject.role}
                  </span>
                  <span className="block text-xs font-mono text-text-muted">
                    Timeline: {inspectedProject.timeline}
                  </span>
                </div>
              </div>

              <h3
                id="modal-project-title"
                className="text-2xl font-bold text-text-primary mt-3"
              >
                {inspectedProject.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1 font-medium">
                {inspectedProject.subtitle}
              </p>

              {/* Full Screenshot if present */}
              {inspectedProject.media.thumbnail && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border-subtle my-5 bg-terminal group/modalimg">
                  <Image
                    src={inspectedProject.media.thumbnail}
                    alt={inspectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (inspectedProject.media.thumbnail) {
                        setFullScreenImage({
                          src: inspectedProject.media.thumbnail,
                          title: inspectedProject.title,
                        });
                      }
                    }}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-sm border border-border-subtle text-text-primary text-xs font-mono opacity-0 group-hover/modalimg:opacity-100 transition-all shadow-lg hover:bg-surface"
                    aria-label={`View ${inspectedProject.title} in full screen`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Fullscreen</span>
                  </button>
                </div>
              )}

              {/* Summary */}
              <p className="text-sm text-text-secondary leading-relaxed mt-4">
                {inspectedProject.summary}
              </p>

              {/* Metrics */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Engineering Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inspectedProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-terminal border border-border-muted text-xs font-mono text-accent-cyan"
                    >
                      <Zap className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem / Solution */}
              <div className="mt-6 pt-5 border-t border-border-muted space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold mb-1">
                    The Challenge:
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {inspectedProject.problem.join(" ")}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-accent-cyan font-semibold mb-1">
                    The Technical Solution:
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {inspectedProject.solution.join(" ")}
                  </p>
                </div>
              </div>

              {/* ASCII Diagram snippet */}
              {inspectedProject.architectureDiagramAscii && (
                <div className="mt-6 p-4 rounded-lg bg-terminal border border-border-subtle font-mono text-[11px] text-accent-cyan overflow-x-auto">
                  <span className="block text-[10px] text-text-muted mb-2 uppercase tracking-wider">
                    Architecture Overview:
                  </span>
                  <pre>{inspectedProject.architectureDiagramAscii}</pre>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-5 border-t border-border-muted flex flex-wrap gap-2">
                {inspectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-terminal text-text-code border border-border-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standalone Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {fullScreenImage && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setFullScreenImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${fullScreenImage.title} Fullscreen Screenshot`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={motionTokens.toastSpring}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header / Close button */}
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <span className="font-mono text-xs sm:text-sm text-text-secondary truncate">
                  {fullScreenImage.title} — Fullscreen View
                </span>
                <button
                  onClick={() => setFullScreenImage(null)}
                  className="p-2 rounded-lg bg-surface/80 border border-border-subtle hover:bg-surface text-text-muted hover:text-white transition-colors"
                  aria-label="Close fullscreen view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fullscreen Image Container */}
              <div className="relative w-full aspect-video sm:aspect-16/10 max-h-[80vh] rounded-xl overflow-hidden border border-border-muted bg-terminal shadow-2xl">
                <Image
                  src={fullScreenImage.src}
                  alt={`${fullScreenImage.title} Fullscreen`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
