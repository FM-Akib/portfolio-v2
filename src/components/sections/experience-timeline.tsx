"use client";

import { useState } from "react";
import Image from "next/image";
import type { ExperienceEntry } from "@/data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Building2, ChevronDown } from "lucide-react";

interface ExperienceTimelineProps {
  data: ExperienceEntry[];
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function ExperienceTimeline({
  data,
  className = "",
}: ExperienceTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn("relative w-full mx-auto", className)}>
      {/* Timeline line */}
      <div
        className="absolute left-6 md:left-8 top-10 bottom-0 w-0.5 bg-linear-to-b from-primary/60 via-primary/30 to-transparent"
        aria-hidden
      />

      <div className="space-y-6 md:space-y-8">
        {data.map((item, index) => {
          return (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              {/* Timeline node */}
              <div className="absolute left-6 md:left-8 top-8 z-20 flex h-4 w-4 -translate-x-1/2 items-center justify-center">
                <span className="absolute h-4 w-4 rounded-full bg-primary shadow-lg shadow-primary/30" />
                <span className="absolute h-7 w-7 animate-ping rounded-full bg-primary/20" />
              </div>

              {/* Card */}
              <div className="ml-12 md:ml-16">
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 md:p-6 shadow-md shadow-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 dark:shadow-white/5 dark:hover:shadow-primary/10">
                  {/* Header: logo + role + company + period */}
                  <div className="flex items-start gap-3">
                    {/* Company logo */}
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-border bg-muted/50 p-1 sm:p-1.5 shadow-sm">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.company}
                          fill
                          className="object-contain p-0.5 bg-white"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Role + company + period */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                            {item.role}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-primary/80 mt-0.5 leading-snug">
                            {item.company}
                          </p>
                        </div>

                        {/* Period badge */}
                        <div className="flex items-center gap-1 shrink-0">
                          <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                          <span className="inline-flex items-center rounded bg-primary/5 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-primary whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description - Collapsible */}
                  {item.description.length > 0 && (
                    <div className="mt-3 sm:mt-4">
                      {/* First item always visible */}
                      <ul className="space-y-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                          <span className="line-clamp-2">
                            {item.description[0]}
                          </span>
                        </li>
                      </ul>

                      {/* Remaining items - collapsible */}
                      {item.description.length > 1 && (
                        <>
                          <AnimatePresence initial={false}>
                            {expandedItems.has(index) && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="overflow-hidden space-y-2 text-xs sm:text-sm leading-relaxed text-muted-foreground mt-2"
                              >
                                {item.description.slice(1).map((desc, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                                    <span>{desc}</span>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>

                          <button
                            onClick={() => toggleExpand(index)}
                            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200 cursor-pointer"
                          >
                            <span>
                              {expandedItems.has(index)
                                ? "Show less"
                                : "Show more"}
                            </span>
                            <ChevronDown
                              className={cn(
                                "h-3.5 w-3.5 transition-transform duration-300",
                                expandedItems.has(index) && "rotate-180",
                              )}
                            />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
