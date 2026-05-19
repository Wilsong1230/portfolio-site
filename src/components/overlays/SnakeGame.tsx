import { useState, useEffect, useRef } from 'react'

interface Props { on: boolean; accent: string; onClose: () => void }

const SIZE = 22
const CELL = 14
const SPEED = 110

type Pos = [number, number]

export default function SnakeGame({ on, accent, onClose }: Props) {
  const [snake, setSnake] = useState<Pos[]>(() => [[10,11],[11,11],[12,11]])
  const [dir, setDir] = useState<Pos>([1,0])
  const [food, setFood] = useState<Pos>([6,11])
  const [score, setScore] = useState(0)
  const [hi, setHi] = useState(() => +(localStorage.getItem('snakeHi') || 0))
  const [state, setState] = useState<'ready'|'playing'|'dead'>('ready')
  const dirRef = useRef(dir)
  const scoreRef = useRef(score)
  useEffect(() => { dirRef.current = dir }, [dir])
  useEffect(() => { scoreRef.current = score }, [score])

  function reset() {
    setSnake([[10,11],[11,11],[12,11]])
    setDir([1,0]); dirRef.current = [1,0]
    setFood([6,11]); setScore(0); setState('playing')
  }

  useEffect(() => {
    if (!on) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (state !== 'playing') {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); reset() }
        return
      }
      const map: Record<string, Pos> = {
        ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0],
        w:[0,-1], s:[0,1], a:[-1,0], d:[1,0]
      }
      const nd = map[e.key] || map[e.key?.toLowerCase()]
      if (!nd) return
      e.preventDefault()
      const cd = dirRef.current
      if (cd[0]+nd[0] === 0 && cd[1]+nd[1] === 0) return
      setDir(nd)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [on, state, onClose])

  useEffect(() => {
    if (!on || state !== 'playing') return
    const id = setInterval(() => {
      setSnake(prev => {
        const head = prev[prev.length - 1]
        const d = dirRef.current
        const nh: Pos = [head[0]+d[0], head[1]+d[1]]
        if (nh[0]<0||nh[1]<0||nh[0]>=SIZE||nh[1]>=SIZE) {
          setState('dead')
          setHi(h => { const n = Math.max(h, scoreRef.current); localStorage.setItem('snakeHi',String(n)); return n })
          return prev
        }
        if (prev.some(([x,y]) => x===nh[0]&&y===nh[1])) {
          setState('dead')
          setHi(h => { const n = Math.max(h, scoreRef.current); localStorage.setItem('snakeHi',String(n)); return n })
          return prev
        }
        const ate = nh[0]===food[0]&&nh[1]===food[1]
        const next = ate ? [...prev, nh] : [...prev.slice(1), nh]
        if (ate) {
          let nf: Pos = [0,0]
          for (let i = 0; i < 200; i++) {
            const f: Pos = [Math.floor(Math.random()*SIZE), Math.floor(Math.random()*SIZE)]
            if (!next.some(([x,y]) => x===f[0]&&y===f[1])) { nf=f; break }
          }
          setFood(nf); setScore(s => s+1)
        }
        return next
      })
    }, SPEED)
    return () => clearInterval(id)
  }, [on, state, food])

  if (!on) return null
  return (
    <div className="snk-back" onClick={onClose}>
      <div className="snk" onClick={e => e.stopPropagation()}>
        <div className="snk-bar">
          <span style={{ color: accent }}>● SNAKE.exe</span>
          <span className="snk-sp" />
          <span>SCORE <b>{String(score).padStart(3,'0')}</b></span>
          <span>HI <b>{String(hi).padStart(3,'0')}</b></span>
          <span className="snk-sp" />
          <button className="snk-x" onClick={onClose}>✕</button>
        </div>
        <div className="snk-stage" style={{ width:SIZE*CELL, height:SIZE*CELL }}>
          <svg className="snk-grid" viewBox={`0 0 ${SIZE*CELL} ${SIZE*CELL}`}>
            <defs>
              <pattern id="snkg" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
                <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#snkg)" />
          </svg>
          {snake.map(([x,y], i) => (
            <div key={i} className="snk-seg" style={{
              left: x*CELL, top: y*CELL, width: CELL-1, height: CELL-1,
              background: i===snake.length-1 ? accent : `color-mix(in oklab, ${accent} 70%, transparent)`,
              boxShadow: i===snake.length-1 ? `0 0 8px ${accent}` : 'none',
            }} />
          ))}
          <div className="snk-food" style={{ left:food[0]*CELL+2, top:food[1]*CELL+2, width:CELL-5, height:CELL-5 }} />
          {state === 'ready' && (
            <div className="snk-msg">
              <div>READY</div>
              <div className="snk-hint">arrows · wasd · space to begin · esc to quit</div>
            </div>
          )}
          {state === 'dead' && (
            <div className="snk-msg">
              <div style={{ color:'#f47272' }}>SEGFAULT</div>
              <div className="snk-hint">score {score} · space to retry · esc to quit</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
