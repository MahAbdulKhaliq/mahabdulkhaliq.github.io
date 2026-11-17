# Checklist: one terminal session redesign

Build from this list. Tick an item only when its "Done when" has been checked. Commit after each phase.

## Phase 1: session shell

- [x] Every section on one scrolling page, in order, with `skills` as its own section. Files: `src/App.jsx`, `src/tabs/index.js`, `src/tabs/Experience/*`, `src/components/Section/*`, `src/styles/base.css`.
  **Done when:** `npm run build` passes; the page has seven `section` elements with ids home, about, projects, experience, skills, outside, contact in that order; the document scrolls and no element has an inner scrollbar.
- [x] Pinned prompt line with shortcuts, resume link and animations toggle. Files: `src/components/PromptBar/*` (new), `src/components/TopBar/*`.
  **Done when:** the bar stays at the bottom while scrolling; clicking `projects` scrolls that section to the top and the URL ends in `#projects`; the shortcut for the section on screen has `aria-current`; `resume` points at `./resume.pdf`.
- [x] Hash links and title. Files: `src/App.jsx`.
  **Done when:** loading `/#experience` lands on that section; the tab title reads `mahmood@portfolio/experience` there.
- [x] Footer line is the last line of the page. Files: `src/components/Footer/*`.
  **Done when:** it sits after Contact and clears the pinned bar when scrolled to the end.

## Phase 2: typed commands

- [x] Commands type on first view, output follows. Files: `src/components/Section/*`, `src/hooks/useMotion.js`.
  **Done when:** with animations on, a section below the fold shows an empty prompt until scrolled to, then types its command and shows its output; with animations off, all seven commands and outputs are visible immediately; toggling animations off mid-way reveals everything; page height does not change as sections reveal.

## Phase 3: output formats

- [x] `whoami` fills the first screen. Files: `src/tabs/Home/*`.
  **Done when:** at 1280x800 and 375x812 the next command line is not visible above the pinned bar on load, and the four links are.
- [x] Experience as a log. Files: `src/tabs/Experience/*`.
  **Done when:** at 1280x800 each job's dates sit in a left column beside its title and bullets; at 375x812 they stack.
- [x] Projects with larger linked screenshots. Files: `src/tabs/Projects/*`.
  **Done when:** at 1280x800 screenshots are at least 320px wide and each one with a demo is a link to it; search and sort still work, including a no-match search.

## Phase 4: verify and document

- [ ] Sizes. **Done when:** every section is checked at 1280x800, 1440x900, 375x812 and 320x640 with no sideways overflow, no text under the pinned bar at the end of the page, and 44px tap areas on phone shortcuts.
- [ ] Typed tagline and footer egg still work with animations on.
- [ ] Project `CLAUDE.md` architecture section matches the new structure.
- [ ] Independent QA against `docs/plan/QA.md`. **Done when:** the qa-reviewer report has no open gaps, or each gap is fixed and rechecked.
