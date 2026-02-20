import {
  Code2,
  Braces,
  Atom,
  Server,
  Database,
  Layout,
  Box,
  FileCode,
  CreditCard,
  GitBranch,
  Cpu,
  Palette,
  type LucideIcon,
} from "lucide-react";

export const skillIconMap: Record<string, LucideIcon> = {
  JavaScript: Code2,
  TypeScript: Braces,
  React: Atom,
  "Next.js": Server,
  "Node.js": Server,
  "Express.js": Server,
  MongoDB: Database,
  MySQL: Database,
  "Tailwind CSS": Layout,
  "Redux / Zustand": Box,
  Drizzle: FileCode,
  Redis: Database,
  Stripe: CreditCard,
  Git: GitBranch,
  "C / C++": Cpu,
  HTML: FileCode,
  CSS: Palette,
};

export function getSkillIcon(skillName: string): LucideIcon {
  return skillIconMap[skillName] ?? Code2;
}
