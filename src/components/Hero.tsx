"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  ArrowRight,
  FileDown,
  MapPin,
  Layers,
  Terminal,
  Cpu,
} from "lucide-react";
import {
  heroStaggerContainer,
  heroChildVariant,
  motionTokens,
} from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";

interface HeroProps {
  avatarUrl?: string;
}

export function Hero({ avatarUrl = "/images/headshot.png" }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const { prefersReduced, allowAmbientPulse } = useAccessibleMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="overview"
      className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col"
    >
      {/* Subtle background ambient radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/3 -translate-x-1/2 w-[540px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)] blur-2xl -z-10"
      />

      <motion.div
        variants={prefersReduced ? undefined : heroStaggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
      >
        {/* ================= LEFT COLUMN: Text, Narrative & Actions (7 cols) ================= */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {/* 1. Identity & Location Badges */}
          <motion.div
            variants={heroChildVariant}
            className="flex flex-wrap items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_6px_var(--accent-emerald)]" />
              <span className="font-semibold text-[var(--text-primary)]">
                Amr Mohamed
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span>Software Engineer</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
              <MapPin className="w-3 h-3 text-[var(--accent-cyan)]" />
              <span>Alexandria, Egypt</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.2)] text-xs text-[var(--accent-cyan)] font-mono">
              <Layers className="w-3 h-3" />
              <span>Full-Stack Ownership</span>
            </div>
          </motion.div>

          {/* 2. Natural, Grounded Headline */}
          <motion.h1
            variants={heroChildVariant}
            className="text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)] leading-[1.2]"
          >
            I build and scale products from the ground up with end-to-end
            ownership.
          </motion.h1>

          {/* 3. Honest, Startup-Focused Narrative */}
          <motion.p
            variants={heroChildVariant}
            className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed"
          >
            My experience is rooted in{" "}
            <span className="text-[var(--text-primary)] font-medium">
              fast-paced, high-stakes startup environments
            </span>{" "}
            where I worked directly alongside the founder to take ideas from
            whiteboard to production. Rather than staying confined to one layer,
            I take full ownership of the entire stack—designing backend systems
            and database schemas in{" "}
            <span className="text-[var(--text-primary)] font-medium">
              NestJS
            </span>{" "}
            and{" "}
            <span className="text-[var(--text-primary)] font-medium">
              PostgreSQL
            </span>
            , building snappy, accessible user interfaces with{" "}
            <span className="text-[var(--text-primary)] font-medium">
              TypeScript
            </span>{" "}
            and{" "}
            <span className="text-[var(--text-primary)] font-medium">
              Next.js
            </span>
            , and managing our cloud and DevOps pipelines to ensure fast,
            reliable shipping.
          </motion.p>

          {/* 4. Action Bar (Direct CTAs + 1-Click Email Copy) */}
          <motion.div
            variants={heroChildVariant}
            className="pt-1 flex flex-wrap items-center gap-3"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={motionTokens.microSpring}
            >
              <Link
                href="#case-studies"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-medium text-xs sm:text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
              >
                <span>View Projects &amp; Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.a
              href={siteConfig.contact.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={motionTokens.microSpring}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] font-medium text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
            >
              <FileDown className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
              <span>Resume (PDF)</span>
            </motion.a>

            {/* Interactive Email Copy Button */}
            <div className="relative">
              <motion.button
                type="button"
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={motionTokens.microSpring}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border font-mono text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] ${
                  copied
                    ? "bg-[rgba(16,185,129,0.12)] border-[var(--accent-emerald)] text-[var(--accent-emerald)]"
                    : "bg-[var(--bg-terminal)] hover:bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-code)] hover:border-[var(--border-hover)]"
                }`}
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                    <span>Email copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[var(--text-muted)]" />
                    <span>{siteConfig.contact.email}</span>
                  </>
                )}
              </motion.button>

              {/* Micro toast confirmation */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={motionTokens.microSpring}
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--bg-surface-elevated)] text-[var(--accent-emerald)] border border-[rgba(16,185,129,0.3)] px-2 py-0.5 rounded text-[10px] font-mono shadow-md pointer-events-none"
                  >
                    Ready to paste
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN: Structured Engineering Portrait Card (5 cols) ================= */}
        <motion.div
          variants={heroChildVariant}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] shadow-[0_16px_36px_rgba(0,0,0,0.55)] p-2.5 flex flex-col gap-3 group">
            {/* The Photo Container with crisp aspect ratio */}
            <div className="relative w-full aspect-[4/4.5] rounded-xl overflow-hidden bg-[var(--bg-terminal)] border border-[rgba(255,255,255,0.06)]">
              <Image
                src={avatarUrl}
                alt="Amr Mohamed - Software Engineer"
                fill
                priority
                quality={95}
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Status beacon pill floating inside top-right corner */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(6,9,15,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[11px] font-mono">
                <span className="relative flex h-2 w-2">
                  {allowAmbientPulse && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-75" />
                  )}
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-emerald)]" />
                </span>
                <span className="text-[var(--accent-emerald)] font-medium">
                  Available
                </span>
              </div>
            </div>

            {/* Embedded Engineer Telemetry Dock */}
            <div className="px-1.5 pb-1 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold font-mono">
                  <Terminal className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>Amr Mohamed</span>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  UTC+2 / UTC+3
                </span>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[var(--accent-cyan)]" />
                  Core Stack
                </span>
                <span className="text-[var(--text-secondary)]">
                  Next.js • NestJS • PG
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
