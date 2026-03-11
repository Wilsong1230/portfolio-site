import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    title: 'Maze Solver in C++',
    description:
      'A maze-solving project built around graph traversal concepts like BFS, focused on path exploration and algorithmic problem solving.',
    tags: ['C++', 'BFS', 'Algorithms'],
    category: 'C++',
    githubUrl: 'https://github.com/yourusername/maze-solver',
    featured: true,
    homepageSpotlight: true,
    priority: 1,
  },
  {
    title: 'Portfolio Website',
    description:
      'A responsive personal portfolio built with React and Tailwind to showcase projects, developer activity, and a polished frontend experience.',
    tags: ['React', 'Tailwind', 'TypeScript'],
    category: 'Web',
    githubUrl: 'https://github.com/yourusername/portfolio-website',
    featured: true,
    homepageSpotlight: true,
    priority: 2,
  },
  {
    title: 'Automation Tool',
    description:
      'A workflow-focused utility designed to automate repetitive tasks and improve data handling efficiency.',
    tags: ['Python', 'Automation'],
    category: 'Automation',
    githubUrl: 'https://github.com/yourusername/automation-tool',
  },
]