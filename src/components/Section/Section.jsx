import { useContext, useEffect, useState } from 'react'
import { MotionContext } from '../../hooks/useMotion.js'
import './Section.css'

// Typing speed per character, and the pause before the output appears.
const TYPE_MS = 45
const AFTER_TYPING_MS = 180

// One tab's contents: its command, then its output. The visible heading is
// the command; screen readers get the plain title. The command stays at the
// top of the window and the output scrolls beneath it.
//
// With animations on, opening a tab types its command and the output appears
// once it has finished. With animations off the tab is complete at once.
export default function Section({ tab, children }) {
  const motion = useContext(MotionContext)
  const [typed, setTyped] = useState(0)
  const [done, setDone] = useState(!motion)

  // Turning animations off shows everything at once.
  useEffect(() => {
    if (!motion) setDone(true)
  }, [motion])

  useEffect(() => {
    if (done) return undefined
    const finished = typed >= tab.command.length
    const timer = window.setTimeout(
      () => (finished ? setDone(true) : setTyped((count) => count + 1)),
      finished ? AFTER_TYPING_MS : TYPE_MS,
    )
    return () => window.clearTimeout(timer)
  }, [done, typed, tab.command])

  return (
    <section
      id={tab.id}
      tabIndex={-1}
      className="block"
      data-state={done ? 'done' : 'typing'}
      aria-labelledby={`${tab.id}-title`}
    >
      <h2 id={`${tab.id}-title`} className="cmd" aria-label={tab.label}>
        <span aria-hidden="true">
          <span className="prompt">$</span> {done ? tab.command : tab.command.slice(0, typed)}
          {!done && <span className="cursor" />}
        </span>
      </h2>
      <div className="out-scroll">
        <div className="out">{children}</div>
      </div>
    </section>
  )
}
