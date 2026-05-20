import { profile } from '../../data/profile'

interface Props { accent: string }

export default function AvatarTile(_: Props) {
  return (
    <div className="av">
      <div className="av-frame">
        <img src="/personalPhoto.jpg" alt="Wilson Gomez" className="av-photo" />
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
