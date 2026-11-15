import { contact, contactIntro } from '../../content/links.js'
import Section from '../../components/Section/Section.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import './Contact.css'

export default function Contact({ tab }) {
  return (
    <Section tab={tab}>
      <p className="prose">{contactIntro}</p>

      <h3 className="sub contact-heading">contact</h3>
      <ul className="contact-list">
        {contact.map((item) => (
          <li key={item.label} className="contact-item">
            <Icon name={item.icon} className="contact-icon" />
            <span className="contact-label">{item.label}</span>
            <ExternalLink href={item.href}>{item.text}</ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
