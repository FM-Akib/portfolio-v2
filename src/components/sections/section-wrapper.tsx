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
        "container scroll-mt-20 px-4 py-16 max-w-6xl mx-auto",
        className,
      )}
    >
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={defaultTransition}
      >
        <div className="flex flex-col items-center gap-2">
          {icon && (
            <div className="mb-2 text-3xl sm:text-4xl leading-none select-none">
              {icon}
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ ...defaultTransition, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
