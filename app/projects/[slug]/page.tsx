import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { projects, getProject } from '@/data/projects';
import { profile } from '@/data/profile';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, images: [project.image] },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="border-t border-border py-8">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">{title}</h2>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    programmingLanguage: project.technologies.join(', '),
    codeRepository: project.githubUrl,
    author: { '@type': 'Person', name: profile.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="pt-32">
        <div className="container-wide">
          <Reveal>
            <Link href="/projects" data-cursor="hover" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand">
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="text-brand">{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.status}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tighter text-balance md:text-6xl">{project.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.longDescription}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
                  <Github className="h-4 w-4" /> Source
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-xl border border-border">
              <Image src={project.image} alt={project.title} fill sizes="100vw" className="object-cover" priority />
            </div>
          </Reveal>
        </div>

        <div className="container-wide mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <Block title="Overview"><p className="leading-relaxed">{project.details.overview}</p></Block>
            <Block title="The Problem"><p className="leading-relaxed">{project.details.problem}</p></Block>
            <Block title="The Solution"><p className="leading-relaxed">{project.details.solution}</p></Block>
            <Block title="Architecture"><p className="leading-relaxed">{project.details.architecture}</p></Block>
            <Block title="Key Features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.details.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{f}</li>
                ))}
              </ul>
            </Block>
            <Block title="Challenges">
              <ul className="space-y-2">
                {project.details.challenges.map((c) => (
                  <li key={c} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{c}</li>
                ))}
              </ul>
            </Block>
            <Block title="Results">
              <ul className="space-y-2">
                {project.details.results.map((r) => (
                  <li key={r} className="flex gap-2 text-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{r}</li>
                ))}
              </ul>
            </Block>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Tech stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {project.screenshots.length > 0 && (
          <div className="container-wide mt-14">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-brand">Screenshots</h2>
            <div className="grid gap-6">
              {project.screenshots.map((src, i) => (
                <Reveal key={i}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
                    <Image src={src} alt={`${project.title} screenshot ${i + 1}`} fill sizes="100vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="container-wide mt-20 grid gap-4 border-t border-border py-10 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} data-cursor="hover" className="group rounded-xl border border-border p-6 transition-colors hover:border-brand/50">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Previous</span>
            <p className="mt-2 font-display text-lg font-semibold transition-colors group-hover:text-brand">{prev.title}</p>
          </Link>
          <Link href={`/projects/${next.slug}`} data-cursor="hover" className="group rounded-xl border border-border p-6 text-right transition-colors hover:border-brand/50">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">Next <ArrowRight className="h-3 w-3" /></span>
            <p className="mt-2 font-display text-lg font-semibold transition-colors group-hover:text-brand">{next.title}</p>
          </Link>
        </div>
      </article>
    </>
  );
}
