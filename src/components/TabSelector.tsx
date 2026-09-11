"use client";

import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number | string;
  icon?: React.ComponentType<{ className?: string }>;
  dot?: boolean;
}

interface TabSelectorProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (id: T) => void;
  layoutId?: string;
  ariaLabel?: string;
  className?: string;
  size?: "sm" | "md";
}

export function TabSelector<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  layoutId = "tabSelectorIndicator",
  ariaLabel = "Filter selection",
  className = "",
  size = "md",
}: TabSelectorProps<T>) {
  const { prefersReduced } = useAccessibleMotion();

  const isSmall = size === "sm";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1 p-1 rounded-xl bg-surface/80 border border-border-subtle backdrop-blur-md max-w-full flex-wrap sm:flex-nowrap ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex items-center justify-center gap-2 rounded-lg font-mono transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan select-none ${
              isSmall
                ? "px-2.5 py-1 text-xs"
                : "px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px]"
            } ${
              isActive
                ? "text-text-primary font-semibold"
                : "text-text-muted hover:text-text-secondary hover:bg-surface-hover/50"
            }`}
          >
            {/* Animated Sliding Pill Surface */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : motionTokens.snappy
                }
                className="absolute inset-0 rounded-lg bg-surface-hover border border-accent-cyan/40 shadow-[0_2px_12px_rgba(56,189,248,0.12)]"
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {/* Optional Active/Beacon Dot */}
              {tab.dot !== false && (
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                    isActive
                      ? "bg-accent-cyan shadow-[0_0_8px_var(--accent-cyan)]"
                      : "bg-text-muted/60"
                  }`}
                />
              )}

              {/* Optional Tab Icon */}
              {Icon && (
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    isActive ? "text-accent-cyan" : "text-text-muted"
                  }`}
                />
              )}

              <span className="truncate">{tab.label}</span>

              {/* Optional Count Pill Badge */}
              {tab.count !== undefined && (
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full transition-colors ${
                    isActive
                      ? "bg-accent-cyan-subtle text-accent-cyan border border-accent-cyan/25"
                      : "bg-canvas/80 border border-border-subtle text-text-muted"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
