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
  duration: 0.5,
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
        "container scroll-mt-20 px-4 py-12  max-w-6xl mx-auto",
        className,
      )}
    >
      <motion.div
        className="mb-10 sm:mb-14 md:mb-16 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={defaultTransition}
      >
        <div className="inline-flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-3">
            {icon && (
              <span className="flex h-10 w-10 items-center justify-center rounded bg-primary/15 text-primary sm:h-12 sm:w-12">
                {icon}
              </span>
            )}
            <h2 className="text-foreground dark:text-primary text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {title}
            </h2>
          </div>
          {/* <div className="h-1 w-16 rounded-full bg-primary/60" aria-hidden /> */}
        </div>
        {subtitle && (
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ ...defaultTransition, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
