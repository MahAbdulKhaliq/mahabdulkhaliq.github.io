// Opens web addresses in a new tab; mailto:, tel: and local files open in place.
export default function ExternalLink({ href, children }) {
  const external = /^https?:/.test(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  )
}
