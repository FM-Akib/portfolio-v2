import { SectionWrapper } from "./section-wrapper";
import { experience } from "@/data";
import { ExperienceTimeline } from "./experience-timeline";

export function Experience() {
  return (
    <div className="relative overflow-hidden bg-muted/30">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-pattern opacity-40" aria-hidden />
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

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
