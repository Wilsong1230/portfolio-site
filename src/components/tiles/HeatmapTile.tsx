import TileLabel from '../ui/TileLabel'
import { GitHubCalendar } from 'react-github-calendar'
import { profile } from '../../data/profile'

interface Props { accent: string; secondary: string }

export default function HeatmapTile({ accent }: Props) {
  return (
    <div className="hm">
      <TileLabel>ACTIVITY · COMMIT HEATMAP</TileLabel>
      <div className="hm-wrap">
        <GitHubCalendar
          username={profile.links.githubHandle}
          colorScheme="dark"
          fontSize={10}
          blockSize={10}
          blockMargin={3}
          theme={{
            dark: [
              'rgba(255,255,255,0.04)',
              `color-mix(in oklab, ${accent} 20%, rgba(255,255,255,0.04))`,
              `color-mix(in oklab, ${accent} 40%, rgba(255,255,255,0.04))`,
              `color-mix(in oklab, ${accent} 70%, rgba(255,255,255,0.04))`,
              accent,
            ],
          }}
          style={{ color: 'var(--ink-2)', fontFamily: 'var(--ff-mono)' }}
        />
      </div>
      <div className="hm-foot">
        <span>github.com/{profile.links.githubHandle}</span>
        <span>CONTRIBUTIONS · 12 MO</span>
      </div>
    </div>
  )
}
