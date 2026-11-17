# QA guide: typeset and layout pass

Verify the work on the `design-pass` branch against `docs/plan/DESIGN.md`. Report every gap; do not fix anything.

## Setup

- Windows with Node; no Python and no jq. Use `node -e` for scripting.
- `npm run build` must pass (there are no tests and no linter).
- The baseline for comparison is commit `57ba4ef` (`git diff 57ba4ef -- src`).
- For rendered checks, a dev server may already be running at http://localhost:5174. If the browser tools are not available, do the source checks and mark rendered checks "not run".

## Source checks

| # | Requirement | How to check |
|---|---|---|
| S1 | Build passes | `npm run build` exits 0 |
| S2 | No new colours | `git diff 57ba4ef -- src` adds no hex, rgb or hsl colour; the six tokens in `base.css` are unchanged |
| S3 | Off-token bold colour removed | `#f4f7fa` does not appear in `src` |
| S4 | Type variables exist | `base.css` defines `--fs-small: 0.875rem`, `--fs-body: 1rem`, `--fs-title: 1.25rem`, `--measure: 70ch` |
| S5 | Old sizes gone | no `font-size: 0.85rem`, `0.9rem` or `1.05rem` in `src` |
| S6 | Spacing variables exist and are used | `base.css` defines `--space-1`, `-2`, `-3`, `-4`, `-6`, `-8`; component CSS references them |
| S7 | Page cap | `.page` has `max-width: 62rem` |
| S8 | No copy changes | `git diff 57ba4ef -- src/content` is empty |
| S9 | Phone rules kept | the `max-width: 720px` blocks added in 57ba4ef in `TopBar.css`, `Home.css`, `Typer.css` and `Contact.css` still exist with the same behaviour (swipe row, 44px hit areas, thumbnail portrait, wrapping tagline) |
| S10 | Typer and footer egg untouched | `git diff 57ba4ef -- src/components/Typer/Typer.jsx src/components/Footer` shows no behaviour change |
| S11 | Motion timings untouched | `CLOSE_MS` in `App.jsx` and `SWITCH_MS` in `ExperienceTab.jsx` still match the CSS durations (0.24s and 0.34s) |
| S12 | Toggle still in top bar | `TopBar.jsx` still renders the `.motion-toggle` button |

## Rendered checks

Check at 1280x800 unless stated.

| # | Requirement | How to check |
|---|---|---|
| R1 | Top bar is one row | `.bar` height under 56px; host, six tabs and toggle on one line |
| R2 | Home has no inner scrollbar | on Home, `.section-inner` `scrollHeight <= clientHeight` at 1280x800 and 1366x768 |
| R3 | Title role | a job title (`#experience`), a project name (`#projects`) and an About heading compute to `font-size: 20px` |
| R4 | Small role | dates, stack lists, top bar and footer compute to 14px |
| R5 | Line length | About paragraphs and Experience bullets are at most 70ch wide (width divided by 0.6 times the font size) |
| R6 | Experience dates | dates sit on the title row, right-aligned, at 1280x800; below the title at 375x812 |
| R7 | Title fade | on About, scroll down: no readable text beside the `$ cat about-me.md` title |
| R8 | Phone still holds | at 375x812: `.bar` about 48px tall; Home's four links visible without scrolling; nav links, toggle and contact links have about 44px hit height; LinkedIn address on one line |
| R9 | Typed tagline | with animations on, the tagline types and erases; at 375px a long phrase wraps to a second line without moving content below |
| R10 | Footer egg | with animations on, the footer line still types its extra phrase after about 20 seconds |
| R11 | Tab switching | every tab opens and closes without layout jumps, with animations on and off; the Experience and Skills toggles still work |

## Edge cases

- 1440x900 and 1024x768: no overlapping or clipped text; the bar may wrap below about 1010px wide, which is accepted.
- 320x640: nothing overflows sideways.
- A project search with no match (`rust`) still shows its message.
- Browser zoom at 200% on desktop: text stays readable and nothing overlaps.

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
