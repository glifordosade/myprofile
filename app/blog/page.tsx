import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { BlogList } from '@/components/blog/blog-list';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and notes on software engineering, design, and building for the web.',
};

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Writing" title="Thoughts & notes." description="Essays on engineering, design systems, animation, and the craft of building software." />
      <section className="py-16">
        <div className="container-wide">
          <BlogList />
        </div>
      </section>
    </>
  );
}
