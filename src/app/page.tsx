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
  About,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-pattern">
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <About />
        <Footer />
      </main>
      <MobileBottomNav />
      <ScrollToTop />
    </div>
  );
}
