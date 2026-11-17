# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally (confirmed by the owner, 2026-11-16):

- **Recruiters screening candidates.** They give the site about 30 seconds, often on a phone from a LinkedIn link, and decide whether to pass the candidate on. Their job: confirm this is a credible developer and find the resume or contact details.
- **Hiring managers and engineers.** They usually have the resume already and are checking depth: what was built, how the owner thinks, and whether the work holds up.

## Product Purpose

The personal portfolio of Mahmood Abdul-Khaliq, a full-stack software developer in Ontario, Canada. It exists to get him interviews: a visitor should leave knowing who he is and what he has built, and should be able to reach his resume, email, LinkedIn or GitHub without hunting. He is open to full-stack, back-end and front-end roles.

## Positioning

The person first, then the skills (confirmed). Personality and story lead: the About journey, the cats, lifting, the humour in the typed tagline and footer. The technical record backs it up: over four years building fleet software professionally at Geotab, starting as an intern and staying on as a full-time developer, plus personal projects.

## Operating Context

- Visitors arrive from LinkedIn, a resume link or GitHub, on phones and on desktops.
- The site is a single scrolling page that reads as one terminal session. Its sections, each reachable by URL hash, are Home, About me, Projects, Experience, Skills, Outside of work and Contact.
- The resume is a PDF at `public/resume.pdf`, generated from `resume/resume.html` by `resume/build.ps1`.
- The site is live at https://mahabdulkhaliq.github.io. Every push to `main` deploys it.

## Capabilities and Constraints

- React 19 and Vite 5, plain CSS, no router, no state library, no TypeScript, no extra UI libraries. This stack is binding (confirmed).
- Static hosting on GitHub Pages with relative asset paths (Vite `base` is `'./'`). Binding (confirmed).
- All text, links, jobs, skills, projects and interests live as data in `src/content/*.js`.
- An animations toggle follows `prefers-reduced-motion` until the visitor changes it.
- There are no tests and no linter; `npm run build` is the check.
- Decided in the redesign: the page scrolls as a whole, and the animations toggle sits on the prompt line pinned to the bottom of the screen.

## Brand Commitments

All confirmed as binding by the owner on 2026-11-16:

- **The terminal theme.** Prompts, commands as headings, monospace type, dark background. A redesign works inside this theme and does not replace it.
- **The typed tagline and the footer joke.** The rotating typed tagline on Home and the footer easter egg stay.
- **The personal content.** The About story, the Outside of work section, the cats and the photos stay.
- **Name spelling.** "Mahmood Abdul-Khaliq", hyphenated.

## Evidence on Hand

- Work history and skills: `src/content/experience.js`.
- Projects with screenshots: `src/content/projects.js` and `public/projects/` (Finance Toolkit, this website, Hamilton map, React Calculators, a tic-tac-toe and RPSLS game, among others).
- About text and taglines: `src/content/profile.js`. Education: `src/content/education.js`.
- Interests and photos: `src/content/interests.js` and `public/photos/`.
- Resume: `public/resume.pdf`.
- Not on hand, and not to be invented: testimonials, references, metrics beyond those already in the content files, employer logos, or press.

## Product Principles

1. **The person leads.** A visitor should meet Mahmood before they meet a skills list.
2. **Pass the 30-second screen and reward the deep read.** Neither audience is sacrificed for the other.
3. **The way out is always close.** Resume and contact details are reachable from wherever a visitor lands.
4. **Personality never blocks the task.** The jokes and animation are extras; the content works without them.
5. **Only true claims.** The site shows what was actually built and done.

## Accessibility & Inclusion

No formal standard has been set by the owner. Existing behaviour that future work should not regress: reduced motion is honoured by default, there is a skip link, and the colour tokens pass AA contrast for text. The owner's own experience includes WCAG 2.2 AA work, so visible accessibility failures on this site undercut his record.
