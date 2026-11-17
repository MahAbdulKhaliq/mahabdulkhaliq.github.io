import { interests } from '../content/interests.js'
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Projects from './Projects/Projects.jsx'
import ExperienceTab from './Experience/ExperienceTab.jsx'
import SkillsTab from './Experience/SkillsTab.jsx'
import Outside from './Outside/Outside.jsx'
import Contact from './Contact/Contact.jsx'

// The sections of the session, in the order they appear on the page. `id` is
// the URL hash, `command` is the line that heads the section, `short` is its
// shortcut on the pinned prompt line, `label` is the plain name screen
// readers get, and `Panel` draws the section.
export const TABS = [
  { id: 'home', label: 'Home', short: 'whoami', command: 'whoami', Panel: Home },
  { id: 'about', label: 'About me', short: 'about', command: 'cat about-me.md', Panel: About },
  { id: 'projects', label: 'Projects', short: 'projects', command: 'ls projects/', Panel: Projects },
  { id: 'experience', label: 'Experience', short: 'experience', command: 'cat experience.log', Panel: ExperienceTab },
  { id: 'skills', label: 'Skills', short: 'skills', command: 'cat skills.txt', Panel: SkillsTab },
  { id: 'outside', label: 'Outside of work', short: 'outside', command: 'ls outside-of-work/', Panel: Outside },
  { id: 'contact', label: 'Contact', short: 'contact', command: 'cat contact.txt', Panel: Contact },
].filter((tab) => tab.id !== 'outside' || interests.length > 0)

export function tabFromHash() {
  const id = window.location.hash.slice(1)
  return TABS.some((tab) => tab.id === id) ? id : 'home'
}
