"use client";

import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { projects } from "@/data";
import { Badge } from "@/components/ui/badge";
import { useGsap, gsap } from "@/lib/use-gsap";
import type { Project } from "@/data/types";

// ── Browser chrome frame ──────────────────────────────────────────────
function BrowserFrame({
  src,
  alt,
  url,
}: {
  src: string;
  alt: string;
  url: string;
}) {
  let display = url;
  try {
    display = new URL(url).host;
  } catch {
    /* keep raw */
  }
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card shadow-xl shadow-foreground/5">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </div>
        <div className="meta ml-4 flex-1 truncate rounded-sm border border-border bg-background/60 px-2.5 py-1 text-muted-foreground">
          ⌁ {display}
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
    </div>
  );
}

// ── Featured case-study card ──────────────────────────────────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      data-project
      className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center"
    >
      {/* Number stamp — absolute */}
      <span
        aria-hidden
        className={`pointer-events-none absolute font-display text-[12rem] sm:text-[18rem] leading-none text-primary/10 select-none -z-10 ${
          isEven ? "-top-12 -left-4" : "-top-12 -right-4"
        }`}
      >
        {num}
      </span>

      {/* Image column */}
      <div
        className={`relative lg:col-span-7 ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <BrowserFrame
          src={project.img}
          alt={project.projectName}
          url={project.LiveLink}
        />
        {project.img2 && (
          <div
            className={`absolute -bottom-8 ${
              isEven ? "-right-2 sm:right-8" : "-left-2 sm:left-8"
            } w-28 sm:w-36 rotate-[-4deg] overflow-hidden rounded-md border-2 border-card bg-card shadow-2xl`}
          >
            <div className="relative aspect-[9/16]">
              <Image
                src={project.img2}
                alt={`${project.projectName} mobile`}
                fill
                className="object-cover object-top"
                sizes="160px"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content column */}
      <div
        className={`flex flex-col gap-5 lg:col-span-5 ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="meta text-primary">CASE_{num}</span>
          <span aria-hidden className="h-px w-12 bg-border" />
          <span className="meta">{project.projectDate}</span>
        </div>

        <h3 className="text-display text-foreground text-4xl sm:text-5xl">
          {project.projectName}
        </h3>

        <div className="space-y-3">
          {project.keyFeature.map((feat, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted-foreground"
            >
              <span className="italic-accent text-foreground">
                {feat.title}.{" "}
              </span>
              {feat.description}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.skillsArray.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full border-border text-xs font-mono font-normal"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href={project.LiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            View live
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Github className="h-3.5 w-3.5" /> Source
            </a>
          )}
          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Github className="h-3.5 w-3.5" /> Server
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Compact card ──────────────────────────────────────────────────────
function CompactCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 4).padStart(2, "0");
  return (
    <article
      data-project-compact
      className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.img}
          alt={project.projectName}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="meta absolute right-3 top-3 rounded-sm bg-background/90 px-2 py-1 text-foreground backdrop-blur">
          {num}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-display text-2xl text-foreground leading-tight">
            {project.projectName}
          </h4>
          <span className="meta text-muted-foreground shrink-0">
            {project.projectDate}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.keyFeature[0]?.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {project.skillsArray.slice(0, 4).map((s) => (
            <span key={s} className="meta rounded-sm border border-border px-1.5 py-0.5 text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
          <a
            href={project.LiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors link-underline"
          >
            Live <ExternalLink className="h-3 w-3" />
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────────────────
const FEATURED_COUNT = 3;

export function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const others = projects.slice(FEATURED_COUNT);

  const ref = useGsap<HTMLDivElement>((ctx) => {
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          y: 80,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-project-compact]").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: "expo.out",
        });
      });
    });
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div
        className="bg-grid-sm pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <SectionWrapper
        id="projects"
        index="03"
        eyebrow="SELECTED · 2022–2026"
        title="Field"
        italic="notes."
        subtitle="Case studies from production. Each entry is a real problem solved — full-stack systems, payment infrastructure, multi-tenant dashboards, real-time pipelines."
        className="relative z-10"
      >
        <div className="space-y-32 sm:space-y-44">
          {featured.map((p, i) => (
            <FeaturedCard key={p.projectName} project={p} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-32">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-4">
              <h3 className="text-display text-2xl sm:text-3xl">
                More from the <span className="italic-accent text-primary">archive</span>
              </h3>
              <span className="meta text-muted-foreground">
                {String(others.length).padStart(2, "0")} ENTRIES
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <CompactCard key={p.projectName} project={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}
