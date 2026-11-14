// The name, Home tab text and About me text.

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
