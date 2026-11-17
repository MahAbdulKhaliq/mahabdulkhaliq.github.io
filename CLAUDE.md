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
- **One window, one tab at a time.** The page is exactly one screen tall (`100dvh`) and reads as a terminal window. `src/tabs/index.js` lists the tabs (`id` used as the URL hash, `label` for screen readers, `short` name for the prompt line, `command` shown as the heading, `Panel` component). `App.jsx` is only the shell: it reads the tab from the URL hash, renders that tab's `Panel` inside `main.window`, sets the browser title and moves focus to the tab after a switch. Each panel wraps its content in `<Section>`.
- **Fixed lines around the window.** `components/TopBar` (host line on the left, animations toggle on the right) sits above the window. `components/Footer` (the footer line with its typed jokes) and `components/PromptBar` (tab shortcuts and the resume link) sit below it. All three are always on screen. When the prompt row is too narrow for every shortcut it scrolls sideways, and `<<` / `>>` buttons appear to move through it.
- **Typed commands.** `components/Section` keeps the command line at the top of the window and scrolls the output under it in `.out-scroll`, which has the terminal-style scrollbar. With animations on, opening a tab types its command and then fades the output in; with animations off the tab is complete at once. `TYPE_MS` and `AFTER_TYPING_MS` in `Section.jsx` set the speed.
- **Animations toggle.** `hooks/useMotion.js` follows `prefers-reduced-motion` until the visitor clicks the toggle, then remembers the choice in localStorage. It sets `data-motion="on|off"` on `.page` and provides `MotionContext`. The typed commands, the typed tagline (`Typer`) and the footer easter egg (`FooterLine`) only animate when motion is on. With motion off, Home shows the main tagline, "full-stack developer".
- **Layout.** Page width is capped at `62rem` in `styles/base.css`. Only the output inside the window scrolls. Experience is laid out as a log (dates in a left column on wide screens) by `tabs/Experience/ExperienceTab.css`.
- **Images.** `components/Photo` shows the image, or a labelled dashed placeholder if the file is missing. Photos are in `public/photos/` and project screenshots in `public/projects/`. A project with `image: ''` gets no image area at all. Paths are relative (`./photos/...`) because Vite's `base` is `'./'`.

## CSS

Styles sit next to their components (`Foo/Foo.jsx` imports `./Foo.css`). `src/main.jsx` imports the global `styles/base.css` (tokens, reset, page layout) and `styles/shared.css` (classes several tabs use: `.row`, `.meta`, `.points`, `.prose`, `.cursor`, `.text-button`) before `App`. The rest of the CSS is bundled in module import order. So when two rules of equal specificity overlap, the stylesheet imported later wins. For example, `Projects.css` overrides `.photo`'s aspect ratio only because `Projects.jsx` imports `Photo` first. Keep this in mind when you move rules between files. Colours come from the custom properties in `base.css` (`--bg`, `--text`, `--dim`, `--rule`, `--green`, `--amber`). The phone breakpoint is `max-width: 720px`.

## Working in this repo

- Commit or push only when asked. The user often wants to review changes in the local preview first.
- Project screenshots were taken with headless Edge at a fixed window size, with `--force-prefers-reduced-motion` so the portfolio shows the static tagline:
  `msedge --headless=new --hide-scrollbars --window-size=1280,800 --force-device-scale-factor=1 --force-prefers-reduced-motion --virtual-time-budget=6000 --screenshot=<path>.png <url>`
- `photo-originals/` holds the full-size source photos and is git-ignored. Only the resized copies in `public/` are published.
