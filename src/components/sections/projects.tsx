"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { projects } from "@/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="Handpicked projects showcasing real-world problem solving"
      icon={<span>🚀</span>}
    >
      <div className="mx-auto grid max-w-7xl gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Card className="border-border bg-card text-card-foreground flex flex-col overflow-hidden transition-shadow hover:shadow-lg pt-0">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={project.img}
                  alt={project.projectName}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
                <h3 className="text-foreground text-lg font-semibold leading-tight">
                  {project.projectName}
                </h3>
                <span className="text-muted-foreground flex items-center gap-1 text-xs shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.projectDate}
                </span>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {project.keyFeature.slice(0, 2).map((feature, i) => (
                  <div key={i}>
                    <span className="text-foreground text-sm font-medium">
                      {feature.title}:
                    </span>{" "}
                    <span className="text-muted-foreground text-sm">
                      {feature.description}
                    </span>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.skillsArray.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 border-t border-border pt-4">
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.LiveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
                {project.githubLink && (
                  <Button size="sm" variant="ghost" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Client
                    </a>
                  </Button>
                )}
                {project.githubServer && (
                  <Button size="sm" variant="ghost" asChild>
                    <a
                      href={project.githubServer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Server
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
