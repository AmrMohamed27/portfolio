"use client";

import { TimelineMilestone, timelineMilestones } from "@/data/portfolio-data";
import { cardRevealVariant, staggerGridContainer } from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const roleTypeStyleMap: Record<
  string,
  {
    badgeClass: string;
    nodeClass: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }
> = {
  "Full-Time Anchor": {
    badgeClass:
      "bg-emerald-500/10 text-accent-emerald border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    nodeClass:
      "border-accent-emerald bg-canvas text-accent-emerald shadow-[0_0_16px_rgba(16,185,129,0.3)]",
    icon: Briefcase,
    accentColor: "var(--accent-emerald)",
  },
  "Contract / Freelance": {
    badgeClass:
      "bg-accent-cyan-subtle text-accent-cyan border-accent-cyan/30 shadow-[0_0_12px_rgba(56,189,248,0.1)]",
    nodeClass:
      "border-accent-cyan bg-canvas text-accent-cyan shadow-[0_0_16px_rgba(56,189,248,0.25)]",
    icon: TrendingUp,
    accentColor: "var(--accent-cyan)",
  },
  "Academic Milestone": {
    badgeClass:
      "bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.1)]",
    nodeClass:
      "border-purple-400 bg-canvas text-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.25)]",
    icon: GraduationCap,
    accentColor: "#a855f7",
  },
};

export function Timeline() {
  const { prefersReduced, allowAmbientPulse } = useAccessibleMotion();
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const handleLogoError = (key: string) => {
    setFailedLogos((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-border-muted"
    >
      {/* ─── SECTION HEADER ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <h2
            id="experience-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-3"
          >
            Career Journey &amp; Systems Engineering Leadership
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Chronological progression across core architectural anchor roles,
            distributed enterprise delivery, and deep academic engineering
            foundations.
          </p>
        </div>

        {/* Quick KPI summary badges */}
        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle font-mono text-xs text-text-secondary">
            <span
              className={`w-2 h-2 rounded-full bg-accent-emerald ${
                allowAmbientPulse ? "animate-pulse" : ""
              } motion-reduce:animate-none`}
            />
            <span>
              Current:{" "}
              <strong className="text-text-primary font-semibold">
                APEX Experts (Core Systems)
              </strong>
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle font-mono text-xs text-text-secondary">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
            <span>
              Mentored:{" "}
              <strong className="text-text-primary font-semibold">
                9 Engineers Guided
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* ─── TIMELINE SPINE & MILESTONES ─────────────────────────────────── */}
      <div className="relative">
        {/* Continuous vertical timeline connector rail */}
        <div
          aria-hidden="true"
          className="absolute left-4.5 sm:left-6.5 top-3 bottom-8 w-px bg-linear-to-b from-accent-cyan/40 via-border-subtle to-transparent"
        />

        <motion.ol
          variants={prefersReduced ? undefined : staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative space-y-8 sm:space-y-12"
        >
          {timelineMilestones.map(
            (milestone: TimelineMilestone, index: number) => {
              const isCurrent = milestone.period.includes("Present");
              const roleStyle =
                roleTypeStyleMap[milestone.type] ||
                roleTypeStyleMap["Contract / Freelance"];
              const RoleIcon = roleStyle.icon;
              const logoKey = `${milestone.company}-${index}`;
              const hasLogo = Boolean(milestone.logo && !failedLogos[logoKey]);

              return (
                <motion.li
                  key={`${milestone.company}-${milestone.period}`}
                  variants={prefersReduced ? undefined : cardRevealVariant}
                  className="relative flex items-start gap-4 sm:gap-8 group"
                >
                  {/* Milestone Node Glyph */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div
                      className={`w-9 h-9 sm:w-13 sm:h-13 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${roleStyle.nodeClass}`}
                    >
                      <RoleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Pulsing beacon for current active role */}
                    {isCurrent && allowAmbientPulse && (
                      <span
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-2xl bg-accent-emerald/20 animate-ping pointer-events-none -z-10 motion-reduce:hidden"
                      />
                    )}
                  </div>

                  {/* Milestone Content Card */}
                  <div className="flex-1 rounded-2xl border border-border-subtle bg-surface/90 backdrop-blur-sm p-5 sm:p-7 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    {/* Card Header: Metadata, Badges & Timeframe */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-border-muted/80">
                      <div className="flex flex-col sm:flex-row items-start gap-3.5">
                        {/* Company Logo / Monogram Fallback */}
                        <div className="shrink-0 w-11 h-11 rounded-xl bg-canvas border border-border-subtle flex items-center justify-center overflow-hidden p-1.5 shadow-inner">
                          {hasLogo ? (
                            <Image
                              src={milestone.logo!}
                              alt={`${milestone.company} logo`}
                              width={36}
                              height={36}
                              className="w-full h-full object-contain"
                              onError={() => handleLogoError(logoKey)}
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-text-muted" />
                          )}
                        </div>

                        {/* Role & Organization */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                              {milestone.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-text-secondary">
                            <span className="font-semibold text-text-primary flex items-center gap-1.5">
                              {milestone.company}
                            </span>
                            <span className="text-border-hover hidden sm:inline">
                              •
                            </span>
                            <span className="flex items-center gap-1 text-text-muted font-mono text-xs">
                              <MapPin className="w-3 h-3 text-accent-cyan/70" />
                              {milestone.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Badges: Period & Role Classification */}
                      <div className="flex flex-wrap sm:flex-col sm:items-end gap-2">
                        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-canvas border border-border-subtle text-text-primary">
                          <Calendar className="w-3 h-3 text-accent-cyan" />
                          <span>{milestone.period}</span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${roleStyle.badgeClass}`}
                        >
                          {isCurrent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                          )}
                          {milestone.type}
                        </span>
                      </div>
                    </div>

                    {/* Role Narrative Scope */}
                    <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                      {milestone.description}
                    </p>

                    {/* Quantified Technical & Leadership Impacts */}
                    {milestone.impacts && milestone.impacts.length > 0 && (
                      <div className="mt-5 space-y-2.5">
                        <h4 className="font-mono text-xs font-semibold tracking-wider uppercase text-text-muted flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-accent-cyan" />
                          <span>Architectural Ownership &amp; Key Impacts</span>
                        </h4>

                        <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                          {milestone.impacts.map(
                            (impact: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 leading-relaxed"
                              >
                                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                                <span>{impact}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Technologies & Domain Tags */}
                    {milestone.tags && milestone.tags.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-border-muted/60 flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[11px] text-text-muted mr-1">
                          Domain focus:
                        </span>
                        {milestone.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-canvas/80 border border-border-subtle font-mono text-[11px] text-text-muted group-hover:border-border-hover group-hover:text-text-secondary transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            }
          )}
        </motion.ol>
      </div>
    </section>
  );
}
