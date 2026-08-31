import { ToolCategory } from '@/types';

export const toolCategories: ToolCategory[] = [
  {
    id: 'development',
    title: 'Development',
    tools: [
      { name: 'VS Code', description: 'My primary editor, tuned to the bone.', icon: 'visualstudiocode', url: 'https://code.visualstudio.com' },
      { name: 'Neovim', description: 'For quick edits in the terminal.', icon: 'neovim', url: 'https://neovim.io' },
      { name: 'iTerm2', description: 'Terminal with tmux + zsh.', icon: 'iterm2' },
      { name: 'Git', description: 'Version control, always.', icon: 'git', url: 'https://git-scm.com' },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    tools: [
      { name: 'Figma', description: 'Design, prototyping & handoff.', icon: 'figma', url: 'https://figma.com' },
      { name: 'Excalidraw', description: 'Sketching architecture & ideas.', icon: 'excalidraw' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    tools: [
      { name: 'TablePlus', description: 'A clean database GUI.', icon: 'postgresql' },
      { name: 'Prisma', description: 'Type-safe ORM & migrations.', icon: 'prisma', url: 'https://prisma.io' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    tools: [
      { name: 'Docker', description: 'Local + prod containers.', icon: 'docker', url: 'https://docker.com' },
      { name: 'Vercel', description: 'Instant frontend deploys.', icon: 'vercel', url: 'https://vercel.com' },
      { name: 'GitHub Actions', description: 'Automated CI/CD.', icon: 'githubactions' },
    ],
  },
  {
    id: 'productivity',
    title: 'Productivity',
    tools: [
      { name: 'Notion', description: 'Notes, docs & planning.', icon: 'notion', url: 'https://notion.so' },
      { name: 'Raycast', description: 'Launcher & automation.', icon: 'raycast', url: 'https://raycast.com' },
      { name: 'Linear', description: 'Issue tracking done right.', icon: 'linear', url: 'https://linear.app' },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    tools: [
      { name: 'ChatGPT', description: 'Rubber-duck & research.', icon: 'openai', url: 'https://chat.openai.com' },
      { name: 'GitHub Copilot', description: 'AI pair programmer.', icon: 'githubcopilot' },
      { name: 'Claude', description: 'Long-context reasoning.', icon: 'anthropic' },
    ],
  },
  {
    id: 'os',
    title: 'Operating System',
    tools: [
      { name: 'macOS', description: 'Daily driver.', icon: 'apple' },
      { name: 'Linux', description: 'Servers & tinkering.', icon: 'linux' },
    ],
  },
];
