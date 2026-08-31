'use client';

import * as React from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import { registerGsap } from '@/lib/gsap';
import { useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
};

export function MagneticButton({ children, className, href, onClick, strength = 0.4, external, ariaLabel }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const enabled = isDesktop && !reduced;

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const { gsap } = registerGsap();
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    const { gsap } = registerGsap();
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  const classes = cn('inline-flex items-center justify-center will-change-transform', className);

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as any}
        aria-label={ariaLabel}
        data-cursor="hover"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      ref={ref as any}
      aria-label={ariaLabel}
      data-cursor="hover"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
    >
      {children}
    </button>
  );
}
