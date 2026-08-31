export interface SocialLink {
  label: string;
  href: string;
  icon: string; // lucide icon name
  handle?: string;
}

export interface Profile {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  shortIntro: string;
  longIntro: string;
  philosophy: string;
  location: string;
  email: string;
  workEmail: string;
  availability: string;
  available: boolean;
  resumeUrl: string;
  socials: SocialLink[];
  currentFocus: string[];
  interests: string[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  icon: string; // devicon/simpleicon slug or lucide fallback
  description: string;
  level: number; // 1-5 familiarity, no over-claim
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface ProjectSection {
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string[];
  results: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  image: string;
  screenshots: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'live' | 'in-progress' | 'archived';
  featured: boolean;
  year: string;
  details: ProjectSection;
}

export interface ToolItem {
  name: string;
  description: string;
  icon: string;
  url?: string;
}

export interface ToolCategory {
  id: string;
  title: string;
  tools: ToolItem[];
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  span?: 'tall' | 'wide' | 'normal';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  category: string;
  tags: string[];
  cover: string;
  date: string;
  readingTime: number;
  featured: boolean;
  author: string;
}

export interface NavItem {
  label: string;
  href: string;
}
