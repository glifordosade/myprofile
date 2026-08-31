
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Hero } from '@/components/sections/hero';
import { Reveal, StaggerGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { MagneticButton } from '@/components/shared/magnetic-button';
import { ProjectCard } from '@/components/projects/projects-card';
import { profile, stats } from '@/data/profile';
import { featuredProjects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { featuredPost } from '@/data/blog';

const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => s.name));

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Intro + stats */}
      <section className="relative border-t border-border py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="About" title="I design and build things for the web." />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{profile.longIntro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{profile.philosophy}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <MagneticButton href="/about" className="mt-8 gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
                More about me <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Reveal>
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

      {/* Skills marquee */}
      <section className="border-y border-border bg-card/30 py-8">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={i} className="whitespace-nowrap rounded-full border border-border bg-background px-5 py-2 font-mono text-sm text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected Work" title="Featured projects" description="A few things I've designed, built, and shipped recently." />
            <Reveal>
              <Link href="/projects" data-cursor="hover" className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-brand">
                View all projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 space-y-6">
            {featuredProjects[0] && <ProjectCard project={featuredProjects[0]} featured />}
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.slice(1).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </StaggerGroup>
        </div>
      </section>

      {/* Latest article */}
      <section className="border-t border-border py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Writing" title="From the blog" description="Notes on engineering, design, and building for the web." />
          <Reveal delay={0.1}>
            <Link
              href={`/blog/${featuredPost.slug}`}
              data-cursor="hover"
              className="group mt-12 grid overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand/50 md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image src={featuredPost.cover} alt={featuredPost.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-brand">
                  <span>{featuredPost.category}</span>
                  <span className="text-muted-foreground">{featuredPost.readingTime} min read</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand md:text-3xl">
                  {featuredPost.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{featuredPost.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center md:py-24">
            <div className="absolute inset-0 -z-10 bg-dots opacity-40" />
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Let's build together</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
                Have a project in mind?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
                I'm currently {profile.available ? 'available' : 'not available'} for new opportunities. Let's talk about how I can help.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <MagneticButton href="/contact" className="gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-brand-foreground">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton href="/resume" className="gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
                  View resume
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
