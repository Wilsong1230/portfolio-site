import { useState, useEffect } from 'react'
import TileLabel from '../ui/TileLabel'

interface Props { accent: string; secondary: string }

function SineWave({ color }: { color: string }) {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf: number
    function tick() { setT(v => v + 1); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  const pts = Array.from({ length: 80 }, (_, i) => {
    const x = i * (320 / 79)
    const y = 20 + Math.sin((i + t * 0.5) * 0.4) * 12
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox="0 0 320 40" preserveAspectRatio="none" className="sig-svg">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

const ITEMS = [
  'HIRING WINDOW OPEN — SUMMER 2026',
  'BUILDING ROVERS / CTRL POINT EXTRACTION / CAR COUNTER',
  'C · C++ · PYTHON · ARDUINO/AVR · JAVASCRIPT',
  'LAB ASSISTANT @ FGCU',
  'DOT OPS — PROJECT MANAGEMENT INTERN',
  'B.S. SOFTWARE ENGINEERING · MAY 2027',
]

export default function SignalTile({ accent, secondary }: Props) {
  return (
    <div className="sig">
      <TileLabel>BROADCAST · CHANNEL 04</TileLabel>
      <div className="sig-wave">
        <SineWave color={secondary} />
      </div>
      <div className="sig-marquee">
        <div className="sig-track">
          {[...ITEMS, ...ITEMS].map((s, i) => (
            <span key={i} className="sig-item">
              <span className="sig-dot" style={{ background: accent }} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
