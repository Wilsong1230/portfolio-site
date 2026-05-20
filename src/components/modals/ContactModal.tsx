import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../../data/profile'

emailjs.init('39axMEo3Xr9x1r-u9')

interface Props {
  open: boolean
  onClose: () => void
  accent: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactModal({ open, onClose, accent }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await emailjs.send('service_4qfnygn', 'template_u337lkq', {
        from_name: name,
        reply_to: email,
        message,
        to_name: 'Wilson',
      })
      setStatus('success')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="cm-backdrop" onClick={onClose} style={{ '--ac': accent } as React.CSSProperties}>
      <div className="cm-panel" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Contact Wilson">
        {/* title bar */}
        <div className="cm-bar">
          <div className="cm-bar-dots">
            <span className="cm-dot cm-dot-close" onClick={onClose} />
            <span className="cm-dot" />
            <span className="cm-dot" />
          </div>
          <span className="cm-bar-title">CONTACT · {profile.handle}</span>
          <span className="cm-bar-tag" style={{ color: accent }}>
            <span className="cm-bar-led" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            OPEN TO WORK
          </span>
        </div>

        {status === 'success' ? (
          <div className="cm-success">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke={accent} strokeWidth="1.5" />
              <polyline points="11,21 17,27 29,14" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="cm-success-title">MESSAGE SENT</p>
            <p className="cm-success-sub">I'll get back to you soon, {name || 'friend'}.</p>
            <button className="cm-close-btn" style={{ borderColor: accent, color: accent }} onClick={onClose}>
              CLOSE
            </button>
          </div>
        ) : (
          <form className="cm-form" onSubmit={handleSubmit}>
            <div className="cm-field">
              <label className="cm-label">NAME</label>
              <input
                ref={nameRef}
                className="cm-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={status === 'sending'}
                style={{ '--ac': accent } as React.CSSProperties}
              />
            </div>
            <div className="cm-field">
              <label className="cm-label">EMAIL</label>
              <input
                className="cm-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'sending'}
                style={{ '--ac': accent } as React.CSSProperties}
              />
            </div>
            <div className="cm-field">
              <label className="cm-label">MESSAGE</label>
              <textarea
                className="cm-input cm-textarea"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                required
                rows={4}
                disabled={status === 'sending'}
                style={{ '--ac': accent } as React.CSSProperties}
              />
            </div>
            {status === 'error' && (
              <p className="cm-error">TRANSMISSION FAILED · Please try again</p>
            )}
            <button
              className="cm-submit"
              type="submit"
              disabled={status === 'sending'}
              style={{ '--ac': accent } as React.CSSProperties}
            >
              {status === 'sending' ? (
                <><span className="cm-spinner" style={{ borderTopColor: accent }} />SENDING…</>
              ) : (
                <>SEND MESSAGE ↗</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
