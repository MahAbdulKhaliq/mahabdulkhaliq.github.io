import { useEffect, useState } from 'react'
import { TABS, tabFromHash } from './tabs/index.js'
import { profile } from './content/profile.js'
import useMotion, { MotionContext } from './hooks/useMotion.js'
import TopBar from './components/TopBar/TopBar.jsx'
import PromptBar from './components/PromptBar/PromptBar.jsx'
import Footer from './components/Footer/Footer.jsx'

// Scrolls to a section; `home` is the top of the page.
function scrollToSection(id, smooth) {
  const behavior = smooth ? 'smooth' : 'auto'
  const target = id === 'home' ? null : document.getElementById(id)
  if (target) target.scrollIntoView({ behavior, block: 'start' })
  else window.scrollTo({ top: 0, behavior })
}

// The page is one terminal session: every section, in order, as a command and
// its output. This shell tracks which section is on screen, keeps the URL
// hash and the browser tab title in step, and draws the pinned prompt line.
export default function App() {
  const [motion, toggleMotion] = useMotion()
  // The section currently on screen.
  const [current, setCurrent] = useState(tabFromHash)

  // The browser tab reads like a terminal path, e.g. mahmood@portfolio/about.
  useEffect(() => {
    document.title = `${profile.firstName.toLowerCase()}@portfolio/${current}`
  }, [current])

  // A link such as /#projects opens at that section. Back and forward move
  // between the sections visited through the prompt line.
  useEffect(() => {
    const jump = () => scrollToSection(tabFromHash(), false)
    if (tabFromHash() !== 'home') jump()
    window.addEventListener('popstate', jump)
    return () => window.removeEventListener('popstate', jump)
  }, [])

  // The current section is the last one whose command line has passed the
  // upper third of the screen; at the very end of the page it is the last one.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let id = TABS[0].id
      for (const tab of TABS) {
        const section = document.getElementById(tab.id)
        if (section && section.getBoundingClientRect().top <= line) id = tab.id
      }
      const page = document.documentElement
      if (window.innerHeight + window.scrollY >= page.scrollHeight - 2 && window.scrollY > 0) {
        id = TABS.at(-1).id
      }
      setCurrent(id)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  function go(id) {
    if (id !== tabFromHash()) {
      const url = id === 'home' ? window.location.pathname + window.location.search : `#${id}`
      window.history.pushState(null, '', url)
    }
    scrollToSection(id, motion)
  }

  return (
    <MotionContext.Provider value={motion}>
      <div className="page" data-motion={motion ? 'on' : 'off'}>
        <a className="skip" href="#content">
          Skip to content
        </a>

        <TopBar />

        <main id="content" tabIndex={-1}>
          {TABS.map((tab) => (
            <tab.Panel key={tab.id} tab={tab} motion={motion} />
          ))}
        </main>

        <Footer motion={motion} />

        <PromptBar
          tabs={TABS}
          current={current}
          onPick={go}
          motion={motion}
          onToggleMotion={toggleMotion}
        />
      </div>
    </MotionContext.Provider>
  )
}
