import { profile } from '../../content/profile.js'
import './TopBar.css'

// The window's title line: the host name on the left, like a terminal's
// title, and the animations toggle on the right. Always on screen. The host
// name is a link back to the first tab.
export default function TopBar({ motion, onToggleMotion, onHome }) {
  const host = `${profile.firstName.toLowerCase()}@portfolio:~`
  return (
    <div className="bar">
      <a
        className="bar-host"
        href="./"
        aria-label={`${host} (home)`}
        onClick={(event) => {
          event.preventDefault()
          onHome()
        }}
      >
        {host}
      </a>
      <button type="button" className="motion-toggle" aria-pressed={motion} onClick={onToggleMotion}>
        animations: {motion ? 'on' : 'off'}
      </button>
    </div>
  )
}
