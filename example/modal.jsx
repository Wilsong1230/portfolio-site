// modal.jsx — Project detail modal with schematic + extended brief.

const PROJECT_DETAILS = {
  cpe: {
    code: '01',
    name: 'Control Point Extraction',
    kind: 'CV · GEOSPATIAL',
    status: 'IN PRODUCTION · DOT',
    blurb: 'Automated extraction of survey-grade ground control points (GCPs) from aerial and terrestrial imagery. Drives sub-cm RMSE registration for DOT survey workflows that previously required hours of manual picking.',
    bullets: [
      'Detects road markings, hydrants, and survey targets across mixed lighting + resolutions',
      'Geo-rectifies pixel detections to world coords via affine + bundle adjustment',
      'Outputs a CSV / GeoJSON of CPs with per-point covariance estimates',
      'Cuts manual control-point selection from ~3h to ~6 min per site',
    ],
    stack: ['Python 3.11', 'OpenCV', 'GDAL', 'NumPy', 'SciPy', 'Shapely'],
    metrics: [
      { l: 'RMSE',       v: '0.024 m' },
      { l: 'THROUGHPUT', v: '~6 min / site' },
      { l: 'PRECISION',  v: '94.2 %' },
      { l: 'SITES RUN',  v: '38' },
    ],
    schematic: 'cpe',
  },
  cvc: {
    code: '02',
    name: 'Computer Vision Car Counter',
    kind: 'CV · REAL-TIME',
    status: 'DEPLOYED · 4 INTERSECTIONS',
    blurb: 'Real-time vehicle detection, tracking and lane-occupancy counting across multi-camera traffic feeds. Runs on commodity edge boxes with GPU offload for the inference stage only.',
    bullets: [
      'YOLOv8 nano backbone with class filter for vehicle types',
      'IOU + Kalman tracker keeps stable IDs across temporary occlusion',
      'Per-lane virtual gates with directional counting and a 60-second EMA',
      'Streams MQTT telemetry — count, density, average speed, dwell',
    ],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'FFmpeg', 'CUDA', 'MQTT'],
    metrics: [
      { l: 'FPS',        v: '29.7' },
      { l: 'mAP@.5',     v: '0.84' },
      { l: 'ID SWITCHES',v: '< 0.3 %' },
      { l: 'LATENCY',    v: '38 ms' },
    ],
    schematic: 'cvc',
  },
  rov: {
    code: '03',
    name: 'Tele-op Embedded Rover',
    kind: 'EMBEDDED · ROBOTICS',
    status: 'WEEK 7 / 11 · ACTIVE BUILD',
    blurb: 'Cortex-M firmware for a 4-wheel tele-op rover with on-board sensor fusion. FreeRTOS task graph, custom PWM ramping driver, and packet-loss-tolerant UART link to a host laptop.',
    bullets: [
      'FreeRTOS: 4 tasks — IMU @ 200Hz, control @ 100Hz, comms @ 50Hz, watchdog',
      'Complementary filter fuses gyro + accel for stable pitch / roll under vibration',
      'PWM ramp curves prevent current spikes on motor direction reversal',
      'CRC-checked packet protocol survives ~12% drop without re-init',
    ],
    stack: ['C', 'C++', 'STM32 HAL', 'FreeRTOS', 'KiCad', 'GDB / OpenOCD'],
    metrics: [
      { l: 'MCU',        v: 'STM32F411' },
      { l: 'CONTROL HZ', v: '100' },
      { l: 'IMU HZ',     v: '200' },
      { l: 'RAM USED',   v: '37 / 128 KB' },
    ],
    schematic: 'rov',
  },
};

function ProjectModal({ projectId, onClose, accent, secondary }) {
  const p = PROJECT_DETAILS[projectId];
  React.useEffect(() => {
    if (!projectId) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [projectId, onClose]);
  if (!p) return null;
  return (
    <div className="pm-back" onClick={onClose}>
      <div className="pm" onClick={(e) => e.stopPropagation()}>
        <div className="pm-bar">
          <div className="pm-bar-l">
            <span className="pm-id" style={{ color: accent }}>#{p.code}</span>
            <span className="pm-kind">{p.kind}</span>
          </div>
          <div className="pm-bar-r">
            <span className="pm-stat">
              <span className="dot wip" style={{ background: accent }} />
              {p.status}
            </span>
            <button className="pm-x" onClick={onClose} aria-label="close">✕</button>
          </div>
        </div>
        <div className="pm-body">
          <div className="pm-col pm-col-l">
            <h2 className="pm-title">{p.name}</h2>
            <p className="pm-blurb">{p.blurb}</p>
            <ul className="pm-bullets">
              {p.bullets.map((b, i) => (
                <li key={i}>
                  <span className="pm-tick" style={{ color: accent }}>›</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="pm-chips">
              {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
          <div className="pm-col pm-col-r">
            <div className="pm-shot">
              <div className="pm-schem-l">SCREENSHOT · drop yours</div>
              <image-slot
                id={"pm-shot-" + projectId}
                shape="rounded"
                radius="8"
                placeholder={"drop a screenshot of " + p.name}
                style={{ display: 'block', width: '100%', height: '180px' }}>
              </image-slot>
            </div>
            <div className="pm-schem">
              <div className="pm-schem-l">SCHEMATIC · {p.code}</div>
              <Schematic kind={p.schematic} accent={accent} secondary={secondary} />
            </div>
            <div className="pm-metrics">
              {p.metrics.map(m => (
                <div className="pm-met" key={m.l}>
                  <div className="pm-met-l">{m.l}</div>
                  <div className="pm-met-v">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Schematic ──────────────────────────────────────────────────────────
function Schematic({ kind, accent, secondary }) {
  if (kind === 'rov') return <RoverSchem accent={accent} secondary={secondary} />;
  if (kind === 'cvc') return <CVCSchem accent={accent} secondary={secondary} />;
  if (kind === 'cpe') return <CPESchem accent={accent} secondary={secondary} />;
  return null;
}

function FlowEdge({ from, to, accent, delay = 0 }) {
  // Animated dashed line w/ traveling dot
  const dx = to.x - from.x, dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={accent} strokeWidth="1.2"
            strokeDasharray="4 8"
            style={{ animation: `dashFlow 1.6s linear ${delay}s infinite`, opacity: 0.85 }} />
      <circle r="2.4" fill={accent} style={{ filter: `drop-shadow(0 0 4px ${accent})` }}>
        <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite"
                       path={`M${from.x} ${from.y} L${to.x} ${to.y}`} />
      </circle>
    </g>
  );
}
function SchemNode({ x, y, w, h, label, sub, accent, fill }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="6"
            fill={fill || 'rgba(7,9,18,0.85)'} stroke={accent} strokeWidth="1" />
      <text x={x} y={y - 2} fontFamily="JetBrains Mono" fontSize="9" fill="#ece8dc"
            textAnchor="middle" fontWeight="500">{label}</text>
      {sub && (
        <text x={x} y={y + 10} fontFamily="JetBrains Mono" fontSize="7"
              fill="rgba(255,255,255,0.4)" textAnchor="middle">{sub}</text>
      )}
    </g>
  );
}

function RoverSchem({ accent, secondary }) {
  const N = {
    imu:  { x: 60,  y: 60 },
    bat:  { x: 60,  y: 180 },
    mcu:  { x: 200, y: 120 },
    motL: { x: 340, y: 60 },
    motR: { x: 340, y: 180 },
    rad:  { x: 200, y: 220 },
  };
  return (
    <svg viewBox="0 0 400 260" className="schem">
      <FlowEdge from={N.imu} to={N.mcu} accent={accent} delay={0} />
      <FlowEdge from={N.bat} to={N.mcu} accent={secondary} delay={0.4} />
      <FlowEdge from={N.mcu} to={N.motL} accent={accent} delay={0.2} />
      <FlowEdge from={N.mcu} to={N.motR} accent={accent} delay={0.6} />
      <FlowEdge from={N.rad} to={N.mcu} accent={secondary} delay={0.8} />
      <SchemNode {...N.imu}  w={90} h={32} label="MPU-6050" sub="i²c · 200 Hz" accent={accent} />
      <SchemNode {...N.bat}  w={90} h={32} label="11.1V LIPO" sub="3S · 2200mAh" accent={secondary} />
      <SchemNode {...N.mcu}  w={120} h={52} label="STM32F411" sub="FreeRTOS · 100 MHz" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.motL} w={90} h={32} label="MOTOR L" sub="DRV8833 · PWM" accent={accent} />
      <SchemNode {...N.motR} w={90} h={32} label="MOTOR R" sub="DRV8833 · PWM" accent={accent} />
      <SchemNode {...N.rad}  w={90} h={32} label="UART RADIO" sub="115200 · CRC" accent={secondary} />
    </svg>
  );
}
function CVCSchem({ accent, secondary }) {
  const N = {
    cam: { x: 60,  y: 130 },
    dec: { x: 170, y: 130 },
    yol: { x: 280, y: 130 },
    trk: { x: 280, y: 50  },
    cnt: { x: 280, y: 210 },
    mqt: { x: 380, y: 130 },
  };
  return (
    <svg viewBox="0 0 440 260" className="schem">
      <FlowEdge from={N.cam} to={N.dec} accent={secondary} delay={0} />
      <FlowEdge from={N.dec} to={N.yol} accent={accent} delay={0.3} />
      <FlowEdge from={N.yol} to={N.trk} accent={accent} delay={0.5} />
      <FlowEdge from={N.yol} to={N.cnt} accent={accent} delay={0.7} />
      <FlowEdge from={N.trk} to={N.mqt} accent={secondary} delay={0.9} />
      <FlowEdge from={N.cnt} to={N.mqt} accent={secondary} delay={1.1} />
      <SchemNode {...N.cam} w={90} h={32}  label="RTSP CAM" sub="1080p @ 30" accent={secondary} />
      <SchemNode {...N.dec} w={90} h={32}  label="FFMPEG"   sub="HW decode"   accent={accent} />
      <SchemNode {...N.yol} w={90} h={52}  label="YOLOv8-n" sub="cuda · 38ms" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.trk} w={90} h={32}  label="TRACKER"  sub="IOU + KF"    accent={accent} />
      <SchemNode {...N.cnt} w={90} h={32}  label="COUNTER"  sub="lane gates"  accent={accent} />
      <SchemNode {...N.mqt} w={90} h={32}  label="MQTT"     sub="telemetry"   accent={secondary} />
    </svg>
  );
}
function CPESchem({ accent, secondary }) {
  const N = {
    ortho: { x: 60,  y: 60  },
    lidar: { x: 60,  y: 200 },
    det:   { x: 200, y: 130 },
    geo:   { x: 320, y: 60  },
    ba:    { x: 320, y: 200 },
    csv:   { x: 420, y: 130 },
  };
  return (
    <svg viewBox="0 0 480 260" className="schem">
      <FlowEdge from={N.ortho} to={N.det} accent={secondary} delay={0} />
      <FlowEdge from={N.lidar} to={N.det} accent={secondary} delay={0.3} />
      <FlowEdge from={N.det} to={N.geo} accent={accent} delay={0.5} />
      <FlowEdge from={N.det} to={N.ba}  accent={accent} delay={0.7} />
      <FlowEdge from={N.geo} to={N.csv} accent={secondary} delay={0.9} />
      <FlowEdge from={N.ba}  to={N.csv} accent={secondary} delay={1.1} />
      <SchemNode {...N.ortho} w={90} h={32}  label="ORTHO" sub="3cm/px" accent={secondary} />
      <SchemNode {...N.lidar} w={90} h={32}  label="LIDAR" sub="point cloud" accent={secondary} />
      <SchemNode {...N.det}   w={100} h={52} label="DETECT" sub="OpenCV + DL" accent={accent} fill="rgba(91,141,239,0.07)" />
      <SchemNode {...N.geo}   w={90} h={32}  label="GEO-REG" sub="affine"   accent={accent} />
      <SchemNode {...N.ba}    w={90} h={32}  label="BUNDLE ADJ" sub="LM"    accent={accent} />
      <SchemNode {...N.csv}   w={90} h={32}  label="GEOJSON" sub="output"   accent={secondary} />
    </svg>
  );
}

Object.assign(window, { ProjectModal, PROJECT_DETAILS });
