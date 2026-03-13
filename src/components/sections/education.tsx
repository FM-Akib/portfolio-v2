import { SectionWrapper } from "./section-wrapper";
import { education } from "@/data";
import { EducationTimeline } from "./education-timeline";

export function Education() {
  return (
    <div className="relative overflow-hidden">
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-muted/50 dark:bg-muted/30" aria-hidden />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-48 w-full max-w-lg rounded-full bg-primary/8 blur-3xl" aria-hidden />

      <SectionWrapper
        id="education"
        title="Education"
        subtitle="Academic background and qualifications"
        icon={<span>🎓</span>}
        className="relative z-10"
      >
        <EducationTimeline data={education} />
      </SectionWrapper>
    </div>
  );
}
