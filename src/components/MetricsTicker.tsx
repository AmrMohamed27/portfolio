"use client";

import { useState } from "react";
import { telemetryMetrics, MetricTelemetry } from "@/data/portfolio-data";
import { motion } from "framer-motion";
import {
  Zap,
  TrendingDown,
  Database,
  Timer,
  Users,
  ChevronDown,
  FolderGit2,
} from "lucide-react";
import {
  staggerGridContainer,
  cardRevealVariant,
  motionTokens,
} from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";

const metricIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  latency: TrendingDown,
  cost: Zap,
  connectors: Database,
  speed: Timer,
  mentorship: Users,
};

export function MetricsTicker() {
  const { prefersReduced, hoverLift, allowAmbientPulse } = useAccessibleMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const primaryMetrics = telemetryMetrics.slice(0, 2);
  const secondaryMetrics = telemetryMetrics.slice(2);

  return (
    <section
      aria-labelledby="telemetry-heading"
      className="w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-y border-border-muted bg-canvas/70 backdrop-blur-sm"
    >
      {/* Section Header with verified telemetry context */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            {allowAmbientPulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75 motion-reduce:hidden" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
          </span>
          <h2
            id="telemetry-heading"
            className="font-mono text-xs font-semibold tracking-wider uppercase text-accent-cyan"
          >
            Verified Production Telemetry &amp; Impact
          </h2>
        </div>
        <p className="font-mono text-[11px] text-text-muted">
          Click any card to inspect architectural implementation
        </p>
      </div>

      <motion.div
        variants={prefersReduced ? undefined : staggerGridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-3.5 sm:gap-4"
      >
        {/* Tier 1 Primary Flagship Metrics (2 Columns on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {primaryMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              isExpanded={expandedId === metric.id}
              onToggle={() => toggleExpand(metric.id)}
              hoverLift={hoverLift}
              prefersReduced={prefersReduced}
              isFlagship
            />
          ))}
        </div>

        {/* Tier 2 Secondary Supporting Metrics (3 Columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {secondaryMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              isExpanded={expandedId === metric.id}
              onToggle={() => toggleExpand(metric.id)}
              hoverLift={hoverLift}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

interface MetricCardProps {
  metric: MetricTelemetry;
  isExpanded: boolean;
  onToggle: () => void;
  hoverLift: number;
  prefersReduced: boolean;
  isFlagship?: boolean;
}

function MetricCard({
  metric,
  isExpanded,
  onToggle,
  hoverLift,
  prefersReduced,
  isFlagship = false,
}: MetricCardProps) {
  const IconComponent = metricIconMap[metric.id] || Zap;

  return (
    <motion.div
      variants={cardRevealVariant}
      whileHover={{ y: hoverLift }}
      transition={motionTokens.microSpring}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`group cursor-pointer flex flex-col justify-between rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
        isFlagship
          ? isExpanded
            ? "p-5 sm:p-6 bg-surface-hover border-accent-cyan shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            : "p-5 sm:p-6 bg-surface/85 border-accent-cyan/25 hover:border-accent-cyan shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : isExpanded
            ? "p-4 sm:p-5 bg-surface-hover border-border-accent shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
            : "p-4 sm:p-5 bg-surface/60 border-border-subtle hover:border-border-hover"
      }`}
    >
      {/* Top row: Pill Tags (Domain Tag + Project Origin Pill) + Icon + Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Associated Project Origin Pill */}
          {metric.project && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-accent-cyan-subtle border border-accent-cyan/20 text-accent-cyan">
              <FolderGit2 className="w-2.5 h-2.5" />
              <span>{metric.project.name}</span>
            </span>
          )}

          {/* Technical Domain Tag */}
          {metric.tag && (
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-muted">
              {metric.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className={`p-1.5 rounded-lg transition-colors ${
              isFlagship
                ? "bg-accent-cyan-subtle text-accent-cyan"
                : "bg-surface text-text-secondary group-hover:text-accent-cyan"
            }`}
          >
            <IconComponent className="w-4 h-4" />
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={motionTokens.microSpring}
            className="text-text-muted group-hover:text-text-primary p-1"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* Numerical Telemetry Figure & Metric Title */}
      <div className="mb-2">
        <div className="flex flex-col gap-0.5">
          <span
            className={`font-mono font-extrabold tracking-tight whitespace-nowrap leading-none tabular-nums ${
              isFlagship
                ? "text-3xl sm:text-4xl text-text-primary"
                : "text-2xl sm:text-[28px] text-text-primary"
            }`}
          >
            {metric.value}
          </span>
          <span className="font-sans text-xs sm:text-sm font-semibold text-text-primary mt-1 line-clamp-1">
            {metric.label}
          </span>
        </div>
      </div>

      {/* Primary Description */}
      <p className="text-xs text-text-secondary leading-relaxed mb-1">
        {metric.description}
      </p>

      {/* Expandable Architectural Evidence Detail (GPU-only compositor animation via CSS Grid) */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded && metric.detail ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              y: prefersReduced ? 0 : isExpanded ? 0 : -6,
            }}
            transition={motionTokens.snappy}
          >
            <div className="mt-3 pt-3 border-t border-border-subtle text-xs text-text-secondary bg-terminal/70 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] font-semibold text-accent-cyan uppercase tracking-wider">
                  Implementation Detail
                </span>
              </div>
              <p className="leading-relaxed text-text-code font-sans">
                {metric.detail}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Hint */}
      {!isExpanded && metric.detail && (
        <span className="font-mono text-[10px] text-text-muted group-hover:text-accent-cyan mt-2 transition-colors">
          Inspect technical details →
        </span>
      )}
    </motion.div>
  );
}
