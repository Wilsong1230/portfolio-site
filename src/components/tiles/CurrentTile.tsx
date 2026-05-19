import TileLabel from '../ui/TileLabel'

interface Props { accent: string }

export default function CurrentTile({ accent }: Props) {
  return (
    <div className="cur">
      <TileLabel>NOW · CURRENT FOCUS</TileLabel>
      <div className="cur-head">
        <div className="cur-title">Autonomous Maze Rover</div>
        <div className="cur-sub">Wall-following state machine + ultrasonic sensor sweep</div>
      </div>
      <div className="cur-progress">
        <div className="cur-bar">
          <div className="cur-fill" style={{ width: '78%', background: accent }} />
        </div>
        <div className="cur-meta">
          <span>WEEK 8 / 10</span>
          <span style={{ color: accent }}>78%</span>
        </div>
      </div>
      <ul className="cur-log">
        <li><span className="dot ok" /> Servo + HC-SR04 sweep logic complete</li>
        <li><span className="dot ok" /> 28BYJ-48 stepper motor calibration done</li>
        <li><span className="dot wip" style={{ background: accent }} /> STUCK recovery edge cases</li>
        <li><span className="dot todo" /> FINISH detection + LED indicator</li>
      </ul>
    </div>
  )
}
