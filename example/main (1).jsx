// main.jsx — Root: bento layout, drag-rearrange, hover-expand, tweaks wiring.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5b8def",
  "palette": ["#5b8def", "#a8c7ff"],
  "stars": true,
  "pcb": true,
  "scanlines": true,
  "shooting": true,
  "spotlight": true,
  "tilt": true,
  "sound": false,
  "hum": false,
  "fontScale": 1
}/*EDITMODE-END*/;

const PRESETS = {
  navy:     ["#5b8def", "#a8c7ff"],   // primary — navy + pale blue
  deep:     ["#3d6cc4", "#7fb0ff"],   // deeper navy
  signal:   ["#8fd4e8", "#c4a8ff"],   // cyan + lavender
  amber:    ["#f0b56b", "#8fd4e8"],   // original amber + cyan
  phosphor: ["#7fc7a8", "#c9e872"],   // CRT green
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = t.palette?.[0] ?? '#f0b56b';
  const secondary = t.palette?.[1] ?? '#8fd4e8';
  const mouse = React.useRef({ x: 0, y: 0 });

  const [openProject, setOpenProject] = React.useState(null);
  const [matrixOn, setMatrixOn] = React.useState(false);
  const [snakeOn, setSnakeOn] = React.useState(false);
  const [overclock, setOverclock] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const upd = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', upd);
    document.body.classList.toggle('reduce-motion', reducedMotion);
    return () => mq.removeEventListener?.('change', upd);
  }, [reducedMotion]);

  // Deep-link routing: #/p/<id> opens that project modal
  React.useEffect(() => {
    function readHash() {
      const h = window.location.hash || '';
      const m = h.match(/^#\/p\/([\w-]+)/);
      if (m) setOpenProject(m[1]);
      else if (h === '' || h === '#') setOpenProject(null);
    }
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);
  React.useEffect(() => {
    const want = openProject ? `#/p/${openProject}` : '';
    if ((window.location.hash || '') !== want) {
      if (want) history.replaceState(null, '', want);
      else history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [openProject]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-soft', accent + '28');
    document.documentElement.style.setProperty('--secondary', secondary);
    document.body.style.fontSize = (13 * (t.fontScale ?? 1)) + 'px';
    document.body.classList.toggle('overclock', overclock);
  }, [accent, secondary, t.fontScale, overclock]);

  // Audio: hum on/off
  React.useEffect(() => {
    if (!window.AudioEngine) return;
    if (t.hum) { AudioEngine.resume(); AudioEngine.startHum(); }
    else { AudioEngine.stopHum(); }
  }, [t.hum]);

  // Audio: global key clicks (only for terminal input target)
  React.useEffect(() => {
    if (!t.sound) return;
    function onKey(e) {
      if (!window.AudioEngine) return;
      const tag = e.target?.tagName;
      const isTermInput = e.target?.classList?.contains('term-input');
      if (!isTermInput) return;
      if (e.key === 'Enter') AudioEngine.playClick('enter');
      else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Space') AudioEngine.playClick('key');
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [t.sound]);

  React.useEffect(() => {
    function onMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current = { x: nx, y: ny };
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Title typing animation
  React.useEffect(() => {
    const full = 'wilson@deck:~$ ';
    const states = ['', 'w', 'wi', 'wil', 'wils', 'wilso', 'wilson', 'wilson@', 'wilson@d', 'wilson@de', 'wilson@dec', 'wilson@deck', 'wilson@deck:', 'wilson@deck:~', 'wilson@deck:~$'];
    let i = 0, blink = false, blinkId, typeId;
    function type() {
      document.title = states[i] + ' _';
      if (i < states.length - 1) {
        i++;
        typeId = setTimeout(type, 90);
      } else {
        // blink caret
        blinkId = setInterval(() => {
          blink = !blink;
          document.title = full + (blink ? '_' : ' ');
        }, 600);
      }
    }
    type();
    return () => { clearTimeout(typeId); clearInterval(blinkId); };
  }, []);

  // Konami code → overclock
  React.useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    function onKey(e) {
      const want = seq[idx];
      if (e.key.toLowerCase() === want.toLowerCase()) {
        idx++;
        if (idx === seq.length) {
          setOverclock(o => !o);
          idx = 0;
        }
      } else { idx = 0; }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const projects = [
    { code: '01', kind: 'CV · GEOSPATIAL', name: 'Control Point Extraction',
      desc: 'Sub-cm RMSE extraction of survey-grade control points from aerial imagery for DOT workflows.',
      stack: ['Python', 'OpenCV', 'GDAL'], preview: 'cpe', id: 'cpe' },
    { code: '02', kind: 'CV · REAL-TIME', name: 'Computer Vision Car Counter',
      desc: 'Real-time vehicle detection + tracking across multi-camera traffic feeds. Edge-deployed.',
      stack: ['Python', 'YOLOv8', 'OpenCV'], preview: 'cv', id: 'cvc' },
    { code: '03', kind: 'EMBEDDED · ROBOTICS', name: 'Tele-op Rover',
      desc: 'Cortex-M firmware with FreeRTOS sensor-fusion loop and packet-loss-tolerant UART link.',
      stack: ['C', 'STM32', 'FreeRTOS'], preview: 'rov', id: 'rov' },
  ];

  const initialOrder = ['hero', 'status', 'avatar', 'current', 'heatmap', 'signal', 'term', 'skills', 'prj-1', 'prj-2', 'prj-3', 'experience', 'contact'];
  const [order, setOrder] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tileOrder') || 'null');
      if (Array.isArray(saved) && saved.length === initialOrder.length
          && saved.every(x => initialOrder.includes(x))) return saved;
    } catch {}
    return initialOrder;
  });
  React.useEffect(() => {
    try { localStorage.setItem('tileOrder', JSON.stringify(order)); } catch {}
  }, [order]);
  const [hoverId, setHoverId] = React.useState(null);
  const tileRefs = React.useRef({});

  // Speedrun: auto-tour the page
  function scrollTile(id) {
    const el = tileRefs.current[id];
    if (!el) return;
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top - 80, behavior: 'smooth' });
    el.classList.add('is-flash');
    setTimeout(() => el.classList.remove('is-flash'), 1500);
  }
  function runSpeedrun() {
    const steps = [
      { delay: 0,    fn: () => scrollTile('hero') },
      { delay: 1800, fn: () => scrollTile('current') },
      { delay: 3400, fn: () => scrollTile('heatmap') },
      { delay: 5000, fn: () => scrollTile('skills') },
      { delay: 6600, fn: () => scrollTile('prj-1') },
      { delay: 8200, fn: () => setOpenProject('rov') },
      { delay: 12500, fn: () => setOpenProject(null) },
      { delay: 13800, fn: () => scrollTile('experience') },
      { delay: 15600, fn: () => scrollTile('contact') },
    ];
    steps.forEach(s => setTimeout(s.fn, s.delay));
  }

  function handleTerminalAction(action) {
    if (action.startsWith('goto:')) {
      const tgt = action.slice(5);
      const map = { hero: 'hero', current: 'current', terminal: 'term', term: 'term',
        projects: 'prj-1', skills: 'skills', contact: 'contact', status: 'status',
        cpe: 'prj-1', cvc: 'prj-2', rov: 'prj-3' };
      const tileId = map[tgt] ?? tgt;
      const el = tileRefs.current[tileId];
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' });
        el.classList.add('is-flash');
        setTimeout(() => el.classList.remove('is-flash'), 1500);
      }
    } else if (action.startsWith('theme:')) {
      const name = action.slice(6);
      if (PRESETS[name]) setTweak('palette', PRESETS[name]);
    } else if (action === 'matrix') {
      setMatrixOn(true);
    } else if (action === 'snake') {
      setSnakeOn(true);
    } else if (action === 'speedrun') {
      runSpeedrun();
    } else if (action === 'overclock') {
      setOverclock(o => !o);
    } else if (action === 'resume') {
      const el = tileRefs.current['contact'];
      if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 80, behavior: 'smooth' });
    }
  }

  function renderTile(id) {
    switch (id) {
      case 'hero':    return <HeroTile accent={accent} secondary={secondary} />;
      case 'status':  return <StatusTile accent={accent} secondary={secondary} />;
      case 'avatar':  return <AvatarTile accent={accent} />;
      case 'current': return <CurrentTile accent={accent} />;
      case 'heatmap': return <HeatmapTile accent={accent} secondary={secondary} />;
      case 'signal':  return <SignalTile accent={accent} secondary={secondary} />;
      case 'term':    return <Terminal accent={accent} onAction={handleTerminalAction} />;
      case 'skills':  return <SkillsTile accent={accent} secondary={secondary} />;
      case 'prj-1':   return <ProjectTile project={projects[0]} accent={accent} secondary={secondary} onOpen={setOpenProject} />;
      case 'prj-2':   return <ProjectTile project={projects[1]} accent={accent} secondary={secondary} onOpen={setOpenProject} />;
      case 'prj-3':   return <ProjectTile project={projects[2]} accent={accent} secondary={secondary} onOpen={setOpenProject} />;
      case 'experience': return <ExperienceTile accent={accent} secondary={secondary} />;
      case 'contact': return <ContactTile accent={accent} />;
      default: return null;
    }
  }

  // drag-rearrange
  const [dragId, setDragId] = React.useState(null);
  const [overId, setOverId] = React.useState(null);
  function onDragStart(e, id) {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', id); } catch {}
  }
  function onDragOver(e, id) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== overId) setOverId(id);
  }
  function onDrop(e, id) {
    e.preventDefault();
    if (!dragId || dragId === id) { setDragId(null); setOverId(null); return; }
    setOrder(prev => {
      const next = [...prev];
      const from = next.indexOf(dragId), to = next.indexOf(id);
      next.splice(from, 1); next.splice(to, 0, dragId);
      return next;
    });
    setDragId(null); setOverId(null);
  }
  function onDragEnd() { setDragId(null); setOverId(null); }

  // Tilt
  function onTileMove(e, el) {
    if (!t.tilt) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -0.7;
    const ry = (px - 0.5) * 0.9;
    el.style.transform = `perspective(1800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  }
  function onTileLeave(el) { el.style.transform = ''; }

  return (
    <React.Fragment>
      <Atmosphere
        stars={t.stars} pcb={t.pcb} scanlines={t.scanlines}
        accent={accent} mouse={mouse}
      />
      <ShootingStars enabled={t.shooting} accent={accent} fast={overclock} />
      <Spotlight enabled={t.spotlight} accent={accent} />

      <div className="app">
        <TopBar accent={accent} overclock={overclock} />
        <div className={"bento" + (overclock ? ' is-overclock' : '')}>
          {order.map(id => (
            <div
              key={id}
              ref={(el) => { tileRefs.current[id] = el; }}
              className={
                "tile t-" + id +
                (hoverId === id ? ' is-hover' : '') +
                (dragId === id ? ' is-drag' : '') +
                (overId === id && dragId && dragId !== id ? ' is-over' : '')
              }
              onMouseEnter={() => setHoverId(id)}
              onMouseMove={(e) => onTileMove(e, e.currentTarget)}
              onMouseLeave={(e) => { setHoverId(curr => curr === id ? null : curr); onTileLeave(e.currentTarget); }}
              onDragOver={(e) => onDragOver(e, id)}
              onDrop={(e) => onDrop(e, id)}
            >
              <div
                className="tile-handle"
                draggable
                onDragStart={(e) => onDragStart(e, id)}
                onDragEnd={onDragEnd}
                title="drag to rearrange"
              >⋮⋮ DRAG</div>
              {renderTile(id)}
            </div>
          ))}
        </div>
        <Footer />
      </div>

      <ProjectModal projectId={openProject} onClose={() => setOpenProject(null)}
                    accent={accent} secondary={secondary} />
      <MatrixOverlay on={matrixOn} accent={accent} onClose={() => setMatrixOn(false)} />
      <Snake on={snakeOn} accent={accent} onClose={() => setSnakeOn(false)} />
      <AsciiRover />

      <TweaksPanel>
        <TweakSection label="Atmosphere" />
        <TweakToggle label="Parallax starfield"  value={t.stars}      onChange={(v) => setTweak('stars', v)} />
        <TweakToggle label="PCB traces"          value={t.pcb}        onChange={(v) => setTweak('pcb', v)} />
        <TweakToggle label="CRT scanlines"       value={t.scanlines}  onChange={(v) => setTweak('scanlines', v)} />
        <TweakToggle label="Shooting stars"      value={t.shooting}   onChange={(v) => setTweak('shooting', v)} />
        <TweakToggle label="Mouse spotlight"     value={t.spotlight}  onChange={(v) => setTweak('spotlight', v)} />
        <TweakToggle label="3D tilt on hover"    value={t.tilt}       onChange={(v) => setTweak('tilt', v)} />

        <TweakSection label="Signal" />
        <TweakColor label="Palette" value={t.palette}
                    options={[PRESETS.navy, PRESETS.deep, PRESETS.signal, PRESETS.amber, PRESETS.phosphor]}
                    onChange={(v) => setTweak('palette', v)} />
        <TweakToggle label="Overclock mode" value={overclock} onChange={setOverclock} />

        <TweakSection label="Type" />
        <TweakSlider label="Density" value={t.fontScale} min={0.85} max={1.15} step={0.05}
                     onChange={(v) => setTweak('fontScale', v)} unit="×" />

        <TweakSection label="Audio" />
        <TweakToggle label="Key clicks"        value={t.sound}      onChange={(v) => { setTweak('sound', v); if (v && window.AudioEngine) AudioEngine.resume(); }} />
        <TweakToggle label="Ambient hum"       value={t.hum}        onChange={(v) => setTweak('hum', v)} />

        <TweakSection label="Layout" />
        <TweakButton label="Reset tile order" onClick={() => { setOrder(initialOrder); try { localStorage.removeItem('tileOrder'); } catch {} }}>Reset</TweakButton>
        <TweakButton label="Engage matrix"    onClick={() => setMatrixOn(true)}>Run</TweakButton>
        <TweakButton label="Play snake"       onClick={() => setSnakeOn(true)}>Play</TweakButton>
        <TweakButton label="Speedrun tour"    onClick={runSpeedrun}>Start</TweakButton>
      </TweaksPanel>
    </React.Fragment>
  );
}

function TopBar({ accent, overclock }) {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="topbar">
      <div className="tb-l">
        <span className="tb-led">DECK / {overclock ? 'OVERCLOCK' : 'ONLINE'}</span>
        <span className="tb-sep">·</span>
        <span className="tb-brand">WILSON.GOMEZ</span>
        <span className="tb-sep">·</span>
        <span>v4.2.0</span>
      </div>
      <div className="tb-r">
        <span>UTC-5</span>
        <span className="tb-sep">·</span>
        <span>{`${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`}</span>
        <span className="tb-sep">·</span>
        <span>NEWARK, NJ</span>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <div className="footer">
      <span>EOF · 2026 · WILSON GOMEZ</span>
      <span style={{ opacity: 0.7 }}>↑↑↓↓←→←→BA</span>
      <span>BUILT WITH PATIENCE + SOLDER PASTE</span>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
