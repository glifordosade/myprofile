import type { Metadata } from 'next';
import  Image  from "next/image";
import { PageHeader } from '@/components/shared/page-header';
import { Reveal, StaggerGroup } from '@/components/shared/reveal';
import { skillCategories } from '@/data/skills';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technologies and tools I work with across the stack — languages, frontend, backend, databases, AI, and DevOps.',
};

function Familiarity({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Familiarity ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn('h-1.5 w-4 rounded-full', i < level ? 'bg-brand' : 'bg-border')} />
      ))}
    </div>
  );
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills & Stack"
        title="Tools of the trade."
        description="A snapshot of the technologies I use. The bars reflect how comfortable I am — not a claim to mastery."
      />

      <section className="py-20">
        <div className="container-wide space-y-16">
          {skillCategories.map((cat) => (
            <div key={cat.id}>
              <Reveal>
                <div className="mb-8 flex flex-col gap-1 border-b border-border pb-4">
                  <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{cat.title}</h2>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>
              </Reveal>
              <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.skills.map((s) => (
                  <div
                    data-stagger
                    key={s.name}
                    data-cursor="hover"
                    className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-brand">{s.name}</h3>
                      <Image
                            src={`https://cdn.simpleicons.org/${s.icon}`}
                            alt=""
                            className="h-6 w-6 opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                            loading="lazy"
                            />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                    <div className="mt-4">
                      <Familiarity level={s.level} />
                    </div>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
