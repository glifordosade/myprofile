import * as React from "react";
import { GitBranch, Link2, MessageCircle, Mail, ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Featured Projects", href: "/projects" },
  { label: "Professional Experience", href: "/experience" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/glifordosade",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zhafarul-maahiy",
    icon: Link2,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6285762045359",
    icon: MessageCircle,
  },
  {
    label: "Email",
    href: "mailto:mzhafarulmaahiy@gmail.com",
    icon: Mail,
  },
];

export interface FooterProps {
  className?: string;
  class?: string;
}

export function Footer({ className, class: classProp }: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-border/40 bg-background/80 backdrop-blur-sm font-mono",
        className,
        classProp
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-primary font-black text-lg select-none">&gt;</span>
              <span className="text-foreground font-bold text-lg tracking-tight">Zhafa</span>
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Bachelor of Informatics graduate from Andalas University (Cumlaude). Specializing in Data Science, Deep Learning, and Full-Stack Software Development.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2 mt-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]",
                    "border border-border/60 bg-secondary/50 text-muted-foreground",
                    "hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
                    "transition-all duration-200"
                  )}
                >
                  <Icon strokeWidth={1.5} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-widest uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      "text-sm text-muted-foreground hover:text-primary transition-colors duration-200",
                      "inline-flex items-center gap-1.5 group"
                    )}
                  >
                    <span className="text-primary/50 group-hover:text-primary transition-colors duration-200 select-none">
                      //
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-widest uppercase">
              Get In Touch
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open for freelance projects, collaborations, and exciting engineering challenges.
            </p>
            <a
              href="mailto:contact@zhafa.dev"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-primary font-medium",
                "hover:underline underline-offset-4 transition-all duration-200 group"
              )}
            >
              <Mail strokeWidth={1.5} className="h-4 w-4" />
              mzhafarulmaahiy@gmail.com
              <ExternalLink
                strokeWidth={1.5}
                className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono select-none">
            &copy; 2026 Muhammad Zhafarul Maahiy. Built with Astro, React, Tailwind &amp; shadcn.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Code2 strokeWidth={1.5} className="h-3.5 w-3.5" />
            <span>Crafted with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
