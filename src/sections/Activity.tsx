import GitHubCalendarCard from '../components/activity/GithubCalendarCard'

function Activity() {
  return (
    <section id="activity" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-white">Activity</h2>
        <p className="mt-4 max-w-2xl text-zinc-300">
          A snapshot of my recent GitHub coding activity and consistency over time.
        </p>

        <div className="mt-10">
          <GitHubCalendarCard />
        </div>
      </div>
    </section>
  )
}

export default Activity