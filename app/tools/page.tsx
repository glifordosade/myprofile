import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal, StaggerGroup } from '@/components/shared/reveal';
import { toolCategories } from '@/data/tools';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'The apps and tools I use every day for development, design, databases, DevOps, and productivity.',
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader eyebrow="My Setup" title="Daily drivers." description="The software I reach for every day to design, build, and ship." />

      <section className="py-20">
        <div className="container-wide space-y-16">
          {toolCategories.map((cat) => (
            <div key={cat.id}>
              <Reveal>
                <h2 className="mb-8 flex items-center gap-3 font-display text-2xl font-semibold tracking-tight">
                  <span className="font-mono text-sm text-brand">/{cat.id}</span>
                  {cat.title}
                </h2>
              </Reveal>
              <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cat.tools.map((tool) => {
                  const Wrapper: any = tool.url ? 'a' : 'div';
                  const props = tool.url ? { href: tool.url, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <Wrapper
                      data-stagger
                      data-cursor="hover"
                      key={tool.name}
                      {...props}
                      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
                    >
                      <img src={`https://cdn.simpleicons.org/${tool.icon}`} alt="" className="h-8 w-8 shrink-0 opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" loading="lazy" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 font-display font-semibold transition-colors group-hover:text-brand">
                          {tool.name}
                          {tool.url && <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
