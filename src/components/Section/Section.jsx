import { useContext, useEffect, useRef, useState } from 'react'
import { MotionContext } from '../../hooks/useMotion.js'
import './Section.css'

// Typing speed per character, and the pause before the output appears.
const TYPE_MS = 45
const AFTER_TYPING_MS = 180

// One command in the session and its output. The visible heading is the
// command; screen readers get the plain title.
//
// With animations on, the command types itself the first time the block
// scrolls into view and the output appears once it has finished. A block the
// page opens below (a link to a later section) is complete already. The output
// keeps its space while hidden, so the page never changes height. With
// animations off the block is complete from the start.
export default function Section({ tab, children }) {
  const motion = useContext(MotionContext)
  const block = useRef(null)
  const heading = useRef(null)
  // 'waiting' (not seen yet) -> 'typing' -> 'done'
  const [state, setState] = useState(motion ? 'waiting' : 'done')
  const [typed, setTyped] = useState(0)

  // Turning animations off shows everything at once.
  useEffect(() => {
    if (!motion) setState('done')
  }, [motion])

  useEffect(() => {
    if (state !== 'waiting') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        // The command line is above the screen: the page opened further down
        // (a deep link) or jumped past it (the End key, the scrollbar), so
        // there is no typing to watch. Show the block complete.
        const passed = heading.current.getBoundingClientRect().top < 0
        if (passed) setState('done')
        else if (entry.isIntersecting) setState('typing')
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(block.current)
    return () => observer.disconnect()
  }, [state])

  useEffect(() => {
    if (state !== 'typing') return undefined
    const finished = typed >= tab.command.length
    const timer = window.setTimeout(
      () => (finished ? setState('done') : setTyped((count) => count + 1)),
      finished ? AFTER_TYPING_MS : TYPE_MS,
    )
    return () => window.clearTimeout(timer)
  }, [state, typed, tab.command])

  const done = state === 'done'
  return (
    <section
      ref={block}
      id={tab.id}
      tabIndex={-1}
      className="block"
      data-state={state}
      aria-labelledby={`${tab.id}-title`}
    >
      <h2 ref={heading} id={`${tab.id}-title`} className="cmd" aria-label={tab.label}>
        <span aria-hidden="true">
          <span className="prompt">$</span> {done ? tab.command : tab.command.slice(0, typed)}
          {!done && <span className={state === 'waiting' ? 'cursor blink' : 'cursor'} />}
        </span>
      </h2>
      <div className="out">{children}</div>
    </section>
  )
}
