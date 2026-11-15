# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A terminal-styled personal portfolio: React 19 + Vite 5, plain CSS, no router, no state library, no TypeScript. It is live at https://mahabdulkhaliq.github.io, and **every push to `main` deploys it** through `.github/workflows/deploy.yml` (`npm ci`, `npm run build`, publish `dist/`). A push is a release.

## Commands

```bash
npm install
npm run dev        # dev server on http://localhost:5173 (start.bat does install + dev on Windows)
npm run build      # static build to dist/
npm run preview    # serve the production build
```

There is no linter and there are no tests. `npm run build` is the check that the code compiles.

`resume\build.ps1` regenerates `public/resume.pdf` from `resume/resume.html` using headless Chrome or Edge.

## Architecture

- **Content is data.** All text, links, jobs, skills, projects and interests live in `src/content/*.js`, one file per section. Components import the file they need directly (there is no barrel). Content edits normally touch only these files.
- **Tabs.** `src/tabs/index.js` is the list of tabs (`id`, `label`, `command` shown as the box heading, `Panel` component). `App.jsx` is only the shell: it reads the tab from the URL hash, runs the switch animation and renders the current tab's `Panel`. Each panel renders its own `<Section>` box, which is how the Experience tab can hold two stacked boxes (experience and skills) with toggle buttons.
- **Tab switching** goes through phases on `.view[data-phase]`: `closing` → swap → `opening` → `open`. The box collapses and expands by animating `grid-template-rows` between `1fr` and `0fr` on `.section-clip`. The JS timing constants must match the CSS durations:
  - `CLOSE_MS` in `App.jsx` ↔ `box-close` in `components/Section/Section.css`
  - `SWITCH_MS` in `tabs/Experience/ExperienceTab.jsx` ↔ the transitions in `ExperienceTab.css`
- **Animations toggle.** `hooks/useMotion.js` follows `prefers-reduced-motion` until the visitor clicks the toggle, then remembers the choice in localStorage. It sets `data-motion="on|off"` on `.page`; CSS uses that attribute to swap animations for a cross-fade. The typed tagline (`Typer`) and the footer easter egg (`FooterLine`) only animate when motion is on. With motion off, Home shows the main tagline, "full-stack developer".
- **Layout.** The page is exactly one screen tall (`100dvh`): the top bar and footer stay fixed in place and the tab's box scrolls inside `.section-inner`. Page width is capped at `58rem` in `styles/base.css`.
- **Images.** `components/Photo` shows the image, or a labelled dashed placeholder if the file is missing. Photos are in `public/photos/` and project screenshots in `public/projects/`. A project with `image: ''` gets no image area at all. Paths are relative (`./photos/...`) because Vite's `base` is `'./'`.

## CSS

Styles sit next to their components (`Foo/Foo.jsx` imports `./Foo.css`). `src/main.jsx` imports the global `styles/base.css` (tokens, reset, page layout) and `styles/shared.css` (classes several tabs use: `.row`, `.meta`, `.points`, `.prose`, `.cursor`, `.text-button`) before `App`. The rest of the CSS is bundled in module import order. So when two rules of equal specificity overlap, the stylesheet imported later wins. For example, `Projects.css` overrides `.photo`'s aspect ratio only because `Projects.jsx` imports `Photo` first. Keep this in mind when you move rules between files. Colours come from the custom properties in `base.css` (`--bg`, `--text`, `--dim`, `--rule`, `--green`, `--amber`). The phone breakpoint is `max-width: 720px`.

## Working in this repo

- Commit or push only when asked. The user often wants to review changes in the local preview first.
- Project screenshots were taken with headless Edge at a fixed window size, with `--force-prefers-reduced-motion` so the portfolio shows the static tagline:
  `msedge --headless=new --hide-scrollbars --window-size=1280,800 --force-device-scale-factor=1 --force-prefers-reduced-motion --virtual-time-budget=6000 --screenshot=<path>.png <url>`
- `photo-originals/` holds the full-size source photos and is git-ignored. Only the resized copies in `public/` are published.
