import Section from '../../components/Section/Section.jsx'
import Experience from './Experience.jsx'
import './ExperienceTab.css'

export default function ExperienceTab({ tab }) {
  return (
    <Section tab={tab}>
      <Experience />
    </Section>
  )
}
