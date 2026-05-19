import { useState, useCallback } from 'react'

export interface TweakValues {
  palette: [string, string]
  stars: boolean
  pcb: boolean
  scanlines: boolean
  shooting: boolean
  spotlight: boolean
  tilt: boolean
  sound: boolean
  hum: boolean
}

const DEFAULTS: TweakValues = {
  palette: ['#5b8def', '#a8c7ff'],
  stars: true,
  pcb: true,
  scanlines: true,
  shooting: true,
  spotlight: true,
  tilt: true,
  sound: false,
  hum: false,
}

function load(): TweakValues {
  try {
    const raw = localStorage.getItem('deckos-tweaks')
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {}
  return DEFAULTS
}

export function useTweaks(): [TweakValues, <K extends keyof TweakValues>(key: K, val: TweakValues[K]) => void] {
  const [values, setValues] = useState<TweakValues>(load)

  const setTweak = useCallback(<K extends keyof TweakValues>(key: K, val: TweakValues[K]) => {
    setValues(prev => {
      const next = { ...prev, [key]: val }
      try { localStorage.setItem('deckos-tweaks', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return [values, setTweak]
}
