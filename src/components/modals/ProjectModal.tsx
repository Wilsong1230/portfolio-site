import { useEffect, useState } from 'react'
import { projects } from '../../data/projects'

interface Props {
  projectId: string | null
  onClose: () => void
  accent: string
  secondary: string
}

function FlowEdge({ from, to, accent, delay = 0 }: { from:{x:number;y:number}; to:{x:number;y:number}; accent:string; delay?:number }) {
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={accent} strokeWidth="1.2"
            strokeDasharray="4 8"
            style={{ animation:`dashFlow 1.6s linear ${delay}s infinite`, opacity:0.85 }} />
      <circle r="2.4" fill={accent} style={{ filter:`drop-shadow(0 0 4px ${accent})` }}>
        <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite"
                       path={`M${from.x} ${from.y} L${to.x} ${to.y}`} />
      </circle>
    </g>
  )
}

function SchemNode({ x, y, w, h, label, sub, accent, fill }: { x:number;y:number;w:number;h:number;label:string;sub?:string;accent:string;fill?:string }) {
  return (
    <g>
      <rect x={x-w/2} y={y-h/2} width={w} height={h} rx="6"
            fill={fill||'rgba(7,9,18,0.85)'} stroke={accent} strokeWidth="1" />
      <text x={x} y={y-2} fontFamily="JetBrains Mono" fontSize="9" fill="#ece8dc" textAnchor="middle" fontWeight="500">{label}</text>
      {sub && <text x={x} y={y+10} fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle">{sub}</text>}
    </g>
  )
}

function FlightSchem({ accent, secondary }: { accent:string; secondary:string }) {
  const N = { imu:{x:60,y:50}, baro:{x:60,y:130}, pwr:{x:60,y:210}, mcu:{x:200,y:120}, flash:{x:340,y:50}, pyro:{x:340,y:190} }
  return (
    <svg viewBox="0 0 400 260" className="schem">
      <FlowEdge from={N.imu}  to={N.mcu} accent={accent} delay={0} />
      <FlowEdge from={N.baro} to={N.mcu} accent={accent} delay={0.3} />
      <FlowEdge from={N.pwr}  to={N.mcu} accent={secondary} delay={0.5} />
      <FlowEdge from={N.mcu}  to={N.flash} accent={accent} delay={0.6} />
      <FlowEdge from={N.mcu}  to={N.pyro}  accent={secondary} delay={0.9} />
      <SchemNode {...N.imu}   w={90} h={32}  label="IMU"        sub="accel · gyro"   accent={accent} />
      <SchemNode {...N.baro}  w={90} h={32}  label="BAROMETER"  sub="altitude"       accent={accent} />
      <SchemNode {...N.pwr}   w={90} h={32}  label="POWER"      sub="LiPo · reg"     accent={secondary} />
      <SchemNode {...N.mcu}   w={120} h={52} label="MCU"        sub="Cortex-M · fusion" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.flash} w={90} h={32}  label="FLASH LOG"  sub="telemetry"      accent={accent} />
      <SchemNode {...N.pyro}  w={90} h={32}  label="PYRO CH"    sub="drogue · main"  accent={secondary} />
    </svg>
  )
}

function FitnessSchem({ accent, secondary }: { accent:string; secondary:string }) {
  const N = { hevy:{x:60,y:45}, strava:{x:60,y:125}, apple:{x:60,y:205}, app:{x:210,y:125}, watch:{x:345,y:55}, analyze:{x:345,y:190} }
  return (
    <svg viewBox="0 0 400 260" className="schem">
      <FlowEdge from={N.hevy}   to={N.app} accent={secondary} delay={0} />
      <FlowEdge from={N.strava} to={N.app} accent={secondary} delay={0.3} />
      <FlowEdge from={N.apple}  to={N.app} accent={secondary} delay={0.5} />
      <FlowEdge from={N.app}    to={N.watch}   accent={accent} delay={0.6} />
      <FlowEdge from={N.app}    to={N.analyze} accent={accent} delay={0.9} />
      <SchemNode {...N.hevy}    w={90} h={32}  label="HEVY"     sub="strength"   accent={secondary} />
      <SchemNode {...N.strava}  w={90} h={32}  label="STRAVA"   sub="cardio"     accent={secondary} />
      <SchemNode {...N.apple}   w={90} h={32}  label="APPLE FIT" sub="HealthKit" accent={secondary} />
      <SchemNode {...N.app}     w={120} h={52} label="iOS APP"  sub="SwiftUI · sync" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.watch}   w={90} h={32}  label="watchOS"  sub="companion"  accent={accent} />
      <SchemNode {...N.analyze} w={90} h={32}  label="ANALYZE"  sub="trends"     accent={accent} />
    </svg>
  )
}

function CPESchem({ accent, secondary }: { accent:string; secondary:string }) {
  const N = { pdf:{x:60,y:60}, fold:{x:60,y:200}, parse:{x:200,y:130}, dedup:{x:320,y:60}, csv:{x:320,y:200} }
  return (
    <svg viewBox="0 0 400 260" className="schem">
      <FlowEdge from={N.pdf}  to={N.parse} accent={secondary} delay={0} />
      <FlowEdge from={N.fold} to={N.parse} accent={secondary} delay={0.3} />
      <FlowEdge from={N.parse} to={N.dedup} accent={accent} delay={0.5} />
      <FlowEdge from={N.parse} to={N.csv}  accent={accent} delay={0.7} />
      <FlowEdge from={N.dedup} to={N.csv}  accent={accent} delay={0.9} />
      <SchemNode {...N.pdf}   w={90} h={32}  label="PDF files"  sub="plan sets"   accent={secondary} />
      <SchemNode {...N.fold}  w={90} h={32}  label="FOLDER"     sub="drag + drop" accent={secondary} />
      <SchemNode {...N.parse} w={100} h={52} label="PARSER"     sub="regex · coords" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.dedup} w={90} h={32}  label="DEDUP"      sub="tolerance"   accent={accent} />
      <SchemNode {...N.csv}   w={90} h={32}  label="CSV export" sub="survey-ready" accent={accent} />
    </svg>
  )
}

export default function ProjectModal({ projectId, onClose, accent, secondary }: Props) {
  const project = projects.find(p => p.id === projectId)
  const shots = project?.shots ?? []
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  // Reset the lightbox when switching projects (adjust state during render —
  // see https://react.dev/learn/you-might-not-need-an-effect)
  const [prevId, setPrevId] = useState(projectId)
  if (projectId !== prevId) {
    setPrevId(projectId)
    setLightbox(null)
  }

  useEffect(() => {
    if (!projectId) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { if (lightbox !== null) setLightbox(null); else onClose() }
      if (lightbox !== null && shots.length > 1) {
        if (e.key === 'ArrowRight') setLightbox(i => i === null ? i : (i + 1) % shots.length)
        if (e.key === 'ArrowLeft')  setLightbox(i => i === null ? i : (i - 1 + shots.length) % shots.length)
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [projectId, onClose, lightbox, shots.length])

  if (!project) return null

  const active = lightbox !== null ? shots[lightbox] : null

  async function shareShot(src: string) {
    const url = new URL(src, window.location.origin).href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="pm-back" onClick={onClose}>
      <div className="pm" onClick={e => e.stopPropagation()}>
        <div className="pm-bar">
          <div className="pm-bar-l">
            <span className="pm-id" style={{ color: accent }}>#{project.code}</span>
            <span className="pm-kind">{project.kind}</span>
          </div>
          <div className="pm-bar-r">
            {project.repoUrl && (
              <a className="pm-repo" href={project.repoUrl} target="_blank" rel="noreferrer" style={{ color: accent }}>
                GITHUB ↗
              </a>
            )}
            {project.repoPrivate && <span className="pm-repo pm-repo-priv">PRIVATE REPO</span>}
            <span className="pm-stat">
              <span className="dot wip" style={{ background: accent }} />
              {project.status}
            </span>
            <button className="pm-x" onClick={onClose} aria-label="close">✕</button>
          </div>
        </div>
        <div className="pm-body">
          <div className="pm-col pm-col-l">
            <h2 className="pm-title">{project.name}</h2>
            <p className="pm-blurb">{project.blurb}</p>
            <ul className="pm-bullets">
              {project.bullets.map((b, i) => (
                <li key={i}>
                  <span className="pm-tick" style={{ color: accent }}>›</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="pm-chips">
              {project.stack.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
          <div className="pm-col pm-col-r">
            <div className="pm-schem">
              <div className="pm-schem-l">SYSTEM DIAGRAM · {project.code}</div>
              {project.preview === 'flight'  && <FlightSchem  accent={accent} secondary={secondary} />}
              {project.preview === 'fitness' && <FitnessSchem accent={accent} secondary={secondary} />}
              {project.preview === 'cpe'     && <CPESchem     accent={accent} secondary={secondary} />}
            </div>
            <div className="pm-metrics">
              {project.metrics.map(m => (
                <div className="pm-met" key={m.l}>
                  <div className="pm-met-l">{m.l}</div>
                  <div className="pm-met-v">{m.v}</div>
                </div>
              ))}
            </div>

            <div className="pm-shots-l">SCREENSHOTS</div>
            {shots.length > 0 ? (
              <div className="pm-shots">
                {shots.map((s, i) => (
                  <button key={s.src} className="pm-shot" onClick={() => setLightbox(i)} style={{ borderColor: accent + '40' }}>
                    <img src={s.src} alt={s.caption ?? `${project.name} screenshot ${i + 1}`} loading="lazy" />
                    <span className="pm-shot-zoom" style={{ color: accent }}>⤢</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="pm-shots-empty">
                <span className="pm-shots-empty-i">⤢</span>
                Screenshots coming soon — click any shot to blow it up &amp; share.
              </div>
            )}
          </div>
        </div>
      </div>

      {active && (
        <div className="lb-back" onClick={() => setLightbox(null)}>
          <div className="lb" onClick={e => e.stopPropagation()}>
            <img className="lb-img" src={active.src} alt={active.caption ?? project.name} />
            <div className="lb-bar">
              <span className="lb-cap">{active.caption ?? project.name}</span>
              <div className="lb-actions">
                {shots.length > 1 && (
                  <>
                    <span className="lb-count">{(lightbox ?? 0) + 1} / {shots.length}</span>
                    <button className="lb-btn" onClick={() => setLightbox(i => i === null ? i : (i - 1 + shots.length) % shots.length)}>‹</button>
                    <button className="lb-btn" onClick={() => setLightbox(i => i === null ? i : (i + 1) % shots.length)}>›</button>
                  </>
                )}
                <a className="lb-btn" href={active.src} target="_blank" rel="noreferrer">OPEN ↗</a>
                <button className="lb-btn" onClick={() => shareShot(active.src)} style={{ color: accent, borderColor: accent + '55' }}>
                  {copied ? 'COPIED ✓' : 'SHARE'}
                </button>
                <button className="lb-btn lb-x" onClick={() => setLightbox(null)} aria-label="close">✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
