import { contact } from '../../content/links.js'
import Section from '../../components/Section/Section.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'
import './Contact.css'

export default function Contact({ tab }) {
  return (
    <Section tab={tab}>
      <p className="prose">
        I am open to full-stack, back-end and front-end roles. Please email me first; it is the
        best way to reach me.
      </p>
      <ul className="points contact-list">
        {contact.map((item) => (
          <li key={item.label}>
            {item.label}: <ExternalLink href={item.href}>{item.text}</ExternalLink>
            {item.note && <span className="meta"> ({item.note})</span>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
