"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Terminal,
  Activity,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { ArchitectureNode } from "@/data/portfolio-data";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import { motionTokens } from "@/lib/motion-tokens";

interface ArchitecturePipelineRunnerProps {
  flow?: ArchitectureNode[];
  fallbackAscii?: string;
  title: string;
  autoPlayInterval?: number; // ms per step during simulation (default: 2600ms)
  className?: string;
}

export function ArchitecturePipelineRunner({
  flow,
  fallbackAscii,
  title,
  autoPlayInterval = 2600,
  className = "",
}: ArchitecturePipelineRunnerProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const { prefersReduced, allowAmbientPulse } = useAccessibleMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const steps = flow && flow.length > 0 ? flow : null;
  const totalSteps = steps ? steps.length : 0;
  const currentStep = steps ? steps[activeStepIndex] || steps[0] : null;

  // Handle manual step selection (pauses auto-play simulation)
  const handleSelectStep = (idx: number) => {
    setIsPlaying(false);
    setProgress(0);
    setActiveStepIndex(idx);
  };

  const handleTogglePlay = () => {
    if (prefersReduced) return;
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (nextState) {
        setProgress(0);
      }
      return nextState;
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setActiveStepIndex(0);
  };

  const handleNext = useCallback(() => {
    if (!steps) return;
    setActiveStepIndex((prev) => (prev + 1) % steps.length);
    setProgress(0);
  }, [steps]);

  const handlePrev = useCallback(() => {
    if (!steps) return;
    setActiveStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
    setProgress(0);
  }, [steps]);

  // Keyboard navigation across pipeline steps
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === " " && !e.repeat) {
      e.preventDefault();
      handleTogglePlay();
    }
  };

  // Simulation playback loop
  useEffect(() => {
    if (!isPlaying || prefersReduced || !steps) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressAnimRef.current)
        cancelAnimationFrame(progressAnimRef.current);
      return;
    }

    startTimeRef.current = performance.now();

    const updateProgress = () => {
      if (!startTimeRef.current) return;
      const elapsed = performance.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / autoPlayInterval) * 100);
      setProgress(pct);

      if (elapsed >= autoPlayInterval) {
        setActiveStepIndex((prev) => (prev + 1) % steps.length);
        startTimeRef.current = performance.now();
        setProgress(0);
      }

      progressAnimRef.current = requestAnimationFrame(updateProgress);
    };

    progressAnimRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (progressAnimRef.current)
        cancelAnimationFrame(progressAnimRef.current);
    };
  }, [isPlaying, prefersReduced, steps, autoPlayInterval]);

  // Fallback to classic ASCII view if no structured flow steps exist
  if (!steps || steps.length === 0) {
    return (
      <div
        className={`rounded-xl border border-border-subtle bg-terminal p-4 font-mono text-xs ${className}`}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-muted text-text-muted">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-[11px] text-text-secondary">
              system-topology.spec
            </span>
          </div>
          <span className="text-[10px] text-accent-emerald flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            Active
          </span>
        </div>
        <pre className="text-[11px] leading-relaxed text-accent-cyan/90 overflow-x-auto whitespace-pre py-1.5">
          {fallbackAscii || "// Architecture topology verified"}
        </pre>
      </div>
    );
  }

  return (
    <section
      role="region"
      aria-label={`Architecture Pipeline Simulator for ${title}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`rounded-xl border border-border-subtle bg-terminal/95 p-3.5 sm:p-4 font-mono text-xs flex flex-col gap-3 focus:outline-none focus:ring-1 focus:ring-accent-cyan/50 ${className}`}
    >
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* TERMINAL HUD HEADER                                               */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border-muted text-text-muted">
        {/* Left: Window identity */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[11px] font-mono text-text-secondary flex items-center gap-1.5 pl-1">
            <Activity className="w-3 h-3 text-accent-cyan" />
            <span>pipeline-runner.sh</span>
          </span>
        </div>

        {/* Right: Simulation Controls & Telemetry Beacon */}
        <div className="flex items-center gap-2">
          {/* Step Indicator badge */}
          <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded bg-surface/60 border border-border-muted">
            STAGE{" "}
            <span className="text-accent-cyan font-bold">
              {String(activeStepIndex + 1).padStart(2, "0")}
            </span>
            /{String(totalSteps).padStart(2, "0")}
          </span>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset pipeline simulation to step 1"
            title="Reset simulation (01)"
            className="p-1.5 rounded bg-surface border border-border-muted hover:border-accent-cyan/50 hover:text-text-primary text-text-muted transition-colors cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          {/* Play / Pause simulation toggle */}
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={
              isPlaying
                ? "Pause pipeline simulation"
                : "Run live pipeline simulation"
            }
            title={isPlaying ? "Pause Simulation" : "Run Live Simulation"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer active:scale-95 ${
              isPlaying
                ? "bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/40 shadow-sm shadow-emerald-500/20"
                : "bg-surface border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan text-text-secondary"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span className="hidden sm:inline">Simulating</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Simulate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* HORIZONTAL INTERACTIVE PIPELINE TRACK                             */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Pipeline Stages"
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 relative pt-1"
      >
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.step}
              role="tab"
              aria-selected={isActive}
              aria-controls={`pipeline-stage-panel-${step.step}`}
              id={`pipeline-stage-tab-${step.step}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelectStep(idx)}
              className={`group relative flex flex-col p-2 sm:p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                isActive
                  ? "bg-surface-hover/90 border-accent-cyan text-text-primary shadow-md shadow-blue-500/10"
                  : isPassed
                    ? "bg-surface/50 border-border-muted/80 text-text-secondary hover:border-border-hover hover:text-text-primary"
                    : "bg-surface/30 border-border-muted/60 text-text-muted hover:border-border-hover hover:text-text-secondary"
              }`}
            >
              {/* Active step glow outline with Framer Motion layoutId */}
              {isActive && (
                <motion.div
                  layoutId="activePipelineGlow"
                  className="absolute inset-0 rounded-lg border-2 border-accent-cyan pointer-events-none z-0"
                  transition={motionTokens.microSpring}
                />
              )}

              {/* Progress bar inside active node during simulation */}
              {isActive && isPlaying && !prefersReduced && (
                <div
                  style={{ width: `${progress}%` }}
                  className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-accent-cyan to-accent-emerald transition-all duration-100 ease-linear"
                />
              )}

              {/* Step number & status beacon */}
              <div className="flex items-center justify-between gap-1 mb-1 z-10">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isActive
                      ? "text-accent-cyan"
                      : isPassed
                        ? "text-accent-emerald/90"
                        : "text-text-muted"
                  }`}
                >
                  [{step.step}]
                </span>

                {isPassed ? (
                  <CheckCircle2 className="w-3 h-3 text-accent-emerald/80 shrink-0" />
                ) : isActive ? (
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-accent-cyan ${
                        allowAmbientPulse ? "animate-pulse" : ""
                      }`}
                    />
                  </span>
                ) : (
                  <ChevronRight className="w-3 h-3 text-border-hover shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              {/* Component name */}
              <span className="text-[11px] font-mono font-semibold truncate leading-tight z-10">
                {step.component}
              </span>

              {/* Optional latency or protocol badge */}
              <div className="mt-1 flex items-center gap-1 text-[9px] font-mono text-text-muted truncate z-10">
                {step.latency && (
                  <span className="text-accent-emerald font-medium">
                    {step.latency}
                  </span>
                )}
                {step.protocol && step.latency && <span>•</span>}
                {step.protocol && (
                  <span className="truncate opacity-75">{step.protocol}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* ACTIVE STAGE TELEMETRY DRAWER                                     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {currentStep && (
        <div
          role="tabpanel"
          id={`pipeline-stage-panel-${currentStep.step}`}
          aria-labelledby={`pipeline-stage-tab-${currentStep.step}`}
          className="relative mt-1 p-3.5 sm:p-4 rounded-lg bg-surface/70 border border-border-muted/90 overflow-hidden"
        >
          {/* Ambient subtle corner glow for active stage */}
          <div
            className="absolute -top-12 -right-12 w-28 h-28 bg-accent-cyan/5 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep.step}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex flex-col gap-2.5 z-10 relative"
            >
              {/* Header: Stage identity & Metadata badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                    STAGE {currentStep.step}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold font-mono text-text-primary">
                    {currentStep.component}
                  </h4>
                </div>

                {/* Telemetry Chips (Protocol, Latency, Status) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {currentStep.protocol && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-terminal text-text-code border border-border-muted">
                      {currentStep.protocol}
                    </span>
                  )}
                  {currentStep.latency && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" />
                      {currentStep.latency}
                    </span>
                  )}
                  {currentStep.status && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-surface text-text-secondary border border-border-muted">
                      {currentStep.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Technical Stage Explanation */}
              <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed font-sans">
                {currentStep.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Screen reader live announcement */}
          <div aria-live="polite" className="sr-only">
            Active stage {currentStep.step}: {currentStep.component}.{" "}
            {currentStep.detail}
          </div>
        </div>
      )}

      {/* Footer helper note */}
      <div className="flex items-start justify-between text-[10px] font-mono text-text-muted pt-1">
        <span className="hidden sm:inline">
          Tip: Click stages or press [Arrow Keys] to step through pipeline
        </span>
        <span className="sm:hidden">
          Tap stage buttons to inspect architecture
        </span>
        <span className="text-accent-emerald/90 flex items-center gap-1 flex-nowrap text-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
          VERIFIED LIFECYCLE
        </span>
      </div>
    </section>
  );
}
