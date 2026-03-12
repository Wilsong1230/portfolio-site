import Navbar from './components/layout/Navbar'
import CommandPalette from './components/terminal/CommandPalette'
import About from './sections/About'
import Activity from './sections/Activity'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
//import FeaturedProjects from './sections/FeaturedProjects'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(59,130,246,0.10)_0%,rgba(59,130,246,0.04)_18%,rgba(24,24,27,0)_42%)]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/14 blur-[150px]" />

      <div className="pointer-events-none absolute left-1/2 top-[10vh] h-[32rem] w-[70rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/10 via-blue-500/14 to-indigo-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-[6rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-blue-500/[0.05] via-transparent to-transparent" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />

          <About />
          <Skills />
          <Projects />
          <Activity />
          <Contact />
        </main>
        <CommandPalette />
      </div>
    </div>
  )
}

export default App