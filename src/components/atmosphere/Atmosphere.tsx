import Starfield from './Starfield'
import PCBTraces from './PCBTraces'

interface Props {
  stars: boolean
  pcb: boolean
  scanlines: boolean
  accent: string
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function Atmosphere({ stars, pcb, scanlines, accent, mouse }: Props) {
  return (
    <div className="atm-root" aria-hidden="true">
      <Starfield enabled={stars} mouse={mouse} />
      <PCBTraces enabled={pcb} color={accent} />
      {scanlines && <div className="atm-scan" />}
      <div className="atm-vignette" />
    </div>
  )
}
