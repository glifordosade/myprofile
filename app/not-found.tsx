import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="container-wide text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand">Error 404</p>
        <h1 className="mt-4 font-display text-[22vw] font-bold leading-none tracking-tighter md:text-[12rem]">404</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          This page took a wrong turn. It might have been moved, deleted, or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" data-cursor="hover" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/projects" data-cursor="hover" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
            <ArrowLeft className="h-4 w-4" /> View projects
          </Link>
        </div>
        <pre className="mx-auto mt-12 inline-block rounded-lg border border-border bg-card p-4 text-left font-mono text-xs text-muted-foreground">
{`> locating page...
> status: 404 NOT_FOUND
> tip: press ⌘K / Ctrl+K to search`}
        </pre>
      </div>
    </section>
  );
}
