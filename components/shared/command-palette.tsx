'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { navItems } from '@/data/navigation';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import { profile } from '@/data/profile';
import {
  ArrowRight,
  FileText,
  FolderGit2,
  Moon,
  Newspaper,
  Sun,
  GitBranch,
  LinkIcon,
  MailBadgeIcon,
  Mail,
} from 'lucide-react';

const socialIcons: Record<string, any> = { GitBranch, LinkIcon, MailBadgeIcon, Mail };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openHandler = () => setOpen(true);
    document.addEventListener('keydown', down);
    window.addEventListener('open-command-palette', openHandler);
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-palette', openHandler);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => (
            <CommandItem key={item.href} value={`go ${item.label}`} onSelect={() => run(() => router.push(item.href))}>
              <ArrowRight className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {projects.slice(0, 6).map((p) => (
            <CommandItem key={p.slug} value={`project ${p.title}`} onSelect={() => run(() => router.push(`/projects/${p.slug}`))}>
              <FolderGit2 className="mr-2 h-4 w-4" />
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Blog">
          {blogPosts.slice(0, 5).map((b) => (
            <CommandItem key={b.slug} value={`article ${b.title}`} onSelect={() => run(() => router.push(`/blog/${b.slug}`))}>
              <Newspaper className="mr-2 h-4 w-4" />
              {b.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem value="theme light" onSelect={() => run(() => setTheme('light'))}>
            <Sun className="mr-2 h-4 w-4" /> Light mode
          </CommandItem>
          <CommandItem value="theme dark" onSelect={() => run(() => setTheme('dark'))}>
            <Moon className="mr-2 h-4 w-4" /> Dark mode
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="resume" onSelect={() => run(() => router.push('/resume'))}>
            <FileText className="mr-2 h-4 w-4" /> Open resume
          </CommandItem>
          {profile.socials.map((s) => {
            const Icon = socialIcons[s.icon] ?? ArrowRight;
            return (
              <CommandItem key={s.label} value={`social ${s.label}`} onSelect={() => run(() => window.open(s.href, '_blank'))}>
                <Icon className="mr-2 h-4 w-4" /> {s.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
