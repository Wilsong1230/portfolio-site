import { GitHubCalendar } from 'react-github-calendar'
import { profile } from '../../data/profile'

function GitHubCalendarCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-400">GitHub Activity</p>
          <h3 className="text-xl font-semibold text-white">
            Contribution History
          </h3>
        </div>

        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-zinc-300 transition hover:text-white"
        >
          View GitHub Profile
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <GitHubCalendar
            username="wilsong1230"
            colorScheme="dark"
            fontSize={14}
            blockSize={13}
            blockMargin={4}
          />
        </div>
      </div>
    </div>
  )
}

export default GitHubCalendarCard