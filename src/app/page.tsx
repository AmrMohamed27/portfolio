import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CaseStudies } from "@/components/CaseStudies";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-canvas text-text-primary flex flex-col selection:bg-accent-cyan selection:text-black">
      {/* Floating Glassmorphic Header Dock [PORT-201] */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Command Hero Component [PORT-202] */}
        <Hero />

        {/* Flagship Architectural Case Studies & Extended Showcase [PORT-301] */}
        <CaseStudies />

        {/* Interactive Capabilities Matrix [PORT-302] */}
        <SkillsGrid />

        {/* Career & Experience Timeline [PORT-401] */}
        <Timeline />
      </main>

      {/* High-Conversion Contact Dock & Terminal Footer [PORT-402] */}
      <Footer />
    </div>
  );
}
