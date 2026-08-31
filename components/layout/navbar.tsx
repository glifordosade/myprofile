'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Command as CommandIcon } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { profile } from '@/data/profile';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const openPalette = () => window.dispatchEvent(new CustomEvent('open-command-palette'));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border bg-background/70 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between gap-4">
        <Link href="/" data-cursor="hover" className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand text-brand-foreground">
            {profile.name.charAt(0)}
          </span>
          <span className="hidden sm:inline">{profile.name.split(' ')[0]}<span className="text-brand">.</span></span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className={cn(
                'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href) ? 'text-brand' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              {isActive(item.href) && <span className="absolute inset-x-3 -bottom-px h-px bg-brand" />}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            data-cursor="hover"
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-foreground md:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              <CommandIcon className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <button type="button" onClick={openPalette} aria-label="Search" data-cursor="hover" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand hover:text-brand md:hidden">
            <Search className="h-4 w-4" />
          </button>

          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand hover:text-brand lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-border bg-background p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-16 items-center border-b border-border px-6 font-display text-lg font-bold">
                {profile.name.split(' ')[0]}<span className="text-brand">.</span>
              </div>
              <div className="flex flex-col p-4">
                {navItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      isActive(item.href) ? 'bg-brand/10 text-brand' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs opacity-40">0{i + 1}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
