"use client";

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

const links = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#achievements", label: "Achievements", icon: Trophy },
  { href: "#about", label: "About", icon: User },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function MobileBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14 px-1 gap-0">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:text-foreground active:text-foreground flex flex-1 flex-col items-center justify-center gap-0.5 rounded-md py-2 min-w-0 transition-colors"
            aria-label={label}
          >
            <Icon className="h-5 w-5 shrink-0" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
