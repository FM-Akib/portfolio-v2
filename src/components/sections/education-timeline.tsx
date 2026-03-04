"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarDays, Award } from "lucide-react";
import type { EducationEntry } from "@/data";

export function EducationTimeline({ data }: { data: EducationEntry[] }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Vertical connector line */}
      <div
        className="absolute left-5 top-5 bottom-5 w-px bg-linear-to-b from-primary via-border to-transparent"
        aria-hidden
      />

      <ol className="space-y-0">
        {data.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.14,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative pl-16 pb-8 last:pb-0"
          >
            {/* Timeline node */}
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-card shadow-md">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>

            {/* Card */}
            <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              {/* Top row: degree + period */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-base font-bold leading-snug text-foreground sm:text-[1.05rem] group-hover:text-primary transition-colors">
                  {item.degree}
                </h3>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {item.period}
                </span>
              </div>

              {/* Institution */}
              <p className="mt-2 text-sm font-semibold text-primary">
                {item.institution}
              </p>

              {/* Location + Result */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {item.location}
                </span>
                {item.result && (
                  <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Award className="h-3 w-3" />
                    CGPA {item.result}
                  </span>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
