import { useState, useEffect } from 'react'
import { profile } from '../../data/profile'
import ContactModal from '../modals/ContactModal'

interface Props { accent: string; secondary: string }

function fmtUptime(s: number) {
  const m = Math.floor(s / 60), sec = s % 60
  return `00:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

export default function HeroTile({ accent }: Props) {
  const [tick, setTick] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-top">
        <span className="hero-tag">
          <span className="hero-led" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          IDENT/01 · ONLINE
        </span>
        <span className="hero-coord">{profile.coords}</span>
      </div>
      <div className="hero-name">
        <span>Wilson</span>
        <span className="hero-name-2">Gomez</span>
      </div>
      <div className="hero-roles">
        <span>SWE Student</span>
        <span className="hero-sep">·</span>
        <span>Lab Assistant</span>
        <span className="hero-sep">·</span>
        <span style={{ color: accent }}>DOT Intern</span>
        <span className="hero-sep">·</span>
        <span>FGCU</span>
      </div>
      <div className="hero-bio">{profile.bio}</div>
      <div className="hero-strip">
        {profile.strip.map(cell => (
          <div key={cell.label} className="hcell">
            <div className="hcell-l">{cell.label}</div>
            <div className="hcell-v" style={'accent' in cell && cell.accent ? { color: accent } : undefined}>
              {cell.value}
            </div>
          </div>
        ))}
        <div className="hcell">
          <div className="hcell-l">UPTIME</div>
          <div className="hcell-v" style={{ fontFamily: 'var(--ff-mono)', fontSize: 12 }}>{fmtUptime(tick)}</div>
        </div>
        <div className="hcell hcell-bot">
          <div className="hcell-l">UNIT/01</div>
          <svg className="bot-svg" width="36" height="38" viewBox="0 0 36 38" fill="none" aria-hidden="true">
            <line x1="18" y1="0" x2="18" y2="7" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="18" cy="0" r="2.5" fill={accent} style={{ filter: `drop-shadow(0 0 4px ${accent})` }} className="bot-antenna-tip" />
            <rect x="3" y="7" width="30" height="20" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <rect x="9" y="13" width="6" height="6" rx="1.5" fill={accent} opacity="0.9" style={{ filter: `drop-shadow(0 0 4px ${accent})` }} />
            <rect x="21" y="13" width="6" height="6" rx="1.5" fill={accent} opacity="0.9" style={{ filter: `drop-shadow(0 0 4px ${accent})` }} />
            <circle cx="13" cy="24" r="1.2" fill="rgba(255,255,255,0.18)"/>
            <circle cx="18" cy="24" r="1.2" fill="rgba(255,255,255,0.18)"/>
            <circle cx="23" cy="24" r="1.2" fill="rgba(255,255,255,0.18)"/>
            <rect x="15" y="27" width="6" height="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            <rect x="7" y="30" width="22" height="8" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            <circle cx="18" cy="34" r="2" fill={accent} opacity="0.35" />
          </svg>
        </div>
        <button
          onClick={() => setContactOpen(true)}
          className="hcell hcell-action hcell-action-btn"
          style={{ '--ac': accent } as React.CSSProperties}
        >
          <div className="hcell-l">CONTACT</div>
          <div className="hcell-v hcell-action-v" style={{ color: accent }}>
            HIRE ME ↗
          </div>
        </button>
        <a
          href={profile.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="hcell hcell-action"
          style={{ '--ac': accent } as React.CSSProperties}
        >
          <div className="hcell-l">DOCS</div>
          <div className="hcell-v">VIEW RESUME →</div>
        </a>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} accent={accent} />
    </div>
  )
}
