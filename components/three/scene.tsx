'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useMounted, usePrefersReducedMotion } from '@/lib/hooks';
import { SceneErrorBoundary } from './scene-error-boundary';

const HeroScene = dynamic(() => import('./hero-scene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

function GlowFallback({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute right-[12%] top-1/2 h-72 w-72 -translate-y-1/2 animate-float rounded-full bg-brand/20 blur-3xl" />
      <div className="absolute right-[26%] top-1/3 h-40 w-40 rounded-full border border-brand/30" />
    </div>
  );
}

export function Scene({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  const color = resolvedTheme === 'light' ? '#e8763b' : '#8ae04d';

  if (reduced || !mounted) {
    return <GlowFallback className={className} />;
  }

  return (
    <SceneErrorBoundary fallback={<GlowFallback className={className} />}>
      <div className={className} aria-hidden="true">
        <HeroScene color={color} />
      </div>
    </SceneErrorBoundary>
  );
}
