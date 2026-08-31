import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { BlogContent } from '@/components/blog/blog-content';
import { slugify } from '@/lib/utils';
import { blogPosts, getPost } from '@/data/blog';
import { profile } from '@/data/profile';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', title: post.title, description: post.excerpt, images: [post.cover], publishedTime: post.date },
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = post.content
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => l.replace('## ', '').trim());

  const index = blogPosts.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? blogPosts[index - 1] : null;
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    author: { '@type': 'Person', name: profile.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="pt-32">
        <div className="container-wide max-w-4xl">
          <Reveal>
            <Link href="/blog" data-cursor="hover" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="text-brand">{post.category}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readingTime} min read</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tighter text-balance md:text-5xl">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl border border-border">
              <Image src={post.cover} alt={post.title} fill sizes="100vw" className="object-cover" priority />
            </div>
          </Reveal>
        </div>

        <div className="container-wide mt-12 grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="order-2 lg:order-1 lg:sticky lg:top-24 lg:h-fit">
            {headings.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">On this page</h2>
                <ul className="space-y-2">
                  {headings.map((h) => (
                    <li key={h}>
                      <a href={`#${slugify(h)}`} className="text-sm text-muted-foreground transition-colors hover:text-brand">{h}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">#{t}</span>
              ))}
            </div>
          </aside>

          <div className="order-1 max-w-2xl lg:order-2">
            <BlogContent content={post.content} />
          </div>
        </div>

        {related.length > 0 && (
          <div className="container-wide mt-20 max-w-6xl border-t border-border pt-12">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-brand">Related articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} data-cursor="hover" className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                    <Image src={r.cover} alt={r.title} fill sizes="112px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase text-brand">{r.category}</p>
                    <h3 className="mt-1 font-display font-semibold transition-colors group-hover:text-brand">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="container-wide mt-16 grid max-w-6xl gap-4 border-t border-border py-10 sm:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} data-cursor="hover" className="group rounded-xl border border-border p-6 transition-colors hover:border-brand/50">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Previous</span>
              <p className="mt-2 font-display font-semibold transition-colors group-hover:text-brand">{prev.title}</p>
            </Link>
          ) : <div />}
          {next && (
            <Link href={`/blog/${next.slug}`} data-cursor="hover" className="group rounded-xl border border-border p-6 text-right transition-colors hover:border-brand/50">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">Next <ArrowRight className="h-3 w-3" /></span>
              <p className="mt-2 font-display font-semibold transition-colors group-hover:text-brand">{next.title}</p>
            </Link>
          )}
        </div>
      </article>
    </>
  );
}
