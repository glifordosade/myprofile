import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal } from '@/components/shared/reveal';
import { experiences } from '@/data/experience';
import { MapPin, Briefcase, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional journey — roles, responsibilities, and achievements over the years.',
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Where I've worked." description="Roles, responsibilities, and the things I'm proud of shipping." />

      <section className="py-20">
        <div className="container-wide">
          <div className="relative ml-3 border-l border-border md:ml-0 md:pl-0">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.05}>
                <div className="relative grid gap-6 pb-14 pl-8 md:grid-cols-[200px_1fr] md:gap-10 md:pl-12">
                  <span className="absolute left-0 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center">
                    <span className="h-4 w-4 rounded-full border-2 border-brand bg-background" />
                    <span className="absolute h-2 w-2 rounded-full bg-brand" />
                  </span>
                  <div className="md:text-right">
                    <div className="font-mono text-sm text-brand">{exp.startDate} — {exp.endDate}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground md:justify-end">
                      <MapPin className="h-3.5 w-3.5" /> {exp.location}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground md:justify-end">
                      <Briefcase className="h-3.5 w-3.5" /> {exp.type}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-xl font-semibold">{exp.position}</h3>
                    <p className="text-brand">{exp.organization}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>

                    <div className="mt-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Responsibilities</h4>
                      <ul className="mt-2 space-y-1.5">
                        {exp.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h4 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        <Trophy className="h-3.5 w-3.5" /> Achievements
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {exp.achievements.map((a) => (
                          <li key={a} className="flex gap-2 text-sm text-foreground">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.technologies.map((t) => (
                        <span key={t} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
