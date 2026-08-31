'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowUpRight, Clock } from 'lucide-react';
import { StaggerGroup, Reveal } from '@/components/shared/reveal';
import { blogPosts, blogCategories, featuredPost } from '@/data/blog';
import { cn } from '@/lib/utils';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function BlogList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const q = query.toLowerCase();
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      {/* Featured */}
      <Reveal>
        <Link href={`/blog/${featuredPost.slug}`} data-cursor="hover" className="group grid overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand/50 lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            <Image src={featuredPost.cover} alt={featuredPost.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
            <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">Featured</span>
          </div>
          <div className="flex flex-col justify-center p-8">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-brand">
              <span>{featuredPost.category}</span>
              <span className="text-muted-foreground">{formatDate(featuredPost.date)}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-brand">{featuredPost.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{featuredPost.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">Read article <ArrowUpRight className="h-4 w-4" /></span>
          </div>
        </Link>
      </Reveal>

      {/* Filters */}
      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand" />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {blogCategories.map((cat) => (
            <button key={cat} type="button" data-cursor="hover" onClick={() => setCategory(cat)} className={cn('whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors', category === cat ? 'border-brand bg-brand text-brand-foreground' : 'border-border text-muted-foreground hover:border-brand hover:text-foreground')}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <StaggerGroup key={category + query} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link data-stagger key={post.slug} href={`/blog/${post.slug}`} data-cursor="hover" className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/50">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={post.cover} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-brand">
                <span>{post.category}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{post.readingTime}m</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <span className="mt-4 font-mono text-xs text-muted-foreground">{formatDate(post.date)}</span>
            </div>
          </Link>
        ))}
      </StaggerGroup>
    </div>
  );
}
