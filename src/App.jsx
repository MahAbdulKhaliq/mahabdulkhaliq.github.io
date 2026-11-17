import { useEffect, useRef, useState } from 'react'
import { TABS, tabFromHash } from './tabs/index.js'
import { profile } from './content/profile.js'
import useMotion, { MotionContext } from './hooks/useMotion.js'
import TopBar from './components/TopBar/TopBar.jsx'
import PromptBar from './components/PromptBar/PromptBar.jsx'
import Footer from './components/Footer/Footer.jsx'

// The page is one terminal window, exactly one screen tall. The host line
// and the animations toggle stay at the top, the footer line and the prompt
// line stay at the bottom, and the window between them shows one tab at a
// time: its command, then its output, which scrolls inside the window.
export default function App() {
  const [motion, toggleMotion] = useMotion()
  // The open tab, kept in the URL hash so links and the back button work.
  const [current, setCurrent] = useState(tabFromHash)
  const firstRender = useRef(true)

  useEffect(() => {
    const onChange = () => setCurrent(tabFromHash())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  // The browser tab reads like a terminal path, e.g. mahmood@portfolio/about.
  useEffect(() => {
    document.title = `${profile.firstName.toLowerCase()}@portfolio/${current}`
  }, [current])

  // After a switch, keyboard and screen-reader users carry on from the new
  // tab rather than from the prompt line.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById(current)?.focus()
  }, [current])

  function go(id) {
    if (id === current) return
    const url = id === 'home' ? window.location.pathname + window.location.search : `#${id}`
    window.history.pushState(null, '', url)
    setCurrent(id)
  }

  const tab = TABS.find((item) => item.id === current)

  return (
    <MotionContext.Provider value={motion}>
      <div className="page" data-motion={motion ? 'on' : 'off'}>
        <a className="skip" href="#content">
          Skip to content
        </a>

        <TopBar motion={motion} onToggleMotion={toggleMotion} />

        <main id="content" className="window" tabIndex={-1}>
          <tab.Panel key={tab.id} tab={tab} motion={motion} />
        </main>

        <Footer motion={motion} />

        <PromptBar tabs={TABS} current={current} onPick={go} motion={motion} />
      </div>
    </MotionContext.Provider>
  )
}
