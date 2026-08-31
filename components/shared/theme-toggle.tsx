'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useMounted } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      data-cursor="hover"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand hover:text-brand',
        className,
      )}
    >
      {mounted ? (
        <>
          <Sun className={cn('h-[18px] w-[18px] transition-all', isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')} />
          <Moon className={cn('absolute h-[18px] w-[18px] transition-all', isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0')} />
        </>
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
