import { useEffect, useRef } from 'react'

interface Props { on: boolean; accent: string; onClose: () => void }

export default function MatrixOverlay({ on, accent, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!on || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコ@#$%&'
    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)

    let raf: number
    function draw() {
      ctx.fillStyle = 'rgba(5,8,17,0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = accent
      ctx.font = `${fontSize}px JetBrains Mono`
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
    }
  }, [on, accent, onClose])

  if (!on) return null
  return (
    <div className="mtx" onClick={onClose}>
      <canvas ref={canvasRef} />
      <div className="mtx-hint">ESC · CLICK TO EXIT</div>
    </div>
  )
}
