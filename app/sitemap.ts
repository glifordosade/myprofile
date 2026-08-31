import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import { navItems } from '@/data/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  const now = new Date();

  const staticRoutes = navItems.map((item) => ({
    url: `${base}${item.href === '/' ? '' : item.href}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: item.href === '/' ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
