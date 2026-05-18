"use client";

import { Award, GraduationCap } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { education, problemSolvingLinks, problemSolvingBio } from "@/data";
import { useGsap, gsap } from "@/lib/use-gsap";

export function Education() {
  const ref = useGsap<HTMLDivElement>((ctx) => {
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-edu]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          x: -40,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-judge]").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%" },
          y: 24,
          opacity: 0,
          delay: i * 0.06,
          duration: 0.6,
          ease: "expo.out",
        });
      });
    });
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="bg-grid-sm absolute inset-0 opacity-30" aria-hidden />
      <SectionWrapper
        id="education"
        index="04"
        eyebrow="THE PATH"
        title="School"
        italic="& sharpening."
        subtitle="Formal credentials plus the place I actually learned to ship — endless rounds on the judges."
        className="relative z-10"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* ── Education timeline ── */}
          <div className="lg:col-span-7">
            <p className="meta text-muted-foreground mb-6 ml-11">{"// formal"}</p>
            <ol className="relative space-y-6 border-l border-border ml-3 pl-8">
              {education.map((item, i) => (
                <li
                  key={i}
                  data-edu
                  className="relative"
                >
                  <span
                    className="absolute -left-[2.75rem] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card"
                    aria-hidden
                  >
                    <GraduationCap className="h-3 w-3 text-primary" />
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="meta text-primary">
                      {item.period}
                    </span>
                    {item.result && (
                      <span className="meta inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
                        <Award className="h-3 w-3" />
                        CGPA {item.result}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground mt-2 leading-tight">
                    {item.degree}
                  </h3>
                  <p className="italic-accent text-primary text-base mt-1">
                    {item.institution}
                  </p>
                  <p className="meta text-muted-foreground mt-2">
                    {item.location}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Problem solving / judges ── */}
          <div className="lg:col-span-5">
            <p className="meta text-muted-foreground mb-6">{"// sharpened on"}</p>
            <div className="rounded-md border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problemSolvingBio}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {problemSolvingLinks.map((p) => (
                  <a
                    key={p.name}
                    data-judge
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 rounded-sm border border-border bg-background p-3 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
                  >
                    <span className="font-display text-lg text-foreground">
                      {p.name}
                    </span>
                    <span className="meta text-muted-foreground group-hover:text-primary transition-colors">
                      {p.handle} ↗
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-border pt-4">
                <Stat value="600+" label="Problems" />
                <Stat value="70+" label="Contests" />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-foreground leading-none">
        {value}
      </p>
      <p className="meta text-muted-foreground mt-1.5">{label}</p>
    </div>
  );
}
