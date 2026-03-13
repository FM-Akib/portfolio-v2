"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  Trophy,
  User,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#experience", label: "Work", icon: Briefcase },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#education", label: "Edu", icon: GraduationCap },
  { href: "#achievements", label: "Awards", icon: Trophy },
  { href: "#about", label: "About", icon: User },
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
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14 px-1">
        {links.map(({ href, label, icon: Icon }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 min-w-0 transition-colors duration-200 rounded-md",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={label}
            >
              <Icon className={cn("h-5 w-5 shrink-0 transition-transform duration-200", isActive && "scale-110")} />
              <span className={cn("text-[9px] font-medium leading-none", isActive ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
