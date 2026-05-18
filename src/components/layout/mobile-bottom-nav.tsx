"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  Briefcase,
  Code2,
  FolderGit2,
  Trophy,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#work", label: "Work", icon: Briefcase },
  { href: "#skills", label: "Stack", icon: Code2 },
  { href: "#projects", label: "Work", icon: FolderGit2 },
  { href: "#achievements", label: "Awards", icon: Trophy },
  { href: "#contact", label: "Contact", icon: Mail },
];

const sectionIds = links.map((l) => l.href.replace("#", ""));

function useActiveSection() {
  const [active, setActive] = useState<string>("hero");
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

export function MobileBottomNav() {
  const active = useActiveSection();
  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/85 backdrop-blur-xl shadow-2xl shadow-foreground/10 px-2 py-1.5">
        {links.map(({ href, label, icon: Icon }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
