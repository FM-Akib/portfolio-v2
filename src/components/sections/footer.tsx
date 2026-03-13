"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Youtube,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { profile, socialLinks } from "@/data";
import { Button } from "@/components/ui/button";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
};

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      {/* CTA band */}
      <div className="relative overflow-hidden bg-primary/5 border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-pattern opacity-30" aria-hidden />
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="container max-w-6xl mx-auto px-4 py-14 sm:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-5"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Open to opportunities
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Let&apos;s build something great together
              </h2>
              <p className="max-w-md mx-auto text-sm text-muted-foreground sm:text-base leading-relaxed">
                Whether it&apos;s a new project, a freelance gig, or just a
                chat — I&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full gap-2 shadow-md shadow-primary/20">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4" />
                  Send an Email
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full gap-2">
                <a href={`tel:${profile.phone}`}>
                  <Phone className="h-4 w-4" />
                  Call Me
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-muted/20">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            {/* Brand */}
            <div>
              <p className="font-semibold text-foreground tracking-tight">FM-Akib</p>
              <p className="text-xs text-muted-foreground mt-0.5">{profile.location}</p>
            </div>

            {/* Contact mini-list */}
            <ul className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors text-xs">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">{profile.location}</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                if (!Icon) return null;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="text-foreground font-medium">FM-Akib</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
