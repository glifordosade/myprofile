'use client';

import * as React from 'react';
import { useRef } from 'react';
import { registerGsap } from '@/lib/gsap';
import { usePrefersReducedMotion, useIsomorphicLayoutEffect } from '@/lib/hooks';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: any;
  start?: string;
};

export function Reveal({ children, className, delay = 0, y = 28, as: Tag = 'div', start = 'top 85%' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  start?: string;
};

export function StaggerGroup({ children, className, stagger = 0.09, y = 26, start = 'top 82%' }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const items = ref.current!.querySelectorAll('[data-stagger]');
      gsap.from(items, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, stagger, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
