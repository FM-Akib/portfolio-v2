import { GraduationCap } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { education } from "@/data";
import { EducationTimeline } from "./education-timeline";

export function Education() {
  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="Academic background"
      icon={<GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />}
    >
      <EducationTimeline data={education} expandMode="multi" />
    </SectionWrapper>
  );
}
