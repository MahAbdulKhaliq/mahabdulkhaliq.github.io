import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MotionContext } from '../../hooks/useMotion.js'
import './Section.css'

// What App.jsx tells the open tab about a tab switch. `closing` is true while
// the box is closing before the swap. `takeFocus` is true once the visitor
// has switched tabs: a tab opened by a switch takes keyboard focus, the tab
// the page loads on does not.
export const SwitchContext = createContext({ closing: false, takeFocus: false })

// How long the box takes to close before the tabs swap. Keep in step with
// the box-close animation in Section.css.
export const CLOSE_MS = 240
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
// When the visitor picks another tab the box closes and the command is
// backspaced away, both within CLOSE_MS, and then App.jsx swaps the tab.
// With animations off a tab is 'open' from the start.
//
// After a tab switch, keyboard focus moves to the output once it can be
// seen, so the arrow keys and Page Down scroll it straight away.
export default function Section({ tab, children }) {
  const motion = useContext(MotionContext)
  const { closing, takeFocus } = useContext(SwitchContext)
  const scroller = useRef(null)
  const length = tab.command.length
  // How many characters of the command are on screen.
  const [typed, setTyped] = useState(motion ? 0 : length)
  const [state, setState] = useState(motion ? 'typing' : 'open')

  // Turning animations off shows everything at once.
  useEffect(() => {
    if (!motion) {
      setState('open')
      setTyped(length)
    }
  }, [motion, length])

  // Type the command, pause, open the box.
  useEffect(() => {
    if (state === 'open' || closing) return undefined
    let wait = OPEN_MS
    let next = () => setState('open')
    if (state === 'typing') {
      const finished = typed >= length
      wait = finished ? AFTER_TYPING_MS : TYPE_MS
      next = () => (finished ? setState('opening') : setTyped((count) => count + 1))
    }
    const timer = window.setTimeout(next, wait)
    return () => window.clearTimeout(timer)
  }, [state, typed, length, closing])

  // Backspace the command while the box closes. The last character goes a
  // little before the swap. If the switch is called off, put it back.
  useEffect(() => {
    if (!closing) {
      setTyped((count) => (state === 'typing' ? count : length))
      return undefined
    }
    if (typed === 0) return undefined
    const timer = window.setTimeout(() => setTyped((count) => count - 1), (CLOSE_MS * 0.85) / length)
    return () => window.clearTimeout(timer)
    // `state` only matters at the moment a switch is called off.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing, typed, length])

  const typing = state === 'typing'
  useEffect(() => {
    if (takeFocus && !typing) scroller.current.focus({ preventScroll: true })
  }, [takeFocus, typing])

  return (
    <section id={tab.id} className="block" data-state={state} aria-labelledby={`${tab.id}-title`}>
      <h2 id={`${tab.id}-title`} className="cmd" aria-label={tab.label}>
        <span aria-hidden="true">
          <span className="prompt">$</span> {tab.command.slice(0, typed)}
          {(typing || closing) && <span className="cursor" />}
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
