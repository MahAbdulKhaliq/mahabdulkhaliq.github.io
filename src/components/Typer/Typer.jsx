import { useEffect, useRef, useState } from 'react'
import { HOLD_MS } from './timing.js'
import './Typer.css'

// Types a phrase, blinks the cursor while it is held, erases it, then types
// the next. `main` comes first and then every third time; the two in between
// are drawn at random from `phrases`, with none repeated until all are used.
// Clicking skips straight to the next phrase. With motion off it shows `main`.
export default function Typer({ main, phrases, animate }) {
  const [text, setText] = useState(animate ? '' : main)
  const [idle, setIdle] = useState(false)
  const trigger = useRef(null)

  useEffect(() => {
    if (!animate) {
      setText(main)
      setIdle(false)
      return
    }

    let full = ''
    let length = 0
    let shown = 0
    let bag = []
    let last = ''
    let timer = 0
    const after = (ms, next) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(next, ms)
    }

    // Refill the bag with a fresh shuffle once every phrase has been used.
    const draw = () => {
      if (bag.length === 0) {
        bag = [...phrases]
        for (let i = bag.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[bag[i], bag[j]] = [bag[j], bag[i]]
        }
        // Don't open a new round with the phrase that closed the last one.
        if (bag.length > 1 && bag.at(-1) === last) bag.reverse()
      }
      last = bag.pop()
      return last
    }

    const begin = () => {
      full = shown % 3 === 0 || phrases.length === 0 ? main : draw()
      shown += 1
      length = 0
      setText('')
      setIdle(false)
      after(450, type)
    }
    const type = () => {
      length += 1
      setText(full.slice(0, length))
      if (length === full.length) {
        setIdle(true)
        after(HOLD_MS, erase)
      } else {
        after(75, type)
      }
    }
    const erase = () => {
      setIdle(false)
      length -= 1
      setText(full.slice(0, length))
      if (length === 0) begin()
      else after(35, erase)
    }

    trigger.current = begin
    begin()
    return () => {
      window.clearTimeout(timer)
      trigger.current = null
    }
  }, [animate, main, phrases])

  return (
    <p className="typer">
      <span className="sr-only">{main}</span>
      <button
        type="button"
        className="text-button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => trigger.current?.()}
      >
        <span className="prompt">&gt;</span> {text}
        <span className={idle ? 'cursor blink' : 'cursor'} />
      </button>
    </p>
  )
}
