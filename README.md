# Nalam Karthik — Portfolio

Static personal portfolio. No build step.

- `index.html` — interactive 3D project rack (WebGL; falls back to the recruiter view if WebGL is unavailable)
- `recruiter.html` — one-page recruiter view
- `projects.js` — single source of truth for project data, shared by both pages
- `resume.pdf` — resume

## Run locally.

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.
