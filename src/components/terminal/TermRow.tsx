export interface TermRowData {
  kind: 'line' | 'echo' | 'kv' | 'block' | 'proj' | 'action'
  text?: string
  cls?: string
  stamp?: string
  k?: string
  v?: string
  i?: number
  id?: string
  name?: string
  tag?: string
  desc?: string
  label?: string
  action?: string
  silent?: boolean
}

interface Props {
  row: TermRowData
  accent: string
  onAction?: (action: string) => void
}

export default function TermRow({ row, accent, onAction }: Props) {
  if (row.kind === 'echo') {
    return (
      <div className="trow">
        <span className="term-ps" style={{ color: accent }}>wilson@deck</span>
        <span className="term-sep">:</span>
        <span className="term-path">~</span>
        <span className="term-sep">$&nbsp;</span>
        <span className="term-cmd">{row.text}</span>
        <span className="term-stamp">  {row.stamp}</span>
      </div>
    )
  }
  if (row.kind === 'line') return <div className={`trow ${row.cls ?? ''}`}>{row.text}</div>
  if (row.kind === 'kv') {
    return (
      <div className="trow tkv">
        <span className="tk" style={{ color: accent }}>{(row.k ?? '').padEnd(14, ' ')}</span>
        <span className="tv">{row.v}</span>
      </div>
    )
  }
  if (row.kind === 'block') return <pre className="tblock">{row.text}</pre>
  if (row.kind === 'proj') {
    return (
      <div className="trow tproj">
        <span className="tpi" style={{ color: accent }}>[{String(row.i).padStart(2,'0')}]</span>
        <span className="tpn">{row.name}</span>
        <span className="tpt">— {row.tag}</span>
        <div className="tpd">{row.desc}</div>
      </div>
    )
  }
  if (row.kind === 'action') {
    if (row.silent) return null
    return (
      <button className="taction" onClick={() => onAction?.(row.action!)}>
        {row.label}
      </button>
    )
  }
  return null
}
