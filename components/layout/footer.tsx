import Link from 'next/link';
import { GitBranchIcon, LinkIcon, MailBadgeIcon, Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { navItems } from '@/data/navigation';

const socialIcons: Record<string, any> = { GitBranchIcon, LinkIcon, MailBadgeIcon, Mail };

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/40">
      <div className="container-wide py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              {profile.name}<span className="text-brand">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{profile.shortIntro}</p>
            <div className="mt-6 flex gap-3">
              {profile.socials.map((s) => {
                const Icon = socialIcons[s.icon] ?? Mail;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-cursor="hover"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Navigate</h3>
            <ul className="mt-4 space-y-2">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} data-cursor="hover" className="text-sm text-muted-foreground transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Get in touch</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${profile.workEmail}`} data-cursor="hover" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand">
                  {profile.workEmail} <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/contact" data-cursor="hover" className="text-sm text-muted-foreground transition-colors hover:text-brand">
                  Contact form
                </Link>
              </li>
              <li>
                <Link href="/resume" data-cursor="hover" className="text-sm text-muted-foreground transition-colors hover:text-brand">
                  Download resume
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, GSAP &amp; Three.js.</p>
          <p className="font-mono">Designed &amp; developed with intent.</p>
        </div>
      </div>
    </footer>
  );
}
