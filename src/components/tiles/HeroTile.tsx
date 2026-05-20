import { useState, useEffect } from 'react'
import { profile } from '../../data/profile'

interface Props { accent: string; secondary: string }

function fmtUptime(s: number) {
  const m = Math.floor(s / 60), sec = s % 60
  return `00:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

export default function HeroTile({ accent }: Props) {
  const [tick, setTick] = useState(0)
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
      <div className="hero-actions" style={{ '--ac': accent } as React.CSSProperties}>
        <a href={`mailto:${profile.links.email}?subject=Job%20Opportunity%20%E2%80%94%20SWE%20Internship&body=Hi%20Wilson%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20about%20a%20potential%20opportunity.%0A%0A`} className="hire-btn">
          <span className="hire-btn-bracket">[</span>
          <span className="hire-btn-dot" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span className="hire-btn-label">HIRE ME</span>
          <span className="hire-btn-arrow">↗</span>
          <span className="hire-btn-bracket">]</span>
        </a>
        <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="resume-link">
          VIEW RESUME →
        </a>
      </div>
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
      </div>
    </div>
  )
}
