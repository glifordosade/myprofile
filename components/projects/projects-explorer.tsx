'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ProjectCard } from './projects-card';
import { StaggerGroup } from '@/components/shared/reveal';
import { projects, projectCategories } from '@/data/projects';
import { cn } from '@/lib/utils';

export function ProjectsExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand"
          />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              data-cursor="hover"
              onClick={() => setCategory(cat)}
              className={cn(
                'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                category === cat ? 'border-brand bg-brand text-brand-foreground' : 'border-border text-muted-foreground hover:border-brand hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <StaggerGroup key={category + query} className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </StaggerGroup>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl font-semibold">No projects found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}
