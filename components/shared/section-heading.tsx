import * as React from 'react';
import { Reveal } from './reveal';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: Props) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <div className={cn('mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand', align === 'center' && 'justify-center')}>
            <span className="h-px w-6 bg-brand" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
