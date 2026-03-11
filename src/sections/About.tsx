import { profile } from '../data/profile'

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-white">About</h2>

        <div className="mt-6 space-y-4 text-zinc-300">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Education</p>
            <p className="mt-2 text-white">{profile.education}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Location</p>
            <p className="mt-2 text-white">{profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About