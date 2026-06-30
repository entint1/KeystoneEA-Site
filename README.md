# Keystone EA™ — Standard Reference Site

A static reference site documenting the **Keystone EA™** enterprise architecture standard in detail.

🔗 **Live site:** https://entint1.github.io/KeystoneEA-Site/

## What's documented

The standard has three pillars, each with its own page:

| Page | Covers |
|------|--------|
| **Overview** (`index.html`) | What Keystone EA is, the seven-layer model, design principles |
| **Metamodel** (`metamodel.html`) | All 19 object types across 7 layers, the 6 relationship types, and the complete interactive relationship **rules matrix** |
| **Viewpoints** (`viewpoints.html`) | The 6 curated viewpoints (+ master view) and the viewpoint × object-type coverage matrix |
| **Methodology** (`methodology.html`) | The 5-phase implementation methodology across the Content and Architecture Readiness tracks |

## At a glance

- **7** architecture layers — Supporting, Governance, Strategy, Business, Data, Application, Technology
- **19** object types
- **6** relationship types — Composition, Connection, CRUD, Realization, Flow, Supporting
- **6** viewpoints + a master view
- **5** methodology phases — Establish → Structure → Activate → Optimize → Transform
- **2** delivery tracks running in parallel

## Structure

```
.
├── index.html            # Overview
├── metamodel.html        # Object types, relationships, rules matrix
├── viewpoints.html       # Viewpoints + coverage matrix
├── methodology.html      # 5-phase methodology explorer
├── assets/
│   ├── styles.css        # Design system (light + dark)
│   ├── data.js           # Canonical content model (single source of truth)
│   ├── rules.js          # Relationship rules matrix data
│   ├── app.js            # Shared behaviour (theme, nav, reveal, glyphs)
│   ├── metamodel.js      # Metamodel page rendering
│   ├── viewpoints.js     # Viewpoints page rendering
│   └── methodology.js    # Methodology page rendering
└── .nojekyll             # Serve files verbatim on GitHub Pages
```

## Running locally

It's a static site — no build step. Either open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Hosting

Published with **GitHub Pages** from the `main` branch (root). The site is fully self-contained — the only external dependency is Google Fonts (DM Sans / DM Mono).

---

*Built to document the Keystone EA™ standard.*
