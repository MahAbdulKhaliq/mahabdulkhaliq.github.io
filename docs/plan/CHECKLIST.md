# Checklist: typeset and layout pass

Build from this list. Tick an item only when its "Done when" has been checked.

## Phase 1: tokens and page width

- [x] Add `--fs-*`, `--space-*` and `--measure` variables; page cap 62rem. Files: `src/styles/base.css`.
  **Done when:** `npm run build` passes and the variables resolve in the browser (`getComputedStyle(document.documentElement).getPropertyValue('--fs-title')` returns `1.25rem`).

## Phase 2: typography

- [x] Apply the three size roles. Files: `shared.css`, `Home.css`, `TopBar.css`, `Footer.css`, `Outside.css`, `Projects.css`, `Contact.css`.
  **Done when:** at 1280x800 a job title, a project name and an About heading compute to 20px; dates, stack lists, top bar and footer compute to 14px; no `font-size: 0.85rem`, `0.9rem` or `1.05rem` remains in `src`.
- [x] Cap line length and set wrapping. Files: `shared.css`, `base.css`.
  **Done when:** About paragraphs and Experience bullets measure 70ch or less at 1280x800, and the typed tagline and footer line do not use `text-wrap: pretty`.
- [x] About bold uses the token. Files: `About.css`.
  **Done when:** `#f4f7fa` no longer appears in `src`.

## Phase 3: layout

- [x] Top bar on one row. Files: `TopBar.css`, `base.css`.
  **Done when:** at 1280x800 the `.bar` is under 56px tall and the host, six tabs and toggle share one line.
- [x] Home without a scrollbar. Files: `Home.css`.
  **Done when:** on Home, `.section-inner` has `scrollHeight <= clientHeight` at 1280x800 and at 1366x768.
- [x] Experience dates on the title line. Files: `Experience.jsx`, `ExperienceTab.css`.
  **Done when:** at 1280x800 each job's dates share a baseline row with its title, right-aligned; at 375x812 they sit below the title.
- [x] Snap spacing to the scale and lower the title fade. Files: all component CSS, `Section.css`.
  **Done when:** desktop rules in `src` use `var(--space-*)` for the snapped values, and on About scrolled text is fully faded where it passes the box title.

## Phase 4: verify

- [x] Build and visual check.
  **Done when:** `npm run build` passes; every tab is checked at 1280x800, 1366x768, 1440x900 and 375x812; the phone checks from 57ba4ef still hold (bar about 48px, Home links on the first screen at 375x812, tap targets about 44px); the in-browser detector no longer reports a flat type hierarchy on About, Experience, Projects and Contact.
  Note: the detector was rerun on About and Experience only (both clean); Projects and Contact were not rerun. 1440x900 was checked on Home only. Phone titles use 1.125rem (see DESIGN.md).
- [ ] Independent QA against `docs/plan/QA.md`.
  **Done when:** the qa-reviewer report has no open gaps, or each gap is fixed and rechecked.
