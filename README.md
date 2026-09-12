# wasabules.github.io

Source of my portfolio — <https://geoffrey-lecoq.fr>

Served by GitHub Pages from this repository, on the custom domain declared in
`CNAME`. The `wasabules.github.io` address redirects there.

A static, dependency-free site: one HTML page, one stylesheet, one script.
Nothing to build, nothing to install; GitHub Pages serves the files as they are.

```
index.html          page structure
assets/style.css    design tokens, light & dark themes
assets/app.js       project data (EN/FR), i18n, theme + language toggles
.nojekyll           serve files verbatim, skip Jekyll processing
```

Content is bilingual (English / French): the language follows the browser on a
first visit, then whatever the visitor picks, and is kept in `localStorage`.
Star counts are fetched from the GitHub API at runtime — if the request fails,
the page simply renders without them.

## Local preview

```bash
python -m http.server 8000   # then open http://localhost:8000
```

## Editing

Projects live in `assets/app.js`, in `FEATURED`, `MORE` and `PRIVATE`. Each entry
carries its own `en` and `fr` text, so adding a project is one object — no
template to touch. Interface strings sit in the `I18N` table and are bound to the
HTML through `data-i18n` attributes.
