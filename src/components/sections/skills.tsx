"use client";

import { motion } from "framer-motion";
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

function resolveIconUrl(icon: string) {
  return icon.startsWith("http") ? icon : `${SIMPLE_ICONS_CDN}/${icon}`;
}

export function Skills() {
  return (
    <div className="bg-pattern relative overflow-hidden bg-muted/50 dark:bg-muted/30">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/8" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary/8 blur-3xl" aria-hidden />

      <SectionWrapper
        id="skills"
        title="Technical Skills"
        subtitle="Technologies, frameworks, and tools in my development toolkit"
        icon={<span>🛠️</span>}
        className="relative z-10"
      >
        <div className="mx-auto max-w-4xl space-y-8">
          {CATEGORIES.map(({ label, emoji }, categoryIndex) => {
            const categorySkills = skills.filter((s) => s.category === label);
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.12, ease: "easeOut" }}
              >
                {/* Category label */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/15">
                    <span className="leading-none">{emoji}</span>
                    <span>{label}</span>
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2.5">
                  {categorySkills.map((skill, i) => (
                    <motion.div
                      key={skill.skillName}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.18, delay: i * 0.03, ease: "easeOut" }}
                      className={cn(
                        "group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2",
                        "text-sm font-medium text-foreground cursor-default",
                        "transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5",
                      )}
                    >
                      <img
                        src={resolveIconUrl(skill.icon)}
                        alt={skill.skillName}
                        width={18}
                        height={18}
                        className={cn(
                          "h-4.5 w-4.5 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110",
                          skill.darkInvert && "dark:invert",
                        )}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span>{skill.skillName}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>
    </div>
  );
}
