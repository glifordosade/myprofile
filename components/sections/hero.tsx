'use client';

import { useRef } from 'react';
import { ArrowRight, ArrowDown, Github, Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';
import { registerGsap } from '@/lib/gsap';
import { usePrefersReducedMotion, useIsomorphicLayoutEffect } from '@/lib/hooks';
import { profile } from '@/data/profile';
import { Scene } from '@/components/three/scene';
import { MagneticButton } from '@/components/shared/magnetic-button';

const socialIcons: Record<string, any> = { Github, Linkedin, Twitter, Mail };

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !root.current) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { opacity: 0, y: 16, duration: 0.6 })
        .from('.hero-char', { opacity: 0, yPercent: 110, duration: 0.9, stagger: 0.04 }, '-=0.2')
        .from('.hero-title', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.hero-intro', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .from('.hero-social', { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const chars = profile.firstName.split('');

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* backgrounds */}
      <div className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-[0.5]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
      <Scene className="absolute inset-0 -z-10" />

      <div className="container-wide relative w-full pt-24">
        <div className="max-w-4xl">
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="text-muted-foreground">{profile.availability}</span>
          </div>

          <h1 className="font-display text-[16vw] font-bold leading-[0.85] tracking-tighter sm:text-[13vw] lg:text-[10rem]">
            <span className="block overflow-hidden">
              {chars.map((c, i) => (
                <span key={i} className="hero-char inline-block">
                  {c}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden text-outline">
              {'NAME'.split('').map((c, i) => (
                <span key={i} className="hero-char inline-block">
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-title mt-6 flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-brand sm:text-base">
            <Sparkles className="h-4 w-4" />
            {profile.title}
          </p>

          <p className="hero-intro mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.shortIntro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/projects"
              className="hero-cta group gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-shadow hover:shadow-[0_0_30px_-6px_hsl(var(--brand))]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="hero-cta gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-brand hover:text-brand"
            >
              Contact Me
            </MagneticButton>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {profile.socials.map((s) => {
              const Icon = socialIcons[s.icon] ?? Mail;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="hero-social inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
