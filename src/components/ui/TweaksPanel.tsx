import { useState } from 'react'
import type { TweakValues } from '../../hooks/useTweaks'

const PRESETS: Record<string, [string, string]> = {
  navy:     ['#5b8def', '#a8c7ff'],
  deep:     ['#3d6cc4', '#7fb0ff'],
  signal:   ['#8fd4e8', '#c4a8ff'],
  amber:    ['#f0b56b', '#8fd4e8'],
  phosphor: ['#7fc7a8', '#c9e872'],
}

interface Props {
  t: TweakValues
  setTweak: <K extends keyof TweakValues>(key: K, val: TweakValues[K]) => void
  overclock: boolean
  setOverclock: (v: boolean) => void
  onResetOrder: () => void
  onMatrix: () => void
  onSnake: () => void
  onSpeedrun: () => void
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={`tweak-toggle-btn${value ? ' on' : ''}`}
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
    />
  )
}

export default function TweaksPanel({ t, setTweak, overclock, setOverclock, onResetOrder, onMatrix, onSnake, onSpeedrun }: Props) {
  const [open, setOpen] = useState(false)
  const curPalette = JSON.stringify(t.palette)

  return (
    <>
      <button className="tweaks-toggle" onClick={() => setOpen(o => !o)}>
        ⚙ TWEAKS
      </button>
      {open && (
        <div className="tweaks-panel">
          <div className="tweaks-section">Atmosphere</div>
          <div className="tweak-row"><span>Parallax starfield</span><Toggle value={t.stars}     onChange={v => setTweak('stars',v)} /></div>
          <div className="tweak-row"><span>PCB traces</span>        <Toggle value={t.pcb}       onChange={v => setTweak('pcb',v)} /></div>
          <div className="tweak-row"><span>CRT scanlines</span>     <Toggle value={t.scanlines} onChange={v => setTweak('scanlines',v)} /></div>
          <div className="tweak-row"><span>Shooting stars</span>    <Toggle value={t.shooting}  onChange={v => setTweak('shooting',v)} /></div>
          <div className="tweak-row"><span>Mouse spotlight</span>   <Toggle value={t.spotlight} onChange={v => setTweak('spotlight',v)} /></div>
          <div className="tweak-row"><span>3D tilt on hover</span>  <Toggle value={t.tilt}      onChange={v => setTweak('tilt',v)} /></div>

          <div className="tweaks-section">Signal</div>
          <div className="tweak-row"><span>Palette</span></div>
          <div className="tweak-palette-row">
            {Object.entries(PRESETS).map(([name, colors]) => (
              <button
                key={name}
                className={`tweak-swatch${JSON.stringify(colors) === curPalette ? ' active' : ''}`}
                style={{ background: colors[0] }}
                title={name}
                onClick={() => setTweak('palette', colors)}
              />
            ))}
          </div>
          <div className="tweak-row"><span>Overclock mode</span><Toggle value={overclock} onChange={setOverclock} /></div>

          <div className="tweaks-section">Audio</div>
          <div className="tweak-row"><span>Key clicks</span>  <Toggle value={t.sound} onChange={v => setTweak('sound',v)} /></div>
          <div className="tweak-row"><span>Ambient hum</span> <Toggle value={t.hum}   onChange={v => setTweak('hum',v)} /></div>

          <div className="tweaks-section">Layout</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <button className="tweak-action-btn" onClick={onResetOrder}>Reset order</button>
            <button className="tweak-action-btn" onClick={onMatrix}>Matrix</button>
            <button className="tweak-action-btn" onClick={onSnake}>Snake</button>
            <button className="tweak-action-btn" onClick={onSpeedrun}>Speedrun</button>
          </div>
        </div>
      )}
    </>
  )
}

export { PRESETS }
