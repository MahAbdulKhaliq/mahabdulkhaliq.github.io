import { useEffect, useRef, useState } from 'react'
import { TABS, tabFromHash } from './tabs/index.js'
import useMotion from './hooks/useMotion.js'
import TopBar from './components/TopBar/TopBar.jsx'
import Footer from './components/Footer/Footer.jsx'

// Keep in step with the box-close animation in components/Section/Section.css.
const CLOSE_MS = 240
// A little longer than box-open, after which the box may show its scrollbar.
const OPEN_MS = 400

// The page shell: top bar, the open tab's box, footer. It also runs the tab
// switch, closing the old box before the new one opens.
export default function App() {
  // `shown` is the tab on screen. `target` is where the last click is heading,
  // which differs from `shown` while the old panel is still closing.
  const [shown, setShown] = useState(tabFromHash)
  const [target, setTarget] = useState(shown)
  const [phase, setPhase] = useState('opening')
  const targetRef = useRef(shown)
  const timer = useRef(0)
  const [motion, toggleMotion] = useMotion()

  // Once the box has finished opening, mark it open so it can scroll.
  useEffect(() => {
    if (phase !== 'opening') return undefined
    const done = window.setTimeout(() => setPhase('open'), OPEN_MS)
    return () => window.clearTimeout(done)
  }, [phase, shown])

  function go(id, { push = true } = {}) {
    if (id === targetRef.current) return
    targetRef.current = id
    setTarget(id)

    if (push) {
      const url = id === 'home' ? window.location.pathname + window.location.search : `#${id}`
      window.history.pushState(null, '', url)
    }

    const swap = () => {
      setShown(id)
      setPhase('opening')
      window.scrollTo(0, 0)
    }

    window.clearTimeout(timer.current)
    setPhase('closing')
    timer.current = window.setTimeout(swap, CLOSE_MS)
  }

  // Back and forward buttons move between tabs.
  useEffect(() => {
    const onPop = () => go(tabFromHash(), { push: false })
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tab = TABS.find((item) => item.id === shown)
  const { Panel } = tab

  return (
    <div className="page" data-motion={motion ? 'on' : 'off'}>
      <a className="skip" href="#content">
        Skip to content
      </a>

      <TopBar
        tabs={TABS}
        current={target}
        onPick={go}
        motion={motion}
        onToggleMotion={toggleMotion}
      />

      <main id="content" tabIndex={-1}>
        {/* The key remounts the view for each tab, which replays the open animation. */}
        <div key={shown} className="view" data-phase={phase}>
          <Panel tab={tab} motion={motion} />
        </div>
      </main>

      <Footer motion={motion} />
    </div>
  )
}
