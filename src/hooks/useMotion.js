import { createContext, useState } from 'react'

// Whether animations are on, for components that are not handed it as a prop.
export const MotionContext = createContext(false)

// Animations follow the visitor's system setting until they use the toggle.
function initialMotion() {
  try {
    const saved = window.localStorage.getItem('motion')
    if (saved) return saved === 'on'
  } catch {
    // Storage can be blocked; fall through to the system setting.
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Whether animations are on, and a toggle that remembers the choice.
export default function useMotion() {
  const [motion, setMotion] = useState(initialMotion)

  function toggleMotion() {
    const next = !motion
    setMotion(next)
    try {
      window.localStorage.setItem('motion', next ? 'on' : 'off')
    } catch {
      // Not saved; the choice still applies until the page is closed.
    }
  }

  return [motion, toggleMotion]
}
