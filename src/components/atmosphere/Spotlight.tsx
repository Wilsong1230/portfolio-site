import { useEffect, useRef } from 'react'

interface Props { enabled: boolean; accent: string }

export default function Spotlight({ enabled, accent }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !ref.current) return
    const el = ref.current
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth * 100).toFixed(1) + '%'
      const y = (e.clientY / window.innerHeight * 100).toFixed(1) + '%'
      el.style.setProperty('--mx', x)
      el.style.setProperty('--my', y)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  if (!enabled) return null
  return <div ref={ref} className="spotlight" style={{ '--spot': accent } as React.CSSProperties} aria-hidden="true" />
}
