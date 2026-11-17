import { profile } from '../../content/profile.js'
import './TopBar.css'

// The first line of the session: the host name, like a terminal's title.
export default function TopBar() {
  return (
    <div className="bar" aria-hidden="true">
      <span className="bar-host">{profile.firstName.toLowerCase()}@portfolio:~</span>
    </div>
  )
}
