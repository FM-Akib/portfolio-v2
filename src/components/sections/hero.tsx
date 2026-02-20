"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Youtube,
  Facebook,
  ArrowRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { profile, socialLinks } from "@/data";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
};

const taglineWords = [
  "FULL-STACK DEVELOPER",
  "MERN STACK",
  "SOFTWARE ENGINEER",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="container flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 px-4 py-12 sm:gap-8 sm:py-16 md:flex-row md:gap-12 md:py-20 lg:py-24 max-w-6xl mx-auto"
    >
      <div className="flex flex-col items-center gap-6 md:items-start md:gap-8">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <h1 className="text-foreground text-center text-3xl font-bold tracking-tight md:text-left md:text-4xl lg:text-5xl">
            {profile.fullName}
          </h1>
          <p className="text-lg font-medium md:text-xl min-h-10 flex items-center">
            <FlipWords words={taglineWords} duration={3500} />
          </p>
        </div>

        <p className="text-muted-foreground max-w-xl text-center text-base leading-relaxed md:text-left">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Button asChild size="lg" className="rounded-full">
            <Link href="#contact">
              Contact Me <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            if (!Icon) return null;
            return (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground rounded-full"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="relative flex shrink-0 justify-center md:justify-end">
        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-border md:h-80 md:w-80">
          <Image
            src={profile.avatar}
            alt={profile.fullName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 256px, 320px"
          />
        </div>
      </div>
    </section>
  );
}
