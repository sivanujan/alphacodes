import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Capabilities } from "@/components/sections/Capabilities";
import { Film } from "@/components/sections/Film";
import { Process } from "@/components/sections/Process";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top" className="min-h-screen flex flex-col bg-white text-[#0B1B2B]">
      <Hero />
      <Services />
      <Projects />
      <Capabilities />
      <Film />
      <Process />
      <Clients />
      <Contact />
    </main>
  );
}
