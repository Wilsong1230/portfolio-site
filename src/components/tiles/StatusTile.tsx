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

const BOT_MESSAGES: [string, string, string][] = [
  ['PING',  'ACK',     'IDLE...'],
  ['SYN',   'SYN-ACK', 'OK'],
  ['BEEP',  'BOOP',    'ZZZ'],
  ['?',     '!',       '...'],
  ['SCAN',  'FOUND',   'LOL'],
  ['HELLO', 'HI',      '...'],
]

function BotArena({ accent }: { accent: string }) {
  const [positions, setPositions] = useState<[number, number, number]>([8, 44, 76])
  const [bottoms, setBottoms] = useState<[number, number, number]>([4, 20, 10])
  const [bubbles, setBubbles] = useState<[string | null, string | null, string | null]>([null, null, null])

  useEffect(() => {
    const clampX = (n: number) => Math.min(Math.max(n, 4), 80)
    const clampY = (n: number) => Math.min(Math.max(n, 4), 38)
    const ids = [
      setInterval(() => setPositions(p => [clampX(Math.random() * 76 + 4), p[1], p[2]]), 2400),
      setInterval(() => setPositions(p => [p[0], clampX(Math.random() * 76 + 4), p[2]]), 3100),
      setInterval(() => setPositions(p => [p[0], p[1], clampX(Math.random() * 76 + 4)]), 2700),
      setInterval(() => setBottoms(b => [clampY(Math.random() * 34 + 4), b[1], b[2]]), 3300),
      setInterval(() => setBottoms(b => [b[0], clampY(Math.random() * 34 + 4), b[2]]), 2900),
      setInterval(() => setBottoms(b => [b[0], b[1], clampY(Math.random() * 34 + 4)]), 3700),
    ]
    return () => ids.forEach(clearInterval)
  }, [])

  useEffect(() => {
    const tick = () => {
      const set = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)]
      setBubbles([set[0], null, null])
      const t1 = setTimeout(() => setBubbles([set[0], set[1], null]), 600)
      const t2 = setTimeout(() => setBubbles([set[0], set[1], set[2]]), 1300)
      const t3 = setTimeout(() => setBubbles([null, null, null]), 2200)
      return [t1, t2, t3]
    }
    let timeouts = tick()
    const id = setInterval(() => { timeouts = tick() }, 4500)
    return () => { clearInterval(id); timeouts.forEach(clearTimeout) }
  }, [])

  const delays = ['0s', '-1.2s', '-2.4s']

  return (
    <div className="bot-arena">
      {([0, 1, 2] as const).map(i => (
        <div key={i} className="bot-unit" style={{ left: `${positions[i]}%`, bottom: `${bottoms[i]}px` }}>
          <div className={`bot-bubble${bubbles[i] ? ' visible' : ''}`}>{bubbles[i] ?? ''}</div>
          <svg
            width="22" height="24" viewBox="0 0 36 38" fill="none"
            className="bot-svg" style={{ animationDelay: delays[i] }}
            aria-hidden="true"
          >
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
          </svg>
        </div>
      ))}
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
      <BotArena accent={accent} />
    </div>
  )
}
