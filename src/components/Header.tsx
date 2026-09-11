"use client";

import { useEffect, useRef, useState } from "react";
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
  const [activeSection, setActiveSection] = useState("#overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { allowAmbientPulse, prefersReduced } = useAccessibleMotion();
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // If user recently clicked a nav link, preserve that active section during the smooth scroll
      if (isClickScrollingRef.current) return;

      // Bottom-of-page detection: when user reaches the end of the page, automatically highlight #contact
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      if (currentScroll + clientHeight >= scrollHeight - 60) {
        setActiveSection("#contact");
        return;
      }

      // Scroll-spy active section detection
      const sectionIds = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sectionIds[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-300 flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-surface-glass backdrop-blur-xl border-border-subtle shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            : "bg-surface-glass/80 backdrop-blur-md border-border-subtle/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Left: Brand Identity & Active Availability Beacon */}
        <Link
          href="#overview"
          onClick={() => handleNavClick("#overview")}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-full px-2 py-1"
        >
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            {siteConfig.availability.beaconActive && (
              <>
                <span
                  className={`absolute w-full h-full rounded-full bg-accent-emerald opacity-75 ${
                    allowAmbientPulse ? "animate-ping" : ""
                  }`}
                />
                <span className="relative w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_var(--accent-emerald)]" />
              </>
            )}
          </div>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-text-primary group-hover:text-accent-cyan transition-colors">
            {siteConfig.name}
          </span>
        </Link>

        {/* Center: Desktop Anchor Links with Sliding Active Pill */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-full bg-surface/50 border border-border-subtle/40">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative font-sans text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan select-none ${
                  isActive
                    ? "text-text-primary font-semibold"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {/* Floating capsule pill sliding behind active item */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={
                      prefersReduced
                        ? { duration: 0.01 }
                        : motionTokens.snappy
                    }
                    className="absolute inset-0 rounded-full bg-surface-hover border border-accent-cyan/40 shadow-[0_2px_12px_rgba(56,189,248,0.18)]"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
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
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-full bg-surface hover:bg-surface-hover text-text-primary border border-border-subtle hover:border-border-accent transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            <FileDown className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Resume</span>
            <span className="hidden sm:inline font-mono text-[10px] text-text-muted">
              PDF
            </span>
          </motion.a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-1.5 text-text-secondary hover:text-text-primary rounded-full hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-surface/95 backdrop-blur-2xl border border-border-subtle shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <span className="font-mono text-xs text-text-muted">
                Navigation
              </span>
              <span className="font-mono text-[11px] text-accent-emerald flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                {siteConfig.availability.status}
              </span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-sm font-medium text-text-primary hover:text-accent-cyan px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors"
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
