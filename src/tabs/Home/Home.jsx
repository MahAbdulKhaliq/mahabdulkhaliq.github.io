import { profile } from '../../content/profile.js'
import { links } from '../../content/links.js'
import Section from '../../components/Section/Section.jsx'
import Typer from '../../components/Typer/Typer.jsx'
import Photo from '../../components/Photo/Photo.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import './Home.css'

export default function Home({ tab, motion }) {
  const fullName = `${profile.firstName} ${profile.lastName}`
  return (
    <Section tab={tab}>
      <div className="hero">
        <h1 className="name" aria-label={fullName}>
          <span aria-hidden="true">
            <span className="name-line">{profile.firstName}</span>
            <span className="name-line">{profile.lastName}</span>
          </span>
        </h1>

        {profile.tagline && (
          <Typer main={profile.tagline} phrases={profile.taglines} animate={motion} />
        )}

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
                  <ExternalLink href={link.href}>
                    <Icon name={link.icon} className="link-icon" />
                    <span>{link.label}</span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
