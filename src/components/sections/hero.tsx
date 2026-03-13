"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Youtube,
  Facebook,
  ArrowRight,
  Download,
  ChevronDown,
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

const FLOAT_BADGES = [
  { label: "React", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", pos: "top-4 -left-8 sm:-left-12" },
  { label: "Next.js", color: "bg-foreground/5 text-foreground border-border", pos: "top-1/3 -right-6 sm:-right-10" },
  { label: "Node.js", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20", pos: "bottom-16 -left-6 sm:-left-10" },
  { label: "TypeScript", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20", pos: "bottom-4 -right-4 sm:-right-8" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.2 },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-pattern flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-24"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/8 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-primary/6 blur-2xl" aria-hidden />
      <div className="container max-w-6xl mx-auto flex flex-col items-center gap-10 sm:gap-12 md:flex-row md:gap-16">
      {/* Left content */}
      <motion.div
        className="flex flex-col items-center gap-6 md:items-start md:gap-7 flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting pill */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 md:items-start">
          <h1 className="font-display text-foreground text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl lg:text-6xl">
            Hey, I&apos;m{" "}
            <span className="text-primary">
              Muntasir Akib
            </span>
          </h1>
          <div className="text-base font-medium md:text-lg min-h-8 flex items-center text-muted-foreground">
            I&apos;m a <FlipWords words={roleWords} duration={3500} />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground md:text-left md:text-base"
        >
          I build scalable digital products that solve real problems — from
          crafting seamless frontends to engineering robust backend
          architectures. Turning complex challenges into elegant,
          production-ready solutions.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6 text-center md:gap-8"
        >
          <div>
            <p className="text-2xl font-bold text-foreground lg:text-3xl">600+</p>
            <p className="text-xs text-muted-foreground mt-0.5">Problems Solved</p>
          </div>
          <div className="h-8 w-px bg-border shrink-0" />
          <div>
            <p className="text-2xl font-bold text-foreground lg:text-3xl">10+</p>
            <p className="text-xs text-muted-foreground mt-0.5">Projects Built</p>
          </div>
          <div className="h-8 w-px bg-border shrink-0" />
          <div>
            <p className="text-2xl font-bold text-foreground lg:text-3xl">3+</p>
            <p className="text-xs text-muted-foreground mt-0.5">Hackathon Wins</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
        >
          <Button asChild size="lg" className="rounded-full gap-2 px-6 shadow-md shadow-primary/20">
            <Link href="#contact">
              Let&apos;s Talk <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full gap-2 px-6"
          >
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <Download className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2"
        >
          <span className="text-xs font-medium text-muted-foreground">
            Find me on
          </span>
          <div className="flex items-center gap-1.5">
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
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-sm hover:-translate-y-0.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Right — profile image */}
      <motion.div
        className="relative flex shrink-0 items-center justify-center"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glow */}
        <div className="absolute inset-[-15%] rounded-full bg-primary/15 blur-3xl" />

        {/* Static ring */}
        <div className="absolute inset-[-4px] rounded-full border-2 border-primary/20" />

        {/* Spinning arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-4px] rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
        />

        {/* Image container */}
        <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
          <Image
            src={profile.avatar}
            alt={profile.fullName}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
          />
        </div>

        {/* Floating tech badges */}
        {FLOAT_BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            className={`absolute ${badge.pos} hidden sm:block`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { delay: 0.8 + i * 0.15, duration: 0.4 },
              scale: { delay: 0.8 + i * 0.15, duration: 0.4 },
              y: {
                delay: 1.2 + i * 0.2,
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-lg backdrop-blur-sm ${badge.color}`}
            >
              {badge.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
