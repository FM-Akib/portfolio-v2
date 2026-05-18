"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#work", label: "Work", num: "01" },
  { href: "#skills", label: "Stack", num: "02" },
  { href: "#projects", label: "Projects", num: "03" },
  { href: "#education", label: "Path", num: "04" },
  { href: "#achievements", label: "Awards", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 sm:px-10">
        {/* Wordmark */}
        <Link href="#hero" aria-label="Home" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-foreground">
            Akib
          </span>
          <span className="italic-accent text-primary text-base">.dev</span>
          <span className="meta hidden md:inline ml-2 text-muted-foreground">
            / FM-001
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, num }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="meta text-[9px] opacity-50 group-hover:opacity-100">
                  {num}
                </span>
                <span>{label}</span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-3 right-3 h-px bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full gap-1.5 pl-4 pr-3">
            <a href={`mailto:${profile.email}`}>
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border bg-background">
              <SheetHeader className="pb-6">
                <SheetTitle className="text-left">
                  <span className="meta text-muted-foreground">Index —</span>
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-2">
                {navLinks.map(({ href, label, num }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setSheetOpen(false)}
                      className="group flex items-baseline justify-between border-b border-border/60 py-3 hover:text-primary transition-colors"
                    >
                      <span className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                        {label}
                      </span>
                      <span className="meta text-muted-foreground">{num}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 px-2">
                <Button asChild className="w-full rounded-full">
                  <a href={`mailto:${profile.email}`}>
                    Hire me <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <div
        className="h-px origin-left bg-primary/80 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </header>
  );
}
