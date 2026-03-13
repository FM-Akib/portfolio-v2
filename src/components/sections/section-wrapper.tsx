"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const defaultTransition = {
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export function SectionWrapper({
  id,
  title,
  subtitle,
  icon,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "container scroll-mt-20 px-4 py-16 sm:py-20 max-w-6xl mx-auto",
        className,
      )}
    >
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={defaultTransition}
      >
        <div className="flex flex-col items-center gap-3">
          {icon && (
            <div className="mb-1 text-3xl sm:text-4xl leading-none select-none">
              {icon}
            </div>
          )}
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {/* Accent underline */}
          <div className="flex items-center gap-2 mt-1">
            <div className="h-0.5 w-8 rounded-full bg-primary/40" />
            <div className="h-1 w-10 rounded-full bg-primary" />
            <div className="h-0.5 w-8 rounded-full bg-primary/40" />
          </div>
          {subtitle && (
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ ...defaultTransition, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
