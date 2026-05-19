import { useEffect, useRef } from 'react'

interface Props {
  enabled: boolean
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function Starfield({ enabled, mouse }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!enabled || !ref.current) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')!
    let raf: number
    let w = 0, h = 0
    let mx = 0, my = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    interface Star { x: number; y: number; z: number; r: number; tw: number; tws: number }
    let stars: Star[] = []

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor((w * h) / 5500)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.85 + 0.15,
        r: Math.random() * 1.1 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.015 + 0.004,
      }))
    }

    function tick() {
      const tx = (mouse.current?.x ?? 0) * 14
      const ty = (mouse.current?.y ?? 0) * 14
      mx += (tx - mx) * 0.05
      my += (ty - my) * 0.05
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.tw += s.tws
        const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(s.tw)) * s.z
        const px = s.x + mx * s.z
        const py = s.y + my * s.z
        ctx.fillStyle = `rgba(236,232,220,${a})`
        ctx.beginPath()
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [enabled, mouse])

  if (!enabled) return null
  return <canvas ref={ref} className="atm-stars" />
}
