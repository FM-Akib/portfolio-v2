"use client";

import { profile, socialLinks } from "@/data";
import { ArrowUp } from "lucide-react";

const FOOT_WORDS = [
  "Made with care",
  "Built in Chattogram",
  "TypeScript-first",
  "Quality over hype",
  "Available for hire",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/40">
      {/* Giant signature marquee */}
      <div className="border-b border-border overflow-hidden">
        <div className="flex marquee-track-reverse whitespace-nowrap py-6">
          {[...Array(2)].flatMap((_, i) =>
            FOOT_WORDS.map((w) => (
              <span
                key={`${i}-${w}`}
                className="font-display text-4xl sm:text-6xl px-8 flex items-center gap-8 text-foreground"
              >
                <span className="italic-accent text-muted-foreground">— </span>
                {w}
                <span aria-hidden className="text-primary text-2xl">
                  ✦
                </span>
              </span>
            )),
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 py-12">
        <div className="grid gap-10 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <p className="font-display text-5xl sm:text-6xl text-foreground leading-none">
              Akib<span className="italic-accent text-primary">.dev</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Engineering production software in Chattogram, Bangladesh —
              one carefully shipped feature at a time.
            </p>
          </div>

          <div className="sm:col-span-3">
            <p className="meta text-muted-foreground mb-4">{"// navigate"}</p>
            <ul className="space-y-2">
              {[
                ["#work", "Work"],
                ["#skills", "Stack"],
                ["#projects", "Projects"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-display text-xl text-foreground hover:text-primary transition-colors link-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-4">
            <p className="meta text-muted-foreground mb-4">{"// elsewhere"}</p>
            <ul className="space-y-2">
              {socialLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl text-foreground hover:text-primary transition-colors link-underline"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 block"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="meta text-muted-foreground">
            © {new Date().getFullYear()} FAHIM MUNTASIR AKIB · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-3">
            <span className="meta text-muted-foreground">
              FM-001 / TYPESET IN INSTRUMENT + GEIST
            </span>
            <a
              href="#hero"
              aria-label="Back to top"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
