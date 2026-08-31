import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'shipping-fast-without-breaking-things',
    title: 'Shipping Fast Without Breaking Things',
    excerpt:
      'How small, reversible changes and a good feedback loop let you move quickly while staying confident.',
    category: 'Engineering',
    tags: ['workflow', 'testing', 'ci'],
    cover:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxjb2RlJTIwZWRpdG9yfGVufDB8fHx8MTc4NzkwMzcwNXww&ixlib=rb-4.1.0&q=85',
    date: '2025-05-18',
    readingTime: 6,
    featured: true,
    author: 'YOUR NAME',
    content: `## The myth of speed vs. quality

Speed and quality are not opposites. The teams that ship fastest are usually the ones with the *tightest feedback loops* — they know within seconds or minutes whether a change is safe.

## Make changes small and reversible

The single biggest lever is the size of your changes. Small pull requests are easier to review, easier to test, and easier to roll back.

- Prefer many small PRs over one big one
- Keep each change focused on a single concern
- Use feature flags to decouple deploy from release

## Automate the boring checks

Let the machine catch the obvious mistakes so humans can focus on design and intent.

\`\`\`ts
// A tiny guard that saves hours of debugging
export function assertNever(value: never): never {
  throw new Error(\`Unhandled case: \${JSON.stringify(value)}\`);
}
\`\`\`

## Measure, then optimise

Don't guess. Add metrics and traces, watch real usage, and optimise the parts that actually matter.

> Ship small, measure everything, and keep your feedback loop fast.`,
  },
  {
    slug: 'a-practical-guide-to-rsc',
    title: 'A Practical Guide to React Server Components',
    excerpt:
      'What actually changes when you move to Server Components, and how to decide where the boundary goes.',
    category: 'React',
    tags: ['react', 'nextjs', 'performance'],
    cover:
      'https://images.unsplash.com/photo-1707528041466-83a325f01a3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzg3OTAzNzA1fDA&ixlib=rb-4.1.0&q=85',
    date: '2025-04-02',
    readingTime: 8,
    featured: false,
    author: 'YOUR NAME',
    content: `## Server-first by default

In the App Router, components are Server Components unless you opt in with \`'use client'\`. This flips the default: you only ship JavaScript for the parts that truly need interactivity.

\`\`\`tsx
// Server Component — no JS shipped to the client
async function Posts() {
  const posts = await db.post.findMany();
  return <PostList posts={posts} />;
}
\`\`\`

## Where does the boundary go?

Push the \`'use client'\` boundary as far down the tree as you can. Keep data fetching and static content on the server; move only the interactive leaves to the client.

## The mental model

1. Server Components render on the server and stream HTML
2. Client Components hydrate for interactivity
3. You compose them freely — server can render client, not vice versa

The result: less JavaScript, faster first paint, and simpler data fetching.`,
  },
  {
    slug: 'gsap-animations-that-respect-users',
    title: 'GSAP Animations That Respect Your Users',
    excerpt:
      'Motion should enhance, not distract. Here is how I keep GSAP animations tasteful, performant, and accessible.',
    category: 'Animation',
    tags: ['gsap', 'animation', 'accessibility'],
    cover:
      'https://images.unsplash.com/photo-1669295384050-a1d4357bd1d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzg3OTAzNzA0fDA&ixlib=rb-4.1.0&q=85',
    date: '2025-03-11',
    readingTime: 5,
    featured: false,
    author: 'YOUR NAME',
    content: `## Motion with intent

Every animation should have a reason: to guide attention, communicate state, or create a sense of place. Motion without meaning is just noise.

## Always honour reduced motion

\`\`\`ts
const prefersReduced = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReduced) {
  gsap.from('.reveal', { y: 24, opacity: 0, stagger: 0.08 });
}
\`\`\`

## Clean up your contexts

In React, always scope and revert GSAP animations to avoid leaks and duplicates:

\`\`\`ts
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.card', { opacity: 0, y: 20, stagger: 0.1 });
  }, ref);
  return () => ctx.revert();
}, []);
\`\`\`

Keep durations short, easing natural, and never block interaction.`,
  },
  {
    slug: 'designing-a-color-system',
    title: 'Designing a Color System for Dark and Light',
    excerpt:
      'A token-based approach to building themes that feel intentional in both dark and light mode.',
    category: 'Design',
    tags: ['design-systems', 'css', 'theming'],
    cover:
      'https://images.pexels.com/photos/12939552/pexels-photo-12939552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    date: '2025-02-20',
    readingTime: 7,
    featured: false,
    author: 'YOUR NAME',
    content: `## Tokens, not hardcoded colors

Define semantic tokens — \`background\`, \`foreground\`, \`brand\` — and let each theme provide values. Components reference tokens, never raw hex.

\`\`\`css
:root {
  --background: 40 30% 97%;
  --foreground: 30 8% 14%;
  --brand: 22 88% 52%;
}
.dark {
  --background: 0 0% 7%;
  --foreground: 40 8% 88%;
  --brand: 95 80% 56%;
}
\`\`\`

## Give each theme character

A great dark mode isn't just an inverted light mode. Choose an accent that fits the mood — warm orange for light, electric green for dark — and use it sparingly.

## Test contrast relentlessly

Every text/background pair should meet WCAG AA. Tools make this quick, and your users will thank you.`,
  },
];

export const blogCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];
