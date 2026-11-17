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

## Revision 2 (2026-11-16): back to one window per tab

The owner reviewed the one-page build and asked for changes. Where this section disagrees with the text above, this section wins.

- The page is exactly one screen tall again. One tab shows at a time inside a bordered window; its command line stays at the top of the window and its output scrolls inside, with the terminal-style scrollbar from the original design.
- The host line (`mahmood@portfolio:~`) is always on screen at the top left, with the animations toggle at the top right.
- The prompt line stays at the bottom with the tab shortcuts and the resume link. When the row is too narrow, `<<` and `>>` buttons appear at its ends and move through the shortcuts.
- The footer line sits between the window and the prompt line and is always on screen, so its jokes are seen from every tab.
- With animations on, opening a tab types its command and then shows its output. With animations off the tab is complete at once.
- Kept from the first build: seven tabs with Skills on its own, Experience as a log, larger linked project screenshots, URL hash per tab, the tab title, focus moving to the tab after a switch.
- No longer applies: one scrolling page, scrollspy, `whoami` filling the first screen by a minimum height, sections typing on scroll.

## Revision 3 (2026-11-16): closing and opening box, footer last

Asked for by the owner after revision 2. This section wins where it disagrees with the text above.

- With animations on, a tab switch closes the box down to its command line, types the new command, then opens the box to the height the new output needs. The output no longer fades in. The box is as tall as its contents, up to the space available.
- The prompt line sits directly under the box and the footer line is the last line on screen.
- The footer is always as tall as its longest joke needs, so typing a joke never moves anything.
- The old command is backspaced away while the box closes, within the same 240ms, before the new one types. The whole switch takes as long as it did without the backspace.
- Clicking the host line opens the first tab.
