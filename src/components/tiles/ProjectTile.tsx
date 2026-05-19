import TileLabel from '../ui/TileLabel'
import type { Project } from '../../data/projects'

interface Props {
  project: Project
  accent: string
  secondary: string
  onOpen: (id: string) => void
}

function RoverPreview({ accent, secondary }: { accent: string; secondary: string }) {
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={'v'+i} x1={i*32} y1="0" x2={i*32} y2="160" stroke="rgba(255,255,255,0.05)" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={'h'+i} x1="0" y1={i*32+16} x2="320" y2={i*32+16} stroke="rgba(255,255,255,0.05)" />
      ))}
      <rect x="20" y="20" width="280" height="120" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="80" y1="20" x2="80" y2="100" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="160" y1="60" x2="160" y2="140" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="240" y1="20" x2="240" y2="100" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="80" y1="100" x2="240" y2="100" stroke={accent} strokeWidth="1" opacity="0.3" />
      <rect x="42" y="70" width="20" height="14" rx="2" fill={accent} opacity="0.9" />
      <circle cx="46" cy="88" r="4" fill={secondary} opacity="0.8" />
      <circle cx="58" cy="88" r="4" fill={secondary} opacity="0.8" />
      <path d="M52,70 A22,22 0 0,1 74,70" fill="none" stroke={secondary} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>MAZE-ROVER · MOVING</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">HC-SR04 · wall-follow fsm</text>
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

function CounterPreview({ accent, secondary }: { accent: string; secondary: string }) {
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <defs>
        <pattern id="cvgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      <rect width="320" height="160" fill="url(#cvgrid)" />
      <polygon points="40,160 130,40 200,40 280,160" fill="rgba(255,255,255,0.04)" />
      <line x1="165" y1="40" x2="160" y2="160" stroke={secondary} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      {[[60,120,40,22],[110,90,28,16],[180,70,24,14],[200,110,36,20],[240,135,44,24]].map(([x,y,w,h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="none" stroke={accent} strokeWidth="1" />
          <rect x={x} y={y-10} width={28} height={9} fill={accent} />
          <text x={x+2} y={y-3} fontSize="6" fontFamily="JetBrains Mono" fill="#0a0a0a">car {String(i+1).padStart(2,'0')}</text>
        </g>
      ))}
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>COUNT 247 ▲</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">OpenCV · virtual line detection</text>
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
        {project.preview === 'rover'   && <RoverPreview   accent={accent} secondary={secondary} />}
        {project.preview === 'cpe'     && <CPEPreview     accent={accent} secondary={secondary} />}
        {project.preview === 'counter' && <CounterPreview accent={accent} secondary={secondary} />}
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
