"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  Briefcase,
  Code2,
  FolderGit2,
  Trophy,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { openAIChat } from "@/components/sections";
import { cn } from "@/lib/utils";

type ScrollLink = {
  kind: "scroll";
  href: string;
  label: string;
  icon: LucideIcon;
};
type ChatLink = { kind: "chat"; label: string; icon: LucideIcon };
type NavItem = ScrollLink | ChatLink;

const items: NavItem[] = [
  { kind: "scroll", href: "#hero", label: "Home", icon: Home },
  { kind: "scroll", href: "#work", label: "Work", icon: Briefcase },
  { kind: "scroll", href: "#skills", label: "Stack", icon: Code2 },
  { kind: "scroll", href: "#projects", label: "Projects", icon: FolderGit2 },
  { kind: "scroll", href: "#achievements", label: "Awards", icon: Trophy },
  { kind: "chat", label: "Chat", icon: Sparkles },
];

const sectionIds = items
  .filter((i): i is ScrollLink => i.kind === "scroll")
  .map((l) => l.href.replace("#", ""));

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
        {items.map((item) => {
          const Icon = item.icon;
          if (item.kind === "chat") {
            return (
              <button
                key="chat"
                type="button"
                onClick={openAIChat}
                aria-label="Open chat with Virtual Akib"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30 transition-transform active:scale-95"
              >
                <Icon className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </button>
            );
          }
          const id = item.href.replace("#", "");
          const isActive = active === id;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                isActive
                  ? "bg-foreground text-background scale-105"
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
