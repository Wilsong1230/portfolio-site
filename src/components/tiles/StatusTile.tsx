import { useState, useEffect } from 'react'
import TileLabel from '../ui/TileLabel'

interface Props { accent: string; secondary: string }

function StatusRow({ label, value, dot, color }: { label: string; value: string; dot?: string; color?: string }) {
  return (
    <div className="st-row">
      <span className="st-l">{label}</span>
      <span className="st-v" style={color ? { color } : undefined}>
        {dot && <span className={`dot ${dot}`} />}
        {value}
      </span>
    </div>
  )
}

export default function StatusTile({ accent }: Props) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  const date = `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())}`
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

  return (
    <div className="st">
      <TileLabel>SYSTEM · STATUS</TileLabel>
      <div className="st-time">
        <div className="st-clock">{time}</div>
        <div className="st-date">{date} · EST</div>
      </div>
      <div className="st-rows">
        <StatusRow label="HOST"    value="deck.local" />
        <StatusRow label="LINK"    value="ONLINE" dot="ok" />
        <StatusRow label="LATENCY" value={`${12 + (now.getSeconds() % 6)} ms`} />
        <StatusRow label="LOC"     value="Fort Myers, FL" />
        <StatusRow label="STATUS"  value="OPEN TO WORK" color={accent} />
      </div>
    </div>
  )
}
