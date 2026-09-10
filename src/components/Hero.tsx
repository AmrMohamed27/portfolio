"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileDown,
  Copy,
  Check,
  MapPin,
  Terminal,
  Cpu,
} from "lucide-react";
import {
  heroStaggerContainer,
  heroChildVariant,
  motionTokens,
} from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";

// Verified professional portrait
const avatarUrl = "/images/headshot.webp";

export function Hero() {
  const { copied, copy } = useCopyToClipboard({ timeoutMs: 2400 });
  const { prefersReduced, allowAmbientPulse } = useAccessibleMotion();

  const handleCopyEmail = () => {
    copy(siteConfig.contact.email);
  };

  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto w-full flex flex-col"
    >
      {/* Subtle background ambient radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/3 -translate-x-1/2 w-135 h-75 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)] blur-2xl -z-10"
      />

      <motion.div
        variants={prefersReduced ? undefined : heroStaggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
      >
        {/* ================= LEFT COLUMN: Text, Narrative & Actions (7 cols) ================= */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {/* Identity & Location */}
          <motion.div
            variants={heroChildVariant}
            className="flex flex-wrap items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-subtle text-xs text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_6px_var(--accent-emerald)]" />
              <span className="font-semibold text-text-primary">
                Amr Mohamed
              </span>
              <span className="text-text-muted">•</span>
              <span>Software Engineer</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/50 border border-border-subtle text-xs text-text-muted">
              <MapPin className="w-3 h-3 text-accent-cyan" />
              <span>Alexandria, Egypt</span>
            </div>
          </motion.div>

          {/* High-Impact Spec Headline */}
          <motion.h1
            id="hero-heading"
            variants={heroChildVariant}
            className="text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-text-primary leading-[1.2]"
          >
            Architecting high-throughput distributed systems &amp;{" "}
            <span className="text-accent-cyan">
              high-performance web platforms.
            </span>
          </motion.h1>

          {/* Honest, Startup-Focused Narrative */}
          <motion.p
            variants={heroChildVariant}
            className="text-sm sm:text-[15px] text-text-secondary leading-relaxed"
          >
            I am a software engineer with 3 years of experience rooted in{" "}
            <span className="text-text-primary font-medium">
              fast-paced, high-stakes startup environments
            </span>{" "}
            where I worked directly alongside founders to take products from
            whiteboard to production. Rather than staying confined to one layer,
            I take full ownership of the entire stack—architecting backend
            systems and database schemas in{" "}
            <span className="text-text-primary font-medium">NestJS</span> and{" "}
            <span className="text-text-primary font-medium">PostgreSQL</span>,
            building snappy, accessible interfaces with{" "}
            <span className="text-text-primary font-medium">TypeScript</span>{" "}
            and <span className="text-text-primary font-medium">Next.js</span>,
            and managing containerized DevOps pipelines to ensure fast, reliable
            shipping.
          </motion.p>

          {/* Action Bar (Direct CTAs + 1-Click Email Copy) */}
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
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-xs sm:text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer"
              >
                <span>Explore Case Studies</span>
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface hover:bg-surface-hover text-text-primary border border-border-subtle hover:border-border-hover font-medium text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-cyan" />
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
                aria-label={
                  copied
                    ? "Email address copied to clipboard"
                    : `Copy email address ${siteConfig.contact.email}`
                }
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border font-mono text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer ${
                  copied
                    ? "bg-accent-emerald-subtle border-accent-emerald text-accent-emerald"
                    : "bg-terminal hover:bg-surface border-border-subtle text-text-code hover:border-border-hover"
                }`}
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-emerald" />
                    <span>Email copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-text-muted" />
                    <span>{siteConfig.contact.email}</span>
                  </>
                )}
              </motion.button>

              {/* Micro toast confirmation with screen reader accessibility */}
              <div aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </div>

              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={motionTokens.microSpring}
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface text-accent-emerald border border-accent-emerald/30 px-2 py-0.5 rounded text-[10px] font-mono shadow-md pointer-events-none"
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
          <div className="relative w-full max-w-[320px] sm:max-w-85 rounded-2xl border border-border-subtle bg-surface shadow-[0_16px_36px_rgba(0,0,0,0.55)] p-2.5 flex flex-col gap-3 group">
            {/* The Photo Container with crisp aspect ratio */}
            <div className="relative w-full aspect-4/4.5 rounded-xl overflow-hidden bg-terminal border border-border-subtle/50">
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
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas/80 backdrop-blur-md border border-border-subtle/80 text-[11px] font-mono">
                <span className="relative flex h-2 w-2">
                  {allowAmbientPulse && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                  )}
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
                </span>
                <span className="text-accent-emerald font-medium">
                  Available
                </span>
              </div>
            </div>

            {/* Embedded Engineer Telemetry Dock */}
            <div className="px-1.5 pb-1 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-text-primary font-semibold font-mono">
                  <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Amr Mohamed</span>
                </div>
                <span className="font-mono text-[10px] text-text-muted">
                  UTC+2 / UTC+3
                </span>
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-accent-cyan" />
                  Core Stack
                </span>
                <span className="text-text-secondary">
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
