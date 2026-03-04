import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Youtube,
  Facebook,
} from "lucide-react";
import { profile, socialLinks } from "@/data";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
};

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 py-12 sm:py-14 md:py-16">
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center md:gap-12">
          <div>
            <p className="text-foreground text-xl font-semibold tracking-tight">
              {/* {profile.fullName} */}
              Mohammad Fahim Muntasir Akib
            </p>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-relaxed">
              Let&apos;s connect! I&apos;m always open to discussing new
              projects, opportunities, or collaborations. Feel free to reach out
              through any of the channels below.
              {/* {profile.tagline} */}
            </p>
          </div>

          <ul
            role="list"
            className="text-muted-foreground flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
          >
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-foreground transition-colors"
              >
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{profile.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a
                href={`tel:${profile.phone}`}
                className="hover:text-foreground transition-colors"
              >
                {profile.phone}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              if (!Icon) return null;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground rounded-full p-2 transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-medium">FM-Akib</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
