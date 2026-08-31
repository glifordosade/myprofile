import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal } from '@/components/shared/reveal';
import { ContactForm } from '@/components/contact/contact-form';
import { profile } from '@/data/profile';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} — available for freelance and full-time opportunities.`,
};

const socialIcons: Record<string, any> = { Github, Linkedin, Twitter, Mail };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's work together." description="Have a project, role, or idea in mind? Drop me a message and I'll get back to you." />

      <section className="py-16">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold">Get in touch</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <a href={`mailto:${profile.workEmail}`} data-cursor="hover" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand"><Mail className="h-5 w-5" /></span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                  <div className="font-medium transition-colors group-hover:text-brand">{profile.workEmail}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand"><MapPin className="h-5 w-5" /></span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                  <div className="font-medium">{profile.location}</div>
                </div>
              </div>

              <div>
                <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Elsewhere</div>
                <div className="flex gap-3">
                  {profile.socials.map((s) => {
                    const Icon = socialIcons[s.icon] ?? Mail;
                    return (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-cursor="hover" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand">
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
