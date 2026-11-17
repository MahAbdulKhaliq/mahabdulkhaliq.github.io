import { experience } from '../../content/experience.js'

// The job list. Styled by the shared .row and .points classes.
export default function Experience() {
  return (
    <ol className="rows">
      {experience.map((job) => (
        <li key={job.role + job.dates} className="row">
          <div className="job-head">
            <h3>
              {job.role}, {job.company}
            </h3>
            <p className="meta">{job.dates}</p>
          </div>
          <ul className="points">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
