import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectsExplorer } from '@/components/projects/projects-explorer';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of projects I have designed and built — web apps, open source, AI, and developer tools.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Work" title="Things I've built." description="Case studies and projects spanning web apps, open source, AI, and DevOps tooling." />
      <section className="py-16">
        <div className="container-wide">
          <ProjectsExplorer />
        </div>
      </section>
    </>
  );
}
