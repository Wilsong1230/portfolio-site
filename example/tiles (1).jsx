// tiles.jsx — Bento tile content. Each tile is a self-contained block; the
// outer <BentoTile> wrapper (in index.html) handles drag, hover-expand, and
// the glass chrome.

// ─── Hero ───────────────────────────────────────────────────────────────
function HeroTile({ accent, secondary }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-top">
        <span className="hero-tag">
          <span className="hero-led" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          IDENT/01 · ONLINE
        </span>
        <span className="hero-coord">N 40°44′ · W 074°10′</span>
      </div>
      <div className="hero-name">
        <span>Wilson</span>
        <span className="hero-name-2">Gomez</span>
      </div>
      <div className="hero-roles">
        <span>Software Engineer Student</span>
        <span className="hero-sep">·</span>
        <span>Lab Assistant</span>
        <span className="hero-sep">·</span>
        <span style={{ color: accent }}>DOT OPS Intern</span>
      </div>
      <div className="hero-bio">
        Building things that read the world — sensors, cameras, control loops.
        I write firmware on Cortex-M, vision pipelines in Python, and lab tooling
        in between. Currently: rovers, control-point extraction, traffic CV.
      </div>
      <div className="hero-strip">
        <HeroStripCell label="DISCIPLINE" value="EMBEDDED / CV" />
        <HeroStripCell label="STATUS"     value="OPEN TO INTERNSHIPS" accent={accent} />
        <HeroStripCell label="UPTIME"     value={fmtUptime(tick)} mono />
        <HeroStripCell label="STACK"      value="C · C++ · PY · ARM" />
      </div>
    </div>
  );
}
function HeroStripCell({ label, value, accent, mono }) {
  return (
    <div className="hcell">
      <div className="hcell-l">{label}</div>
      <div className="hcell-v" style={{ color: accent, fontFamily: mono ? 'var(--ff-mono)' : undefined }}>{value}</div>
    </div>
  );
}
function fmtUptime(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `00:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ─── Current / Now playing ──────────────────────────────────────────────
function CurrentTile({ accent }) {
  return (
    <div className="cur">
      <TileLabel>NOW · CURRENT FOCUS</TileLabel>
      <div className="cur-head">
        <div className="cur-title">Tele-op rover firmware</div>
        <div className="cur-sub">FreeRTOS task graph + IMU sensor fusion</div>
      </div>
      <div className="cur-progress">
        <div className="cur-bar"><div className="cur-fill" style={{ width: '64%', background: accent }} /></div>
        <div className="cur-meta">
          <span>WEEK 7 / 11</span>
          <span style={{ color: accent }}>64%</span>
        </div>
      </div>
      <ul className="cur-log">
        <li><span className="dot ok" /> PWM ramp curves dialled in</li>
        <li><span className="dot ok" /> IMU complementary filter @ 200 Hz</li>
        <li><span className="dot wip" style={{ background: accent }} /> packet-loss recovery over UART</li>
        <li><span className="dot todo" /> drive-by-wire safety interlocks</li>
      </ul>
    </div>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────
function SkillsTile({ accent, secondary }) {
  const groups = [
    { g: 'LANG',     items: [['C', 95], ['C++', 88], ['Python', 92]] },
    { g: 'EMBEDDED', items: [['STM32', 86], ['FreeRTOS', 78], ['I²C / SPI / UART', 84], ['KiCad', 60]] },
    { g: 'VISION',   items: [['OpenCV', 88], ['NumPy', 90], ['YOLO', 72], ['GDAL', 65]] },
    { g: 'TOOLS',    items: [['Linux', 90], ['Git', 92], ['GDB', 80], ['Logic Analyzer', 70]] },
  ];
  return (
    <div className="sk">
      <TileLabel>SKILLS · CALIBRATION</TileLabel>
      <div className="sk-grid">
        {groups.map(g => (
          <div className="sk-group" key={g.g}>
            <div className="sk-h">{g.g}</div>
            {g.items.map(([name, val]) => (
              <div className="sk-row" key={name}>
                <span className="sk-name">{name}</span>
                <span className="sk-meter">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className={"sk-tick" + (i < Math.round(val / 10) ? ' on' : '')}
                          style={i < Math.round(val / 10) ? { background: i > 7 ? accent : secondary } : null} />
                  ))}
                </span>
                <span className="sk-val">{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Project tile ───────────────────────────────────────────────────────
function ProjectTile({ project, accent, secondary, big, onOpen }) {
  return (
    <div className={"prj " + (big ? 'prj-big' : '')}>
      <div className="prj-head">
        <TileLabel>{project.kind}</TileLabel>
        <span className="prj-id" style={{ color: accent }}>#{project.code}</span>
      </div>
      <div className="prj-preview" aria-label="preview placeholder">
        {project.preview === 'cv' && <CVPreview accent={accent} secondary={secondary} />}
        {project.preview === 'cpe' && <CPEPreview accent={accent} secondary={secondary} />}
        {project.preview === 'rov' && <RoverPreview accent={accent} secondary={secondary} />}
      </div>
      <div className="prj-body">
        <div className="prj-title">{project.name}</div>
        <div className="prj-desc">{project.desc}</div>
        <div className="prj-foot">
          <div className="prj-chips">
            {project.stack.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
          <button
            className="prj-open"
            style={{ color: accent, borderColor: accent + '55' }}
            onClick={(e) => { e.stopPropagation(); onOpen?.(project.id); }}
          >OPEN ↗</button>
        </div>
      </div>
    </div>
  );
}

function CVPreview({ accent, secondary }) {
  // Mock traffic-cam frame with bounding boxes + count.
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <defs>
        <pattern id="cvgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      <rect width="320" height="160" fill="url(#cvgrid)" />
      {/* road */}
      <polygon points="40,160 130,40 200,40 280,160" fill="rgba(255,255,255,0.04)" />
      <line x1="165" y1="40" x2="160" y2="160" stroke={secondary} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      {/* cars (boxes) */}
      {[
        [60, 120, 40, 22], [110, 90, 28, 16], [180, 70, 24, 14], [200, 110, 36, 20], [240, 135, 44, 24],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="none" stroke={accent} strokeWidth="1" />
          <rect x={x} y={y - 10} width={28} height={9} fill={accent} />
          <text x={x + 2} y={y - 3} fontSize="6" fontFamily="JetBrains Mono" fill="#0a0a0a">car {String(i + 1).padStart(2, '0')}</text>
        </g>
      ))}
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>COUNT 247 ▲</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">29.7 fps · conf 0.84</text>
    </svg>
  );
}
function CPEPreview({ accent, secondary }) {
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      {/* terrain isobars */}
      {[20, 40, 60, 80, 100, 120].map((y, i) => (
        <path key={i} d={`M0 ${y + Math.sin(i) * 10} Q 80 ${y + 18} 160 ${y + 4} T 320 ${y - 6}`}
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {/* control points */}
      {[[60, 60], [110, 95], [170, 50], [220, 115], [270, 75], [200, 85]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="none" stroke={accent} strokeWidth="1" />
          <circle cx={x} cy={y} r="2" fill={accent} />
          <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke={accent} strokeWidth="0.5" />
          <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={accent} strokeWidth="0.5" />
          <text x={x + 12} y={y - 10} fontSize="6" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.6)">CP{String(i + 1).padStart(2, '0')}</text>
        </g>
      ))}
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>GEO REGISTRATION</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">RMSE 0.024m · n=6</text>
    </svg>
  );
}
function RoverPreview({ accent, secondary }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, last = 0;
    function tick(now) {
      if (now - last > 60) { setT(v => v + 1); last = now; }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  // Oscilloscope-style IMU trace.
  const pts = Array.from({ length: 60 }, (_, i) => {
    const x = i * (320 / 59);
    const y = 80 + Math.sin((i + t) * 0.35) * 18 + Math.sin((i + t) * 0.11) * 8;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 320 160" className="prv">
      <rect width="320" height="160" fill="rgba(255,255,255,0.02)" />
      {/* scope grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={'v' + i} x1={i * 32} y1="0" x2={i * 32} y2="160" stroke="rgba(255,255,255,0.05)" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={'h' + i} x1="0" y1={i * 32 + 16} x2="320" y2={i * 32 + 16} stroke="rgba(255,255,255,0.05)" />
      ))}
      <line x1="0" y1="80" x2="320" y2="80" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="1.4" />
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="3" opacity="0.18" />
      <text x="12" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={accent}>IMU · GYRO_Z</text>
      <text x="12" y="34" fontSize="7" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.5)">200 Hz · ±2000°/s</text>
      <text x="260" y="20" fontSize="9" fontFamily="JetBrains Mono" fill={secondary}>RUN</text>
    </svg>
  );
}

// ─── Status panel ───────────────────────────────────────────────────────
function StatusTile({ accent, secondary }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return (
    <div className="st">
      <TileLabel>SYSTEM · STATUS</TileLabel>
      <div className="st-time">
        <div className="st-clock">{time}</div>
        <div className="st-date">{date} · EST</div>
      </div>
      <div className="st-rows">
        <StatusRow label="HOST"     value="deck.local" />
        <StatusRow label="LINK"     value="ONLINE" dot="ok" />
        <StatusRow label="LATENCY"  value={`${12 + (now.getSeconds() % 6)} ms`} />
        <StatusRow label="LOC"      value="Newark, NJ" />
        <StatusRow label="ROLE"     value="DOT OPS Intern" color={accent} />
      </div>
    </div>
  );
}
function StatusRow({ label, value, dot, color }) {
  return (
    <div className="st-row">
      <span className="st-l">{label}</span>
      <span className="st-v" style={{ color }}>
        {dot && <span className={"dot " + dot} />}
        {value}
      </span>
    </div>
  );
}

// ─── Contact tile ───────────────────────────────────────────────────────
function ContactTile({ accent }) {
  return (
    <div className="ct">
      <TileLabel>UPLINK · CONTACT</TileLabel>
      <div className="ct-grid">
        <a className="ct-row" href="mailto:wilson.gomez@example.com">
          <span className="ct-k">EMAIL</span>
          <span className="ct-v">wilson.gomez@example.com</span>
        </a>
        <a className="ct-row" href="https://github.com/wilsongomez" target="_blank" rel="noreferrer">
          <span className="ct-k">GITHUB</span>
          <span className="ct-v">github.com/wilsongomez</span>
        </a>
        <a className="ct-row" href="https://linkedin.com/in/wilsongomez" target="_blank" rel="noreferrer">
          <span className="ct-k">LINKEDIN</span>
          <span className="ct-v">/in/wilsongomez</span>
        </a>
        <div className="ct-row">
          <span className="ct-k">RESUME</span>
          <span className="ct-v" style={{ color: accent }}>↗ resume.pdf</span>
        </div>
      </div>
      <div className="ct-foot">Best route: email · I read everything within 24h.</div>
    </div>
  );
}

// ─── Marquee / signal strip ─────────────────────────────────────────────
function SignalTile({ accent, secondary }) {
  const items = [
    'HIRING WINDOW OPEN — SUMMER 26',
    'BUILDING ROVERS / TRAFFIC CV / CTRL POINT EXTRACTION',
    'C · C++ · PYTHON · STM32 · FREERTOS',
    'lab assistant @ university',
    'DOT OPS — operations intern',
  ];
  return (
    <div className="sig">
      <TileLabel>BROADCAST · CHANNEL 04</TileLabel>
      <div className="sig-wave">
        <SineWave accent={secondary} />
      </div>
      <div className="sig-marquee">
        <div className="sig-track">
          {[...items, ...items].map((s, i) => (
            <span key={i} className="sig-item">
              <span className="sig-dot" style={{ background: accent }} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function SineWave({ accent }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf;
    function tick() { setT(v => v + 1); raf = requestAnimationFrame(tick); }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const pts = Array.from({ length: 80 }, (_, i) => {
    const x = i * (320 / 79);
    const y = 20 + Math.sin((i + t * 0.5) * 0.4) * 12;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 320 40" preserveAspectRatio="none" className="sig-svg">
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="1.2" />
    </svg>
  );
}

// ─── Shared label ───────────────────────────────────────────────────────
function TileLabel({ children }) {
  return (
    <div className="tile-label">
      <span className="tile-label-dot" />
      {children}
    </div>
  );
}

Object.assign(window, {
  HeroTile, CurrentTile, SkillsTile, ProjectTile, StatusTile, ContactTile, SignalTile, TileLabel,
  ExperienceTile, BuildTile, TelemetryTile,
});

// ─── Build / CI status (compact 3×1) ────────────────────────────────────
function BuildTile({ accent, secondary }) {
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setPulse(p => p + 1), 1400); return () => clearInterval(id); }, []);
  const commits = [
    { h: 'a3f12d',  m: 'fix: PWM ramp curve overshoot' },
    { h: '7b9c4a',  m: 'feat: complementary filter @ 200Hz' },
    { h: '0e2f8b',  m: 'wip: UART packet reassembly' },
    { h: 'c4d901',  m: 'chore: bump FreeRTOS to 11.0' },
  ];
  const idx = pulse % commits.length;
  return (
    <div className="bld">
      <div className="bld-l">
        <span className="bld-led" style={{ background: '#7fc7a8', boxShadow: '0 0 6px #7fc7a8' }} />
        <span className="bld-h">BUILD</span>
        <span className="bld-s">PASSING</span>
      </div>
      <div className="bld-r">
        <span className="bld-hash" style={{ color: accent }}>{commits[idx].h}</span>
        <span className="bld-msg" key={idx}>{commits[idx].m}</span>
      </div>
      <div className="bld-bar"><div className="bld-fill" style={{ background: accent }} /></div>
    </div>
  );
}

// ─── Telemetry gauges (compact 2×2) ─────────────────────────────────────
function TelemetryTile({ accent, secondary }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setT(v => v + 1), 800); return () => clearInterval(id); }, []);
  function val(seed, base, range) {
    return base + Math.sin((t + seed) * 0.7) * range + Math.sin((t + seed) * 0.13) * (range * 0.5);
  }
  const gauges = [
    { l: 'CPU',  v: val(0,  42, 16), u: '%' },
    { l: 'MEM',  v: val(2,  61, 8),  u: '%' },
    { l: 'TEMP', v: val(4,  48, 5),  u: '°C' },
    { l: 'NET',  v: val(6,  22, 12), u: 'MB' },
  ];
  return (
    <div className="tel">
      <TileLabel>TELEMETRY</TileLabel>
      <div className="tel-grid">
        {gauges.map(g => (
          <div className="tel-row" key={g.l}>
            <div className="tel-l">{g.l}</div>
            <div className="tel-meter">
              {Array.from({ length: 12 }).map((_, i) => {
                const pct = Math.max(0, Math.min(1, g.v / (g.u === '°C' ? 70 : 100)));
                const on = i < Math.round(pct * 12);
                return <span key={i} className={"tel-tick" + (on ? ' on' : '')}
                  style={on ? { background: i > 9 ? '#f47272' : (i > 7 ? accent : secondary) } : null} />;
              })}
            </div>
            <div className="tel-v">{Math.round(g.v)}<span className="tel-u">{g.u}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Experience / Timeline ──────────────────────────────────────────────
function ExperienceTile({ accent, secondary }) {
  const items = [
    { y: '2026 · NOW',     role: 'DOT OPS Intern',          org: 'New Jersey DOT',         tag: 'OPS · CV',     accent: true },
    { y: '2025 →',         role: 'Lab Assistant',           org: 'University CS Lab',      tag: 'EMBEDDED · LABS' },
    { y: '2024 →',         role: 'B.S. Software Eng.',      org: 'University',             tag: 'STUDENT' },
    { y: '2024',           role: 'CV Research — Traffic',   org: 'Independent + Faculty',  tag: 'PROJECT' },
    { y: '2023',           role: 'Started on STM32',        org: 'self-taught',            tag: 'FOUNDATION' },
  ];
  return (
    <div className="ex">
      <TileLabel>EXPERIENCE · LOG</TileLabel>
      <div className="ex-line" aria-hidden="true" />
      <div className="ex-rows">
        {items.map((it, i) => (
          <div className={"ex-row" + (it.accent ? ' is-now' : '')} key={i}>
            <div className="ex-dot" style={it.accent ? { background: accent, boxShadow: `0 0 8px ${accent}` } : null} />
            <div className="ex-y">{it.y}</div>
            <div className="ex-mid">
              <div className="ex-role">{it.role}</div>
              <div className="ex-org">{it.org}</div>
            </div>
            <div className="ex-tag" style={it.accent ? { color: accent, borderColor: accent + '55' } : null}>{it.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
