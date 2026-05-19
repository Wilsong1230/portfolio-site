import { useEffect, useRef } from 'react'

interface Props { enabled: boolean; accent: string; fast?: boolean }

export default function ShootingStars({ enabled, accent, fast }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current!
    let tid: ReturnType<typeof setTimeout>

    function spawn() {
      const el = document.createElement('div')
      el.className = 'shoot'
      el.style.setProperty('--shoot-color', accent)
      el.style.top = Math.random() * 60 + 'vh'
      el.style.left = Math.random() * 40 + 'vw'
      const dur = fast ? (1 + Math.random() * 0.8) : (1.2 + Math.random() * 1.2)
      el.style.animationDuration = dur + 's'
      container.appendChild(el)
      setTimeout(() => el.remove(), dur * 1000 + 200)
      const next = fast ? (1000 + Math.random() * 1500) : (3000 + Math.random() * 4000)
      tid = setTimeout(spawn, next)
    }

    tid = setTimeout(spawn, 1500)
    return () => { clearTimeout(tid); container.innerHTML = '' }
  }, [enabled, accent, fast])

  if (!enabled) return null
  return <div ref={containerRef} className="shoots" aria-hidden="true" />
}
