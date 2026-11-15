// Leave repo or demo as '' to hide that link. `image` is a screenshot shown
// beside the project; leave it as '' for none, and the text takes the full width.
export const projects = [
  {
    name: 'Finance Toolkit',
    summary:
      'Four connected personal-finance calculators: what fund fees (MER) really cost over the years, CAGR, renting versus buying a home, and how long until you can retire. A shared fund library links the tools, a Canada/US switch changes the currency and mortgage rules, and any scenario can be shared as a link. The finance logic is pure functions covered by unit tests.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Zustand', 'Vitest'],
    repo: 'https://github.com/MahAbdulKhaliq/finance-toolkit',
    demo: 'https://mahabdulkhaliq.github.io/finance-toolkit/',
    image: './projects/finance-toolkit.png',
  },
  {
    name: 'This website',
    summary:
      'A terminal-styled portfolio built with React and Vite. Each section is a tab that collapses and expands, the text lives in data files apart from the components, and the build is a static bundle.',
    stack: ['React', 'Vite', 'CSS'],
    repo: 'https://github.com/MahAbdulKhaliq/mahabdulkhaliq.github.io',
    demo: '',
    image: './projects/portfolio.png',
  },
  {
    name: 'Workout Repository (Capstone, 2021)',
    summary:
      'My capstone project at Mohawk College: a strength-training web app. It has an exercise library you can search and filter by muscle group and equipment, workouts you build from those exercises, workout logs, and favourites, ratings and comments on each exercise. Accounts have user and admin roles, and admins manage the exercise catalogue.',
    stack: ['C#', 'ASP.NET Core MVC', 'Razor', 'Entity Framework Core', 'SQL Server', 'Bootstrap'],
    repo: 'https://github.com/MahAbdulKhaliq/CapstoneProject',
    demo: '',
    image: '',
  },
]

// Shown under the project list. Set to '' to hide it.
export const projectsNote = 'More to come...'
