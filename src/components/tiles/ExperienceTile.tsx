import TileLabel from '../ui/TileLabel'
import { experience } from '../../data/experience'

interface Props { accent: string; secondary: string }

export default function ExperienceTile({ accent }: Props) {
  return (
    <div className="ex">
      <TileLabel>EXPERIENCE · LOG</TileLabel>
      <div className="ex-line" aria-hidden="true" />
      <div className="ex-rows">
        {experience.map((item, i) => (
          <div key={i} className={`ex-row${item.isNow ? ' is-now' : ''}`}>
            <div className="ex-dot" style={item.isNow ? { background: accent, boxShadow: `0 0 8px ${accent}`, borderColor: 'var(--bg)' } : undefined} />
            <div className="ex-y">{item.date}</div>
            <div className="ex-mid">
              <div className="ex-role">{item.role}</div>
              <div className="ex-org">{item.org}</div>
            </div>
            <div className="ex-tag" style={item.isNow ? { color: accent, borderColor: accent + '55' } : undefined}>
              {item.tags.join(' · ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
