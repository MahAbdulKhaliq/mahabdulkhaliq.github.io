# QA guide: one terminal session redesign

Verify the `redesign` branch against `docs/plan/DESIGN.md` and `PRODUCT.md`. Report every gap; do not fix anything.

## Setup

- Windows with Node; no Python and no jq. Use `node -e` for scripting.
- `npm run build` must pass (there are no tests and no linter).
- Baseline for comparison: commit `713cc1e` (`git diff 713cc1e -- src`).
- Rendered checks need a browser on the dev server (`npm run dev`). Without one, do the source checks and mark rendered checks "not run".

## Source checks

| # | Requirement | How to check |
|---|---|---|
| S1 | Build passes | `npm run build` exits 0 |
| S2 | No new colours | `git diff 713cc1e -- src` adds no hex, rgb or hsl colour; the six tokens in `base.css` are unchanged |
| S3 | No copy changes | `git diff 713cc1e -- src/content` is empty |
| S4 | No new dependencies | `git diff 713cc1e -- package.json` is empty |
| S5 | Seven sections in order | `src/tabs/index.js` lists home, about, projects, experience, skills, outside, contact with the commands in DESIGN.md |
| S6 | Tab machinery removed | no `CLOSE_MS`, `OPEN_MS`, `SWITCH_MS`, `data-phase` or `box-toggle` left in `src` |
| S7 | Typer and footer egg untouched | `git diff 713cc1e -- src/components/Typer src/components/Footer/FooterLine.jsx` shows no behaviour change |
| S8 | Motion off shows everything | the block component renders the full command and visible output when motion is off, with no dependence on IntersectionObserver |
| S9 | Reduced motion respected | `useMotion` still follows `prefers-reduced-motion` until the visitor toggles |
| S10 | Resume shortcut | the prompt bar links to `./resume.pdf` |
| S11 | Accessibility basics | skip link still present; each section has a heading with an accessible name; the prompt bar is a `nav` with a label; the toggle has `aria-pressed` |
| S12 | CLAUDE.md is current | the project `CLAUDE.md` describes the session structure and no longer describes tab phases or timing constants that do not exist |
| S13 | No banned effects | no scanline, glow or boot-sequence code; nothing requires keyboard typing to reach content |

## Rendered checks

| # | Requirement | How to check |
|---|---|---|
| R1 | One scrolling page | at 1280x800 the document scrolls; no inner scrollbars |
| R2 | First screen | on load at 1280x800 and 375x812 only the `whoami` output shows above the pinned bar, including the four links |
| R3 | Prompt line | stays fixed while scrolling; clicking a shortcut scrolls to its section and sets the hash; the current shortcut is highlighted |
| R4 | Hash on load | `/#experience` and `/#contact` land on those sections |
| R5 | Typed commands | animations on: a section types its command when first scrolled to, then shows output, and the page height does not change; animations off: everything visible at once |
| R6 | Experience log | dates in a left column at 1280x800; stacked at 375x812 |
| R7 | Projects | screenshots at least 320px wide at 1280x800 and linked to demos; search, sort and the no-match message work |
| R8 | Phone | at 375x812 the shortcuts are one swipe row; shortcuts and toggle have about 44px tap height; no sideways page overflow at 375 or 320 |
| R9 | End of page | scrolled to the bottom, the footer line is fully visible above the pinned bar |
| R10 | Typed tagline and footer egg | tagline types and erases; the footer line types an extra phrase after about 20 seconds |
| R11 | Keyboard | Tab reaches the skip link, the content links and the prompt bar; focus is always visible |

## Edge cases

- Toggle animations off while a command is mid-typing: the full command and output appear.
- Load with a hash for a section far down while animations are on: the target section is readable without scrolling up first.
- A missing project image: the text column still lays out.
- Browser zoom at 200% on desktop: the prompt bar does not cover the content being read.

## Results

| Check | Result (pass / fail / not run) | Evidence or notes |
|---|---|---|
| S1 | | |
| S2 | | |
| S3 | | |
| S4 | | |
| S5 | | |
| S6 | | |
| S7 | | |
| S8 | | |
| S9 | | |
| S10 | | |
| S11 | | |
| S12 | | |
| S13 | | |
| R1 | | |
| R2 | | |
| R3 | | |
| R4 | | |
| R5 | | |
| R6 | | |
| R7 | | |
| R8 | | |
| R9 | | |
| R10 | | |
| R11 | | |
| Edge cases | | |

## Revision 2 checks (these replace R1 to R5, R8 and R9 above)

Read "Revision 2" at the end of DESIGN.md first. S5 to S13, R6, R7, R10 and R11 still apply, reading "section" as "tab".

| Check | How | Expected |
|---|---|---|
| V1 One screen | Any tab at 1280x800 and 375x812 | The document does not scroll; host line, toggle, footer line and prompt line are all visible |
| V2 One tab at a time | Inspect the DOM | Exactly one `section.block` inside `main.window` |
| V3 Switching | Click each shortcut; use back and forward; load `/#skills` | Tab, hash, title and highlighted shortcut agree; focus moves to the tab |
| V4 Inner scroll | Open Projects | Output scrolls inside the window; the command line stays; square scrollbar thumb in a ruled track |
| V5 `<<` `>>` | 1280 wide, then 375 wide | None at 1280; both at 375, disabled at the end with nothing further; clicking scrolls the row; 44px tap areas |
| V6 Footer | Click the footer line with animations on | A joke types after the sentence, on every tab |
| V7 Typed command | Animations on, switch tab; then off | Command types, then output appears; off shows both at once; hidden output cannot be focused |
| V8 Narrow | 320x640 | No sideways overflow; toggle fully visible |
| V9 Leftovers | Search `src` | No IntersectionObserver, scrollspy, `scrollIntoView`, fixed prompt bar or `#home` min-height left from the one-page build |

## Revision 3 checks

S6 above no longer applies: `CLOSE_MS` and `OPEN_MS` are back, in `src/components/Section/Section.jsx`.

| Check | How | Expected |
|---|---|---|
| W1 Close and open | Animations on, 1280x800, switch from Projects to Contact and back | The box border moves steadily for the whole close (240ms) and open (360ms), on tall and short tabs; no fade |
| W2 Backspace | Same switch | The old command is erased before the swap; the new one types; then the box opens |
| W3 Animations off | Switch tabs; also turn animations off during a close | The new tab appears at once; nothing re-types |
| W4 Order | Any tab | Host line, box, prompt line, footer line from top to bottom |
| W5 Footer height | 375 wide, click the footer line six times | Footer height never changes |
| W6 Host line | Click `mahmood@portfolio:~` from any tab | Home opens; hash cleared |
| W7 Focus | Load `/`, Tab to a shortcut, Enter | Focus stays on the shortcut during the close and moves to the new output once it opens |
