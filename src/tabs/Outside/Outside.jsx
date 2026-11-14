import { interests } from '../../content/interests.js'
import Section from '../../components/Section/Section.jsx'
import Photo from '../../components/Photo/Photo.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'
import './Outside.css'

export default function Outside({ tab }) {
  return (
    <Section tab={tab}>
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
    </Section>
  )
}
