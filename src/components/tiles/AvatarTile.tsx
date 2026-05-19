import { profile } from '../../data/profile'

interface Props { accent: string }

export default function AvatarTile({ accent }: Props) {
  return (
    <div className="av">
      <div className="av-frame">
        <div className="av-initials" style={{ color: accent }}>WG</div>
        <div className="av-cross" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>
      <div className="av-foot">
        <span>wagomez1230</span>
        <span>{profile.schoolShort}</span>
      </div>
    </div>
  )
}
