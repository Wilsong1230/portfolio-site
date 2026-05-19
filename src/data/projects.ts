export interface Project {
  id: string
  code: string
  kind: string
  name: string
  desc: string
  stack: string[]
  repoUrl: string
  preview: 'rover' | 'cpe' | 'counter'
  status: string
  blurb: string
  bullets: string[]
  metrics: { l: string; v: string }[]
}

export const projects: Project[] = [
  {
    id: 'maze',
    code: '01',
    kind: 'EMBEDDED · ROBOTICS',
    name: 'Autonomous Maze Rover',
    desc: 'Arduino rover that navigates mazes autonomously via servo-mounted HC-SR04 ultrasonic sensing and a wall-following state machine.',
    stack: ['Arduino', 'C++', 'AccelStepper', 'Ultrasonic'],
    repoUrl: 'https://github.com/Wilsong1230/sillyMazeBot',
    preview: 'rover',
    status: 'COMPLETE · OPEN SOURCE',
    blurb: 'Arduino-based rover that autonomously navigates mazes using a servo-mounted HC-SR04 ultrasonic sensor and a finite-state wall-following machine. The non-blocking control loop keeps sensor sweeps and motor commands in sync without delay().',
    bullets: [
      'State machine: MOVING → CHECK_TURN → TURN_LEFT/TURN_RIGHT → STUCK/FINISH',
      '28BYJ-48 stepper motors driven via ULN2003 — precise, quiet motion',
      'Servo sweeps HC-SR04 to map clearances before committing to a turn',
      'Non-blocking loop using millis() — sensor and motor tasks never stall each other',
    ],
    metrics: [
      { l: 'PLATFORM', v: 'Arduino Uno' },
      { l: 'SENSOR', v: 'HC-SR04' },
      { l: 'MOTORS', v: '28BYJ-48' },
      { l: 'DRIVER', v: 'ULN2003' },
    ],
  },
  {
    id: 'cpe',
    code: '02',
    kind: 'PYTHON · DESKTOP',
    name: 'Control Point Finder',
    desc: 'Python desktop app — drop in a folder of engineering PDF plan sets, it finds, parses, deduplicates, and exports all survey control points to CSV.',
    stack: ['Python', 'PDF Parsing', 'Desktop'],
    repoUrl: 'https://github.com/Wilsong1230/controlPointFinder',
    preview: 'cpe',
    status: 'IN USE · DOT WORKFLOW',
    blurb: 'Desktop utility that ingests a folder of engineering PDF plan sets and automatically finds, parses, deduplicates, and exports all survey control points to a CSV ready for surveying software. Replaces hours of manual extraction.',
    bullets: [
      'Drag-and-drop folder input — processes every PDF in the directory',
      'Regex + coordinate-aware parser handles mixed formatting across plan sets',
      'Deduplication engine collapses repeated control points with tolerance matching',
      'One-click Export CSV output ready for import into survey software',
    ],
    metrics: [
      { l: 'INPUT', v: 'PDF plan sets' },
      { l: 'OUTPUT', v: 'CSV / coords' },
      { l: 'DEDUP', v: 'tolerance match' },
      { l: 'RUNTIME', v: 'Python 3.11' },
    ],
  },
  {
    id: 'counter',
    code: '03',
    kind: 'PYTHON · CV',
    name: 'Car Counter',
    desc: 'Camera-based vehicle counter with real-time detection. Personalized with detailed car info tracking.',
    stack: ['Python', 'OpenCV', 'Web'],
    repoUrl: 'https://github.com/Wilsong1230/Car_counting_cam',
    preview: 'counter',
    status: 'DEPLOYED · LIVE CAM',
    blurb: 'Real-time camera-based vehicle counter using OpenCV. Tracks vehicles crossing a virtual line, logs detailed per-car info, and displays a running count overlay. Designed for traffic monitoring and data collection.',
    bullets: [
      'Virtual line crossing detection with directional counting',
      'Per-vehicle metadata tracking — timestamps, lane, duration',
      'Live count overlay rendered on the video feed',
      'Configurable camera source — USB, IP cam, or video file',
    ],
    metrics: [
      { l: 'STACK', v: 'Python · OpenCV' },
      { l: 'INPUT', v: 'Camera / file' },
      { l: 'OUTPUT', v: 'Count + log' },
      { l: 'DISPLAY', v: 'Live overlay' },
    ],
  },
]
