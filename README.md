# Rahul Ganatra Portfolio

Vanilla HTML, CSS and JavaScript portfolio for Rahul Jignesh Ganatra. No build step.

## Run locally

Serve this folder with any static HTTP server:

```bash
python -m http.server 5173
```

## Structure

- `index.html`: page content
- `css/main.css`: the whole design system (tokens, components, sections, motion)
- `js/visuals.js`: animated SVG illustrations for each featured project
- `js/main.js`: loader, hero particle network, cursor, reveals, project showcase, skills, modal

Project content (titles, descriptions, links, accent colours) lives in the `projects` array at the top of `js/main.js`. Add a project there, then add a matching scene function in `js/visuals.js`.

All motion respects `prefers-reduced-motion`. The custom cursor only appears on devices with a mouse.
