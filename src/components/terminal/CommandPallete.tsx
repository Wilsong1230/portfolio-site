import { useEffect, useState } from "react"
import { profile } from "../../data/profile"

const commands: Record<string, () => void> = {
  projects: () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }),

  about: () =>
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }),

  contact: () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }),

  github: () => window.open(profile.links.github, "_blank"),

  resume: () => window.open(profile.links.resume, "_blank"),
}

function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const runCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    if (command === "help") {
      setHistory((h) => [
        ...h,
        "Available commands: help, about, projects, contact, github, resume, clear",
      ])
      return
    }

    if (command === "clear") {
      setHistory([])
      return
    }

    const action = commands[command]

    if (action) {
      action()
      setHistory((h) => [...h, `> ${command}`])
    } else {
      setHistory((h) => [...h, `Unknown command: ${command}`])
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-40">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
        <div className="mb-4 text-sm text-zinc-400">
          Type <span className="text-white">help</span> for commands
        </div>

        <div className="mb-4 max-h-40 overflow-y-auto text-sm text-zinc-300">
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runCommand(input)
              setInput("")
            }
          }}
          className="w-full bg-transparent outline-none text-white"
          placeholder="Enter command..."
        />
      </div>
    </div>
  )
}

export default CommandPalette