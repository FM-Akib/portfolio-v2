import type { MetadataRoute } from "next";
import { profile } from "@/data";

const sections = [
  "",
  "#experience",
  "#skills",
  "#projects",
  "#education",
  "#achievements",
  "#about",
  "#contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return sections.map((section) => ({
    url: `${profile.siteUrl}/${section}`,
    lastModified,
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
