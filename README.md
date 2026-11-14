# Portfolio website

Personal portfolio site built with React and Vite.
Visit it publically at https://mahabdulkhaliq.github.io/.

## Run it

```
npm install
npm run dev
```

## Edit content

All text, links and projects live in `src/content/`, one file per section. Search for `TODO` to find
the placeholders. To add the resume link, save your PDF as `public/resume.pdf`.

## Deploy

`npm run build` writes a static site to `dist/`. Any static host works:

- **Vercel or Netlify**: import the GitHub repo; build command `npm run build`, output `dist`.
- **GitHub Pages**: publish `dist/` with a Pages workflow. Asset paths are relative, so it
  works at `username.github.io/repo` without extra config.
