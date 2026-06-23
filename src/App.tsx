import { useState, useEffect, useRef } from 'react'
import { useTweaks } from './hooks/useTweaks'
import { PRESETS } from './components/ui/TweaksPanel'

import Atmosphere from './components/atmosphere/Atmosphere'
import ShootingStars from './components/atmosphere/ShootingStars'
import Spotlight from './components/atmosphere/Spotlight'
import AsciiRover from './components/atmosphere/AsciiRover'

import HeroTile from './components/tiles/HeroTile'
import StatusTile from './components/tiles/StatusTile'
import AvatarTile from './components/tiles/AvatarTile'
import CurrentTile from './components/tiles/CurrentTile'
import HeatmapTile from './components/tiles/HeatmapTile'
import SignalTile from './components/tiles/SignalTile'
import SkillsTile from './components/tiles/SkillsTile'
import ProjectTile from './components/tiles/ProjectTile'
import ExperienceTile from './components/tiles/ExperienceTile'
import ContactTile from './components/tiles/ContactTile'

import Terminal from './components/terminal/Terminal'
import ProjectModal from './components/modals/ProjectModal'
import BootOverlay from './components/overlays/BootOverlay'
import MatrixOverlay from './components/overlays/MatrixOverlay'
import SnakeGame from './components/overlays/SnakeGame'
import TweaksPanel from './components/ui/TweaksPanel'

import { projects } from './data/projects'

const INITIAL_ORDER = ['hero','status','avatar','current','heatmap','signal','term','skills','prj-1','prj-2','prj-3','experience','contact']

function TopBar({ overclock }: { overclock: boolean }) {
  const [t, setT] = useState(new Date())
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id) }, [])
  const pad = (n: number) => String(n).padStart(2,'0')
  return (
    <div className="topbar">
      <div className="tb-l">
        <span className="tb-led">{overclock ? 'OVERCLOCK' : 'DECK / ONLINE'}</span>
        <span className="tb-sep">·</span>
        <span className="tb-brand">WILSON.GOMEZ</span>
        <span className="tb-sep">·</span>
        <span>v1.0.0</span>
      </div>
      <div className="tb-r">
        <span>UTC-5</span>
        <span className="tb-sep">·</span>
        <span>{`${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`}</span>
        <span className="tb-sep">·</span>
        <span>FORT MYERS, FL</span>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="footer">
      <span>EOF · 2026 · WILSON GOMEZ</span>
      <span style={{ opacity:0.7 }}>↑↑↓↓←→←→BA</span>
      <span>BUILT WITH PATIENCE + SOLDER PASTE</span>
    </div>
  )
}

export default function App() {
  const [t, setTweak] = useTweaks()
  const accent = t.palette[0]
  const secondary = t.palette[1]
  const mouse = useRef({ x: 0, y: 0 })

  const [openProject, setOpenProject] = useState<string | null>(null)
  const [matrixOn, setMatrixOn] = useState(false)
  const [snakeOn, setSnakeOn] = useState(false)
  const [overclock, setOverclock] = useState(false)

  const order = INITIAL_ORDER
  const [hoverId, setHoverId] = useState<string | null>(null)
  const tileRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    window.scrollTo(0, 0)
    try { localStorage.removeItem('tileOrder') } catch {}
  }, [])

  // Apply CSS vars from palette
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
    document.documentElement.style.setProperty('--accent-soft', accent + '28')
    document.documentElement.style.setProperty('--secondary', secondary)
    document.body.classList.toggle('overclock', overclock)
  }, [accent, secondary, overclock])

  // Tab title animation
  useEffect(() => {
    const states = ['','w','wi','wil','wils','wilso','wilson','wilson@','wilson@d','wilson@de','wilson@dec','wilson@deck','wilson@deck:','wilson@deck:~','wilson@deck:~$']
    let i = 0, blink = false
    let typeId: ReturnType<typeof setTimeout>, blinkId: ReturnType<typeof setInterval>
    function type() {
      document.title = states[i] + ' _'
      if (i < states.length - 1) { i++; typeId = setTimeout(type, 90) }
      else { blinkId = setInterval(() => { blink = !blink; document.title = 'wilson@deck:~$ ' + (blink ? '_' : ' ') }, 600) }
    }
    type()
    return () => { clearTimeout(typeId); clearInterval(blinkId) }
  }, [])

  // Konami code → overclock
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let idx = 0
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === seq[idx].toLowerCase()) {
        idx++
        if (idx === seq.length) { setOverclock(o => !o); idx = 0 }
      } else { idx = 0 }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Deep-link routing
  useEffect(() => {
    function readHash() {
      const m = (window.location.hash || '').match(/^#\/p\/([\w-]+)/)
      if (m) setOpenProject(m[1]); else setOpenProject(null)
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])
  useEffect(() => {
    const want = openProject ? `#/p/${openProject}` : ''
    if ((window.location.hash || '') !== want) {
      if (want) history.replaceState(null, '', want)
      else history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [openProject])

  function scrollTile(id: string) {
    const el = tileRefs.current[id]
    if (!el) return
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 80, behavior: 'smooth' })
    el.classList.add('is-flash')
    setTimeout(() => el.classList.remove('is-flash'), 1500)
  }

  function runSpeedrun() {
    const steps = [
      { delay:0,    fn: () => scrollTile('hero') },
      { delay:1800, fn: () => scrollTile('current') },
      { delay:3400, fn: () => scrollTile('heatmap') },
      { delay:5000, fn: () => scrollTile('skills') },
      { delay:6600, fn: () => scrollTile('prj-1') },
      { delay:8200, fn: () => setOpenProject('flight') },
      { delay:12500,fn: () => setOpenProject(null) },
      { delay:13800,fn: () => scrollTile('experience') },
      { delay:15600,fn: () => scrollTile('contact') },
    ]
    steps.forEach(s => setTimeout(s.fn, s.delay))
  }

  function handleTerminalAction(action: string) {
    if (action.startsWith('goto:')) {
      const tgt = action.slice(5)
      const map: Record<string,string> = { hero:'hero', current:'current', terminal:'term', term:'term',
        projects:'prj-1', skills:'skills', contact:'contact', status:'status',
        flight:'prj-1', fitness:'prj-2', cpe:'prj-3' }
      scrollTile(map[tgt] ?? tgt)
    } else if (action.startsWith('theme:')) {
      const name = action.slice(6)
      if (PRESETS[name]) setTweak('palette', PRESETS[name])
    } else if (action === 'matrix')    setMatrixOn(true)
    else if (action === 'snake')       setSnakeOn(true)
    else if (action === 'speedrun')    runSpeedrun()
    else if (action === 'overclock')   setOverclock(o => !o)
    else if (action === 'resume')      window.open('/resume.pdf', '_blank')
  }

  // 3D tilt
  function onTileMove(e: React.MouseEvent, el: HTMLElement) {
    if (!t.tilt) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -0.7
    const ry = (px - 0.5) * 0.9
    el.style.transform = `perspective(1800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`
  }
  function onTileLeave(el: HTMLElement) { el.style.transform = '' }

  function renderTile(id: string) {
    switch (id) {
      case 'hero':       return <HeroTile accent={accent} secondary={secondary} />
      case 'status':     return <StatusTile accent={accent} secondary={secondary} />
      case 'avatar':     return <AvatarTile accent={accent} />
      case 'current':    return <CurrentTile accent={accent} />
      case 'heatmap':    return <HeatmapTile accent={accent} secondary={secondary} />
      case 'signal':     return <SignalTile accent={accent} secondary={secondary} />
      case 'term':       return <Terminal accent={accent} onAction={handleTerminalAction} />
      case 'skills':     return <SkillsTile accent={accent} secondary={secondary} />
      case 'prj-1':      return <ProjectTile project={projects[0]} accent={accent} secondary={secondary} onOpen={setOpenProject} />
      case 'prj-2':      return <ProjectTile project={projects[1]} accent={accent} secondary={secondary} onOpen={setOpenProject} />
      case 'prj-3':      return <ProjectTile project={projects[2]} accent={accent} secondary={secondary} onOpen={setOpenProject} />
      case 'experience': return <ExperienceTile accent={accent} secondary={secondary} />
      case 'contact':    return <ContactTile accent={accent} />
      default: return null
    }
  }

  return (
    <>
      <BootOverlay />

      <Atmosphere stars={t.stars} pcb={t.pcb} scanlines={t.scanlines} accent={accent} mouse={mouse} />
      <ShootingStars enabled={t.shooting} accent={accent} fast={overclock} />
      <Spotlight enabled={t.spotlight} accent={accent} />

      <div className="app">
        <TopBar overclock={overclock} />
        <div className={`bento${overclock ? ' is-overclock' : ''}`}>
          {order.map(id => (
            <div
              key={id}
              ref={el => { tileRefs.current[id] = el }}
              className={[
                'tile', `t-${id}`,
                hoverId === id ? 'is-hover' : '',
              ].filter(Boolean).join(' ')}
              onMouseEnter={() => setHoverId(id)}
              onMouseMove={e => onTileMove(e, e.currentTarget)}
              onMouseLeave={e => { setHoverId(curr => curr === id ? null : curr); onTileLeave(e.currentTarget) }}
            >
              {renderTile(id)}
            </div>
          ))}
        </div>
        <Footer />
      </div>

      <ProjectModal projectId={openProject} onClose={() => setOpenProject(null)} accent={accent} secondary={secondary} />
      <MatrixOverlay on={matrixOn} accent={accent} onClose={() => setMatrixOn(false)} />
      <SnakeGame on={snakeOn} accent={accent} onClose={() => setSnakeOn(false)} />
      <AsciiRover />

      <TweaksPanel
        t={t}
        setTweak={setTweak}
        overclock={overclock}
        setOverclock={setOverclock}
        onResetOrder={() => { try { localStorage.removeItem('tileOrder') } catch {} }}
        onMatrix={() => setMatrixOn(true)}
        onSnake={() => setSnakeOn(true)}
        onSpeedrun={runSpeedrun}
      />
    </>
  )
}
