import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal, StaggerGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { profile, stats, timeline, education } from '@/data/profile';
import { Compass, GraduationCap, Target, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${profile.name} — background, philosophy, and what I'm focused on.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Me" title="The person behind the code." description={profile.tagline} />

      <section className="py-20">
        <div className="container-wide grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-foreground">{profile.longIntro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand">
                  <Compass className="h-4 w-4" /> Philosophy
                </div>
                <p className="leading-relaxed text-muted-foreground">{profile.philosophy}</p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <div>
                  <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand">
                    <Target className="h-4 w-4" /> Current Focus
                  </div>
                  <ul className="space-y-2">
                    {profile.currentFocus.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div>
                  <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand">
                    <Heart className="h-4 w-4" /> Interests
                  </div>
                  <ul className="space-y-2">
                    {profile.interests.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-2 gap-4 self-start">
            {stats.map((s) => (
              <div data-stagger key={s.label} className="rounded-xl border border-border bg-card p-6">
                <div className="font-display text-4xl font-bold tracking-tight text-brand">
                  {s.value}
                  <span>{s.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container-wide">
          <SectionHeading eyebrow="Journey" title="A short timeline" />
          <div className="mt-12 space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="group grid grid-cols-[80px_1fr] gap-6 border-l border-border py-6 pl-6 md:grid-cols-[120px_1fr] md:gap-10">
                  <div className="-ml-[1.65rem] flex items-start gap-4 md:-ml-[2.15rem]">
                    <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-brand bg-background transition-colors group-hover:bg-brand" />
                    <span className="font-display text-lg font-bold text-brand">{t.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                    <p className="mt-1 text-muted-foreground">{t.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container-wide">
          <SectionHeading eyebrow="Education" title="Where I learned" />
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {education.map((e) => (
              <div data-stagger key={e.institution} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{e.period}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{e.degree}</h3>
                <p className="text-brand">{e.institution}</p>
                {e.description && <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>}
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
