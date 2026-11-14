// Everything the site says lives in this file.
// Lines marked TODO are placeholders to replace before publishing.

export const profile = {
  firstName: 'Mahmood',
  lastName: 'Abdul-Khaliq',
  // Photos live in /public/photos. Until a file exists, the site shows a
  // labelled empty frame in its place.
  portrait: './photos/portrait.jpg',
  // Typed and erased under the name on the Home tab. `tagline` shows first and
  // then every third time; the two in between are drawn at random from
  // `taglines`, which is used up completely before any phrase repeats.
  tagline: 'full-stack developer',
  taglines: [
    'kinda strong',
    'cat lover',
    'pizza enjoyer',
    'cost conscious',
    'hello, world!',
    'my cat runs the show',
    'how does this thing work again?',
    'i promise i won’t break prod',
    'sudo rm -rf... just kidding. ;)',
    'a bit of a night owl',
  ],
  greeting: 'Hi, I’m Mahmood.',
  summary:
    'I’m a full-stack software developer in Ontario, Canada. I’ve spent over four years building fleet software professionally, starting as an intern and staying on as a full-time developer.',
  // Second portrait, shown to the right of the About me text. Set to '' to hide it.
  aboutPortrait: './photos/about.jpg', // upright 2:3
  about: [
    // Drafted from what you told me and your resume notes. Edit until it
    // sounds like you.
    'I grew up in Ontario, Canada. When I was young I often found myself helping my parents and the people around me with their computers, and I played a lot of video games. I think that’s where my passion for coding, or at least for thinking like a coder, began. I got into coding for the first time in high school and enjoyed it, but I ultimately pushed those feelings to the back of my mind.',
    'So I didn’t go straight into software after high school. First I pursued Life Sciences at McMaster, heading toward Biology, but I never felt at home on that path. I dropped it and, rather quickly, decided to pursue my dream of working in software development, which took me to Mohawk College.',
    'Moving from the sciences to software was a bit of a shake-up at first. Was I doing the right thing? Was I good enough for this? Around the same time, I went to the gym for the first time in my life and picked up the weights. I started to get good at it, and then it hit me: I might not be the greatest, but if I keep practising and applying myself, I’ll keep getting better. More than eight years later, I’m still lifting, and that constant reminder of discipline is a big part of why I’m still a software developer.',
    'I’ve now spent about four and a half years building web applications professionally, across the whole stack: database schemas and queries in PostgreSQL, APIs and background jobs in C# and .NET, and interfaces in React and Angular. I like owning a feature from the first design conversation through to supporting it in production.',
    'A lot of what I’m good at is making existing software better: rebuilding older legacy systems as modern ones, finding the query that makes a page slow, and closing security and accessibility gaps. I’ve run production releases, reviewed a lot of teammates’ code and mentored newer developers.',
    'I use AI coding agents every day, and I’ve built skills for them that automated part of a team’s weekly release testing. I’m glad I got to experience working as a developer in a post-AI world, and I’m still amazed at how quickly we can build solutions to problems that stood for years. This website is an example: I built it with Claude Code, making the design and content decisions myself.',
  ],
}

export const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahabdulkhaliq' },
  { label: 'GitHub', href: 'https://github.com/MahAbdulKhaliq' },
  { label: 'Resume (PDF)', href: './resume.pdf' }, // built from resume/resume.html
  { label: 'Email', href: 'mailto:mahabdulkhaliq@gmail.com' },
]

// The Contact tab lists these written out in full. `note` is optional.
export const contact = [
  {
    label: 'Email',
    text: 'mahabdulkhaliq@gmail.com',
    href: 'mailto:mahabdulkhaliq@gmail.com',
    note: 'preferred for first contact',
  },
  { label: 'Phone', text: '905-966-3437', href: 'tel:+19059663437' },
  {
    label: 'LinkedIn',
    text: 'linkedin.com/in/mahabdulkhaliq',
    href: 'https://www.linkedin.com/in/mahabdulkhaliq',
  },
]

// Leave repo or demo as '' to hide that link.
export const projects = [
  {
    name: 'This website',
    summary:
      'A terminal-styled portfolio built with React and Vite. Each section is a tab that collapses and expands, all the content comes from one data file, and the build is a static bundle.',
    stack: ['React', 'Vite', 'CSS'],
    repo: 'https://github.com/MahAbdulKhaliq/mahabdulkhaliq.github.io',
    demo: '',
  },
  {
    name: 'Workout Repository (Capstone, 2021)',
    summary:
      'My capstone project at Mohawk College: a strength-training web app. It has an exercise library you can search and filter by muscle group and equipment, workouts you build from those exercises, workout logs, and favourites, ratings and comments on each exercise. Accounts have user and admin roles, and admins manage the exercise catalogue.',
    stack: ['C#', 'ASP.NET Core MVC', 'Razor', 'Entity Framework Core', 'SQL Server', 'Bootstrap'],
    repo: 'https://github.com/MahAbdulKhaliq/CapstoneProject',
    demo: '',
  },
]

// Shown under the project list. Set to '' to hide it.
export const projectsNote = 'More to come...'

export const experience = [
  {
    role: 'Software Developer',
    company: 'Geotab',
    dates: 'Aug 2023 to Oct 2026',
    points: [
      'Notable contributor to the Angular to React rebuilds of the device management and RMA pages: data tables, advanced filtering and multi-step workflow dialogs, built on a shared component design system.',
      'Owned a customer-communications service that sends multi-language email and in-app notifications, from schema design through background jobs to the UI.',
      'Improved backend performance by removing N+1 queries, batching and parallelizing database calls, and adding PostgreSQL indexes.',
      'Fixed security vulnerabilities including SSRF, broken access control and XSS, and delivered WCAG 2.2 AA accessibility improvements.',
      'Served as release manager for seven production releases, took on-call rotations, reviewed a large share of the team’s merge requests and mentored four teammates.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Geotab',
    dates: 'May 2022 to Aug 2023',
    points: [
      'Built a suite of advanced search filters for the main device administration page (Angular, ASP.NET Core, PostgreSQL), each covered by Cypress end-to-end tests.',
      'Designed a public bulk device-provisioning API used by external integrators and a partner product team.',
      'Fixed a broken-access-control vulnerability that let users read other accounts’ records by changing an ID in the URL.',
    ],
  },
  {
    role: 'Web and Software Developer (Co-op)',
    company: 'Auto Key Pro',
    dates: 'Jul 2021 to Sep 2021',
    points: [
      'Built Zapier automations connecting Google Calendar, Drive and Sheets to the day-to-day work: messaging customers when appointments were scheduled, notifying the assigned technicians, and logging jobs to Google Sheets.',
      'Maintained the company’s WordPress site and its in-house PHP plugin, keeping its data and security updates current.',
    ],
  },
]

export const education = [
  {
    school: 'Mohawk College',
    credential: 'Software Development, Advanced Diploma',
    dates: '2018 to 2021',
  },
  {
    school: 'Mohawk College',
    credential: 'Software Support, Diploma',
    dates: '2018 to 2020',
  },
]

// Optional. Delete the array contents to hide the section.
// Each one gets a photo and a sentence or two. Leave photo as '' for no photo.
// `link` is optional and shows as a small link under the note.
export const interests = [
  {
    name: 'Lifting weights',
    note: 'I have been lifting for over eight years, as a hobby rather than competitively. Back in 2021 I put together a small beginner program for anyone asking what workout plan to start with.',
    photo: './photos/lifting.jpg',
    link: {
      label: 'Yet Another Beginner Program',
      href: 'https://docs.google.com/spreadsheets/d/13Dek_E4_pYxVzHzOO_onIagF4FYU1Hv7FIm7DkeNq-Y/edit?usp=sharing',
    },
  },
  {
    name: 'Personal finance and budgeting',
    note: 'I track my money day to day in a heavily modified spreadsheet template: a yearly overview with projected account balances, and a tab for each month. Make a copy if you want to use it.',
    photo: './photos/finance.jpg',
    link: {
      label: 'Budgeting Template V3',
      href: 'https://docs.google.com/spreadsheets/d/1VD2ijxfVITVbSw12_G-EJeQHASvhKA2rs3UaI5AIJX0/edit?usp=sharing',
    },
  },
  {
    name: 'Cats',
    note: 'I love cats. That’s my cat Layla in the cardboard box at the back, and my housemate’s cat Freya, Layla’s mom, in front. They have exactly one brain cell between them.',
    photo: './photos/cats.jpg',
  },
  {
    name: 'FDM 3D printing',
    note: 'It’s been a while since I printed anything, but I was obsessed with it back in 2021 and 2022. I watched pretty much everything about 3D printing back then, and seeing a 3D model come to life for the first time was awe-inspiring. Maybe I should get back into it...',
    photo: './photos/printing.jpg',
  },
  {
    name: 'Gaming',
    note: 'I’ve been a PC gamer since I was young, and gaming is what got me into software development in the first place. Just don’t ask how many hours I have in Warframe.',
    photo: './photos/gaming.jpg',
  },
  {
    name: 'Electric vehicles',
    note: 'I started learning about electric cars when I got my Chevrolet Volt in 2024. I was hesitant at first, which is why I went with a plug-in hybrid, but I got hooked once I realized about 90% of my driving was fully electric. My next car will be a full EV.',
    photo: './photos/ev.jpg',
  },
]

// Footer easter egg. One of these is typed after "Built with React and Vite."
// at random, then erased. A phrase starting with "..." continues the sentence.
export const footerExtras = [
  '... and a bit of love. <3',
  '... with a bit of spice. >:)',
  '... and a LOT of $1.50 hotdogs.',
  '... and two very involved cats.',
  '... and some pre-workout.',
  '... and around 150mg of caffeine.',
  '... and a bit of mischief. :^)',
  'ffgjggjjjjjjjjjjjjjjjjjjjj... oops, Layla got on the keyboard.',
]
