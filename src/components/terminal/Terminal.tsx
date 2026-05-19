import { useState, useRef, useEffect } from 'react'
import TermRow, { type TermRowData } from './TermRow'
import {
  TERM_BIO, TERM_PROJECTS, TERM_SKILLS, TERM_CONTACT,
  toMorse, FILE_TREE, EASTER_EGGS
} from '../../data/terminal'

interface Props { accent: string; onAction: (action: string) => void }

function nowStamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2,'0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function termHelp(): TermRowData[] {
  return [
    { kind:'line', text:'AVAILABLE COMMANDS', cls:'th' },
    { kind:'kv', k:'help',         v:'show this list' },
    { kind:'kv', k:'whoami',       v:'about Wilson' },
    { kind:'kv', k:'projects',     v:'list featured projects' },
    { kind:'kv', k:'open <id>',    v:'open project (maze | cpe | counter)' },
    { kind:'kv', k:'skills',       v:'list skills by group' },
    { kind:'kv', k:'contact',      v:'how to reach me' },
    { kind:'kv', k:'resume',       v:'download resume.pdf' },
    { kind:'kv', k:'goto <tile>',  v:'scroll to tile' },
    { kind:'kv', k:'theme <name>', v:'palette (navy | deep | signal | amber | phosphor)' },
    { kind:'kv', k:'snake',        v:'play snake (esc to quit)' },
    { kind:'kv', k:'speedrun',     v:'auto-tour the page' },
    { kind:'kv', k:'matrix',       v:'engage rain protocol' },
    { kind:'kv', k:'morse <text>', v:'encode to morse' },
    { kind:'kv', k:'tree',         v:'show project tree' },
    { kind:'kv', k:'ask <q>',      v:'ask anything about me (AI)' },
    { kind:'kv', k:'clear',        v:'clear terminal' },
    { kind:'line', text:'plain english also works — just type a question.', cls:'tm' },
  ]
}

function termProjects(): TermRowData[] {
  const lines: TermRowData[] = [{ kind:'line', text:'FEATURED PROJECTS', cls:'th' }]
  TERM_PROJECTS.forEach((p, i) => {
    lines.push({ kind:'proj', i:i+1, id:p.id, name:p.name, tag:p.tag, desc:p.desc })
  })
  lines.push({ kind:'line', text:'› try: open maze   open cpe   open counter', cls:'tm' })
  return lines
}

function termOpen(id: string): TermRowData[] {
  const p = TERM_PROJECTS.find(x => x.id === id)
  if (!p) return [{ kind:'line', text:`no project '${id}'. try: maze | cpe | counter`, cls:'te' }]
  return [
    { kind:'line', text:`OPEN › ${p.name.toUpperCase()}`, cls:'th' },
    { kind:'line', text:p.tag, cls:'tm' },
    { kind:'block', text:p.desc },
    { kind:'line', text:`stack: ${p.stack.join(' · ')}`, cls:'tm' },
    { kind:'action', label:'↗ scroll to project tile', action:'goto:'+id },
  ]
}

function termSkills(): TermRowData[] {
  const lines: TermRowData[] = [{ kind:'line', text:'SKILLS', cls:'th' }]
  TERM_SKILLS.forEach(g => lines.push({ kind:'kv', k:g.group, v:g.items.join(' · ') }))
  return lines
}

function termContact(): TermRowData[] {
  const lines: TermRowData[] = [{ kind:'line', text:'CONTACT', cls:'th' }]
  TERM_CONTACT.forEach(c => lines.push({ kind:'kv', k:c.k, v:c.v }))
  return lines
}

async function askClaude(question: string): Promise<string> {
  const w = window as typeof window & { claude?: { complete: (opts: object) => Promise<string> } }
  if (!w.claude?.complete) return `[info] AI assistant not available in this environment. Type "help" for commands.`
  const system = `You are an assistant in Wilson Gomez's portfolio. Wilson is a Software Engineering student at FGCU, Lab Assistant, and Lee County DOT Intern. Projects: Autonomous Maze Rover (Arduino/C++), Control Point Finder (Python/PDF), Car Counter (Python/OpenCV). Skills: C/C++, Python, JavaScript, Arduino/AVR, embedded systems. Answer briefly (2-4 sentences), retro-terminal tone.`
  try {
    return await w.claude.complete({ messages:[{ role:'user', content:`${system}\n\nQuestion: ${question}` }] })
  } catch(e) {
    return `[err] ${e instanceof Error ? e.message : String(e)}`
  }
}

export default function Terminal({ accent, onAction }: Props) {
  const [history, setHistory] = useState<TermRowData[]>(() => [
    { kind:'line', text:'DeckOS 1.0.0  ·  type "help" to begin', cls:'tm' },
    { kind:'line', text:'tip: try "whoami", "projects", or just ask a question.', cls:'tm' },
  ])
  const [input, setInput] = useState('')
  const [cmdHist, setCmdHist] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history, busy])

  const focusInput = () => inputRef.current?.focus()

  async function run(raw: string) {
    const cmd = raw.trim()
    if (!cmd) return
    const stamp = nowStamp()
    const echoed: TermRowData[] = [...history, { kind:'echo', stamp, text:cmd }]
    setCmdHist(h => [...h, cmd])
    setHistIdx(-1)

    const lower = cmd.toLowerCase()
    let out: TermRowData[] = []

    if (lower === 'help' || lower === '?') out = termHelp()
    else if (lower === 'whoami' || lower === 'about') {
      out = [{ kind:'line', text:'IDENTITY', cls:'th' }, { kind:'block', text:TERM_BIO }]
    }
    else if (lower === 'projects' || lower === 'ls projects') out = termProjects()
    else if (lower.startsWith('open ')) out = termOpen(lower.slice(5).trim())
    else if (lower === 'skills') out = termSkills()
    else if (lower === 'contact') out = termContact()
    else if (lower === 'tree' || lower === 'ls -a') out = [{ kind:'block', text:FILE_TREE }]
    else if (lower === 'snake' || lower === './snake') {
      out = [{ kind:'line', text:'› loading snake.exe — arrows · esc to quit', cls:'tm' }, { kind:'action', silent:true, action:'snake' }]
    }
    else if (lower === 'speedrun' || lower === 'tour') {
      out = [{ kind:'line', text:'› starting tour — sit back', cls:'th' }, { kind:'action', silent:true, action:'speedrun' }]
    }
    else if (lower === 'matrix' || lower === 'sudo matrix') {
      out = [{ kind:'line', text:'› engaging rain protocol — esc to exit', cls:'tm' }, { kind:'action', silent:true, action:'matrix' }]
    }
    else if (lower === 'overclock' || lower === 'sudo overclock') {
      out = [{ kind:'line', text:'› OVERCLOCK — system surge', cls:'th' }, { kind:'action', silent:true, action:'overclock' }]
    }
    else if (lower.startsWith('theme ')) {
      const name = lower.slice(6).trim()
      const known = ['navy','deep','signal','amber','phosphor']
      if (known.includes(name)) {
        out = [{ kind:'line', text:`› theme → ${name}`, cls:'tm' }, { kind:'action', silent:true, action:'theme:'+name }]
      } else {
        out = [{ kind:'line', text:`unknown theme. try: ${known.join(' · ')}`, cls:'te' }]
      }
    }
    else if (lower.startsWith('morse ')) {
      const text = cmd.slice(6)
      out = [{ kind:'line', text:'MORSE', cls:'th' }, { kind:'block', text:toMorse(text) }]
    }
    else if (lower === 'goto') {
      out = [{ kind:'line', text:'usage: goto <tile> — hero | current | terminal | projects | skills | contact', cls:'tm' }]
    }
    else if (lower.startsWith('goto ')) {
      const tgt = lower.slice(5).trim()
      out = [{ kind:'line', text:`› scrolling to ${tgt}`, cls:'tm' }, { kind:'action', label:'', action:'goto:'+tgt, silent:true }]
    }
    else if (lower === 'resume' || lower === 'cat resume') {
      out = [{ kind:'line', text:'fetching resume.pdf…', cls:'tm' }, { kind:'action', label:'↗ download resume.pdf', action:'resume' }]
    }
    else if (lower === 'awards') {
      out = [
        { kind:'line', text:'AWARDS', cls:'th' },
        { kind:'kv', k:'Bright Futures', v:'Florida Academic Scholarship' },
        { kind:'kv', k:"President's Gold", v:'Presidential Award for Academic Excellence' },
        { kind:'kv', k:'AICE Diploma', v:'Cambridge Advanced International Certificate of Education' },
      ]
    }
    else if (lower === 'clear' || lower === 'cls') {
      setHistory([{ kind:'line', text:'cleared.', cls:'tm' }])
      return
    }
    else {
      const ee = EASTER_EGGS[lower]
      if (ee != null) {
        out = [{ kind:'block', text:ee }]
      } else {
        setHistory([...echoed, { kind:'line', text:'thinking…', cls:'tm tw' }])
        setBusy(true)
        const q = lower.startsWith('ask ') ? cmd.slice(4) : cmd
        const ans = await askClaude(q)
        setBusy(false)
        setHistory([...echoed, { kind:'line', text:'ai › answer', cls:'th' }, { kind:'block', text:ans }])
        return
      }
    }

    const next = [...echoed, ...out]
    setHistory(next)
    out.forEach(o => { if (o.kind === 'action' && o.silent && onAction) onAction(o.action!) })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const v = input; setInput(''); run(v)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHist.length === 0) return
      const ni = histIdx < 0 ? cmdHist.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(ni); setInput(cmdHist[ni] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < 0) return
      const ni = histIdx + 1
      if (ni >= cmdHist.length) { setHistIdx(-1); setInput('') }
      else { setHistIdx(ni); setInput(cmdHist[ni]) }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setHistory([{ kind:'line', text:'cleared.', cls:'tm' }])
    }
  }

  return (
    <div className="term" onClick={focusInput}>
      <div className="term-bar">
        <span className="term-dot" style={{ background:'#f47272' }} />
        <span className="term-dot" style={{ background:'#f0b56b' }} />
        <span className="term-dot" style={{ background:'#7fc7a8' }} />
        <span className="term-title">/dev/wilson — sh</span>
        <span className="term-meta">{busy ? 'BUSY' : 'IDLE'}</span>
      </div>
      <div className="term-scroll" ref={scrollRef}>
        {history.map((h, i) => <TermRow key={i} row={h} accent={accent} onAction={onAction} />)}
        {!busy && (
          <div className="term-prompt">
            <span className="term-ps" style={{ color:accent }}>wilson@deck</span>
            <span className="term-sep">:</span>
            <span className="term-path">~</span>
            <span className="term-sep">$&nbsp;</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={e => setInput(e.target.value)}
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
  )
}
