import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MotionContext } from '../../hooks/useMotion.js'
import './Section.css'

// Set by App.jsx once the visitor has switched tabs: a tab opened by a switch
// takes keyboard focus, the tab the page loads on does not.
export const TakeFocusContext = createContext(false)

// Typing speed per character, and the pause before the box opens.
const TYPE_MS = 45
const AFTER_TYPING_MS = 180
// A little longer than box-open in Section.css, after which the box may show
// its scrollbar.
const OPEN_MS = 400

// One tab's box: its command, then its output. The visible heading is the
// command; screen readers get the plain title. The command stays at the top
// of the box and the output scrolls beneath it.
//
// With animations on, a new tab starts as just its command line, types the
// command, then opens to show the output: 'typing' -> 'opening' -> 'open'.
// With animations off it is 'open' from the start. App.jsx closes the box
// (through data-closing on the window) before it swaps tabs.
//
// After a tab switch, keyboard focus moves to the output once it can be
// seen, so the arrow keys and Page Down scroll it straight away.
export default function Section({ tab, children }) {
  const motion = useContext(MotionContext)
  const takeFocus = useContext(TakeFocusContext)
  const scroller = useRef(null)
  const [typed, setTyped] = useState(0)
  const [state, setState] = useState(motion ? 'typing' : 'open')

  // Turning animations off shows everything at once.
  useEffect(() => {
    if (!motion) setState('open')
  }, [motion])

  useEffect(() => {
    if (state === 'open') return undefined
    let wait = OPEN_MS
    let next = () => setState('open')
    if (state === 'typing') {
      const finished = typed >= tab.command.length
      wait = finished ? AFTER_TYPING_MS : TYPE_MS
      next = () => (finished ? setState('opening') : setTyped((count) => count + 1))
    }
    const timer = window.setTimeout(next, wait)
    return () => window.clearTimeout(timer)
  }, [state, typed, tab.command])

  const typing = state === 'typing'
  useEffect(() => {
    if (takeFocus && !typing) scroller.current.focus({ preventScroll: true })
  }, [takeFocus, typing])

  return (
    <section id={tab.id} className="block" data-state={state} aria-labelledby={`${tab.id}-title`}>
      <h2 id={`${tab.id}-title`} className="cmd" aria-label={tab.label}>
        <span aria-hidden="true">
          <span className="prompt">$</span> {typing ? tab.command.slice(0, typed) : tab.command}
          {typing && <span className="cursor" />}
        </span>
      </h2>
      {/* clip is what closes and opens when tabs change. */}
      <div className="clip">
        {/* Focusable so the keyboard can scroll it, also on tabs with no links. */}
        <div
          ref={scroller}
          className="out-scroll"
          tabIndex={0}
          role="group"
          aria-labelledby={`${tab.id}-title`}
        >
          <div className="out">{children}</div>
        </div>
      </div>
    </section>
  )
}
