// The link row on Home. `icon` names a shape in components/Icon/Icon.jsx.

export const links = [
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/mahabdulkhaliq' },
  { label: 'GitHub', icon: 'github', href: 'https://github.com/MahAbdulKhaliq' },
  { label: 'Resume (PDF)', icon: 'file', href: './resume.pdf' }, // built from resume/resume.html
  { label: 'Email', icon: 'mail', href: 'mailto:mahabdulkhaliq@gmail.com' },
]

// The Contact section: the line above the list, then each way to reach me written
// out in full. `icon` names a shape in components/Icon/Icon.jsx.
export const contactIntro =
  'I’m open to full-stack, back-end and front-end roles. The quickest way to reach me is by email or a message on LinkedIn; I’m happy to hear from you on either.'

export const contact = [
  {
    label: 'email',
    icon: 'mail',
    text: 'mahabdulkhaliq@gmail.com',
    href: 'mailto:mahabdulkhaliq@gmail.com',
  },
  {
    label: 'linkedin',
    icon: 'linkedin',
    text: 'linkedin.com/in/mahabdulkhaliq',
    href: 'https://www.linkedin.com/in/mahabdulkhaliq',
  },
  {
    label: 'github',
    icon: 'github',
    text: 'github.com/MahAbdulKhaliq',
    href: 'https://github.com/MahAbdulKhaliq',
  },
  { label: 'phone', icon: 'phone', text: '905-966-3437', href: 'tel:+19059663437' },
]
