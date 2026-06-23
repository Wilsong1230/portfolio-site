import TileLabel from '../ui/TileLabel'
import type { Project } from '../../data/projects'

interface Props {
  project: Project
  accent: string
  secondary: string
  onOpen: (id: string) => void
}

function FlightPreview({ accent, secondary }: { accent: string; secondary: string }) {
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      {/* PCB board outline */}
      <rect x="22" y="40" width="180" height="104" rx="6" fill="rgba(91,141,239,0.05)" stroke={accent} strokeWidth="1" opacity="0.5" />
      {/* mounting holes */}
      {[[34,52],[190,52],[34,132],[190,132]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
      ))}
      {/* MCU + sensor chips */}
      <rect x="90" y="78" width="34" height="28" rx="2" fill="rgba(7,9,18,0.9)" stroke={accent} strokeWidth="1" />
      <rect x="48" y="62" width="22" height="16" rx="2" fill="none" stroke={secondary} strokeWidth="1" opacity="0.8" />
      <rect x="146" y="62" width="22" height="16" rx="2" fill="none" stroke={secondary} strokeWidth="1" opacity="0.8" />
      <rect x="48" y="112" width="22" height="16" rx="2" fill="none" stroke={secondary} strokeWidth="1" opacity="0.8" />
      {/* traces */}
      {[[70,70,90,86],[157,70,124,86],[59,112,107,106],[124,92,160,120]].map(([x1,y1,x2,y2],i)=>(
        <path key={i} d={`M${x1} ${y1} L${(x1+x2)/2} ${y1} L${(x1+x2)/2} ${y2} L${x2} ${y2}`} fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
      ))}
      {/* altitude / flight curve */}
      <path d="M214 138 Q 250 40 270 60 Q 285 74 306 132" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.85" />
      <circle cx="262" cy="52" r="3" fill={accent} />
      <text x="232" y="46" fontSize="6" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.55)">apogee</text>
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>FLIGHT-COMPUTER · ARMED</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">IMU + baro · telemetry log</text>
    </svg>
  )
}

function FitnessPreview({ accent, secondary }: { accent: string; secondary: string }) {
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      {/* phone */}
      <rect x="34" y="34" width="88" height="116" rx="12" fill="rgba(7,9,18,0.9)" stroke={accent} strokeWidth="1" />
      <rect x="42" y="46" width="72" height="6" rx="3" fill={accent} opacity="0.5" />
      {/* bar chart on phone */}
      {[[50,120,26],[64,108,38],[78,116,30],[92,96,50],[106,104,42]].map(([x,y,h],i)=>(
        <rect key={i} x={x} y={y} width="8" height={h} rx="2" fill={i===3?accent:secondary} opacity={i===3?0.95:0.55} />
      ))}
      {/* watch */}
      <rect x="150" y="58" width="64" height="64" rx="16" fill="rgba(7,9,18,0.9)" stroke={accent} strokeWidth="1" />
      {/* activity rings */}
      <circle cx="182" cy="90" r="22" fill="none" stroke={accent} strokeWidth="4" opacity="0.18" />
      <circle cx="182" cy="90" r="22" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeDasharray="104 138" transform="rotate(-90 182 90)" />
      <circle cx="182" cy="90" r="15" fill="none" stroke={secondary} strokeWidth="4" opacity="0.18" />
      <circle cx="182" cy="90" r="15" fill="none" stroke={secondary} strokeWidth="4" strokeLinecap="round" strokeDasharray="70 94" transform="rotate(-90 182 90)" />
      {/* data sources */}
      {['HEVY','STRAVA','APPLE'].map((s,i)=>(
        <g key={s}>
          <rect x="238" y={50+i*30} width="70" height="20" rx="5" fill="none" stroke={secondary} strokeWidth="1" opacity="0.6" />
          <text x="246" y={64+i*30} fontSize="8" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.6)">{s}</text>
        </g>
      ))}
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>FITNESS · SYNCED</text>
      <text x="12" y="32" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">iOS + watchOS · HealthKit</text>
    </svg>
  )
}

function CPEPreview({ accent, secondary: _s2 }: { accent: string; secondary: string }) {
  void _s2
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      {[20,40,60,80,100,120].map((y, i) => (
        <path key={i} d={`M0 ${y+Math.sin(i)*10} Q 80 ${y+18} 160 ${y+4} T 320 ${y-6}`}
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {[[60,60],[110,95],[170,50],[220,115],[270,75],[200,85]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="none" stroke={accent} strokeWidth="1" />
          <circle cx={x} cy={y} r="2" fill={accent} />
          <line x1={x-14} y1={y} x2={x+14} y2={y} stroke={accent} strokeWidth="0.5" />
          <line x1={x} y1={y-14} x2={x} y2={y+14} stroke={accent} strokeWidth="0.5" />
          <text x={x+12} y={y-10} fontSize="6" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.6)">CP{String(i+1).padStart(2,'0')}</text>
        </g>
      ))}
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>CONTROL POINTS</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">PDF → CSV export · dedup match</text>
    </svg>
  )
}

export default function ProjectTile({ project, accent, secondary, onOpen }: Props) {
  return (
    <div className="prj">
      <div className="prj-head">
        <TileLabel>{project.kind}</TileLabel>
        <span className="prj-id" style={{ color: accent }}>#{project.code}</span>
      </div>
      <div className="prj-preview">
        {project.preview === 'flight'  && <FlightPreview  accent={accent} secondary={secondary} />}
        {project.preview === 'fitness' && <FitnessPreview accent={accent} secondary={secondary} />}
        {project.preview === 'cpe'     && <CPEPreview     accent={accent} secondary={secondary} />}
      </div>
      <div className="prj-body">
        <div className="prj-title">{project.name}</div>
        <div className="prj-desc">{project.desc}</div>
        <div className="prj-foot">
          <div className="prj-chips">
            {project.stack.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
          <button
            className="prj-open"
            style={{ color: accent, borderColor: accent + '55' }}
            onClick={e => { e.stopPropagation(); onOpen(project.id) }}
          >OPEN ↗</button>
        </div>
      </div>
    </div>
  )
}
