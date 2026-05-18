"use client";

import { useGsap, gsap } from "@/lib/use-gsap";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  index?: string; // e.g. "02"
  eyebrow?: string; // small mono label e.g. "WORK / 2021—NOW"
  title: React.ReactNode;
  italic?: React.ReactNode; // optional italic accent in the title
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionWrapper({
  id,
  index,
  eyebrow,
  title,
  italic,
  subtitle,
  children,
  className,
  align = "left",
}: SectionWrapperProps) {
  const ref = useGsap<HTMLElement>((ctx) => {
    ctx.add(() => {
      gsap.from("[data-reveal='header'] > *", {
        scrollTrigger: {
          trigger: "[data-reveal='header']",
          start: "top 85%",
        },
        y: 36,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative scroll-mt-20 px-6 sm:px-10 py-24 sm:py-32 max-w-[1320px] mx-auto",
        className,
      )}
    >
      <div
        data-reveal="header"
        className={cn(
          "mb-16 sm:mb-20 grid gap-6",
          align === "center"
            ? "place-items-center text-center"
            : "grid-cols-1 md:grid-cols-12 items-end",
        )}
      >
        {/* Eyebrow + index column */}
        {(eyebrow || index) && (
          <div
            className={cn(
              "flex items-center gap-4",
              align === "left" && "md:col-span-4",
            )}
          >
            {index && (
              <span className="meta text-primary">[ {index} ]</span>
            )}
            {eyebrow && (
              <>
                <span aria-hidden className="h-px w-8 bg-border" />
                <span className="meta">{eyebrow}</span>
              </>
            )}
          </div>
        )}

        {/* Title column */}
        <h2
          className={cn(
            "text-display text-foreground text-5xl sm:text-6xl md:text-7xl",
            align === "left" && "md:col-span-8",
          )}
        >
          {title}
          {italic && (
            <>
              <br />
              <span className="italic-accent text-primary">{italic}</span>
            </>
          )}
        </h2>

        {/* Subtitle row */}
        {subtitle && (
          <p
            className={cn(
              "max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed",
              align === "left" && "md:col-span-8 md:col-start-5",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
