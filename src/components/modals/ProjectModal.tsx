import { useEffect } from 'react'
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

function RoverSchem({ accent, secondary }: { accent:string; secondary:string }) {
  const N = { imu:{x:60,y:60}, bat:{x:60,y:180}, mcu:{x:200,y:120}, motL:{x:340,y:60}, motR:{x:340,y:180}, rad:{x:200,y:220} }
  return (
    <svg viewBox="0 0 400 260" className="schem">
      <FlowEdge from={N.imu} to={N.mcu} accent={accent} delay={0} />
      <FlowEdge from={N.bat} to={N.mcu} accent={secondary} delay={0.4} />
      <FlowEdge from={N.mcu} to={N.motL} accent={accent} delay={0.2} />
      <FlowEdge from={N.mcu} to={N.motR} accent={accent} delay={0.6} />
      <FlowEdge from={N.rad} to={N.mcu} accent={secondary} delay={0.8} />
      <SchemNode {...N.imu}  w={90} h={32} label="HC-SR04"    sub="servo · sweep" accent={accent} />
      <SchemNode {...N.bat}  w={90} h={32} label="9V POWER"   sub="VIN · GND"     accent={secondary} />
      <SchemNode {...N.mcu}  w={120} h={52} label="Arduino Uno" sub="C++ · millis()" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.motL} w={90} h={32} label="STEPPER L"  sub="28BYJ-48"      accent={accent} />
      <SchemNode {...N.motR} w={90} h={32} label="STEPPER R"  sub="28BYJ-48"      accent={accent} />
      <SchemNode {...N.rad}  w={90} h={32} label="ULN2003"    sub="driver"        accent={secondary} />
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

function CounterSchem({ accent, secondary }: { accent:string; secondary:string }) {
  const N = { cam:{x:60,y:130}, decode:{x:170,y:130}, detect:{x:280,y:130}, count:{x:280,y:50}, log:{x:380,y:130} }
  return (
    <svg viewBox="0 0 440 200" className="schem">
      <FlowEdge from={N.cam}    to={N.decode} accent={secondary} delay={0} />
      <FlowEdge from={N.decode} to={N.detect} accent={accent} delay={0.3} />
      <FlowEdge from={N.detect} to={N.count}  accent={accent} delay={0.5} />
      <FlowEdge from={N.detect} to={N.log}    accent={accent} delay={0.7} />
      <FlowEdge from={N.count}  to={N.log}    accent={secondary} delay={0.9} />
      <SchemNode {...N.cam}    w={90} h={32}  label="CAMERA"   sub="USB / IP"     accent={secondary} />
      <SchemNode {...N.decode} w={90} h={32}  label="CAPTURE"  sub="cv2.read()"   accent={accent} />
      <SchemNode {...N.detect} w={100} h={52} label="DETECT"   sub="OpenCV · line" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.count}  w={90} h={32}  label="COUNTER"  sub="virtual gate" accent={accent} />
      <SchemNode {...N.log}    w={90} h={32}  label="LOG"      sub="CSV · overlay" accent={secondary} />
    </svg>
  )
}

export default function ProjectModal({ projectId, onClose, accent, secondary }: Props) {
  const project = projects.find(p => p.id === projectId)

  useEffect(() => {
    if (!projectId) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [projectId, onClose])

  if (!project) return null
  return (
    <div className="pm-back" onClick={onClose}>
      <div className="pm" onClick={e => e.stopPropagation()}>
        <div className="pm-bar">
          <div className="pm-bar-l">
            <span className="pm-id" style={{ color: accent }}>#{project.code}</span>
            <span className="pm-kind">{project.kind}</span>
          </div>
          <div className="pm-bar-r">
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
              {project.preview === 'rover'   && <RoverSchem   accent={accent} secondary={secondary} />}
              {project.preview === 'cpe'     && <CPESchem     accent={accent} secondary={secondary} />}
              {project.preview === 'counter' && <CounterSchem accent={accent} secondary={secondary} />}
            </div>
            <div className="pm-metrics">
              {project.metrics.map(m => (
                <div className="pm-met" key={m.l}>
                  <div className="pm-met-l">{m.l}</div>
                  <div className="pm-met-v">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
