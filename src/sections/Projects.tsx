import { useMemo, useState } from 'react'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectFilters, {
  type ProjectFilter,
} from '../components/projects/ProjectFilters'
import { projects } from '../data/projects'

function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Projects</h2>
            <p className="mt-4 max-w-2xl text-zinc-300">
              A selection of projects focused on software engineering, problem
              solving, and practical systems.
            </p>
          </div>

          <ProjectFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects