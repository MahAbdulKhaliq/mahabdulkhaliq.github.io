import { interests } from '../content/interests.js'
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Projects from './Projects/Projects.jsx'
import ExperienceTab from './Experience/ExperienceTab.jsx'
import Outside from './Outside/Outside.jsx'
import Contact from './Contact/Contact.jsx'

// The tabs, in the order the top bar lists them. One is on screen at a time.
// `command` is the heading on the tab's box, and `Panel` draws the box itself.
export const TABS = [
  { id: 'home', label: 'Home', command: 'whoami', Panel: Home },
  { id: 'about', label: 'About me', command: 'cat about-me.md', Panel: About },
  { id: 'projects', label: 'Projects', command: 'ls projects/', Panel: Projects },
  { id: 'experience', label: 'Experience', command: 'cat experience.log', Panel: ExperienceTab },
  { id: 'outside', label: 'Outside of work', command: 'ls outside-of-work/', Panel: Outside },
  { id: 'contact', label: 'Contact', command: 'cat contact.txt', Panel: Contact },
].filter((tab) => tab.id !== 'outside' || interests.length > 0)

export function tabFromHash() {
  const id = window.location.hash.slice(1)
  return TABS.some((tab) => tab.id === id) ? id : 'home'
}
