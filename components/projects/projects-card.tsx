import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, GitBranchMinusIcon, Star } from 'lucide-react';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

const statusMap: Record<string, { label: string; className: string }> = {
  live: { label: 'Live', className: 'text-brand' },
  'in-progress': { label: 'In Progress', className: 'text-amber-500' },
  archived: { label: 'Archived', className: 'text-muted-foreground' },
};

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const status = statusMap[project.status];
  return (
    <div
      data-stagger
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-brand/50',
        featured && 'md:flex-row',
      )}
    >
      <Link href={`/projects/${project.slug}`} data-cursor="hover" className={cn('relative block overflow-hidden', featured ? 'md:w-1/2' : 'aspect-16/10')}>
        <div className={cn('relative h-full w-full overflow-hidden', featured && 'aspect-16/11 md:aspect-auto md:h-full')}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-60" />
          {project.featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold text-brand-foreground">
              <Star className="h-3 w-3" /> Featured
            </span>
          )}
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col p-5', featured && 'md:justify-center md:p-8')}>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.category}</span>
          <span className={cn('inline-flex items-center gap-1.5 font-mono text-xs', status.className)}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status.label}
          </span>
        </div>
        <Link href={`/projects/${project.slug}`} data-cursor="hover">
          <h3 className={cn('font-display font-semibold tracking-tight transition-colors group-hover:text-brand', featured ? 'text-2xl md:text-3xl' : 'text-xl')}>
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 6 : 4).map((t) => (
            <span key={t} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 pt-1">
          <Link href={`/projects/${project.slug}`} data-cursor="hover" className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-brand">
            Case study <ArrowUpRight className="h-4 w-4" />
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-cursor="hover" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-brand">
              <GitBranchMinusIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
