# Radical_Project — project context

Data + mapping work for a Radicalization/De-radicalization research project.
Repo: https://github.com/cankadir/Radical_Project

## Layout

- `DATA/` — source spreadsheets, GeoJSON, world boundaries.
- `PY/` — Jupyter notebooks for data cleaning/joins/corrections (no Python package, no build).
- `radmap/radmap/` — single-page map app: **Vite + Svelte 3** (not SvelteKit). Entry `index.html` → `src/main.js`, Leaflet map.

## Deployment (decided, do not assume SvelteKit)

- Build output is Vite's `dist/`, and it is **committed to git** at `radmap/radmap/dist/` (81 files, ~14 MB, images included). There is no `public/` or `docs/` output convention here; `radmap/radmap/public/` is Vite's static-asset source folder, not the build.
- GitHub Pages deploys from the **`Ar_Translation` branch root** (confirmed via Pages deployment runs; asset hash `v=9a3964...` matches `Ar_Translation`). `main` is not the Pages source.
- The site root is Jekyll-rendered `README.md`; the app is served at `/Radical_Project/radmap/radmap/dist/`.
- Known breakage: `dist/index.html` on `Ar_Translation` uses absolute `/assets/...` paths, which 404 under the `/Radical_Project/` project-page prefix. `main`'s `dist/index.html` uses `./assets/...` and is correct. `vite.config.js` sets no `base`.

## Standing decisions

- Dependencies stay frozen at Svelte 3 / Vite 4. Dependabot alerts are dismissed as unreachable, not patched. `npm audit fix --force` is forbidden.
- Data in `DATA/` and `public/assets/images/deradImgs/` is public by design; no history rewrite needed.
- Project status: archived/inactive. Pages unpublished; `dist/` may be removed at will.

## Conventions

- No workflow files; Pages uses the built-in `pages-build-deployment` workflow, not Actions YAML.
- Rebuild with `npm run build` in `radmap/radmap`, then commit `dist/`.
