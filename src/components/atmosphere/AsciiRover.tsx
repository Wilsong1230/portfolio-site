import { useState, useEffect } from 'react'

const ROVER_ART = `  _____
 /|_o_|\\
( |___| )
 \\|___|\\/
  o   o`

export default function AsciiRover() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const first = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(first)
  }, [])

  useEffect(() => {
    if (!visible) return
    const DURATION = 22000
    const timer = setTimeout(() => {
      setVisible(false)
      const repeat = setTimeout(() => setVisible(true), 60000)
      return () => clearTimeout(repeat)
    }, DURATION)
    return () => clearTimeout(timer)
  }, [visible])

  if (!visible) return null
  return (
    <div className="rover-track" aria-hidden="true">
      <pre className="rover">{ROVER_ART}</pre>
    </div>
  )
}
