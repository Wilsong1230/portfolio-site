// terminal.jsx — Interactive shell. Handles command parsing, history,
// LLM-backed Q&A via window.claude.complete, and easter eggs.

const TERM_BIO = `Wilson Gomez — Software Engineer Student, Lab Assistant, DOT OPS Intern.
Embedded systems + computer vision + low-level systems work. Currently building rovers,
counting cars from video, and extracting control points.`;

const TERM_PROJECTS = [
  { id: 'cpe', name: 'Control Point Extraction', tag: 'CV / Geospatial',
    desc: 'Automated extraction of survey-grade control points from aerial & terrestrial imagery for the DOT.',
    stack: ['Python', 'OpenCV', 'NumPy', 'GDAL'] },
  { id: 'cvc', name: 'Computer Vision Car Counter', tag: 'CV / Real-time',
    desc: 'Real-time vehicle detection and counting pipeline. Tracks lane occupancy across multi-camera feeds.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'FFmpeg'] },
  { id: 'rov', name: 'Embedded Programming Rover', tag: 'Embedded / Robotics',
    desc: 'Tele-op rover w/ on-board sensor fusion. Custom firmware on Cortex-M; PWM motor control + IMU loop.',
    stack: ['C', 'C++', 'STM32', 'FreeRTOS'] },
];

const TERM_SKILLS = [
  { group: 'Languages', items: ['C', 'C++', 'Python'] },
  { group: 'Embedded',  items: ['STM32', 'ARM Cortex-M', 'FreeRTOS', 'I²C / SPI / UART', 'KiCad'] },
  { group: 'Vision',    items: ['OpenCV', 'NumPy', 'YOLO', 'GDAL'] },
  { group: 'Tools',     items: ['Linux', 'Git', 'GDB', 'Make', 'Oscilloscope', 'Logic Analyzer'] },
];

const TERM_CONTACT = [
  { k: 'email',    v: 'wilson.gomez@example.com' },
  { k: 'github',   v: 'github.com/wilsongomez' },
  { k: 'linkedin', v: 'linkedin.com/in/wilsongomez' },
  { k: 'location', v: 'Newark, NJ — UTC-5' },
];

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function termHelp() {
  return [
    { kind: 'line', text: 'AVAILABLE COMMANDS', cls: 'th' },
    { kind: 'kv', k: 'help',         v: 'show this list' },
    { kind: 'kv', k: 'whoami',       v: 'about Wilson' },
    { kind: 'kv', k: 'projects',     v: 'list featured projects' },
    { kind: 'kv', k: 'open <id>',    v: 'open project detail (cpe | cvc | rov)' },
    { kind: 'kv', k: 'skills',       v: 'list skills by group' },
    { kind: 'kv', k: 'contact',      v: 'how to reach me' },
    { kind: 'kv', k: 'resume',       v: 'download resume.pdf' },
    { kind: 'kv', k: 'goto <tile>',  v: 'scroll to tile (hero, current, projects, ...)' },
    { kind: 'kv', k: 'theme <name>',  v: 'switch palette (navy | deep | signal | amber | phosphor)' },
    { kind: 'kv', k: 'snake',        v: 'play snake (esc to quit)' },
    { kind: 'kv', k: 'speedrun',     v: 'auto-tour the page' },
    { kind: 'kv', k: 'matrix',       v: 'engage rain protocol' },
    { kind: 'kv', k: 'morse <text>', v: 'encode to morse' },
    { kind: 'kv', k: 'tree',         v: 'show project tree' },
    { kind: 'kv', k: 'ask <q>',      v: 'ask anything about me (AI)' },
    { kind: 'kv', k: 'clear',        v: 'clear terminal' },
    { kind: 'line', text: 'plain English also works — just type a question.', cls: 'tm' },
  ];
}

const MORSE = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---',
  k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-',
  u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': '/',
};
function toMorse(s) {
  return s.toLowerCase().split('').map(c => MORSE[c] ?? '').filter(Boolean).join(' ');
}

const FILE_TREE = `~/wilson
├── projects/
│   ├── control-point-extraction/   # CV · geo
│   ├── cv-car-counter/             # CV · realtime
│   └── tele-op-rover/              # embedded
├── skills/
│   ├── c
│   ├── cpp
│   ├── python
│   └── embedded/  (stm32, freertos, kicad)
├── now/
│   └── rover-firmware-w7.md
└── contact.vcf`;

function termWhoami() {
  return [
    { kind: 'line', text: 'wilson@deck:~$ identity', cls: 'tm' },
    { kind: 'block', text: TERM_BIO },
  ];
}

function termProjects() {
  const lines = [{ kind: 'line', text: 'FEATURED PROJECTS', cls: 'th' }];
  TERM_PROJECTS.forEach((p, i) => {
    lines.push({ kind: 'proj', i: i + 1, id: p.id, name: p.name, tag: p.tag, desc: p.desc });
  });
  lines.push({ kind: 'line', text: '› try: open cpe   open cvc   open rov', cls: 'tm' });
  return lines;
}

function termOpen(id) {
  const p = TERM_PROJECTS.find(x => x.id === id);
  if (!p) return [{ kind: 'line', text: `no project with id '${id}'. try: cpe | cvc | rov`, cls: 'te' }];
  return [
    { kind: 'line', text: `OPEN › ${p.name.toUpperCase()}`, cls: 'th' },
    { kind: 'line', text: p.tag, cls: 'tm' },
    { kind: 'block', text: p.desc },
    { kind: 'line', text: `stack: ${p.stack.join(' · ')}`, cls: 'tm' },
    { kind: 'action', label: '↗ scroll to project tile', action: 'goto:' + id },
  ];
}

function termSkills() {
  const lines = [{ kind: 'line', text: 'SKILLS', cls: 'th' }];
  TERM_SKILLS.forEach(g => {
    lines.push({ kind: 'kv', k: g.group, v: g.items.join(' · ') });
  });
  return lines;
}

function termContact() {
  const lines = [{ kind: 'line', text: 'CONTACT', cls: 'th' }];
  TERM_CONTACT.forEach(c => lines.push({ kind: 'kv', k: c.k, v: c.v }));
  return lines;
}

function termEaster(cmd) {
  const map = {
    'sudo make me a sandwich': '🥪 access denied. you are not in the sudoers file. this incident will be reported.',
    'sudo': 'with great power comes great responsibility.',
    'ls': 'hero  current  terminal  projects  skills  status  contact',
    'pwd': '/home/wilson/portfolio',
    'date': new Date().toString(),
    'uname': 'DeckOS 4.2.0-instrumentation x86_64',
    'cowsay': '< moo, hire wilson >\n  \\\n   \\\n     ^__^\n     (oo)\\_______\n     (__)\\       )\\/\\\n         ||----w |\n         ||     ||',
    'rm -rf /': 'permission denied. nice try.',
    'exit': 'you cannot leave. you live here now.',
    'vim': 'caught in vim. send help.',
    'emacs': 'a great operating system — lacks a decent editor though.',
    ':q': 'this is not vim. type "help".',
    'hello': 'hi 👋',
    'hi': 'hello — type "help" to get started.',
  };
  return map[cmd.toLowerCase()] ?? null;
}

async function askClaude(question) {
  const system = `You are an assistant embedded in Wilson Gomez's portfolio site.
Wilson is a Software Engineer Student, Lab Assistant, and DOT OPS Intern.
He works in embedded systems, computer vision, and low-level computer engineering.
Featured projects: ${TERM_PROJECTS.map(p => `${p.name} (${p.desc})`).join('; ')}.
Skills: ${TERM_SKILLS.map(s => s.group + ': ' + s.items.join(', ')).join(' | ')}.
Answer briefly (2-4 sentences), in a friendly but slightly retro-terminal tone.
Never invent specifics not implied by the info above. If you don't know, say so.`;
  try {
    const resp = await window.claude.complete({
      messages: [
        { role: 'user', content: `${system}\n\nQuestion: ${question}` },
      ],
    });
    return resp;
  } catch (e) {
    return `[err] could not reach upstream. ${e?.message ?? e}`;
  }
}

function Terminal({ accent, onAction }) {
  const [history, setHistory] = React.useState(() => [
    { kind: 'line', text: 'DeckOS 4.2.0  ·  type "help" to begin', cls: 'tm' },
    { kind: 'line', text: 'tip: try "whoami", "projects", or just ask a question.', cls: 'tm' },
  ]);
  const [input, setInput] = React.useState('');
  const [cmdHist, setCmdHist] = React.useState([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, busy]);

  const focusInput = () => inputRef.current?.focus();

  async function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    const stamp = nowStamp();
    const echoed = [...history, { kind: 'echo', stamp, text: cmd }];
    setCmdHist((h) => [...h, cmd]);
    setHistIdx(-1);

    let out = [];
    const lower = cmd.toLowerCase();
    if (lower === 'help' || lower === '?') out = termHelp();
    else if (lower === 'whoami' || lower === 'about') out = termWhoami();
    else if (lower === 'projects' || lower === 'ls projects') out = termProjects();
    else if (lower.startsWith('open ')) out = termOpen(lower.slice(5).trim());
    else if (lower === 'skills') out = termSkills();
    else if (lower === 'contact') out = termContact();
    else if (lower === 'tree' || lower === 'ls -a') {
      out = [{ kind: 'block', text: FILE_TREE }];
    }
    else if (lower === 'snake' || lower === './snake') {
      out = [{ kind: 'line', text: '› loading snake.exe — arrows / wasd · esc to quit', cls: 'tm' }, { kind: 'action', silent: true, action: 'snake' }];
    }
    else if (lower === 'speedrun' || lower === 'tour') {
      out = [{ kind: 'line', text: '› starting tour — sit back', cls: 'th' }, { kind: 'action', silent: true, action: 'speedrun' }];
    }
    else if (lower === 'matrix' || lower === 'sudo matrix') {
      out = [{ kind: 'line', text: '› engaging rain protocol — esc to exit', cls: 'tm' }, { kind: 'action', silent: true, action: 'matrix' }];
    }
    else if (lower === 'overclock' || lower === 'sudo overclock') {
      out = [{ kind: 'line', text: '› OVERCLOCK — system surge', cls: 'th' }, { kind: 'action', silent: true, action: 'overclock' }];
    }
    else if (lower.startsWith('theme ')) {
      const name = lower.slice(6).trim();
      const known = ['navy', 'deep', 'signal', 'amber', 'phosphor'];
      if (known.includes(name)) {
        out = [{ kind: 'line', text: `› theme → ${name}`, cls: 'tm' }, { kind: 'action', silent: true, action: 'theme:' + name }];
      } else {
        out = [{ kind: 'line', text: `unknown theme. try: ${known.join(' · ')}`, cls: 'te' }];
      }
    }
    else if (lower.startsWith('morse ')) {
      const text = cmd.slice(6);
      out = [{ kind: 'line', text: 'MORSE', cls: 'th' }, { kind: 'block', text: toMorse(text) }];
    }
    else if (lower === 'goto') {
      out = [{ kind: 'line', text: 'usage: goto <tile> — hero | current | terminal | projects | skills | contact', cls: 'tm' }];
    }
    else if (lower === 'resume' || lower === 'cat resume') out = [{ kind: 'line', text: 'fetching resume.pdf …', cls: 'tm' }, { kind: 'action', label: '↗ download', action: 'resume' }];
    else if (lower.startsWith('goto ')) {
      const tgt = lower.slice(5).trim();
      out = [{ kind: 'line', text: `› scrolling to ${tgt}`, cls: 'tm' }, { kind: 'action', label: '', action: 'goto:' + tgt, silent: true }];
    }
    else if (lower === 'clear' || lower === 'cls') {
      setHistory([{ kind: 'line', text: 'cleared.', cls: 'tm' }]);
      return;
    }
    else {
      const ee = termEaster(lower);
      if (ee != null) {
        out = [{ kind: 'block', text: ee }];
      } else {
        // Treat as question → ask claude.
        setHistory([...echoed, { kind: 'line', text: 'thinking…', cls: 'tm tw' }]);
        setBusy(true);
        const q = lower.startsWith('ask ') ? cmd.slice(4) : cmd;
        const ans = await askClaude(q);
        setBusy(false);
        setHistory([...echoed, { kind: 'line', text: 'ai › answer', cls: 'th' }, { kind: 'block', text: ans }]);
        return;
      }
    }

    // Execute any immediate action commands (goto/resume) after rendering output
    const next = [...echoed, ...out];
    setHistory(next);
    out.forEach(o => { if (o.kind === 'action' && o.silent && onAction) onAction(o.action); });
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = input;
      setInput('');
      run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHist.length === 0) return;
      const ni = histIdx < 0 ? cmdHist.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni);
      setInput(cmdHist[ni] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const ni = histIdx + 1;
      if (ni >= cmdHist.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(ni); setInput(cmdHist[ni]); }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([{ kind: 'line', text: 'cleared.', cls: 'tm' }]);
    }
  }

  return (
    <div className="term" onClick={focusInput}>
      <div className="term-bar">
        <span className="term-dot" style={{ background: '#f47272' }} />
        <span className="term-dot" style={{ background: '#f0b56b' }} />
        <span className="term-dot" style={{ background: '#7fc7a8' }} />
        <span className="term-title">/dev/wilson — sh</span>
        <span className="term-meta">{busy ? 'BUSY' : 'IDLE'}</span>
      </div>
      <div className="term-scroll" ref={scrollRef}>
        {history.map((h, i) => <TermRow key={i} row={h} accent={accent} onAction={onAction} />)}
        {!busy && (
          <div className="term-prompt">
            <span className="term-ps" style={{ color: accent }}>wilson@deck</span>
            <span className="term-sep">:</span>
            <span className="term-path">~</span>
            <span className="term-sep">$&nbsp;</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="term-caret" />
          </div>
        )}
      </div>
    </div>
  );
}

function TermRow({ row, accent, onAction }) {
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
    );
  }
  if (row.kind === 'line') return <div className={`trow ${row.cls ?? ''}`}>{row.text}</div>;
  if (row.kind === 'kv') return (
    <div className="trow tkv">
      <span className="tk" style={{ color: accent }}>{row.k.padEnd(14, ' ')}</span>
      <span className="tv">{row.v}</span>
    </div>
  );
  if (row.kind === 'block') return <pre className="tblock">{row.text}</pre>;
  if (row.kind === 'proj') return (
    <div className="trow tproj">
      <span className="tpi" style={{ color: accent }}>[{String(row.i).padStart(2, '0')}]</span>
      <span className="tpn">{row.name}</span>
      <span className="tpt">— {row.tag}</span>
      <div className="tpd">{row.desc}</div>
    </div>
  );
  if (row.kind === 'action') {
    if (row.silent) return null;
    return (
      <button className="taction" onClick={() => onAction?.(row.action)}>
        {row.label}
      </button>
    );
  }
  return null;
}

Object.assign(window, { Terminal, TERM_PROJECTS, TERM_SKILLS, TERM_CONTACT });
