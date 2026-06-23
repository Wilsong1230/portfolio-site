import TileLabel from '../ui/TileLabel'

interface Props { accent: string }

export default function CurrentTile({ accent }: Props) {
  return (
    <div className="cur">
      <TileLabel>NOW · CURRENT FOCUS</TileLabel>
      <div className="cur-head">
        <div className="cur-title">Flight Computer</div>
        <div className="cur-sub">Custom avionics board — IMU + barometer fusion, telemetry logging</div>
      </div>
      <div className="cur-progress">
        <div className="cur-bar">
          <div className="cur-fill" style={{ width: '55%', background: accent }} />
        </div>
        <div className="cur-meta">
          <span>HARDWARE BRING-UP</span>
          <span style={{ color: accent }}>55%</span>
        </div>
      </div>
      <ul className="cur-log">
        <li><span className="dot ok" /> Schematic + PCB layout complete</li>
        <li><span className="dot ok" /> IMU + barometer reading over I2C</li>
        <li><span className="dot wip" style={{ background: accent }} /> Sensor fusion + flash telemetry logging</li>
        <li><span className="dot todo" /> Pyro deployment + continuity checks</li>
      </ul>
    </div>
  )
}
