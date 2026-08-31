import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { GalleryGrid } from '@/components/gallery/gallery-grid';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual gallery — code, workspaces, and abstract technology.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="A visual journal." description="Screenshots, workspaces, and moments from the process. Click any image to view it larger." />
      <section className="py-16">
        <div className="container-wide">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
