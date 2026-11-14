import { useEffect, useRef, useState } from 'react'
import {
  profile,
  links,
  contact,
  projects,
  projectsNote,
  experience,
  education,
  interests,
} from './content.js'

// One tab is on screen at a time. `command` is the heading shown on the panel.
const TABS = [
  { id: 'home', label: 'Home', command: 'whoami' },
  { id: 'about', label: 'About me', command: 'cat about-me.md' },
  { id: 'projects', label: 'Projects', command: 'ls projects/' },
  { id: 'experience', label: 'Experience', command: 'cat experience.log' },
  { id: 'outside', label: 'Outside of work', command: 'ls outside-of-work/' },
  { id: 'contact', label: 'Contact', command: 'cat contact.txt' },
].filter((tab) => tab.id !== 'outside' || interests.length > 0)

// Keep in step with the box-close animation in styles.css.
const CLOSE_MS = 240

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

// Types a phrase, blinks the cursor once it is complete, erases it, then
// moves to the next one. With motion off it shows the first phrase as is.
function Typer({ phrases, animate }) {
  const [text, setText] = useState(animate ? '' : phrases[0])
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (!animate) {
      setText(phrases[0])
      setIdle(false)
      return
    }

    let phrase = 0
    let length = 0
    let typing = true
    let timer = 0

    const tick = () => {
      const full = phrases[phrase]
      if (typing) {
        length += 1
        setText(full.slice(0, length))
        if (length === full.length) {
          typing = false
          setIdle(true)
          timer = window.setTimeout(tick, 2200)
        } else {
          timer = window.setTimeout(tick, 75)
        }
      } else {
        setIdle(false)
        length -= 1
        setText(full.slice(0, length))
        if (length === 0) {
          typing = true
          phrase = (phrase + 1) % phrases.length
          timer = window.setTimeout(tick, 450)
        } else {
          timer = window.setTimeout(tick, 35)
        }
      }
    }

    setText('')
    timer = window.setTimeout(tick, 700)
    return () => window.clearTimeout(timer)
  }, [animate, phrases])

  return (
    <p className="typer">
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true">
        <span className="prompt">&gt;</span> {text}
        <span className={idle ? 'cursor blink' : 'cursor'} />
      </span>
    </p>
  )
}

function tabFromHash() {
  const id = window.location.hash.slice(1)
  return TABS.some((tab) => tab.id === id) ? id : 'home'
}

// Shows the image, or a labelled empty frame until the file is added.
function Photo({ src, alt, className = '' }) {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <div className={`photo photo-empty ${className}`}>
        <span>Add {src.replace(/^\.\//, 'public/')}</span>
      </div>
    )
  }
  return (
    <img
      className={`photo ${className}`}
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
    />
  )
}

// A bordered terminal panel. The visible heading is the command; screen
// readers get the plain title.
function Section({ tab, children }) {
  return (
    <section className="section" aria-labelledby={`${tab.id}-title`}>
      <h2 id={`${tab.id}-title`} className="section-title" aria-label={tab.label}>
        <span aria-hidden="true">
          <span className="prompt">$</span> {tab.command}
        </span>
      </h2>
      {/* section-clip is what collapses and expands when tabs change. */}
      <div className="section-clip">
        <div className="section-inner">
          <div className="section-body">{children}</div>
        </div>
      </div>
    </section>
  )
}

function ExternalLink({ href, children }) {
  const external = /^https?:/.test(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  )
}

function Home({ motion }) {
  const fullName = `${profile.firstName} ${profile.lastName}`
  return (
    <div className="hero">
      <h1 className="name" aria-label={fullName}>
        <span aria-hidden="true">
          <span className="name-line">{profile.firstName}</span>
          <span className="name-line">{profile.lastName}</span>
        </span>
      </h1>

      {profile.taglines.length > 0 && <Typer phrases={profile.taglines} animate={motion} />}

      <div className="intro">
        {profile.portrait && (
          <Photo src={profile.portrait} alt={`Portrait of ${fullName}`} className="portrait" />
        )}
        <div>
          <p className="greeting">{profile.greeting}</p>
          <p className="lede">{profile.summary}</p>

          <ul className="links">
            {links.map((link) => (
              <li key={link.label}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="about">
      {/* Floated right; it comes first so the text wraps around it. */}
      {profile.aboutPortrait && (
        <Photo
          src={profile.aboutPortrait}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="portrait about-photo"
        />
      )}
      <div>
        {profile.about.map((paragraph) => (
          <p key={paragraph} className="prose">
            {paragraph}
          </p>
        ))}

        <h3 className="sub">Education</h3>
        <ul className="plain">
          {education.map((item) => (
            <li key={item.school + item.credential}>
              {item.school}, {item.credential}
              {item.dates && <span className="meta"> ({item.dates})</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <ul className="rows">
      {projects.map((project) => (
        <li key={project.name} className="row">
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <p className="meta">{project.stack.join(', ')}</p>
          <p className="row-links">
            {project.repo && <ExternalLink href={project.repo}>View code</ExternalLink>}
            {project.demo && <ExternalLink href={project.demo}>Open live demo</ExternalLink>}
          </p>
        </li>
      ))}
      {projectsNote && (
        <li className="row note">
          <span className="prompt">#</span> {projectsNote}
        </li>
      )}
    </ul>
  )
}

function Experience() {
  return (
    <ol className="rows">
      {experience.map((job) => (
        <li key={job.role + job.dates} className="row">
          <h3>
            {job.role}, {job.company}
          </h3>
          <p className="meta">{job.dates}</p>
          <ul className="points">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

function Outside() {
  return (
    <ul className="cards">
      {interests.map((interest) => (
        <li key={interest.name} className="card">
          {interest.photo && <Photo src={interest.photo} alt={interest.name} />}
          <h3>{interest.name}</h3>
          <p>{interest.note}</p>
          {interest.link && (
            <p className="card-link">
              <ExternalLink href={interest.link.href}>{interest.link.label}</ExternalLink>
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

function Contact() {
  return (
    <>
      <p className="prose">
        I am open to full-stack, back-end and front-end roles. Please email me first; it is the
        best way to reach me.
      </p>
      <ul className="points contact-list">
        {contact.map((item) => (
          <li key={item.label}>
            {item.label}: <ExternalLink href={item.href}>{item.text}</ExternalLink>
            {item.note && <span className="meta"> ({item.note})</span>}
          </li>
        ))}
      </ul>
    </>
  )
}

const PANELS = {
  home: Home,
  about: About,
  projects: Projects,
  experience: Experience,
  outside: Outside,
  contact: Contact,
}

export default function App() {
  const fullName = `${profile.firstName} ${profile.lastName}`

  // `shown` is the tab on screen. `target` is where the last click is heading,
  // which differs from `shown` while the old panel is still closing.
  const [shown, setShown] = useState(tabFromHash)
  const [target, setTarget] = useState(shown)
  const [phase, setPhase] = useState('opening')
  const targetRef = useRef(shown)
  const timer = useRef(0)
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
  const Panel = PANELS[shown]

  return (
    <div className="page" data-motion={motion ? 'on' : 'off'}>
      <a className="skip" href="#content">
        Skip to content
      </a>

      <div className="bar">
        <span className="bar-host" aria-hidden="true">
          {profile.firstName.toLowerCase()}@portfolio:~
        </span>
        <div className="bar-right">
        <nav className="nav" aria-label="Sections">
          {TABS.map((item) => (
            <a
              key={item.id}
              href={item.id === 'home' ? './' : `#${item.id}`}
              aria-current={item.id === target ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                go(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button type="button" className="motion-toggle" aria-pressed={motion} onClick={toggleMotion}>
          animations: {motion ? 'on' : 'off'}
        </button>
        </div>
      </div>

      <main id="content" tabIndex={-1}>
        {/* The key remounts the view for each tab, which replays the open animation. */}
        <div key={shown} className="view" data-phase={phase}>
          <Section tab={tab}>
            <Panel motion={motion} />
          </Section>
        </div>
      </main>

      <footer className="footer">
        <p>
          {fullName}, {new Date().getFullYear()}. Built with React and Vite.
        </p>
      </footer>
    </div>
  )
}
