export interface Shot {
  src: string
  caption?: string
}

export interface Project {
  id: string
  code: string
  kind: string
  name: string
  desc: string
  stack: string[]
  repoUrl?: string
  repoPrivate?: boolean
  preview: 'flight' | 'fitness' | 'cpe'
  status: string
  blurb: string
  bullets: string[]
  metrics: { l: string; v: string }[]
  // Screenshots shown in the project modal. Drop image files into
  // public/shots/ and add their paths here (e.g. '/shots/fitness-1.png').
  // Click any shot in the modal to blow it up + share.
  shots?: Shot[]
}

export const projects: Project[] = [
  {
    id: 'flight',
    code: '01',
    kind: 'EMBEDDED · AVIONICS',
    name: 'Flight Computer',
    desc: 'Custom avionics board built from the electronics up — sensor-fused IMU + barometer for flight state, onboard telemetry logging, and recovery deployment.',
    stack: ['C/C++', 'Microcontroller', 'IMU', 'Barometer', 'PCB Design'],
    repoPrivate: true,
    preview: 'flight',
    status: 'IN PROGRESS · HARDWARE',
    blurb: 'A custom flight computer for model rocketry, built from the electronics up. The board fuses IMU (accel + gyro) and barometric altitude to estimate flight state, logs full telemetry to onboard flash, and fires recovery channels for parachute deployment. Schematic, PCB layout, and firmware are all hand-rolled.',
    bullets: [
      'Sensor fusion of IMU (accel + gyro) and barometric altimeter for state estimation',
      'High-rate onboard logging of acceleration, altitude, and orientation to flash',
      'Pyro channels with continuity checks for drogue + main parachute deployment',
      'Custom PCB — schematic capture, layout, and bench bring-up / testing',
    ],
    metrics: [
      { l: 'MCU', v: 'Cortex-M' },
      { l: 'SENSORS', v: 'IMU + Baro' },
      { l: 'LOGGING', v: 'Onboard flash' },
      { l: 'STAGE', v: 'Bring-up' },
    ],
    shots: [],
  },
  {
    id: 'fitness',
    code: '02',
    kind: 'SWIFT · iOS + WATCHOS',
    name: 'Fitness App',
    desc: 'iOS + Apple Watch app that pulls workout and health data from Hevy, Strava, and Apple Fitness into one place, then analyzes trends across strength, cardio, and recovery.',
    stack: ['Swift', 'SwiftUI', 'HealthKit', 'watchOS', 'REST APIs'],
    repoPrivate: true,
    preview: 'fitness',
    status: 'IN DEVELOPMENT · PRIVATE',
    blurb: 'A personal fitness companion for iPhone and Apple Watch that unifies workout and health data from Hevy, Strava, and Apple Fitness into a single timeline — then surfaces trends across strength, cardio, and recovery. Built in Swift with a native watchOS companion.',
    bullets: [
      'Aggregates data from Hevy, Strava, and Apple Fitness / HealthKit into one view',
      'Native Apple Watch companion for at-a-glance stats and workout tracking',
      'Trend analysis across strength, cardio, and recovery metrics',
      'SwiftUI interface with charts and per-workout breakdowns',
    ],
    metrics: [
      { l: 'PLATFORM', v: 'iOS + watchOS' },
      { l: 'LANGUAGE', v: 'Swift' },
      { l: 'SOURCES', v: 'Hevy · Strava' },
      { l: 'HEALTH', v: 'HealthKit' },
    ],
    shots: [],
  },
  {
    id: 'cpe',
    code: '03',
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
]
