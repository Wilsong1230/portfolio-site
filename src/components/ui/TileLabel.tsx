interface Props { children: React.ReactNode }

export default function TileLabel({ children }: Props) {
  return (
    <div className="tile-label">
      <span className="tile-label-dot" />
      {children}
    </div>
  )
}
