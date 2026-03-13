"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";
import { problemSolvingLinks, problemSolvingBio, profile } from "@/data";
import { ExternalLink, Code2, Trophy, Users } from "lucide-react";

const stats = [
  { icon: Code2, value: "600+", label: "Problems Solved" },
  { icon: Trophy, value: "70+", label: "Contests" },
  { icon: Users, value: "2", label: "Leadership Roles" },
];

export function About() {
  return (
    <div className="relative overflow-hidden">
      {/* Diagonal stripes — opposite direction from experience */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-muted/50 dark:bg-muted/30" aria-hidden />
      {/* Blue/teal accent glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl translate-x-1/3 translate-y-1/3" aria-hidden />
      <SectionWrapper
      id="about"
      title="About Me"
      subtitle="My problem-solving journey and what drives me as a developer"
      icon={<span>👨‍💻</span>}
      className="relative z-10"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* ── Top: photo + bio ── */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto shrink-0 md:mx-0"
          >
            <div className="relative h-56 w-44 overflow-hidden rounded-2xl border border-border shadow-lg sm:h-64 sm:w-52">
              <Image
                src="https://i.ibb.co.com/bKcKMvT/photo-2024-10-04-00-31-35.jpg"
                alt="Fahim Muntasir Akib"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 176px, 208px"
              />
            </div>
          </motion.div>

          {/* Bio + strengths */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-col gap-5"
          >
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {problemSolvingBio}
            </p>

            {/* Strengths pills */}
            {profile.strengths && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Strengths
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.strengths.split(",").map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Co-curricular */}
            {profile.coCurricular && profile.coCurricular.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Leadership & Activities
                </p>
                <ul className="space-y-1.5">
                  {profile.coCurricular.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-card"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-5">
              <Icon className="h-4 w-4 text-primary mb-1" />
              <span className="text-xl font-bold text-foreground sm:text-2xl">
                {value}
              </span>
              <span className="text-center text-[11px] text-muted-foreground sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Problem-solving platforms ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Online Judges
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {problemSolvingLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.handle}
                  </span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
    </div>
  );
}
