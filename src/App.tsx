import Navbar from './components/layout/Navbar'
import About from './sections/About'
import Activity from './sections/Activity'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import CommandPalette from './components/terminal/CommandPallete'

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
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
  )
}



export default App