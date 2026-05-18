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
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, socialLinks } from "@/data";
import { useGsap, gsap } from "@/lib/use-gsap";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
};

const MARQUEE_ITEMS = [
  "Full-Stack",
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "MongoDB",
  "Postgres",
  "Stripe",
  "WebSockets",
  "Available for hire",
  "Chattogram → World",
];

export function Hero() {
  const ref = useGsap<HTMLElement>((ctx) => {
    ctx.add(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero='eyebrow']", { y: 30, opacity: 0, duration: 0.7 })
        .from(
          "[data-hero='line']",
          { y: 80, opacity: 0, duration: 1, stagger: 0.08 },
          "-=0.45",
        )
        .from("[data-hero='lede']", { y: 24, opacity: 0, duration: 0.8 }, "-=0.55")
        .from(
          "[data-hero='meta'] > *",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.55",
        )
        .from(
          "[data-hero='cta']",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5",
        )
        .from(
          "[data-hero='portrait']",
          { scale: 0.92, opacity: 0, rotate: -3, duration: 1.1, ease: "expo.out" },
          "-=0.8",
        )
        .from(
          "[data-hero='ticker']",
          { y: 24, opacity: 0, duration: 0.7 },
          "-=0.4",
        );

      // Floating portrait
      gsap.to("[data-hero='portrait']", {
        y: -12,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-24"
    >
      {/* Backdrop layers */}
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div
        className="vignette pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10">
        {/* ─── Left: text ─── */}
        <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10">
          {/* Eyebrow */}
          <div
            data-hero="eyebrow"
            className="flex flex-wrap items-center gap-3"
          >
            <span className="meta inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available — Q3 2026
            </span>
            <span className="meta text-muted-foreground inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </span>
          </div>

          {/* Display lockup */}
          <h1 className="text-display text-foreground text-[clamp(3.5rem,10vw,9rem)]">
            <span data-hero="line" className="block">
              Muntasir
            </span>
            <span data-hero="line" className="block">
              <span className="italic-accent text-primary">Akib</span>
              <span className="meta text-muted-foreground align-top ml-3 hidden sm:inline-block">
                — full-stack
              </span>
            </span>
            <span
              data-hero="line"
              className="block text-muted-foreground"
            >
              <span className="italic-accent">building</span>{" "}
              <span className="text-foreground">things</span>.
            </span>
          </h1>

          {/* Lede */}
          <p
            data-hero="lede"
            className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            I engineer SaaS platforms, multivendor marketplaces, and
            payment-grade systems — translating ambiguous problems into{" "}
            <span className="italic-accent text-foreground">
              precise, production-ready
            </span>{" "}
            software. Currently architecting Office-X & Vimz at RILO.
          </p>

          {/* Meta strip — three stats */}
          <div
            data-hero="meta"
            className="grid grid-cols-3 max-w-md border-t border-b border-border/80 divide-x divide-border/80"
          >
            <Stat value="600+" label="Problems Solved" />
            <Stat value="10+" label="Shipped Projects" />
            <Stat value="3×" label="Hackathon Wins" />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              data-hero="cta"
              asChild
              size="lg"
              className="group rounded-full gap-2 pl-5 pr-4 h-11 shadow-md shadow-primary/20"
            >
              <Link href="#contact">
                Start a project
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Button>
            <Button
              data-hero="cta"
              asChild
              size="lg"
              variant="outline"
              className="rounded-full gap-2 h-11"
            >
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
              </a>
            </Button>
            <div
              data-hero="cta"
              className="flex items-center gap-1.5 pl-1"
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                if (!Icon) return null;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Right: portrait ─── */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div
            data-hero="portrait"
            className="relative w-full max-w-md"
          >
            {/* Index ticker — bottom row */}
            <span className="meta absolute -left-2 -top-2 rotate-[-3deg] rounded-sm bg-primary px-2 py-1 text-primary-foreground shadow-md z-20">
              FM/001 · 2026
            </span>

            {/* The polaroid frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-card shadow-2xl shadow-foreground/10 rotate-[1.5deg]">
              <Image
                src={profile.avatar}
                alt={profile.fullName}
                fill
                priority
                className="object-cover object-top grayscale-[15%] saturate-[1.05]"
                sizes="(max-width: 1024px) 80vw, 480px"
              />
              {/* Inner caption */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 text-white">
                <div>
                  <p className="font-display text-2xl italic leading-none">
                    Akib
                  </p>
                  <p className="meta opacity-80 mt-1.5">Chattogram · BD</p>
                </div>
                <span className="meta rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur">
                  PORTRAIT_01
                </span>
              </div>
            </div>

            {/* Floating annotation cards */}
            <div className="absolute -left-6 sm:-left-12 top-12 z-20 rotate-[-6deg] hidden sm:block">
              <div className="rounded-sm border border-border bg-card px-3 py-2 shadow-lg">
                <p className="meta text-muted-foreground">{"// stack"}</p>
                <p className="font-display text-lg text-foreground italic">
                  React · Node
                </p>
              </div>
            </div>

            <div className="absolute -right-4 sm:-right-10 bottom-20 z-20 rotate-[5deg] hidden sm:block">
              <div className="rounded-sm border border-border bg-card px-3 py-2 shadow-lg">
                <p className="meta text-muted-foreground">{"// shipping"}</p>
                <p className="font-display text-lg italic">
                  <span className="text-primary">Office-X</span>{" "}
                  <span className="text-foreground">+ Vimz</span>
                </p>
              </div>
            </div>

            {/* Bottom signature line */}
            <div className="mt-6 flex items-center justify-between">
              <span className="meta text-muted-foreground">
                ↑ signed_by_akib
              </span>
              <span className="meta text-muted-foreground">EST. 2021</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Marquee ticker ─── */}
      <div
        data-hero="ticker"
        className="mt-20 sm:mt-28 border-y border-border overflow-hidden bg-card/40"
      >
        <div className="flex marquee-track whitespace-nowrap py-4">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-display text-3xl sm:text-4xl px-8 flex items-center gap-8 text-foreground"
            >
              <span>{item}</span>
              <span aria-hidden className="text-primary text-2xl">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-3 first:pl-0">
      <p className="font-display text-3xl sm:text-4xl text-foreground leading-none">
        {value}
      </p>
      <p className="meta mt-1 text-muted-foreground">{label}</p>
    </div>
  );
}
