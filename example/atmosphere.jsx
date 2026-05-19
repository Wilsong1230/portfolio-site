// atmosphere.jsx — Parallax starfield, drifting PCB traces, CRT scanlines.
// Each layer is a fixed full-viewport canvas / svg behind the bento.

function Starfield({ enabled = true, density = 1, mouse }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf, w, h, stars = [], mx = 0, my = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 5500 * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.85 + 0.15, // depth
        r: Math.random() * 1.1 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.015 + 0.004,
      }));
    }
    function tick(t) {
      // Drift mouse toward target
      const tx = (mouse.current?.x ?? 0) * 14;
      const ty = (mouse.current?.y ?? 0) * 14;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.tws;
        const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(s.tw)) * s.z;
        const px = s.x + mx * s.z;
        const py = s.y + my * s.z;
        ctx.fillStyle = `rgba(236, 232, 220, ${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [enabled, density]);
  if (!enabled) return null;
  return <canvas ref={ref} className="atm-stars" />;
}

function PCBTraces({ enabled = true, color = '#f0b56b' }) {
  // Generate a deterministic grid of L-shaped traces with pads.
  const traces = React.useMemo(() => {
    const rng = mulberry32(424242);
    const cells = [];
    const cols = 14, rows = 10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rng() < 0.55) {
          const dir = Math.floor(rng() * 4);
          cells.push({ c, r, dir, pad: rng() < 0.35, dur: 6 + rng() * 10, delay: rng() * 8 });
        }
      }
    }
    return { cells, cols, rows };
  }, []);
  if (!enabled) return null;
  const { cells, cols, rows } = traces;
  return (
    <svg className="atm-pcb" viewBox={`0 0 ${cols * 100} ${rows * 100}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pcbFade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.0" />
          <stop offset="0.5" stopColor={color} stopOpacity="0.32" />
          <stop offset="1" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {cells.map((cell, i) => {
        const x = cell.c * 100, y = cell.r * 100;
        const paths = [
          `M${x + 10},${y + 50} L${x + 50},${y + 50} L${x + 50},${y + 90}`,
          `M${x + 50},${y + 10} L${x + 50},${y + 50} L${x + 90},${y + 50}`,
          `M${x + 10},${y + 50} L${x + 90},${y + 50}`,
          `M${x + 50},${y + 10} L${x + 50},${y + 90}`,
        ];
        return (
          <g key={i} style={{ animation: `pcbPulse ${cell.dur}s ease-in-out ${cell.delay}s infinite` }}>
            <path d={paths[cell.dir]} stroke={color} strokeWidth="0.8" fill="none" opacity="0.22" />
            {cell.pad && <circle cx={x + 50} cy={y + 50} r="2.4" fill={color} opacity="0.45" />}
          </g>
        );
      })}
    </svg>
  );
}

function Scanlines({ enabled = true }) {
  if (!enabled) return null;
  return <div className="atm-scan" aria-hidden="true" />;
}

function Vignette() {
  return <div className="atm-vignette" aria-hidden="true" />;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function Atmosphere({ stars, pcb, scanlines, accent, mouse }) {
  return (
    <div className="atm-root" aria-hidden="true">
      <Starfield enabled={stars} mouse={mouse} />
      <PCBTraces enabled={pcb} color={accent} />
      <Scanlines enabled={scanlines} />
      <Vignette />
    </div>
  );
}

Object.assign(window, { Atmosphere });
