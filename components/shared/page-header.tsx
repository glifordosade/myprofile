'use client';

import { Reveal } from './reveal';

type Props = { eyebrow: string; title: string; description?: string };

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-16 pt-32">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-40" />
      <div className="absolute right-[-5%] top-10 -z-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="container-wide">
        <Reveal>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-brand">
            <span className="h-px w-6 bg-brand" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tighter text-balance md:text-7xl">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
