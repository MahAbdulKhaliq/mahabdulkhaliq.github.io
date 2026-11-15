import { projects, projectsNote } from '../../content/projects.js'
import Section from '../../components/Section/Section.jsx'
import Photo from '../../components/Photo/Photo.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'
import './Projects.css'

// Rows use the shared .row classes in styles/shared.css. A project with a
// screenshot shows it beside the text; one without gets no image area at all.
export default function Projects({ tab }) {
  return (
    <Section tab={tab}>
      <ul className="rows">
        {projects.map((project) => (
          <li key={project.name} className={project.image ? 'row project has-shot' : 'row project'}>
            {project.image && (
              <Photo
                src={project.image}
                alt={`Screenshot of the ${project.name} front page`}
                className="project-shot"
              />
            )}
            <div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <p className="meta">{project.stack.join(', ')}</p>
              <p className="row-links">
                {project.repo && <ExternalLink href={project.repo}>View code</ExternalLink>}
                {project.demo && <ExternalLink href={project.demo}>Open live demo</ExternalLink>}
              </p>
            </div>
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
