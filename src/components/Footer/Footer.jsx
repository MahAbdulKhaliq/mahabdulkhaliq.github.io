import { profile } from '../../content/profile.js'
import { footerExtras } from '../../content/footer.js'
import FooterLine from './FooterLine.jsx'
import './Footer.css'

export default function Footer({ motion }) {
  const fullName = `${profile.firstName} ${profile.lastName}`
  const sentence = `${fullName}, ${new Date().getFullYear()}. Built with React and Vite.`
  return (
    <footer className="footer">
      <p>
        {/* Invisible copies of the line with every phrase typed out. They sit
            behind the real line and hold the footer at the height of the
            tallest one, so the page never moves when a phrase is typed. */}
        <span className="footer-sizer" aria-hidden="true">
          {footerExtras.map((phrase) => (
            <span key={phrase}>
              &gt; {sentence} {phrase} __
            </span>
          ))}
        </span>
        <FooterLine phrases={footerExtras} animate={motion}>
          {sentence}
        </FooterLine>
      </p>
    </footer>
  )
}
