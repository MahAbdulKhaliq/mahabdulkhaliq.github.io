import { profile } from '../../content/profile.js'
import { footerExtras } from '../../content/footer.js'
import FooterLine from './FooterLine.jsx'
import './Footer.css'

export default function Footer({ motion }) {
  const fullName = `${profile.firstName} ${profile.lastName}`
  return (
    <footer className="footer">
      <p>
        <FooterLine phrases={footerExtras} animate={motion}>
          {`${fullName}, ${new Date().getFullYear()}. Built with React and Vite.`}
        </FooterLine>
      </p>
    </footer>
  )
}
