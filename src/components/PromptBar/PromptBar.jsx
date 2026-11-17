import { useEffect, useRef } from 'react'
import './PromptBar.css'

// The prompt line pinned to the bottom of the screen. Each section's command
// is a shortcut that scrolls to it; the one on screen is shown inverted. It
// also holds the resume link and the animations toggle.
export default function PromptBar({ tabs, current, onPick, motion, onToggleMotion }) {
  const row = useRef(null)

  // On a phone the shortcuts are one sideways-scrolling row, so keep the
  // current one in view. On wider screens nothing scrolls and this does nothing.
  useEffect(() => {
    const scroller = row.current
    const link = scroller?.querySelector('[aria-current]')
    if (!link) return
    const left = link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2
    scroller.scrollTo({ left, behavior: motion ? 'smooth' : 'auto' })
  }, [current, motion])

  return (
    <div className="promptbar">
      <div className="promptbar-inner">
        <span className="prompt promptbar-sign" aria-hidden="true">
          $
        </span>
        <div className="promptbar-row" ref={row}>
          <nav className="nav" aria-label="Sections">
            {tabs.map((item) => (
              <a
                key={item.id}
                href={item.id === 'home' ? './' : `#${item.id}`}
                aria-current={item.id === current ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  onPick(item.id)
                }}
              >
                {item.short}
              </a>
            ))}
          </nav>
          <a className="promptbar-resume" href="./resume.pdf">
            resume.pdf
          </a>
          <button
            type="button"
            className="motion-toggle"
            aria-pressed={motion}
            onClick={onToggleMotion}
          >
            animations: {motion ? 'on' : 'off'}
          </button>
        </div>
      </div>
    </div>
  )
}
