import { SectionWrapper } from "./section-wrapper";
import { education } from "@/data";
import { EducationTimeline } from "./education-timeline";

export function Education() {
  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="Academic background and qualifications"
      icon={<span>🎓</span>}
    >
      <EducationTimeline data={education} />
    </SectionWrapper>
  );
}
