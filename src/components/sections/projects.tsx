"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { projects } from "@/data";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/types";

/* ─── tiny sub-components ─────────────────────────────────── */

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
      {/* chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="ml-3 h-4 flex-1 rounded bg-background/60 border border-border/50" />
      </div>
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
    </div>
  );
}

function MobileFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border-[3px] border-border bg-card shadow-xl w-28 sm:w-32">
      <div className="flex items-center justify-between bg-muted px-3 py-1">
        <span className="text-[8px] font-medium text-muted-foreground">
          9:41
        </span>
        <div className="flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
        </div>
      </div>
      <div className="relative aspect-9/16">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="130px"
        />
      </div>
    </div>
  );
}

/* ─── Featured story card ─────────────────────────────────── */

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`flex flex-col gap-10 lg:items-center ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* ── Image column ── */}
      <div className="relative flex-1 min-w-0">
        {/* Decorative glow blob */}
        <div
          className={`pointer-events-none absolute -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl ${
            isEven ? "-left-10 -top-10" : "-right-10 -top-10"
          }`}
        />

        {/* Browser screenshot */}
        <BrowserFrame src={project.img} alt={project.projectName} />

        {/* Floating mobile frame — bottom-opposite corner */}
        {project.img2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: isEven ? 4 : -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: isEven ? 4 : -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
            className={`absolute -bottom-6 shadow-2xl ${
              isEven ? "-right-4 sm:-right-6" : "-left-4 sm:-left-6"
            }`}
          >
            <MobileFrame
              src={project.img2}
              alt={`${project.projectName} mobile`}
            />
          </motion.div>
        )}
      </div>

      {/* ── Content column ── */}
      <div className="flex flex-1 min-w-0 flex-col gap-5">
        {/* Chapter number */}
        <span className="font-mono text-5xl font-black leading-none text-primary/15 dark:text-gray-600 select-none -mb-3">
          {num}
        </span>

        {/* Title + date row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-tight">
            {project.projectName}
          </h3>
          <span className="flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground shrink-0">
            <Calendar className="h-3 w-3" />
            {project.projectDate}
          </span>
        </div>

        {/* Key features */}
        <div className="space-y-3">
          {project.keyFeature.map((feat, i) => (
            <div key={i} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  {feat.title}:{" "}
                </span>
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.skillsArray.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="rounded-full text-xs font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Action links */}
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={project.LiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary dark:bg-gray-100 px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85"
          >
            Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Github className="h-3.5 w-3.5" /> Client
            </a>
          )}
          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Github className="h-3.5 w-3.5" /> Server
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Compact card (grid) ─────────────────────────────────── */

function CompactCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={project.img}
          alt={project.projectName}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* date pill overlay */}
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur-sm">
          <Calendar className="h-2.5 w-2.5" />
          {project.projectDate}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h4 className="font-semibold text-foreground leading-snug">
          {project.projectName}
        </h4>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {project.keyFeature[0]?.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.skillsArray.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="rounded-full text-[10px]"
            >
              {skill}
            </Badge>
          ))}
          {project.skillsArray.length > 4 && (
            <Badge variant="outline" className="rounded-full text-[10px]">
              +{project.skillsArray.length - 4}
            </Badge>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-3">
          <a
            href={project.LiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            Live <ExternalLink className="h-3 w-3" />
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3 w-3" /> Client
            </a>
          )}
          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3 w-3" /> Server
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ────────────────────────────────────────── */

const FEATURED_COUNT = 3;

export function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const others = projects.slice(FEATURED_COUNT);

  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="Handpicked projects showcasing real-world problem solving"
      icon={<span>🚀</span>}
    >
      {/* Story-telling featured rows */}
      <div className="mx-auto max-w-5xl space-y-20 sm:space-y-28">
        {featured.map((project, index) => (
          <FeaturedCard
            key={project.projectName}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Divider + label */}
      {others.length > 0 && (
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              More Projects
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {others.map((project, index) => (
              <CompactCard
                key={project.projectName}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
