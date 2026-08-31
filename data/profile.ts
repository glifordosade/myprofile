import { Profile, Stat, TimelineItem, EducationItem } from '@/types';

export const profile: Profile = {
  name: 'YOUR NAME',
  firstName: 'YOUR',
  title: 'Software Engineer & Full-Stack Developer',
  tagline: 'I build fast, accessible, and thoughtfully-crafted digital products.',
  shortIntro:
    'A software developer focused on building performant web applications, clean architecture, and delightful user experiences — from interface to infrastructure.',
  longIntro:
    'I’m a software engineer who enjoys turning complex problems into simple, elegant solutions. I care deeply about performance, accessibility, and developer experience, and I like working across the whole stack — from pixel-perfect front-ends to resilient back-end systems.',
  philosophy:
    'Great software is invisible. It gets out of the way, respects the user’s time and attention, and quietly does its job well. I believe in shipping small, iterating fast, and treating code as a craft — readable, tested, and built to last.',
  location: 'Remote · Worldwide',
  email: 'YOUR EMAIL',
  workEmail: 'YOUR WORK EMAIL',
  availability: 'Available for freelance & full-time roles',
  available: true,
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', href: 'YOUR GITHUB', icon: 'Github', handle: '@yourhandle' },
    { label: 'LinkedIn', href: 'YOUR LINKEDIN', icon: 'Linkedin', handle: 'YOUR NAME' },
    { label: 'X / Twitter', href: 'https://x.com/yourhandle', icon: 'Twitter', handle: '@yourhandle' },
    { label: 'Email', href: 'mailto:YOUR EMAIL', icon: 'Mail', handle: 'YOUR EMAIL' },
  ],
  currentFocus: [
    'Building with Next.js & the React Server Components model',
    'Exploring AI-assisted developer tooling & LLM apps',
    'Type-safe end-to-end systems with TypeScript',
    'Web performance & Core Web Vitals',
  ],
  interests: [
    'Developer experience & tooling',
    'Design systems & UI engineering',
    'Distributed systems',
    'Open source',
  ],
};

export const stats: Stat[] = [
  { label: 'Projects shipped', value: 40, suffix: '+' },
  { label: 'Technologies used', value: 30, suffix: '+' },
  { label: 'Articles written', value: 18, suffix: '' },
  { label: 'Years of experience', value: 5, suffix: '+' },
];

export const timeline: TimelineItem[] = [
  { year: '2019', title: 'Started the journey', description: 'Wrote my first line of code and fell in love with building things for the web.' },
  { year: '2020', title: 'First developer role', description: 'Joined a startup and shipped my first production application end-to-end.' },
  { year: '2022', title: 'Full-stack focus', description: 'Went deep on system design, databases, and scalable back-end architecture.' },
  { year: '2023', title: 'Design systems', description: 'Led the creation of a component library used across multiple products.' },
  { year: '2025', title: 'Building with AI', description: 'Now focused on AI-assisted tooling and next-generation web experiences.' },
];

export const education: EducationItem[] = [
  {
    institution: 'Your University',
    degree: 'B.Sc. in Computer Science',
    period: '2016 — 2020',
    description: 'Focus on software engineering, algorithms, and human-computer interaction.',
  },
  {
    institution: 'Self-taught & Open Source',
    degree: 'Continuous Learning',
    period: '2020 — Present',
    description: 'Constantly learning through building, reading, and contributing to open source.',
  },
];
