export interface Profile {
  fullName: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatar: string;
  bio: string;
  siteUrl: string;
  strengths?: string;
  coCurricular?: string[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface Project {
  projectName: string;
  img: string;
  img2?: string;
  keyFeature: KeyFeature[];
  projectDate: string;
  skillsArray: string[];
  githubLink?: string;
  githubServer?: string;
  LiveLink: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Tools";

export interface Skill {
  skillName: string;
  img: string;
  yearOfExperience: number;
  description: string;
  level: string;
  category: SkillCategory;
  icon: string; // simple-icons CDN slug
  darkInvert?: boolean; // invert logo in dark mode (black-on-dark logos)
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  result?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Achievement {
  competitionTitle: string;
  img: string;
  position: string;
  description: string;
}

export interface Certificate {
  certificateName: string;
  img: string;
}

export interface ProblemSolvingLink {
  name: string;
  handle: string;
  url: string;
}
