# Rahul Ganatra Portfolio

Vanilla HTML, CSS and JavaScript portfolio for Rahul Jignesh Ganatra. No build step.

## Run locally

Serve this folder with any static HTTP server:

```bash
python -m http.server 5173
```

## Structure

```
PORTFOLIO-main/
├── index.html              # Page content & markup
├── css/
│   └── main.css            # Design system (tokens, components, sections, motion)
├── js/
│   ├── main.js             # Loader, hero canvas, cursor, scroll, project modal, skills terminal
│   └── visuals.js          # Animated SVG illustrations for each project card
├── assets/
│   ├── images/
│   │   └── rahul-photo.jpg # Profile photo
│   └── docs/
│       ├── resume.pdf      # Résumé (linked from hero + contact)
│       └── flutter-certificate.pdf
├── sitemap.xml
├── README.md
├── .gitignore
└── .gitattributes
```

Project content (titles, descriptions, links, accent colours) lives in the `projects` array at the top of `js/main.js`. Add a project there, then add a matching scene function in `js/visuals.js`.

All motion respects `prefers-reduced-motion`. The custom cursor only appears on devices with a mouse.
