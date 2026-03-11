import type { ProjectCategory } from '../../types/project'

export type ProjectFilter = 'All' | ProjectCategory

interface ProjectFiltersProps {
  activeFilter: ProjectFilter
  onFilterChange: (filter: ProjectFilter) => void
}

const filters: ProjectFilter[] = [
  'All',
  'C++',
  'Python',
  'Web',
  'Embedded',
  'Automation',
]

function ProjectFilters({
  activeFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? 'bg-white text-zinc-950'
                : 'border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}

export default ProjectFilters