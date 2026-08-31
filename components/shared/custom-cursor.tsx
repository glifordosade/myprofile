'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const [hovering, setHovering] = useState(false);
  const enabled = isDesktop && !reduced;

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-active');
      return;
    }
    document.body.classList.add('cursor-active');

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"], input, textarea');
      setHovering(Boolean(interactive));
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-brand"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-brand/60 transition-[width,height,opacity,background-color] duration-200"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          marginLeft: hovering ? -10 : 0,
          marginTop: hovering ? -10 : 0,
          backgroundColor: hovering ? 'hsl(var(--brand) / 0.12)' : 'transparent',
        }}
      />
    </div>
  );
}
