# Portfolio website

Personal portfolio site built with React and Vite.
Visit it publicly at https://mahabdulkhaliq.github.io/.

![The portfolio's front page: a terminal-styled Home tab with the name, the line "full-stack developer" and a short introduction](public/projects/portfolio.png)

## Run it

```
npm install
npm run dev
```

## Edit content

All text, links and projects live in `src/content/`, one file per section:

- `profile.js`: the name, the Home tab text and the About me text
- `links.js`: the link row on Home and the Contact tab
- `projects.js`, `experience.js` (jobs and skills), `education.js` and `interests.js`
- `footer.js`: the phrases the footer types

Photos go in `public/photos/` and project screenshots in `public/projects/`. The resume
is `public/resume.pdf`, built from `resume/resume.html` by running `resume\build.ps1`.

## Deploy

Every push to `main` deploys the site to GitHub Pages.
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `npm ci` and
`npm run build`, then publishes `dist/`. The repo's Pages source must be set to
**GitHub Actions** (Settings > Pages). A deploy can also be started by hand from the
Actions tab.

To check a production build locally, run `npm run build` and then `npm run preview`.
