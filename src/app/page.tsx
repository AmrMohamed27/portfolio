import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MetricsTicker } from "@/components/MetricsTicker";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent-cyan)] selection:text-black">
      {/* Floating Glassmorphic Header Dock [PORT-201] */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Command Hero Component [PORT-202] */}
        <Hero />

        {/* Quantified Impact Telemetry Ticker [PORT-203] */}
        <MetricsTicker />
      </main>
    </div>
  );
}
