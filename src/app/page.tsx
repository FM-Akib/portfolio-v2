import { Navbar } from "@/components/layout/navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ScrollToTop } from "@/components/scroll-to-top";
import {
  Hero,
  Experience,
  Skills,
  Projects,
  Education,
  Achievements,
  Contact,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
        <Footer />
      </main>
      <MobileBottomNav />
      <ScrollToTop />
    </div>
  );
}
