import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'Programming languages I reach for regularly.',
    skills: [
      { name: 'TypeScript', icon: 'typescript', description: 'Type-safe apps end to end.', level: 5 },
      { name: 'JavaScript', icon: 'javascript', description: 'The language of the web.', level: 5 },
      { name: 'Python', icon: 'python', description: 'Scripting, APIs & data.', level: 4 },
      { name: 'Go', icon: 'go', description: 'Fast, concurrent services.', level: 3 },
      { name: 'SQL', icon: 'postgresql', description: 'Relational data modelling.', level: 4 },
      { name: 'Rust', icon: 'rust', description: 'Exploring systems programming.', level: 2 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Crafting interfaces and interactions.',
    skills: [
      { name: 'React', icon: 'react', description: 'Component-driven UIs.', level: 5 },
      { name: 'Next.js', icon: 'nextdotjs', description: 'App Router & RSC.', level: 5 },
      { name: 'Tailwind CSS', icon: 'tailwindcss', description: 'Utility-first styling.', level: 5 },
      { name: 'GSAP', icon: 'greensock', description: 'Complex web animation.', level: 4 },
      { name: 'Three.js', icon: 'threedotjs', description: 'Interactive 3D on the web.', level: 3 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs, services, and business logic.',
    skills: [
      { name: 'Node.js', icon: 'nodedotjs', description: 'Server-side JavaScript.', level: 5 },
      { name: 'Express', icon: 'express', description: 'Minimal HTTP APIs.', level: 4 },
      { name: 'FastAPI', icon: 'fastapi', description: 'Modern Python APIs.', level: 4 },
      { name: 'GraphQL', icon: 'graphql', description: 'Typed query layer.', level: 3 },
    ],
  },
  {
    id: 'database',
    title: 'Databases',
    description: 'Storing and querying data.',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql', description: 'Relational workhorse.', level: 4 },
      { name: 'MongoDB', icon: 'mongodb', description: 'Document store.', level: 4 },
      { name: 'Redis', icon: 'redis', description: 'Caching & queues.', level: 3 },
      { name: 'Prisma', icon: 'prisma', description: 'Type-safe ORM.', level: 4 },
    ],
  },
  {
    id: 'ai',
    title: 'AI / Machine Learning',
    description: 'Building with modern AI tooling.',
    skills: [
      { name: 'OpenAI', icon: 'openai', description: 'LLM app integration.', level: 4 },
      { name: 'LangChain', icon: 'langchain', description: 'LLM orchestration.', level: 3 },
      { name: 'PyTorch', icon: 'pytorch', description: 'Model experimentation.', level: 2 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Shipping and operating software.',
    skills: [
      { name: 'Docker', icon: 'docker', description: 'Containerised apps.', level: 4 },
      { name: 'Kubernetes', icon: 'kubernetes', description: 'Container orchestration.', level: 3 },
      { name: 'AWS', icon: 'amazonaws', description: 'Cloud infrastructure.', level: 3 },
      { name: 'GitHub Actions', icon: 'githubactions', description: 'CI/CD pipelines.', level: 4 },
      { name: 'Vercel', icon: 'vercel', description: 'Frontend deploys.', level: 5 },
    ],
  },
];
