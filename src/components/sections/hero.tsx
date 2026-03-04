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

const roleWords = [
  "Full-Stack Developer",
  "Software Engineer",
  "Problem Solver",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="container flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-10 sm:py-16 md:flex-row md:gap-16 md:py-20 lg:py-24 max-w-6xl mx-auto"
    >
      {/* Left content */}
      <div className="flex flex-col items-center gap-6 md:items-start md:gap-7">
        {/* Greeting + Name */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Welcome to my portfolio
          </span>
          <h1 className="font-display text-foreground text-center text-3xl font-bold tracking-tight md:text-left md:text-4xl lg:text-5xl xl:text-6xl">
            Hey, I&apos;m <span className="text-primary">Muntasir Akib</span>
          </h1>
          <div className="text-lg font-medium md:text-xl min-h-10 flex items-center text-muted-foreground">
            I&apos;m a <FlipWords words={roleWords} duration={3500} />
          </div>
        </div>

        {/* Compelling description */}
        <p className="max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-left md:text-lg">
          I build scalable digital products that solve real problems — from
          crafting seamless frontends to engineering robust backend
          architectures. Whether it&apos;s a{" "}
          <span className="relative inline-block font-semibold text-foreground">
            SaaS platform
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary/60" />
          </span>
          {", "}
          <span className="relative inline-block font-semibold text-foreground">
            eCommerce system
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary/60" />
          </span>
          {", or a "}
          <span className="relative inline-block font-semibold text-foreground">
            real-time application
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary/60" />
          </span>{" "}
          — I turn complex challenges into elegant, production-ready solutions.
        </p>

        {/* Stats bar */}
        <div className="flex items-center gap-6 text-center md:gap-8">
          <div>
            <p className="text-2xl font-bold text-foreground lg:text-3xl">
              600+
            </p>
            <p className="text-xs text-muted-foreground">Problems Solved</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground lg:text-3xl">
              10+
            </p>
            <p className="text-xs text-muted-foreground">Projects Built</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground lg:text-3xl">3+</p>
            <p className="text-xs text-muted-foreground">Hackathon Wins</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Button asChild size="lg" className="rounded-full">
            <Link href="#contact">
              Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground mr-1">
            Find me on
          </span>
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            if (!Icon) return null;
            return (
              <Button
                key={link.name}
                variant="outline"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:border-primary/50 rounded-full h-9 w-9 transition-colors"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Right image */}
      <div className="relative flex shrink-0 justify-center md:justify-end">
        <div className="relative h-64 w-64 overflow-hidden   border-primary/20   md:h-96 md:w-96">
          <Image
            src={profile.avatar}
            alt={profile.fullName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 256px, 384px"
          />
        </div>
        {/* Decorative ring */}
        {/* <div className="absolute inset-0 h-64 w-64  animate-[spin_25s_linear_infinite] md:h-96 md:w-96" /> */}
      </div>
    </section>
  );
}
