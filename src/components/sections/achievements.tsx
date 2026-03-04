"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";
import { achievements } from "@/data";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/data/types";

/* ── Position tier config ── */
const TIER: Record<
  string,
  { medal: string; glow: string; badge: string; accent: string; label: string }
> = {
  Champion: {
    medal: "🥇",
    glow: "bg-amber-400/20 dark:bg-amber-500/15",
    badge: "bg-amber-400/90 text-amber-950",
    accent: "border-l-amber-400",
    label: "Champion",
  },
  "1st Runners-up": {
    medal: "🥈",
    glow: "bg-primary/15",
    badge: "bg-primary text-primary-foreground",
    accent: "border-l-primary",
    label: "1st Runner-up",
  },
  Participant: {
    medal: "🏅",
    glow: "bg-muted/60",
    badge: "bg-secondary text-secondary-foreground",
    accent: "border-l-border",
    label: "Participant",
  },
  Honored: {
    medal: "⭐",
    glow: "bg-violet-400/15",
    badge: "bg-violet-500/80 text-white",
    accent: "border-l-violet-400",
    label: "Honored",
  },
};

function getTier(position: string) {
  return TIER[position] ?? TIER["Participant"];
}

/* ── Story row ── */
function AchievementRow({ item, index }: { item: Achievement; index: number }) {
  const tier = getTier(item.position);
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        "flex flex-col gap-8 lg:items-center",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      {/* ── Image column ── */}
      <div className="relative flex-1 min-w-0">
        {/* Glow blob */}
        <div
          className={cn(
            "pointer-events-none absolute -z-10 h-56 w-56 rounded-full blur-3xl",
            tier.glow,
            isEven ? "-left-8 -top-8" : "-right-8 -top-8",
          )}
        />

        {/* Frame */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {/* Fake chrome bar */}
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <div className="ml-3 h-4 flex-1 rounded bg-background/60 border border-border/50" />
          </div>

          {/* Image — object-contain so nothing is ever cropped */}
          <div className="relative w-full bg-muted/50 flex items-center justify-center">
            <div className="relative w-full aspect-video">
              <Image
                src={item.img}
                alt={item.competitionTitle}
                fill
                className="object-contain p-2 transition-transform duration-500 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Content column ── */}
      <div className="flex flex-1 min-w-0 flex-col gap-4">
        {/* Faded chapter number */}
        <span className="font-mono text-6xl font-black dark:text-gray-400 leading-none text-foreground/8 select-none -mb-2">
          {num}
        </span>

        {/* Medal + position badge */}
        <div className="flex items-center gap-2">
          <span className="text-3xl leading-none select-none">
            {tier.medal}
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold tracking-wide",
              tier.badge,
            )}
          >
            {tier.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-xl font-bold leading-snug text-foreground border-l-4 pl-4 sm:text-2xl",
            tier.accent,
          )}
        >
          {item.competitionTitle}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export function Achievements() {
  return (
    <SectionWrapper
      id="achievements"
      title="Achievements & Awards"
      subtitle="Competitive programming highlights and recognitions"
      icon={<span>🏆</span>}
    >
      <div className="mx-auto max-w-5xl space-y-16 sm:space-y-24">
        {achievements.map((item, index) => (
          <AchievementRow
            key={item.competitionTitle}
            item={item}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
