import { Briefcase } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { experience } from "@/data";
import { ExperienceTimeline } from "./experience-timeline";

export function Experience() {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Professional and teaching experience"
      icon={<Briefcase className="h-6 w-6 sm:h-7 sm:w-7" />}
    >
      <ExperienceTimeline data={experience} />
    </SectionWrapper>
  );
}
