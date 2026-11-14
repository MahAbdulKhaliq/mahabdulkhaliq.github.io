import { skills } from '../../content/experience.js'
import './Skills.css'

export default function Skills() {
  return (
    <dl className="skills">
      {skills.map((group) => (
        <div key={group.group} className="skill-row">
          <dt>{group.group}</dt>
          <dd>{group.items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  )
}
