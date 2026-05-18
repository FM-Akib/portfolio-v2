"use client";

import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { profile, socialLinks } from "@/data";
import { useGsap, gsap } from "@/lib/use-gsap";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const ref = useGsap<HTMLElement>((ctx) => {
    ctx.add(() => {
      gsap.from("[data-contact-line]", {
        scrollTrigger: { trigger: "[data-contact-line]", start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });
      gsap.from("[data-contact-card]", {
        scrollTrigger: { trigger: "[data-contact-card]", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
      });
    });
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate overflow-hidden border-t border-border"
    >
      {/* Backdrop */}
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 sm:px-10 py-28 sm:py-40">
        {/* Eyebrow row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="meta text-primary">[ 06 ]</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="meta">SAY HELLO · LET&apos;S BUILD</span>
          </div>
          <span className="meta inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Inbox open
          </span>
        </div>

        {/* Editorial statement */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-display text-foreground text-[clamp(3rem,9vw,8.5rem)]">
            <span data-contact-line className="block">
              Got a problem
            </span>
            <span data-contact-line className="block">
              worth <span className="italic-accent text-primary">solving</span>?
            </span>
            <span
              data-contact-line
              className="block text-muted-foreground"
            >
              <span className="italic-accent">Let&apos;s</span> talk.
            </span>
          </h2>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {/* Email card — span 2 */}
          <div
            data-contact-card
            className="group relative md:col-span-2 flex flex-col gap-6 rounded-md border border-border bg-card p-7 sm:p-8 transition-all duration-500 hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="meta text-muted-foreground">{"// primary channel"}</p>
                <h3 className="font-display text-3xl text-foreground mt-1">
                  Email
                </h3>
              </div>
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="font-display text-2xl sm:text-4xl italic text-primary break-all link-underline"
            >
              {profile.email}
            </a>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-border/60">
              <a
                href={`mailto:${profile.email}?subject=Project%20inquiry`}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary"
              >
                Send a brief
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Phone + location stack */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <a
              data-contact-card
              href={`tel:${profile.phone}`}
              className="group relative flex items-start justify-between gap-4 rounded-md border border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:-translate-y-0.5"
            >
              <div>
                <p className="meta text-muted-foreground">{"// direct"}</p>
                <h3 className="font-display text-2xl text-foreground mt-1">
                  Phone
                </h3>
                <p className="mt-3 font-mono text-sm text-foreground">
                  {profile.phone}
                </p>
              </div>
              <Phone className="h-4 w-4 text-muted-foreground transition-transform group-hover:rotate-12" />
            </a>

            <div
              data-contact-card
              className="relative flex items-start justify-between gap-4 rounded-md border border-border bg-card p-6"
            >
              <div>
                <p className="meta text-muted-foreground">{"// based in"}</p>
                <h3 className="font-display text-2xl text-foreground mt-1">
                  Chattogram
                </h3>
                <p className="meta mt-3 text-muted-foreground">
                  Bangladesh · GMT+6 · Remote-friendly
                </p>
              </div>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              data-contact-card
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5"
            >
              <div>
                <p className="meta text-muted-foreground">{"// social"}</p>
                <p className="font-display text-xl italic text-foreground mt-1">
                  {link.name}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
