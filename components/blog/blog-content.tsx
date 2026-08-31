'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { slugify } from '@/lib/utils';

function toText(children: any): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(toText).join('');
  if (children?.props?.children) return toText(children.props.children);
  return '';
}

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children }) => <h2 id={slugify(toText(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={slugify(toText(children))}>{children}</h3>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
