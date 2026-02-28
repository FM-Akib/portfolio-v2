"use client";

import Image from "next/image";
import type { ExperienceEntry } from "@/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Building2 } from "lucide-react";

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
  return (
    <div className={cn("relative w-full mx-auto", className)}>
      {/* Central timeline line */}
      <div
        className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2 md:-translate-x-px"
        aria-hidden
      />

      <div className="space-y-12 md:space-y-16">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

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
              <div className="absolute left-6 top-8 z-20 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
                <span className="absolute h-4 w-4 rounded-full bg-primary shadow-lg shadow-primary/30" />
                <span className="absolute h-7 w-7 animate-ping rounded-full bg-primary/20" />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "ml-14 md:ml-0 md:w-[calc(50%-2.5rem)]",
                  isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4",
                )}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5  dark:shadow-white/5 dark:hover:shadow-primary/10">
                  {/* Accent gradient top bar */}
                  {/* <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/80 via-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}

                  {/* Header: logo + role + company */}
                  <div className=" flex items-start justify-between ">
                    <div className="flex items-start gap-4">
                      {/* Company logo */}
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/50 p-1.5 shadow-sm">
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
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                          {item.role}
                        </h3>
                        <p className="text-sm font-medium text-primary/80 mt-0.5">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Period badge */}
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
