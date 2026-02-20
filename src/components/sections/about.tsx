import Image from "next/image";
import { User } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { problemSolvingLinks, problemSolvingBio, profile } from "@/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function About() {
  return (
    <SectionWrapper
      id="about"
      title="About"
      subtitle="Problem solving journey and a bit about me"
      icon={<User className="h-6 w-6 sm:h-7 sm:w-7" />}
    >
      <div className="mx-auto max-w-5xl">
        <Card className="border-border bg-card text-card-foreground overflow-hidden py-0">
          <div className="grid gap-6 md:grid-cols-5">
            <div className="relative h-64 w-full md:col-span-2 md:h-full min-h-50">
              <Image
                src="https://i.ibb.co.com/bKcKMvT/photo-2024-10-04-00-31-35.jpg"
                alt="Fahim Muntasir Akib"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:col-span-3 md:p-8">
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {problemSolvingBio}
              </p>
              {profile.strengths && (
                <p className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    Strengths:{" "}
                  </span>
                  {profile.strengths}
                </p>
              )}
              {profile.coCurricular && profile.coCurricular.length > 0 && (
                <div>
                  <p className="text-foreground mb-1 text-sm font-medium">
                    Co-curricular
                  </p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-0.5 text-sm">
                    {profile.coCurricular.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-col gap-2">
                {problemSolvingLinks.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="text-foreground font-medium">
                      {item.name} — {item.handle}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto"
                      asChild
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        <ExternalLink className="mr-1 h-3.5 w-3.5" />
                        Open
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  );
}
