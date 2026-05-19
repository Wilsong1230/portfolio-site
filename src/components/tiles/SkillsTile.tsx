import TileLabel from '../ui/TileLabel'
import { skillGroups } from '../../data/skills'

interface Props { accent: string; secondary: string }

export default function SkillsTile({ accent, secondary }: Props) {
  return (
    <div className="sk">
      <TileLabel>SKILLS · CALIBRATION</TileLabel>
      <div className="sk-grid">
        {skillGroups.map(g => (
          <div key={g.group} className="sk-group">
            <div className="sk-h">{g.group.toUpperCase()}</div>
            {g.items.map(item => {
              const ticks = Math.round(item.value / 10)
              return (
                <div className="sk-row" key={item.name}>
                  <span className="sk-name">{item.name}</span>
                  <span className="sk-meter">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={i}
                        className={`sk-tick${i < ticks ? ' on' : ''}`}
                        style={i < ticks ? { background: i > 7 ? accent : secondary } : undefined}
                      />
                    ))}
                  </span>
                  <span className="sk-val">{item.value}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
