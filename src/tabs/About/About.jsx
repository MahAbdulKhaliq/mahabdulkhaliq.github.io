import { profile } from '../../content/profile.js'
import { education } from '../../content/education.js'
import Section from '../../components/Section/Section.jsx'
import Photo from '../../components/Photo/Photo.jsx'
import './About.css'

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
    </Section>
  )
}
