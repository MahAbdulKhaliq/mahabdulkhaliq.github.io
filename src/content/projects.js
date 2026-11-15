// Leave repo or demo as '' to hide that link. `image` is a screenshot shown
// beside the project; leave it as '' for none, and the text takes the full width.
// `year` is when it was built; the Projects tab sorts by it (newest first by default).
export const projects = [
  {
    name: 'Finance Toolkit',
    year: 2026,
    summary:
      'Four connected personal-finance calculators: what fund fees (MER) really cost over the years, CAGR, renting versus buying a home, and how long until you can retire. A shared fund library links the tools, a Canada/US switch changes the currency and mortgage rules, and any scenario can be shared as a link. The finance logic is pure functions covered by unit tests.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Zustand', 'Vitest'],
    repo: 'https://github.com/MahAbdulKhaliq/finance-toolkit',
    demo: 'https://mahabdulkhaliq.github.io/finance-toolkit/',
    image: './projects/finance-toolkit.png',
  },
  {
    name: 'This website',
    year: 2026,
    summary:
      'A terminal-styled portfolio built with React and Vite. Each section is a tab that collapses and expands, the text lives in data files apart from the components, and the build is a static bundle.',
    stack: ['React', 'Vite', 'CSS'],
    repo: 'https://github.com/MahAbdulKhaliq/mahabdulkhaliq.github.io',
    demo: '',
    image: './projects/portfolio.png',
  },
  {
    name: 'Workout Repository (Capstone)',
    year: 2021,
    summary:
      'My capstone project at Mohawk College: a strength-training web app. It has an exercise library you can search and filter by muscle group and equipment, workouts you build from those exercises, workout logs, and favourites, ratings and comments on each exercise. Accounts have user and admin roles, and admins manage the exercise catalogue.',
    stack: ['C#', 'ASP.NET Core MVC', 'Razor', 'Entity Framework Core', 'SQL Server', 'Bootstrap'],
    repo: 'https://github.com/MahAbdulKhaliq/CapstoneProject',
    demo: '',
    image: '',
  },
  {
    name: 'Hamilton Points of Interest Map',
    year: 2020,
    summary:
      "An interactive map of Hamilton's accommodations, libraries, waterfalls and tourist spots: 356 places from the City of Hamilton's open data. You can search by name, address or keyword, filter by category, and click a pin for its details. It was first built on Bing Maps and moved to Leaflet and OpenStreetMap when Bing retired its free keys.",
    stack: ['JavaScript', 'Leaflet', 'OpenStreetMap', 'Bootstrap', 'Open data'],
    repo: 'https://github.com/MahAbdulKhaliq/hamilton-map',
    demo: 'https://mahabdulkhaliq.github.io/hamilton-map/',
    image: './projects/hamilton-map.png',
  },
  {
    name: 'CompSci Squares',
    year: 2018,
    summary:
      'Two-player tic-tac-toe where every square has to be won: pick one, then beat a "celebrity guest" at Rock, Paper, Scissors, Lizard, Spock to claim it, or it goes to your opponent. It is the original Python console program from my coursework, running in the browser through PyScript.',
    stack: ['Python', 'PyScript'],
    repo: 'https://github.com/MahAbdulKhaliq/tictactoe-rpsls',
    demo: 'https://mahabdulkhaliq.github.io/tictactoe-rpsls/',
    image: './projects/tictactoe-rpsls.png',
  },
  {
    name: 'React Calculators',
    year: 2019,
    summary:
      'Two small React apps: a grades calculator that groups results by course and shows each one\'s minimum, maximum and average, and a dice roller with any number of dice and sides.',
    stack: ['React', 'Bootstrap'],
    repo: 'https://github.com/MahAbdulKhaliq/react-calculators',
    demo: 'https://mahabdulkhaliq.github.io/react-calculators/',
    image: './projects/react-calculators.png',
  },
]

// Shown at the top of the project list. Set to '' to hide it.
export const projectsNote = 'More to come...'
