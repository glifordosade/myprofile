import { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    organization: 'Nova Labs',
    position: 'Senior Software Engineer',
    type: 'Full-time',
    startDate: 'Jan 2023',
    endDate: 'Present',
    location: 'Remote',
    description:
      'Leading front-end architecture and design-system work for a suite of data-heavy SaaS products.',
    responsibilities: [
      'Own the component library and design tokens used across 4 products',
      'Drive performance work — improved Core Web Vitals across key flows',
      'Mentor engineers and lead technical design reviews',
    ],
    technologies: ['Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'AWS'],
    achievements: [
      'Cut initial load time by 45% through code-splitting & RSC migration',
      'Shipped a design system adopted by 20+ engineers',
    ],
  },
  {
    id: 'exp-2',
    organization: 'Bright Digital',
    position: 'Full-Stack Developer',
    type: 'Full-time',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    location: 'Hybrid',
    description: 'Built and maintained customer-facing web apps and internal tooling.',
    responsibilities: [
      'Developed REST & GraphQL APIs powering multiple clients',
      'Implemented CI/CD pipelines and containerised deployments',
      'Collaborated with design to deliver polished interfaces',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'GitHub Actions'],
    achievements: [
      'Reduced deployment time from hours to minutes',
      'Delivered 12+ client projects on schedule',
    ],
  },
  {
    id: 'exp-3',
    organization: 'Startup Studio',
    position: 'Junior Developer',
    type: 'Full-time',
    startDate: 'Aug 2020',
    endDate: 'May 2021',
    location: 'On-site',
    description: 'First professional role — shipped features across the stack in a fast-moving team.',
    responsibilities: [
      'Implemented UI features and bug fixes',
      'Wrote integration tests and improved coverage',
      'Participated in agile ceremonies and code reviews',
    ],
    technologies: ['JavaScript', 'React', 'Express', 'MySQL'],
    achievements: ['Shipped my first production feature within 3 weeks'],
  },
];
