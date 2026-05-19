export const TERM_BIO = `Wilson Gomez — Software Engineering Student, Lab Assistant, DOT Intern.
Embedded systems + Python tools + low-level systems work. Currently building
Arduino rovers, extracting survey control points from PDFs, and counting cars.`

export interface TermProject {
  id: string
  name: string
  tag: string
  desc: string
  stack: string[]
}

export const TERM_PROJECTS: TermProject[] = [
  {
    id: 'maze',
    name: 'Autonomous Maze Rover',
    tag: 'Embedded / Robotics',
    desc: 'Arduino rover navigating mazes via HC-SR04 ultrasonic sensing and a wall-following state machine. 28BYJ-48 stepper motors, ULN2003 drivers, non-blocking loop.',
    stack: ['Arduino', 'C++', 'AccelStepper', 'Ultrasonic'],
  },
  {
    id: 'cpe',
    name: 'Control Point Finder',
    tag: 'Python / Desktop',
    desc: 'Drop in a folder of engineering PDF plan sets — it finds, parses, deduplicates, and exports all survey control points to CSV.',
    stack: ['Python', 'PDF Parsing', 'Desktop'],
  },
  {
    id: 'counter',
    name: 'Car Counter',
    tag: 'Python / CV',
    desc: 'Camera-based vehicle counter with real-time detection and detailed car info tracking.',
    stack: ['Python', 'OpenCV', 'Web'],
  },
]

export interface TermSkillGroup {
  group: string
  items: string[]
}

export const TERM_SKILLS: TermSkillGroup[] = [
  { group: 'Languages', items: ['C', 'C++', 'Python', 'JavaScript'] },
  { group: 'Embedded',  items: ['Arduino/AVR', 'AVR Assembly', 'Digital/Analog Electronics'] },
  { group: 'Concepts',  items: ['DSA', 'Software Engineering', 'Computer Organization'] },
  { group: 'Tools',     items: ['Git', 'Linux', 'Arduino IDE'] },
]

export const TERM_CONTACT = [
  { k: 'email',    v: 'wagomez1230@gmail.com' },
  { k: 'github',   v: 'github.com/Wilsong1230' },
  { k: 'linkedin', v: 'linkedin.com/in/wagomez' },
  { k: 'location', v: 'Fort Myers, FL — UTC-5' },
]

export const MORSE: Record<string, string> = {
  a:'.-', b:'-...', c:'-.-.', d:'-..', e:'.', f:'..-.', g:'--.', h:'....', i:'..', j:'.---',
  k:'-.-', l:'.-..', m:'--', n:'-.', o:'---', p:'.--.', q:'--.-', r:'.-.', s:'...', t:'-',
  u:'..-', v:'...-', w:'.--', x:'-..-', y:'-.--', z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
  '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  ' ':'/',
}

export function toMorse(s: string): string {
  return s.toLowerCase().split('').map(c => MORSE[c] ?? '').filter(Boolean).join(' ')
}

export const FILE_TREE = `~/wilson
├── projects/
│   ├── autonomous-maze-rover/   # embedded · Arduino
│   ├── control-point-finder/    # Python · PDF
│   └── car-counter/             # Python · CV
├── skills/
│   ├── c
│   ├── cpp
│   ├── python
│   └── embedded/  (arduino, avr-assembly)
├── now/
│   └── maze-rover-v2.md
└── contact.vcf`

export const EASTER_EGGS: Record<string, string> = {
  'sudo make me a sandwich': 'access denied. you are not in the sudoers file. this incident will be reported.',
  'sudo': 'with great power comes great responsibility.',
  'ls': 'hero  current  terminal  projects  skills  status  contact',
  'pwd': '/home/wilson/portfolio',
  'date': new Date().toString(),
  'uname': 'DeckOS 1.0.0-instrumentation x86_64',
  'cowsay': '< moo, hire wilson >\n  \\\n   \\\n     ^__^\n     (oo)\\_______\n     (__)\\       )\\/\\\n         ||----w |\n         ||     ||',
  'rm -rf /': 'permission denied. nice try.',
  'exit': 'you cannot leave. you live here now.',
  'vim': 'caught in vim. send help.',
  'emacs': 'a great operating system — lacks a decent editor though.',
  ':q': 'this is not vim. type "help".',
  'hello': 'hi — type "help" to get started.',
  'hi': 'hello — type "help" to get started.',
}

export const BOOT_LINES = [
  { t: '0.001', v: 'DeckOS 1.0.0 — initializing…',                               cls: 'bv-accent' },
  { t: '0.058', v: 'cpu: ARM Cortex-M · cores: 4 · freq: 3.2 GHz',               cls: '' },
  { t: '0.112', v: 'memory: 16 GB · swap: ok',                                    cls: '' },
  { t: '0.187', v: 'mounting /dev/wilson … ok',                                   cls: 'bv-ok' },
  { t: '0.241', v: 'loading profile: Wilson Gomez (wagomez1230)',                  cls: '' },
  { t: '0.298', v: 'degree: B.S. Software Engineering · FGCU · 2027',             cls: '' },
  { t: '0.354', v: 'experience: Lab Assistant · Lee County DOT Intern',           cls: '' },
  { t: '0.412', v: 'starfield: ok · pcb traces: ok · scanlines: ok',             cls: 'bv-ok' },
  { t: '0.478', v: 'projects: 3 loaded  [maze-rover] [ctrl-point] [car-counter]', cls: '' },
  { t: '0.534', v: 'skills: C · C++ · Python · Arduino/AVR · JavaScript',        cls: '' },
  { t: '0.601', v: 'terminal: handshake complete · type "help" to begin',         cls: 'bv-ok' },
  { t: '0.668', v: 'atmosphere: parallax ok · vignette ok · spotlight ok',       cls: '' },
  { t: '0.724', v: "awards: Bright Futures · President's Gold · AICE Diploma",   cls: '' },
  { t: '0.812', v: 'status: OPEN TO INTERNSHIPS — SUMMER 2026',                  cls: 'bv-accent' },
  { t: '0.910', v: 'all systems nominal.',                                         cls: 'bv-ok' },
  { t: '0.980', v: 'welcome.',                                                     cls: 'bv-accent' },
]
