'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Maximize2,
  Server,
  Zap,
} from 'lucide-react';
import { CaseStudy } from '@/data/portfolio-data';
import { ProjectMediaViewer } from '@/components/ProjectMediaViewer';
import { ArchitecturePipelineRunner } from '@/components/ArchitecturePipelineRunner';
import { motionTokens } from '@/lib/motion-tokens';
import { useAccessibleMotion } from '@/lib/use-accessible-motion';

/* ───────────────────────────────────────────────────────────────────────── */
/* FLAGSHIP CASE STUDY CARD (Two-Column Deep Architectural Layout)           */
/* ───────────────────────────────────────────────────────────────────────── */

interface FlagshipCaseStudyCardProps {
  study: CaseStudy;
  index: number;
  inShowcase?: boolean;
}

export function FlagshipCaseStudyCard({
  study,
  index,
  inShowcase = false,
}: FlagshipCaseStudyCardProps) {
  const { prefersReduced, revealTransition } = useAccessibleMotion();

  const cardContent = (
    <>
      {/* Ambient accent hairline indicator */}
      <div className="absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Narrative, Problem, Solution & Metrics (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Top Metadata Strip: Clean Client, Role, Timeline */}
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
                      <span className="text-rose-400/60 mt-0.5 font-mono">▸</span>
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
                      <span className="text-accent-cyan/70 mt-0.5 font-mono">▸</span>
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

          {/* Interactive Architecture Pipeline Runner */}
          <ArchitecturePipelineRunner
            flow={study.architectureFlow}
            fallbackAscii={study.architectureDiagramAscii}
            title={study.title}
          />
        </div>
      </div>
    </>
  );

  const sharedClassName =
    "group relative rounded-2xl border border-border-subtle bg-surface/90 backdrop-blur-md p-5 sm:p-7 lg:p-8 transition-colors duration-200 hover:border-border-hover hover:shadow-2xl hover:shadow-blue-500/5 scroll-mt-24";

  if (inShowcase) {
    return (
      <article id={study.id} className={sharedClassName}>
        {cardContent}
      </article>
    );
  }

  return (
    <motion.article
      id={study.id}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        ...revealTransition,
        delay: prefersReduced ? 0 : index * 0.08,
      }}
      className={sharedClassName}
    >
      {cardContent}
    </motion.article>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* COMPACT PROJECT CARD (Selected Commercial Projects Grid)                  */
/* ───────────────────────────────────────────────────────────────────────── */

interface CompactProjectCardProps {
  project: CaseStudy;
  onSelect: () => void;
  onOpenImage?: (image: { src: string; title: string }) => void;
}

export function CompactProjectCard({
  project,
  onSelect,
  onOpenImage,
}: CompactProjectCardProps) {
  const { prefersReduced, hoverLift } = useAccessibleMotion();

  return (
    <motion.div
      layout="position"
      id={project.id}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
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
      className="group flex flex-col justify-between rounded-xl border border-border-subtle bg-surface p-4 sm:p-5 transition-colors duration-200 hover:border-border-hover hover:shadow-xl hover:shadow-blue-600/5 scroll-mt-24 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
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
                  if (project.media.thumbnail && onOpenImage) {
                    onOpenImage({
                      src: project.media.thumbnail,
                      title: project.title,
                    });
                  }
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-surface/85 backdrop-blur-sm border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface opacity-0 group-hover/thumb:opacity-100 transition-all shadow-md z-10 cursor-pointer focus-visible:opacity-100"
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
  );
}
