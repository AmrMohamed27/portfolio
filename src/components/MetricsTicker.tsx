"use client";

import { useState } from "react";
import { telemetryMetrics, MetricTelemetry } from "@/data/portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerGridContainer,
  cardRevealVariant,
  motionTokens,
} from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import {
  TrendingUp,
  Database,
  Zap,
  Clock,
  Users,
  ChevronDown,
  FolderGit2,
} from "lucide-react";

// Icon mapping for quantified telemetry metrics
const metricIconMap: Record<string, React.ElementType> = {
  latency: TrendingUp,
  cost: Zap,
  connectors: Database,
  speed: Clock,
  leadership: Users,
};

export function MetricsTicker() {
  const { prefersReduced, hoverLift } = useAccessibleMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const primaryMetrics = telemetryMetrics.slice(0, 2);
  const secondaryMetrics = telemetryMetrics.slice(2);

  return (
    <section
      aria-label="Engineering Impact Telemetry"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-y border-[var(--border-muted)] bg-[rgba(6,9,15,0.7)] backdrop-blur-sm"
    >
      {/* Section Header with verified telemetry context */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
          </span>
          <h2 className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--accent-cyan)]">
            Verified Production Telemetry &amp; Impact
          </h2>
        </div>
        <p className="font-mono text-[11px] text-[var(--text-muted)]">
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
        {/* ROW 1: Flagship Impact Cards (2-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {primaryMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              isExpanded={expandedId === metric.id}
              onToggle={() => toggleExpand(metric.id)}
              hoverLift={hoverLift}
              isFlagship
            />
          ))}
        </div>

        {/* ROW 2: Supporting Systems & Velocity Metrics (3-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          {secondaryMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              isExpanded={expandedId === metric.id}
              onToggle={() => toggleExpand(metric.id)}
              hoverLift={hoverLift}
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
  isFlagship?: boolean;
}

function MetricCard({
  metric,
  isExpanded,
  onToggle,
  hoverLift,
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
      className={`group cursor-pointer flex flex-col justify-between rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] ${
        isFlagship
          ? isExpanded
            ? "p-5 sm:p-6 bg-[var(--bg-surface-hover)] border-[var(--accent-cyan)] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            : "p-5 sm:p-6 bg-[rgba(11,17,30,0.85)] border-[rgba(56,189,248,0.22)] hover:border-[var(--accent-cyan)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : isExpanded
            ? "p-4 sm:p-5 bg-[var(--bg-surface-hover)] border-[var(--border-accent)] shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
            : "p-4 sm:p-5 bg-[rgba(11,17,30,0.6)] border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
      }`}
    >
      {/* Top row: Pill Tags (Domain Tag + Project Origin Pill) + Icon + Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Associated Project Origin Pill */}
          {metric.project && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.2)] text-[var(--accent-cyan)]">
              <FolderGit2 className="w-2.5 h-2.5" />
              <span>{metric.project.name}</span>
            </span>
          )}

          {/* Technical Domain Tag */}
          {metric.tag && (
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
              {metric.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div
            className={`p-1.5 rounded-lg transition-colors ${
              isFlagship
                ? "text-[var(--accent-cyan)] bg-[rgba(56,189,248,0.1)]"
                : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)] bg-[rgba(255,255,255,0.03)]"
            }`}
          >
            <IconComponent className="w-3.5 h-3.5" />
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={motionTokens.microSpring}
            className="p-1 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)]"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* Numerical Telemetry Figure & Metric Title */}
      <div className="mb-2">
        <div className="flex flex-col gap-0.5">
          <span
            className={`font-mono font-extrabold tracking-tight whitespace-nowrap leading-none ${
              isFlagship
                ? "text-3xl sm:text-4xl text-[var(--text-primary)]"
                : "text-2xl sm:text-[28px] text-[var(--text-primary)]"
            }`}
          >
            {metric.value}
          </span>
          <span className="font-sans text-xs sm:text-sm font-semibold text-[var(--text-primary)] mt-1 line-clamp-1">
            {metric.label}
          </span>
        </div>
      </div>

      {/* Primary Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-1">
        {metric.description}
      </p>

      {/* Expandable Architectural Evidence Detail */}
      <AnimatePresence initial={false}>
        {isExpanded && metric.detail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={motionTokens.microSpring}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] bg-[rgba(6,9,15,0.5)] rounded-lg p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] font-semibold text-[var(--accent-cyan)] uppercase tracking-wider">
                  Implementation Detail
                </span>
                {metric.project && (
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    Shipped in {metric.project.name}
                  </span>
                )}
              </div>
              <p className="leading-relaxed text-[var(--text-code)] font-sans">
                {metric.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Hint */}
      {!isExpanded && metric.detail && (
        <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] mt-2 transition-colors">
          Inspect technical details →
        </span>
      )}
    </motion.div>
  );
}
