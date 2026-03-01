"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";
import { skills } from "@/data";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/data/types";

const CATEGORIES: { label: SkillCategory; emoji: string }[] = [
  { label: "Frontend", emoji: "🎨" },
  { label: "Backend", emoji: "⚙️" },
  { label: "Tools", emoji: "🔧" },
];

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

// If icon is already a full URL, use it directly; otherwise treat as Simple Icons slug
function resolveIconUrl(icon: string) {
  return icon.startsWith("http") ? icon : `${SIMPLE_ICONS_CDN}/${icon}`;
}

export function Skills() {
  const [active, setActive] = useState<SkillCategory>("Frontend");

  const filtered = skills.filter((s) => s.category === active);

  return (
    <SectionWrapper
      id="skills"
      title="Technical Skills"
      subtitle="Technologies, frameworks, and tools in my development toolkit"
      icon={<span>🛠️</span>}
    >
      {/* Tab switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1 backdrop-blur-sm">
          {CATEGORIES.map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={cn(
                "relative flex items-center cursor-pointer gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                active === label
                  ? "bg-linear-to-br from-emerald-600 to-lime-800 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <span className="text-base leading-none">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Skill grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 sm:gap-4"
        >
          {filtered.map((skill) => (
            <div
              key={skill.skillName}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-3 py-5 text-center",
                "transition-all duration-200 ease-out",
                "hover:border-primary/40 hover:shadow-md hover:shadow-primary/8 hover:-translate-y-0.5",
              )}
            >
              {/* Logo */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/60 transition-colors duration-200 group-hover:bg-muted">
                <img
                  src={resolveIconUrl(skill.icon)}
                  alt={skill.skillName}
                  width={28}
                  height={28}
                  className={cn(
                    "h-7 w-7 object-contain",
                    skill.darkInvert && "dark:invert",
                  )}
                  onError={(e) => {
                    // fallback: hide broken image
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>
              {/* Name */}
              <span className="text-xs font-semibold leading-tight text-foreground">
                {skill.skillName}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
