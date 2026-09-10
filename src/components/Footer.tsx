"use client";

import { useState } from "react";
import { siteConfig } from "@/data/portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Copy,
  Check,
  MessageSquare,
  FileDown,
  ArrowUp,
  ExternalLink,
  MapPin,
  Clock,
} from "lucide-react";
import { motionTokens } from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0-.04-3.24 1.63 1.63 0 0 0 .04 3.24M5.07 18.5h2.78v-8.37H5.07v8.37Z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { prefersReduced } = useAccessibleMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2400);
    } catch {
      setCopiedPhone(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const transitionFeedback = prefersReduced
    ? { duration: 0.1 }
    : motionTokens.toastSpring;

  return (
    <footer
      id="contact"
      aria-label="Contact Section"
      className="relative pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col gap-10"
    >
      {/* Subtle background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-64 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05),transparent_70%)] blur-3xl -z-10"
      />

      {/* Main Contact Container */}
      <div className="relative rounded-2xl border border-border-subtle bg-surface-elevated/70 backdrop-blur-md overflow-hidden shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
        {/* Header Block: Status & Pitch */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/25 w-fit text-accent-emerald text-xs font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
              </span>
              <span>Available for High-Impact &amp; High-Ownership Roles</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Let&apos;s connect and build together.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Whether you need a software engineer to lead your SaaS product
              engineering, architect resilient backend systems, or optimize web
              performance—feel free to reach out directly.
            </p>
          </div>

          {/* Location & Timezone info pill */}
          <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-surface/60 border border-border-subtle self-start md:self-auto text-xs font-mono text-text-secondary">
            <div className="flex items-center gap-2 text-text-primary font-medium">
              <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Alexandria, Egypt (Remote / Relocation)</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              <span>UTC+3 (Aligned with Egypt &amp; Gulf and Europe)</span>
            </div>
          </div>
        </div>

        {/* Direct Contact Channels: 2 Clear Cards with Plain Text & 1-Click Copy */}
        <div className="flex flex-col gap-4">
          {/* Email Direct Card */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border-subtle hover:border-accent-cyan/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-accent-cyan shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                  Direct Email
                </span>
                <span className="text-sm sm:text-base font-mono font-semibold text-text-primary truncate select-all">
                  {siteConfig.contact.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${siteConfig.contact.email}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                  copiedEmail
                    ? "bg-emerald-500/20 text-accent-emerald border-emerald-500/40"
                    : "bg-surface-elevated hover:bg-surface text-text-primary border-border-subtle hover:border-accent-cyan/40"
                }`}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-emerald" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-text-muted" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                aria-label="Open in email client"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/20 transition-colors"
              >
                <span>Compose</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Micro-toast confirmation for email */}
            <AnimatePresence>
              {copiedEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={transitionFeedback}
                  className="absolute -top-3 right-4 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/50 text-accent-emerald text-[11px] font-mono shadow-sm pointer-events-none"
                >
                  Email copied to clipboard
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone & WhatsApp Direct Card */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border-subtle hover:border-accent-emerald/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-accent-emerald shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                  Direct Phone &amp; WhatsApp
                </span>
                <span className="text-sm sm:text-base font-mono font-semibold text-text-primary truncate select-all">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyPhone}
                aria-label={`Copy phone number ${siteConfig.contact.phone}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                  copiedPhone
                    ? "bg-emerald-500/20 text-accent-emerald border-emerald-500/40"
                    : "bg-surface-elevated hover:bg-surface text-text-primary border-border-subtle hover:border-accent-emerald/40"
                }`}
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-emerald" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-text-muted" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-accent-emerald border border-emerald-500/25 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-emerald-500/60" />
              </a>
            </div>

            {/* Micro-toast confirmation for phone */}
            <AnimatePresence>
              {copiedPhone && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={transitionFeedback}
                  className="absolute -top-3 right-4 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/50 text-accent-emerald text-[11px] font-mono shadow-sm pointer-events-none"
                >
                  Phone copied to clipboard
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Profiles & Resume Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle text-xs font-mono text-text-secondary">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-text-muted text-[11px]">PROFILES:</span>
            <a
              href={siteConfig.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent-cyan transition-colors py-1 px-2 rounded hover:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-accent-cyan" />
              <span>LinkedIn</span>
            </a>
            <span className="text-border-subtle" aria-hidden="true">
              •
            </span>
            <a
              href={siteConfig.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent-cyan transition-colors py-1 px-2 rounded hover:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-accent-cyan" />
              <span>GitHub</span>
            </a>
          </div>

          <a
            href={siteConfig.contact.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle hover:border-accent-emerald/40 text-text-primary hover:text-accent-emerald transition-colors font-mono text-xs"
          >
            <FileDown className="w-3.5 h-3.5 text-accent-emerald" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
        <div>
          &copy; {new Date().getFullYear()} Amr Mohamed. Software Engineer.
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-surface border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
