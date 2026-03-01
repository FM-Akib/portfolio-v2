import { SectionWrapper } from "./section-wrapper";
import { skills } from "@/data";
import { getSkillIcon } from "@/data/skill-icons";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      title="Technical Skills"
      subtitle="Technologies, frameworks, and tools in my development toolkit"
      icon={<span>🛠️</span>}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {skills.map((skill) => {
          const Icon = getSkillIcon(skill.skillName);
          return (
            <div
              key={skill.skillName}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 sm:p-6 text-center",
                "transition-all duration-300 ease-out",
                "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
                "focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2 focus-within:ring-offset-background",
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl",
                  "bg-primary/10 text-primary transition-colors duration-300",
                  "group-hover:bg-primary/20 group-hover:scale-105",
                )}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <span className="text-foreground text-sm font-semibold leading-tight">
                {skill.skillName}
              </span>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
