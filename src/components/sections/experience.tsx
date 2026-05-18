"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { experience } from "@/data";
import { useGsap, gsap } from "@/lib/use-gsap";

export function Experience() {
  const ref = useGsap<HTMLDivElement>((ctx) => {
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-job]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: "expo.out",
        });
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      id="work-wrap"
      className="relative overflow-hidden border-y border-border bg-card/30"
    >
      <div className="bg-stripe absolute inset-0 opacity-20" aria-hidden />
      <SectionWrapper
        id="work"
        index="01"
        eyebrow="EXPERIENCE · 2022 → NOW"
        title="Where I've"
        italic="shipped."
        subtitle="Roles where I owned outcomes, not tickets — production systems used by real teams, real money, real users."
        className="relative z-10"
      >
        <ol className="relative grid grid-cols-1 gap-6">
          {experience.map((item, index) => (
            <li
              key={index}
              data-job
              className="group relative grid grid-cols-1 gap-4 rounded-md border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:border-primary/40 md:grid-cols-12 md:gap-8"
            >
              {/* Year tag */}
              <div className="md:col-span-3 flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-background p-1.5">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.company}
                      fill
                      className="object-contain p-1 bg-white rounded-sm"
                      sizes="48px"
                    />
                  ) : (
                    <Building2 className="h-full w-full text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <span className="meta text-primary">
                    {String(index + 1).padStart(2, "0")} · CURRENT
                  </span>
                  <span className="meta text-muted-foreground">
                    {item.period}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-9">
                <h3 className="font-display text-3xl sm:text-4xl text-foreground leading-tight">
                  {item.role}
                </h3>
                <p className="italic-accent text-primary text-lg mt-1">
                  @ {item.company}
                </p>

                <ul className="mt-5 space-y-3">
                  {item.description.map((d, i) => (
                    <li
                      key={i}
                      className="relative pl-5 text-base leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:h-px before:w-3 before:bg-primary"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </SectionWrapper>
    </div>
  );
}
