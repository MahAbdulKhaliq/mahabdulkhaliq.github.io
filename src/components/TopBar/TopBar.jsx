import { profile } from '../../content/profile.js'
import './TopBar.css'

// The terminal-style top bar: the host name, the tab links and the
// animations toggle. `current` is the tab the last click is heading to.
export default function TopBar({ tabs, current, onPick, motion, onToggleMotion }) {
  return (
    <div className="bar">
      <span className="bar-host" aria-hidden="true">
        {profile.firstName.toLowerCase()}@portfolio:~
      </span>
      <div className="bar-right">
        <nav className="nav" aria-label="Sections">
          {tabs.map((item) => (
            <a
              key={item.id}
              href={item.id === 'home' ? './' : `#${item.id}`}
              aria-current={item.id === current ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onPick(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="motion-toggle"
          aria-pressed={motion}
          onClick={onToggleMotion}
        >
          animations: {motion ? 'on' : 'off'}
        </button>
      </div>
    </div>
  )
}
