# Redesign: one terminal session (redesign branch)

Brief approved 2026-11-16. Product truth and binding commitments are in `PRODUCT.md`. The earlier typeset and layout pass (commit f483cc1) is finished; its type and spacing variables in `src/styles/base.css` carry over.

## Idea

The whole site is one scrolling transcript of a terminal session. Each section is a command followed by its output. A prompt line stays pinned to the bottom of the screen with the commands as clickable shortcuts.

## Sections, in order

| id | Command | Output format |
|---|---|---|
| `home` | `whoami` | fills the first screen: name, typed tagline, photo, greeting, four links |
| `about` | `cat about-me.md` | a document with the photo and `>` headings |
| `projects` | `ls projects/` | a listing; each project has a larger screenshot that links to its demo; search and sort stay |
| `experience` | `cat experience.log` | a log: dates in a left column on desktop, title and bullets beside them |
| `skills` | `cat skills.txt` | a two-column table |
| `outside` | `ls outside-of-work/` | photo cards |
| `contact` | `cat contact.txt` | the contact list |

The footer line with its easter egg is the last line of the session.

## Behaviour

- The page scrolls normally. The six tabs, the one-screen box with inner scrolling, the tab open and close animation, and the Experience/Skills toggle are removed.
- **Typed commands.** With animations on, a section's command types itself when the section first scrolls into view, then its output appears. With animations off (or reduced motion), every command and output is on the page from the start. Output keeps its space while hidden, so nothing moves.
- **Prompt line.** Fixed to the bottom: a `$` prompt, one shortcut per section, a `resume` shortcut to `resume.pdf`, and the animations toggle. The shortcut for the section on screen is shown inverted. Clicking a shortcut scrolls to that section and updates the URL hash.
- **Links.** `#about`, `#projects`, `#experience`, `#skills`, `#outside` and `#contact` scroll to their section on load. No hash or `#home` is the top.
- **Phone (720px and below).** The shortcuts are one row that swipes sideways with a fade on the right edge; every shortcut and the toggle has a 44px tap area. Home keeps the thumbnail portrait and two-column links from commit 57ba4ef, and the tagline still wraps.
- The browser tab title follows the section on screen (`mahmood@portfolio/about`).

## Constraints

- Terminal theme, JetBrains Mono only, the six colour tokens and no new colours.
- Typed tagline (Typer) and footer easter egg (FooterLine) keep working as they do now.
- No wording changes in `src/content`.
- React 19, Vite 5, plain CSS, no new dependencies.
- Not allowed: a boot sequence that delays content, anything that requires typing, CRT effects such as scanlines or glow.
- Nothing is pushed.

## Out of scope

Retaking `public/projects/portfolio.png` (it will show the old design), copy changes, and `resume.pdf`.
