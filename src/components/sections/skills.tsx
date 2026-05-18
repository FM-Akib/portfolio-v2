"use client";

import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";
import { skills } from "@/data";
import { cn } from "@/lib/utils";
import { useGsap, gsap } from "@/lib/use-gsap";
import type { Skill, SkillCategory } from "@/data/types";

const CATEGORIES: { label: SkillCategory; index: string }[] = [
  { label: "Frontend", index: "F" },
  { label: "Backend", index: "B" },
  { label: "Tools", index: "T" },
];

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";
function resolveIconUrl(icon: string) {
  return icon.startsWith("http") ? icon : `${SIMPLE_ICONS_CDN}/${icon}`;
}

function SkillTile({ skill }: { skill: Skill }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-md border border-border bg-card transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveIconUrl(skill.icon)}
          alt={skill.skillName}
          className={cn(
            "h-10 w-10 sm:h-12 sm:w-12 object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-6 opacity-90 group-hover:opacity-100",
            skill.darkInvert && "dark:invert",
          )}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Bottom label always visible */}
      <div className="absolute inset-x-0 bottom-0 px-3 pb-2 text-center">
        <p className="font-display text-base text-foreground leading-tight">
          {skill.skillName}
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-1 bg-gradient-to-t from-card via-card/95 to-transparent px-3 pb-3 pt-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="meta text-muted-foreground">{skill.level}</span>
        <span className="meta text-primary">
          {skill.yearOfExperience}Y
        </span>
      </div>

      {/* Corner index */}
      <span className="meta absolute right-2 top-2 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
        ↗
      </span>
    </div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend");

  const ref = useGsap<HTMLDivElement>((ctx) => {
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-skill-grid] > *").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%" },
          y: 30,
          opacity: 0,
          duration: 0.55,
          delay: (i % 8) * 0.04,
          ease: "expo.out",
        });
      });
    });
  }, [activeCategory]);

  const counts = {
    Frontend: skills.filter((s) => s.category === "Frontend").length,
    Backend: skills.filter((s) => s.category === "Backend").length,
    Tools: skills.filter((s) => s.category === "Tools").length,
  };

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <div ref={ref} className="relative overflow-hidden bg-muted/30 dark:bg-muted/15">
      <div className="bg-stripe absolute inset-0 opacity-30" aria-hidden />
      <SectionWrapper
        id="skills"
        index="02"
        eyebrow="THE TOOLBOX"
        title="What I"
        italic="reach for."
        subtitle="A working inventory — tested in production, shipped under deadline. Everything here has earned its place."
        className="relative z-10"
      >
        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {CATEGORIES.map(({ label, index }) => {
            const isActive = activeCategory === label;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={cn(
                  "group inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30",
                )}
              >
                <span className={cn(
                  "meta text-[9px]",
                  isActive ? "text-background/70" : "text-primary",
                )}>
                  {index}.0
                </span>
                <span>{label}</span>
                <span className={cn(
                  "meta text-[9px]",
                  isActive ? "text-background/70" : "text-muted-foreground/70",
                )}>
                  ({String(counts[label]).padStart(2, "0")})
                </span>
              </button>
            );
          })}

          <div className="ml-auto meta text-muted-foreground hidden sm:block">
            Showing {filtered.length}/{skills.length}
          </div>
        </div>

        {/* Grid */}
        <div
          data-skill-grid
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {filtered.map((skill) => (
            <SkillTile key={skill.skillName} skill={skill} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-6">
          <p className="text-base text-muted-foreground max-w-2xl">
            <span className="italic-accent text-foreground">Also fluent in </span>
            problem-solving on CodeForces, AtCoder, LeetCode — 600+ accepted
            solutions sharpening the foundation underneath.
          </p>
          <span className="meta text-muted-foreground">
            UPDATED · {new Date().getFullYear()}
          </span>
        </div>
      </SectionWrapper>
    </div>
  );
}
