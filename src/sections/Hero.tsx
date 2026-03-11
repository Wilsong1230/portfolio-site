import { profile } from '../data/profile'

function Hero() {
  return (
    <section id="home" className="min-h-screen px-6 py-24 flex items-center">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Portfolio
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white sm:text-6xl">
          {profile.name}
        </h1>

        <h2 className="mt-4 text-xl text-zinc-300 sm:text-2xl">
          {profile.tagline}
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          {profile.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            View Projects
          </a>

          <a
            href={profile.links.resume}
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero