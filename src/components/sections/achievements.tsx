"use client";

import Image from "next/image";
import { Trophy, Star } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { achievements, profile } from "@/data";
import { useGsap, gsap } from "@/lib/use-gsap";
import { cn } from "@/lib/utils";

const POSITION_STYLE: Record<string, string> = {
  Champion: "bg-primary text-primary-foreground",
  "1st Runners-up": "bg-foreground text-background",
  Honored: "bg-accent text-accent-foreground",
  Participant: "bg-muted text-foreground",
};

export function Achievements() {
  const ref = useGsap<HTMLDivElement>((ctx) => {
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-award]").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 50,
          opacity: 0,
          duration: 0.85,
          delay: (i % 3) * 0.06,
          ease: "expo.out",
        });
      });
    });
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden bg-card/30 border-y border-border">
      <div className="bg-stripe absolute inset-0 opacity-25" aria-hidden />
      <SectionWrapper
        id="achievements"
        index="05"
        eyebrow="THE TROPHY SHELF"
        title="Wins worth"
        italic="mentioning."
        subtitle="Hackathons, ideathons, project showcases — outcomes from showing up and shipping under pressure."
        className="relative z-10"
      >
        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-fr">
          {achievements.map((item, index) => {
            const isFeatured = index === 0 || index === 2;
            const positionClass =
              POSITION_STYLE[item.position] ?? POSITION_STYLE["Participant"];

            return (
              <article
                key={item.competitionTitle}
                data-award
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:-translate-y-1",
                  isFeatured ? "md:col-span-4" : "md:col-span-2",
                )}
              >
                {/* Image */}
                <div
                  className={cn(
                    "relative w-full bg-muted/40 overflow-hidden flex items-center justify-center",
                    isFeatured ? "aspect-[16/9]" : "aspect-video",
                  )}
                >
                  <Image
                    src={item.img}
                    alt={item.competitionTitle}
                    fill
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Position pill — corner */}
                  <span
                    className={cn(
                      "absolute left-3 top-3 meta rounded-sm px-2 py-1",
                      positionClass,
                    )}
                  >
                    {item.position}
                  </span>
                  <span className="meta absolute right-3 top-3 rounded-sm bg-background/85 px-2 py-1 text-foreground backdrop-blur">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 gap-2">
                  <h3 className="font-display text-xl sm:text-2xl text-foreground leading-tight">
                    {item.competitionTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Leadership + strengths quick strip */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {profile.coCurricular?.map((item) => (
            <div
              key={item}
              data-award
              className="flex items-start gap-4 rounded-md border border-dashed border-border bg-background p-5"
            >
              <Trophy className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="meta text-muted-foreground">{"// leadership"}</p>
                <p className="mt-1 text-base text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}

          {profile.strengths && (
            <div
              data-award
              className="sm:col-span-2 flex items-start gap-4 rounded-md border border-dashed border-border bg-background p-5"
            >
              <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="meta text-muted-foreground">{"// soft stack"}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {profile.strengths.split(",").map((s) => (
                    <span
                      key={s}
                      className="meta rounded-full border border-border bg-card px-2.5 py-1 text-foreground"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
