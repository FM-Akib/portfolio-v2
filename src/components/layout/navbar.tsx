"use client";

import { useState } from "react";
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

const LOGO_URL = "https://i.ibb.co/DWxtttS/logo.png";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-6 md:flex-row md:gap-8">
      {navLinks.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            onClick={onNavigate}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link
          href="#hero"
          className="relative h-9 w-28 sm:h-10 sm:w-32"
          aria-label="Home"
        >
          <Image
            src={LOGO_URL}
            alt="FM-Akib"
            fill
            className="object-contain object-left"
            sizes="(max-width: 640px) 112px, 128px"
            priority
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-4">
          <NavLinks />
          <ThemeToggle />
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <a href={`tel:${profile.phone}`} aria-label="Call">
              {profile.phone}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-background">
              <SheetHeader>
                <SheetTitle className="text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4 pt-4">
                <NavLinks onNavigate={() => setSheetOpen(false)} />
                <Button asChild variant="outline" className="mt-4">
                  <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
