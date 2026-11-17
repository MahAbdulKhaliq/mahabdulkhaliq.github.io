# Typeset and layout pass (design-pass branch)

Approved 2026-11-16. A refinement of the existing terminal-styled portfolio, desktop first.

## Constraints

- Keep the terminal UI theme and JetBrains Mono as the only font family.
- Keep the six colour tokens in `src/styles/base.css` and add no new colours.
- Keep the typed tagline (Typer) and the footer easter egg (FooterLine) working as they do now.
- No wording changes anywhere, including the bold phrases in About.
- Do not undo the phone layout from commit 57ba4ef (one-row swipe nav, 44px tap targets, compact Home, wrapping tagline, contact rows).
- The animations toggle stays in the top bar.
- Nothing is pushed; `main` deploys the live site.

## Typography

Type sizes become variables in `base.css`:

| Variable | Value | Used for |
|---|---|---|
| `--fs-small` | 0.875rem | dates, stack lists, row links, top bar, footer, card text, project year |
| `--fs-body` | 1rem | body text, box commands, skill labels, card names, Home summary |
| `--fs-title` | 1.25rem | job titles, project names, About and Contact headings, Home greeting |

The Home name and the typed tagline keep their current sizes. On phones (720px and below) `--fs-title` is 1.125rem so a job title fits on one line; the Home greeting stays at 1.25rem there.

- Paragraphs and bullets are capped at `--measure` (70ch).
- Headings use `text-wrap: balance`; paragraphs and bullets use `text-wrap: pretty`. The typed lines (tagline, footer) are excluded so typing does not reflow.
- Bold text in About uses `var(--text)` at weight 700, replacing the hard-coded `#f4f7fa`.

## Layout

- The page cap goes from 58rem to 62rem and the nav gap tightens, so the desktop top bar (host, six tabs, toggle) fits on one row at 1280px wide.
- Home fits without an inner scrollbar at 1280x800 and 1366x768.
- Experience: each job's dates sit at the right end of its title line on desktop; on phones they stay stacked under the title.
- Spacing uses a six-step scale as variables: `--space-1` 0.25rem, `--space-2` 0.5rem, `--space-3` 0.75rem, `--space-4` 1rem, `--space-6` 1.5rem, `--space-8` 2rem. One-off values in desktop rules are snapped to the nearest step. Phone tap-target paddings from 57ba4ef are left alone.
- Outside of work keeps three cards per row on desktop (minimum card width raised to 14rem, since the wider page would otherwise fit four).
- The fade under each box title starts lower so scrolled text does not show beside the `$ command` title.

## Out of scope

Copy, colours, motion timings, the resume and proof items, keyboard focus fixes, and the short-box look of Contact and Skills.
