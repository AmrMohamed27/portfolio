import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MetricsTicker } from "@/components/MetricsTicker";
import { CaseStudies } from "@/components/CaseStudies";
import { SkillsGrid } from "@/components/SkillsGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-canvas text-text-primary flex flex-col selection:bg-accent-cyan selection:text-black">
      {/* Floating Glassmorphic Header Dock [PORT-201] */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Command Hero Component [PORT-202] */}
        <Hero />

        {/* Quantified Impact Telemetry Ticker [PORT-203] */}
        <MetricsTicker />

        {/* Flagship Architectural Case Studies & Extended Showcase [PORT-301] */}
        <CaseStudies />

        {/* Interactive Capabilities Matrix [PORT-302] */}
        <SkillsGrid />
      </main>
    </div>
  );
}
