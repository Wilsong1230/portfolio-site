export type ProjectCategory =
  | 'C++'
  | 'Python'
  | 'Web'
  | 'Embedded'
  | 'Automation'

export interface Project {
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  githubUrl: string
  demoUrl?: string
  imageUrl?: string
  featured?: boolean
  homepageSpotlight?: boolean
  priority?: number
}