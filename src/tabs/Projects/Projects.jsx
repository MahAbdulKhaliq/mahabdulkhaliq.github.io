import { projects, projectsNote } from '../../content/projects.js'
import Section from '../../components/Section/Section.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'

// Styled by the shared .row classes in styles/shared.css.
export default function Projects({ tab }) {
  return (
    <Section tab={tab}>
      <ul className="rows">
        {projects.map((project) => (
          <li key={project.name} className="row">
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <p className="meta">{project.stack.join(', ')}</p>
            <p className="row-links">
              {project.repo && <ExternalLink href={project.repo}>View code</ExternalLink>}
              {project.demo && <ExternalLink href={project.demo}>Open live demo</ExternalLink>}
            </p>
          </li>
        ))}
        {projectsNote && (
          <li className="row note">
            <span className="prompt">#</span> {projectsNote}
          </li>
        )}
      </ul>
    </Section>
  )
}
