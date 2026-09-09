"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Menu, X } from "lucide-react";
import { motionTokens } from "@/lib/motion-tokens";
import { useAccessibleMotion } from "@/lib/use-accessible-motion";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { allowAmbientPulse } = useAccessibleMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-5xl flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(11,17,30,0.85)] backdrop-blur-xl border-[var(--border-subtle)] shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            : "bg-[rgba(11,17,30,0.65)] backdrop-blur-md border-[rgba(255,255,255,0.07)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Left: Brand Identity & Active Availability Beacon */}
        <Link
          href="#overview"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] rounded-full px-2 py-1"
        >
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            {siteConfig.availability.beaconActive && (
              <>
                <span
                  className={`absolute w-full h-full rounded-full bg-[var(--accent-emerald)] opacity-75 ${
                    allowAmbientPulse ? "animate-ping" : ""
                  }`}
                />
                <span className="relative w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_8px_var(--accent-emerald)]" />
              </>
            )}
          </div>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
            {siteConfig.name}
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-wider uppercase text-[var(--accent-emerald)] bg-[var(--accent-emerald-subtle)] px-2 py-0.5 rounded-full border border-[rgba(16,185,129,0.2)]">
            Available
          </span>
        </Link>

        {/* Center: Desktop Anchor Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-xs lg:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-cyan)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <motion.a
            href={siteConfig.contact.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={motionTokens.microSpring}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
          >
            <FileDown className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            <span>Resume</span>
            <span className="hidden sm:inline font-mono text-[10px] text-[var(--text-muted)]">
              PDF
            </span>
          </motion.a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={motionTokens.microSpring}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-[rgba(11,17,30,0.96)] backdrop-blur-2xl border border-[var(--border-subtle)] shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <span className="font-mono text-xs text-[var(--text-muted)]">Navigation</span>
              <span className="font-mono text-[11px] text-[var(--accent-emerald)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]" />
                {siteConfig.availability.status}
              </span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-cyan)] px-3 py-2 rounded-lg hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
