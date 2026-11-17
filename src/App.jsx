import { useEffect, useRef, useState } from 'react'
import { TABS, tabFromHash } from './tabs/index.js'
import { profile } from './content/profile.js'
import useMotion, { MotionContext } from './hooks/useMotion.js'
import { TakeFocusContext } from './components/Section/Section.jsx'
import TopBar from './components/TopBar/TopBar.jsx'
import PromptBar from './components/PromptBar/PromptBar.jsx'
import Footer from './components/Footer/Footer.jsx'

// Keep in step with the box-close animation in components/Section/Section.css.
const CLOSE_MS = 240

// The page is one terminal window, exactly one screen tall. The host line
// and the animations toggle stay at the top; the prompt line and the footer
// line stay at the bottom. The box between them shows one tab at a time: its
// command, then its output, which scrolls inside the box.
//
// With animations on, switching tabs closes the box down to its command
// line, swaps the tab, types the new command and opens the box again. With
// animations off the new tab simply replaces the old one.
export default function App() {
  const [motion, toggleMotion] = useMotion()
  // `shown` is the tab on screen. `target` is where the last click is heading,
  // which differs from `shown` while the old box is still closing.
  const [shown, setShown] = useState(tabFromHash)
  const [target, setTarget] = useState(shown)
  const [closing, setClosing] = useState(false)
  // True once the visitor has switched tabs, so a new tab takes focus.
  const [switched, setSwitched] = useState(false)
  const targetRef = useRef(shown)
  const motionRef = useRef(motion)
  const timer = useRef(0)
  motionRef.current = motion

  // The browser tab reads like a terminal path, e.g. mahmood@portfolio/about.
  // It follows the last click, so it changes as soon as the URL does.
  useEffect(() => {
    document.title = `${profile.firstName.toLowerCase()}@portfolio/${target}`
  }, [target])

  function go(id, { push = true } = {}) {
    if (id === targetRef.current) return
    targetRef.current = id
    setTarget(id)
    setSwitched(true)

    if (push) {
      const url = id === 'home' ? window.location.pathname + window.location.search : `#${id}`
      window.history.pushState(null, '', url)
    }

    const swap = () => {
      setShown(targetRef.current)
      setClosing(false)
    }

    window.clearTimeout(timer.current)
    if (motionRef.current) {
      setClosing(true)
      timer.current = window.setTimeout(swap, CLOSE_MS)
    } else {
      swap()
    }
  }

  // Back and forward buttons, and links to a tab, move between tabs.
  useEffect(() => {
    const onChange = () => go(tabFromHash(), { push: false })
    window.addEventListener('popstate', onChange)
    window.addEventListener('hashchange', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('hashchange', onChange)
      window.clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tab = TABS.find((item) => item.id === shown)

  return (
    <MotionContext.Provider value={motion}>
      <div className="page" data-motion={motion ? 'on' : 'off'}>
        <a
          className="skip"
          href="#content"
          onClick={(event) => {
            // Stays on the open tab; following the link would change the hash.
            event.preventDefault()
            document.querySelector('.out-scroll')?.focus()
          }}
        >
          Skip to content
        </a>

        <TopBar motion={motion} onToggleMotion={toggleMotion} />

        <main id="content" className="window" data-closing={closing ? '' : undefined}>
          <TakeFocusContext.Provider value={switched}>
            <tab.Panel key={tab.id} tab={tab} motion={motion} />
          </TakeFocusContext.Provider>
        </main>

        <PromptBar tabs={TABS} current={target} onPick={go} motion={motion} />

        <Footer motion={motion} />
      </div>
    </MotionContext.Provider>
  )
}
