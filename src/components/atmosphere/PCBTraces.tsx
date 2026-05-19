import { useMemo } from 'react'

interface Props { enabled: boolean; color: string }

function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function PCBTraces({ enabled, color }: Props) {
  const traces = useMemo(() => {
    const rng = mulberry32(424242)
    const cells: { c: number; r: number; dir: number; pad: boolean; dur: number; delay: number }[] = []
    const cols = 14, rows = 10
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rng() < 0.55) {
          const dir = Math.floor(rng() * 4)
          cells.push({ c, r, dir, pad: rng() < 0.35, dur: 6 + rng() * 10, delay: rng() * 8 })
        }
      }
    }
    return { cells, cols, rows }
  }, [])

  if (!enabled) return null
  const { cells, cols, rows } = traces
  return (
    <svg className="atm-pcb" viewBox={`0 0 ${cols * 100} ${rows * 100}`} preserveAspectRatio="xMidYMid slice">
      {cells.map((cell, i) => {
        const x = cell.c * 100, y = cell.r * 100
        const paths = [
          `M${x+10},${y+50} L${x+50},${y+50} L${x+50},${y+90}`,
          `M${x+50},${y+10} L${x+50},${y+50} L${x+90},${y+50}`,
          `M${x+10},${y+50} L${x+90},${y+50}`,
          `M${x+50},${y+10} L${x+50},${y+90}`,
        ]
        return (
          <g key={i} style={{ animation: `pcbPulse ${cell.dur}s ease-in-out ${cell.delay}s infinite` }}>
            <path d={paths[cell.dir]} stroke={color} strokeWidth="0.8" fill="none" opacity="0.22" />
            {cell.pad && <circle cx={x+50} cy={y+50} r="2.4" fill={color} opacity="0.45" />}
          </g>
        )
      })}
    </svg>
  )
}
