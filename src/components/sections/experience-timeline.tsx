"use client";

import type { ExperienceEntry } from "@/data";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  data: ExperienceEntry[];
  className?: string;
}

function TimelineCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8 text-card-foreground shadow-lg shadow-black/5 dark:shadow-white/5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TimelineBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

export function ExperienceTimeline({
  data,
  className = "",
}: ExperienceTimelineProps) {
  return (
    <div className={cn("relative w-full  mx-auto", className)}>
      <div className="">
        <TimelineCard className="">
          <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">
            Professional Timeline
          </h2>

          <div className="space-y-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative group transition-all duration-300 "
              >
                {index !== data.length - 1 && (
                  <div
                    className="absolute left-3 top-8 h-full w-0.5 bg-linear-to-b from-primary/60 via-muted-foreground/30 to-primary/60 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden
                  />
                )}
                <div className="flex gap-4 sm:gap-6">
                  <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary mt-1 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground shadow-sm" />
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-primary font-medium text-sm">
                          {item.company}
                        </p>
                        <TimelineBadge>{item.period}</TimelineBadge>
                      </div>
                    </div>
                    <ul className="text-muted-foreground text-sm leading-relaxed space-y-1 list-disc list-inside  rounded-lg p-3 -m-3 transition-all duration-300">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TimelineCard>
      </div>
    </div>
  );
}
