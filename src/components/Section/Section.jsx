import './Section.css'

// A bordered terminal panel. The visible heading is the command; screen
// readers get the plain title. A collapsed box folds away entirely.
export default function Section({ tab, collapsed = false, children }) {
  return (
    <section
      id={`${tab.id}-box`}
      className="section"
      aria-labelledby={`${tab.id}-title`}
      data-collapsed={collapsed ? '' : undefined}
    >
      <h2 id={`${tab.id}-title`} className="section-title" aria-label={tab.label}>
        <span aria-hidden="true">
          <span className="prompt">$</span> {tab.command}
        </span>
      </h2>
      {/* section-clip is what collapses and expands when tabs change. */}
      <div className="section-clip" inert={collapsed}>
        <div className="section-inner">
          <div className="section-body">{children}</div>
        </div>
      </div>
    </section>
  )
}
