"use client";

import React, { memo, useCallback, useState } from "react";
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import type { EducationEntry } from "@/data";
import { cn } from "@/lib/utils";

interface EducationTimelineProps {
  data: EducationEntry[];
  defaultExpandedIds?: string[];
  expandMode?: "multi" | "single";
}

function TimelineBadge({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-primary/15 text-primary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

const TimelineItemContent = memo(function TimelineItemContent({
  item,
}: {
  item: EducationEntry;
}) {
  return (
    <div className="mt-4 space-y-3">
      <ul className="space-y-2">
        <li className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="leading-relaxed">{item.institution}</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="leading-relaxed">{item.location}</span>
        </li>
        {item.result && (
          <li className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span className="leading-relaxed">Result: {item.result}</span>
          </li>
        )}
      </ul>
    </div>
  );
});

function EducationTimelineItem({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: EducationEntry;
  index: number;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const id = `edu-${index}`;
  const contentId = `edu-content-${index}`;

  return (
    <li className="relative">
      <div className="absolute left-4 top-5 h-6 w-6 rounded-full border-2 border-background bg-primary flex items-center justify-center dark:border-card">
        <GraduationCap className="h-3.5 w-3.5 text-primary-foreground" />
      </div>

      <div className="ml-14 pb-6">
        <div className="rounded-lg border border-border bg-card/50 p-4 transition-all duration-200">
          <button
            type="button"
            id={id}
            className="w-full text-left group cursor-pointer"
            onClick={() => onToggle(id)}
            aria-expanded={expanded}
            aria-controls={contentId}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.degree}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{item.period}</span>
                  <TimelineBadge>{item.institution}</TimelineBadge>
                </div>
              </div>
              <span className="text-muted-foreground shrink-0 group-hover:text-foreground transition-colors">
                {expanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </span>
            </div>
          </button>

          {expanded && (
            <div id={contentId} role="region" aria-labelledby={id}>
              <TimelineItemContent item={item} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function EducationTimeline({
  data,
  defaultExpandedIds,
  expandMode = "multi",
}: EducationTimelineProps) {
  const ids = data.map((_, i) => `edu-${i}`);
  const initial = defaultExpandedIds ?? ids;
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(initial));

  const onToggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (expandMode === "single") {
          return prev.has(id) ? new Set() : new Set([id]);
        }
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [expandMode]
  );

  return (
    <ol className="relative max-w-2xl mx-auto">
      <div
        className="absolute left-4 top-0 bottom-0 w-px bg-border"
        aria-hidden
      />
      {data.map((item, index) => (
        <EducationTimelineItem
          key={index}
          item={item}
          index={index}
          expanded={expanded.has(ids[index] ?? "")}
          onToggle={onToggle}
        />
      ))}
    </ol>
  );
}
