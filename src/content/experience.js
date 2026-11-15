// The Experience tab: jobs, and the skills box behind "view skills".

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
      'Built Zapier automations connecting Google Calendar, Drive and Sheets and RingCentral’s messaging API to the day-to-day work: texting customers when appointments were scheduled, alerting the assigned technicians, and logging jobs to Google Sheets.',
      'Maintained the company’s WordPress site and its distributed in-house plugins (PHP and JavaScript), keeping their API integrations, data and security updates current, and fixed problems reported by customers or found in testing.',
      'Started an internal mapping side project with a Vue.js front end and the Google Maps and Places APIs.',
      'Set up the company’s Git repository on Bitbucket, managed file backups between local storage and the cloud, and provided on-call support.',
    ],
  },
]

// The Experience tab's second box, behind "view skills". From the resume.
export const skills = [
  { group: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'SCSS/CSS'] },
  {
    group: 'Backend',
    items: ['.NET 8', 'ASP.NET Core', 'Entity Framework Core', 'REST APIs', 'JSON-RPC', 'Hangfire', 'Polly', 'async/TPL', 'Protocol Buffers'],
  },
  { group: 'Frontend', items: ['React', 'Angular', 'RxJS', 'React Hook Form', 'Angular Material', 'Vue.js'] },
  { group: 'Data', items: ['PostgreSQL', 'SQL Server', 'BigQuery'] },
  { group: 'Testing', items: ['xUnit', 'Jest', 'React Testing Library', 'Jasmine/Karma', 'Cypress', 'Selenium'] },
  { group: 'Tools', items: ['Git', 'GitLab CI/CD', 'Bitbucket', 'Docker', 'Jira', 'Unleash'] },
  {
    group: 'AI',
    items: ['Claude Code (including Agents/Skills)', 'OpenAI Codex', 'OpenCode', 'Oh My Pi harness'],
  },
]
