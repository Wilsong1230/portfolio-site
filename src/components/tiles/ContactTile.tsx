import TileLabel from '../ui/TileLabel'
import { profile } from '../../data/profile'

interface Props { accent: string }

export default function ContactTile({ accent }: Props) {
  return (
    <div className="ct">
      <TileLabel>UPLINK · CONTACT</TileLabel>
      <div className="ct-grid">
        <a className="ct-row" href={`mailto:${profile.links.email}`}>
          <span className="ct-k">EMAIL</span>
          <span className="ct-v">{profile.links.email}</span>
        </a>
        <a className="ct-row" href={profile.links.github} target="_blank" rel="noreferrer">
          <span className="ct-k">GITHUB</span>
          <span className="ct-v">github.com/{profile.links.githubHandle}</span>
        </a>
        <a className="ct-row" href={profile.links.linkedin} target="_blank" rel="noreferrer">
          <span className="ct-k">LINKEDIN</span>
          <span className="ct-v">/in/wagomez</span>
        </a>
        <a className="ct-row" href={profile.links.resume} target="_blank" rel="noreferrer">
          <span className="ct-k">RESUME</span>
          <span className="ct-v" style={{ color: accent }}>↗ resume.pdf</span>
        </a>
      </div>
      <div className="ct-foot">Best route: email · I read everything within 24h.</div>
    </div>
  )
}
