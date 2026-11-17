import { useEffect, useRef, useState } from 'react'
import './PromptBar.css'

// The prompt line at the bottom of the window. Each tab's command is a
// shortcut that opens it; the open one is shown inverted. The resume link
// sits at the end. When the row is too narrow to show every shortcut, `<<`
// and `>>` appear at its ends and move through them.
export default function PromptBar({ tabs, current, onPick, motion }) {
  const row = useRef(null)
  // Whether there are shortcuts hidden past the left and right ends.
  const [more, setMore] = useState({ left: false, right: false })

  useEffect(() => {
    const scroller = row.current
    const measure = () => {
      const left = scroller.scrollLeft > 1
      const right = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1
      setMore((was) => (was.left === left && was.right === right ? was : { left, right }))
    }
    measure()
    scroller.addEventListener('scroll', measure, { passive: true })
    const sizes = new ResizeObserver(measure)
    sizes.observe(scroller)
    return () => {
      scroller.removeEventListener('scroll', measure)
      sizes.disconnect()
    }
  }, [])

  // Keep the open tab's shortcut in view. When everything fits, nothing moves.
  useEffect(() => {
    const scroller = row.current
    const link = scroller.querySelector('[aria-current]')
    if (!link) return
    const left = link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2
    scroller.scrollTo({ left, behavior: motion ? 'smooth' : 'auto' })
  }, [current, motion])

  function page(direction) {
    const scroller = row.current
    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.7,
      behavior: motion ? 'smooth' : 'auto',
    })
  }

  const overflowing = more.left || more.right
  return (
    <div className="promptbar">
      <span className="prompt promptbar-sign" aria-hidden="true">
        $
      </span>
      {overflowing && (
        <button
          type="button"
          className="promptbar-more"
          aria-label="Show earlier sections"
          disabled={!more.left}
          onClick={() => page(-1)}
        >
          &lt;&lt;
        </button>
      )}
      <div className="promptbar-row" ref={row}>
        <nav className="nav" aria-label="Sections">
          {tabs.map((item) => (
            <a
              key={item.id}
              href={item.id === 'home' ? './' : `#${item.id}`}
              aria-current={item.id === current ? 'page' : undefined}
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
      </div>
      {overflowing && (
        <button
          type="button"
          className="promptbar-more"
          aria-label="Show later sections"
          disabled={!more.right}
          onClick={() => page(1)}
        >
          &gt;&gt;
        </button>
      )}
    </div>
  )
}
