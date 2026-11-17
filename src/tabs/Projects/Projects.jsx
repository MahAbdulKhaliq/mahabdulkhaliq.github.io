import { useState } from 'react'
import { projects, projectsNote } from '../../content/projects.js'
import Section from '../../components/Section/Section.jsx'
import Photo from '../../components/Photo/Photo.jsx'
import ExternalLink from '../../components/ExternalLink/ExternalLink.jsx'
import './Projects.css'

// Everything a search can match: the name, summary, stack and year.
function searchText(project) {
  return [project.name, project.summary, project.stack.join(' '), project.year].join(' ').toLowerCase()
}

// A project's screenshot. When the project has a live demo, the screenshot
// opens it. "Open live demo" beside it goes to the same place, so the
// screenshot stays out of the Tab order.
function Shot({ project }) {
  const photo = (
    <Photo
      src={project.image}
      alt={`Screenshot of the ${project.name} front page`}
      className="project-shot"
    />
  )
  if (!project.demo) return photo
  return (
    <a
      className="project-shot-link"
      href={project.demo}
      target="_blank"
      rel="noreferrer"
      tabIndex={-1}
      aria-label={`Open the ${project.name} live demo (screenshot)`}
    >
      {photo}
    </a>
  )
}

// Rows use the shared .row classes in styles/shared.css. A project with a
// screenshot shows it beside the text; one without gets no image area at all.
export default function Projects({ tab }) {
  const [query, setQuery] = useState('')
  const [newestFirst, setNewestFirst] = useState(true)

  // Every word typed has to appear somewhere in the project.
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  // Projects from the same year keep their order in projects.js.
  const shown = projects
    .filter((project) => words.every((word) => searchText(project).includes(word)))
    .sort((a, b) => (newestFirst ? b.year - a.year : a.year - b.year))

  return (
    <Section tab={tab}>
      <div className="project-tools">
        <label className="project-search">
          <span className="prompt" aria-hidden="true">
            $ grep
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="search projects"
            aria-label="Search projects"
            spellCheck={false}
            autoComplete="off"
          />
        </label>
        <button
          type="button"
          className="text-button project-sort"
          onClick={() => setNewestFirst((value) => !value)}
        >
          sort: {newestFirst ? 'newest' : 'oldest'} first {newestFirst ? '↓' : '↑'}
        </button>
      </div>

      <p className="project-count meta" aria-live="polite">
        {words.length > 0 &&
          (shown.length === 0
            ? `No projects match "${query.trim()}".`
            : `${shown.length} of ${projects.length} projects match.`)}
      </p>

      <ul className="rows">
        {projectsNote && words.length === 0 && (
          <li className="row note">
            <span className="prompt">#</span> {projectsNote}
          </li>
        )}
        {shown.map((project) => (
          <li key={project.name} className={project.image ? 'row project has-shot' : 'row project'}>
            {project.image && <Shot project={project} />}
            <div>
              <h3>
                {project.name} <span className="project-year">{project.year}</span>
              </h3>
              <p>{project.summary}</p>
              <p className="meta">{project.stack.join(', ')}</p>
              <p className="row-links">
                {project.repo && <ExternalLink href={project.repo}>View code</ExternalLink>}
                {project.demo && <ExternalLink href={project.demo}>Open live demo</ExternalLink>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
