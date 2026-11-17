import { profile } from '../../content/profile.js'
import './TopBar.css'

// The window's title line: the host name on the left, like a terminal's
// title, and the animations toggle on the right. Always on screen.
export default function TopBar({ motion, onToggleMotion }) {
  return (
    <div className="bar">
      <span className="bar-host" aria-hidden="true">
        {profile.firstName.toLowerCase()}@portfolio:~
      </span>
      <button type="button" className="motion-toggle" aria-pressed={motion} onClick={onToggleMotion}>
        animations: {motion ? 'on' : 'off'}
      </button>
    </div>
  )
}
