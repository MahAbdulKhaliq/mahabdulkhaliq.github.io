import { profile } from '../../content/profile.js'
import { education } from '../../content/education.js'
import Section from '../../components/Section/Section.jsx'
import Photo from '../../components/Photo/Photo.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import './About.css'

// Turns **phrase** into bold text. Splitting on the capture group leaves the
// bold phrases at the odd positions.
function emphasize(text) {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

export default function About({ tab }) {
  return (
    <Section tab={tab}>
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
          {profile.about.map((group) => (
            <section key={group.heading} className="about-group">
              <h3 className="sub">{group.heading}</h3>
              {group.paragraphs.map((paragraph) => (
                <p key={paragraph} className="prose">
                  {emphasize(paragraph)}
                </p>
              ))}
            </section>
          ))}

          <section className="about-education">
            <h3 className="sub">education</h3>
            <ul className="plain">
              {education.map((item) => (
                <li key={item.school + item.credential} className="school">
                  <Icon name="cap" className="school-icon" />
                  <span>
                    <strong>{item.school}</strong>, {item.credential}
                    {item.dates && <span className="meta"> ({item.dates})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Section>
  )
}
