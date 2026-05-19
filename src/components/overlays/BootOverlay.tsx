import { useState, useEffect } from 'react'
import { BOOT_LINES } from '../../data/terminal'

export default function BootOverlay() {
  const [visible, setVisible] = useState<number[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(v => [...v, i]), 80 * i + 200))
    })
    timers.push(setTimeout(() => setDone(true), 80 * BOOT_LINES.length + 800))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className={`boot-overlay${done ? ' is-done' : ''}`} aria-hidden={done}>
      {BOOT_LINES.map((line, i) =>
        visible.includes(i) ? (
          <div
            key={i}
            className="boot-line"
            style={{ animationDelay: '0ms' }}
          >
            <span className="bt">[ {line.t} ]</span>
            <span className={line.cls ? `bv ${line.cls}` : 'bv'}>{line.v}</span>
          </div>
        ) : null
      )}
    </div>
  )
}
