export interface ExperienceItem {
  date: string
  role: string
  org: string
  tags: string[]
  bullets: string[]
  isNow?: boolean
}

export const experience: ExperienceItem[] = [
  {
    date: 'Oct 2025 – Present',
    role: 'Lab Assistant',
    org: 'FGCU Dept. of Computer & Software Engineering',
    tags: ['EMBEDDED', 'LAB'],
    isNow: true,
    bullets: [
      'Set up and maintain circuits, logic gate boards, motor driver rigs, and 3D printing workstations',
      'Support undergraduate labs in digital electronics and embedded systems coursework',
    ],
  },
  {
    date: 'Jan 2025 – Present',
    role: 'Project Management Intern',
    org: 'Lee County Department of Transportation',
    tags: ['OPS', 'DOT'],
    isNow: true,
    bullets: [
      'Track project milestones, maintain documentation, and coordinate across engineering teams',
      'Attend project meetings and support delivery of infrastructure improvement initiatives',
    ],
  },
  {
    date: 'Aug 2023 – May 2027',
    role: 'B.S. Software Engineering',
    org: 'Florida Gulf Coast University',
    tags: ['STUDENT'],
    bullets: [
      'Relevant coursework: Data Structures & Algorithms, Computer Organization, Software Engineering',
      "Bright Futures Scholar · President's Gold Award · AICE Diploma",
    ],
  },
]
