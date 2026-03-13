import { SectionWrapper } from "./section-wrapper";
import { experience } from "@/data";
import { ExperienceTimeline } from "./experience-timeline";

export function Experience() {
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
      {/* Tinted base */}
      <div className="absolute inset-0 bg-muted/50 dark:bg-muted/30" aria-hidden />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl dark:bg-primary/8" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-56 w-56 rounded-full bg-primary/8 blur-3xl" aria-hidden />

      <SectionWrapper
        id="experience"
        title="Work Experience"
        subtitle="Professional roles and contributions across my career"
        icon={<span>✨</span>}
        className="relative z-10"
      >
        <ExperienceTimeline data={experience} />
      </SectionWrapper>
    </div>
  );
}
