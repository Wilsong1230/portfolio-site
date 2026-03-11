import type { Project } from '../../types/project'

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
        </div>

        {project.featured && (
          <span className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
            Featured
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-300">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/25 hover:bg-white/5"
        >
          GitHub
        </a>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard