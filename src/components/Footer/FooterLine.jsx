import { useEffect, useRef, useState } from 'react'
import { HOLD_MS } from '../Typer/timing.js'

// The footer line, with an easter egg. Every 20 seconds a cursor appears after
// the sentence and types a random phrase from footerExtras, holds it for 5
// seconds, erases it and disappears. Clicking the line skips the wait and
// starts a fresh phrase straight away. With motion off it stays a plain line.
const FOOTER_WAIT_MS = 20000

export default function FooterLine({ children, phrases, animate }) {
  const [text, setText] = useState('')
  const [cursor, setCursor] = useState(false)
  const [idle, setIdle] = useState(false)
  const trigger = useRef(null)
  const lastPick = useRef(-1)

  useEffect(() => {
    setText('')
    setCursor(false)
    if (!animate || phrases.length === 0) return

    let full = ''
    let length = 0
    let timer = 0
    // Only one step is ever pending, so starting a new one cancels the old.
    const after = (ms, next) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(next, ms)
    }

    // Random, but never the same phrase twice in a row. The sentence already
    // ends in a period, so a phrase that opens with "..." only adds two more.
    const pick = () => {
      let index = Math.floor(Math.random() * phrases.length)
      if (phrases.length > 1 && index === lastPick.current) {
        index = (index + 1) % phrases.length
      }
      lastPick.current = index
      const phrase = phrases[index]
      return phrase.startsWith('...') ? phrase.slice(1) : ` ${phrase}`
    }

    const appear = () => {
      full = pick()
      length = 0
      setText('')
      setCursor(true)
      setIdle(true)
      after(700, type)
    }
    const type = () => {
      setIdle(false)
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
      if (length === 0) {
        setCursor(false)
        after(FOOTER_WAIT_MS, appear)
      } else {
        after(30, erase)
      }
    }

    trigger.current = appear
    after(FOOTER_WAIT_MS, appear)
    return () => {
      window.clearTimeout(timer)
      trigger.current = null
    }
  }, [animate, phrases])

  return (
    <button type="button" className="text-button" onClick={() => trigger.current?.()}>
      <span className="prompt" aria-hidden="true">
        &gt;
      </span>{' '}
      {children}
      <span aria-hidden="true">
        {text}
        {cursor && <span className={idle ? 'cursor blink' : 'cursor'} />}
      </span>
    </button>
  )
}
