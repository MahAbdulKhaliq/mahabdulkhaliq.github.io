import { useEffect, useRef, useState } from 'react'
import Section from '../../components/Section/Section.jsx'
import Experience from './Experience.jsx'
import Skills from './Skills.jsx'
import './ExperienceTab.css'

const SKILLS_BOX = { id: 'skills', label: 'Skills', command: 'cat skills.txt' }
// Keep in step with the .section-clip transition in ExperienceTab.css.
const SWITCH_MS = 340

// The Experience tab holds two boxes, experience and skills, with only one
// open at a time. Two buttons above them pick which one is open. Experience
// is the one open each time the tab opens.
export default function ExperienceTab({ tab }) {
  const [showSkills, setShowSkills] = useState(false)
  const [moving, setMoving] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  function pick(skillsOpen) {
    if (skillsOpen === showSkills) return
    setShowSkills(skillsOpen)
    // Hide the scrollbars while the boxes resize.
    setMoving(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMoving(false), SWITCH_MS)
  }

  const choices = [
    { label: 'view experience', skills: false, box: `${tab.id}-box` },
    { label: 'view skills', skills: true, box: 'skills-box' },
  ]

  return (
    <div className="box-stack" data-moving={moving ? '' : undefined}>
      <div className="box-toggles">
        {choices.map((choice) => (
          <button
            key={choice.label}
            type="button"
            className="box-toggle"
            aria-pressed={choice.skills === showSkills}
            aria-controls={choice.box}
            onClick={() => pick(choice.skills)}
          >
            <span className="prompt" aria-hidden="true">
              &gt;
            </span>{' '}
            {choice.label}
          </button>
        ))}
      </div>
      <Section tab={tab} collapsed={showSkills}>
        <Experience />
      </Section>
      <Section tab={SKILLS_BOX} collapsed={!showSkills}>
        <Skills />
      </Section>
    </div>
  )
}
