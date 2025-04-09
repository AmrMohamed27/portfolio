import About from "@/components/about";
import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Resume from "@/components/resume";
import Service from "@/components/service";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <About />
      <Service />
      <Resume />
      <Projects />
      <Contact />
    </div>
  );
}
