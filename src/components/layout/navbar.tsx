"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
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

const LOGO_URL = "https://i.ibb.co/DWxtttS/logo.png";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
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

function NavLinks({
  onNavigate,
  active,
}: {
  onNavigate?: () => void;
  active: string;
}) {
  return (
    <ul className="flex flex-col gap-1 md:flex-row md:gap-0.5">
      {navLinks.map(({ href, label }) => {
        const id = href.replace("#", "");
        const isActive = active === id;
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={cn(
                "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 block",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary md:block hidden" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-none"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <nav className="container flex h-14 items-center justify-between px-4 md:px-6 max-w-6xl mx-auto">
        {/* Logo */}
        <Link
          href="#hero"
          className="relative h-9 w-28 sm:h-10 sm:w-32 dark:flex dark:items-center dark:justify-center shrink-0"
          aria-label="Home"
        >
          <Image
            src={LOGO_URL}
            alt="FM-Akib"
            fill
            className="object-contain object-left dark:hidden"
            sizes="(max-width: 640px) 112px, 128px"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-foreground hidden dark:block">
            <span className="text-amber-400">FM</span>
            <span className="text-muted-foreground">-</span>Akib
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center">
          <NavLinks active={active} />
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex md:items-center md:gap-2 shrink-0">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full text-xs px-4">
            <a href={`tel:${profile.phone}`} aria-label="Call">
              {profile.phone}
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
            <SheetContent
              side="right"
              className="border-border bg-background w-64"
            >
              <SheetHeader className="pb-4">
                <SheetTitle className="text-foreground text-left">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-2">
                <NavLinks
                  active={active}
                  onNavigate={() => setSheetOpen(false)}
                />
                <div className="border-t border-border pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
