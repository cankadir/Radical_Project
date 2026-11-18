# History

## 2026-11-18 — Located the public build / Pages source

- Asked where the public build lives. Answer: `radmap/radmap/dist/`, committed to git; no `docs/` or SvelteKit-style output.
- GitHub Pages is serving the **`Ar_Translation`** branch root, latest deploy run 2026-04-13 (`9a39644`), not `main`.
- Live app URL: https://cankadir.github.io/Radical_Project/radmap/radmap/dist/
- Found the deployed `Ar_Translation` build is broken: absolute `/assets/...` URLs resolve to `cankadir.github.io/assets/...` (404); no user-site repo exists.
- Created `opencode-docs/` with this context.

### 2026-11-18 — Decision: leave old deps alone

- `npm audit --package-lock-only`: 7 advisories, 6 high, 0 critical. Mostly dev-server (vite 4, esbuild) and build-time (postcss, nanoid, source-map-js); svelte 3 + rollup DOM-clobbering are output-side but need untrusted input. `lodash` clean.
- Decision: **do not upgrade.** Svelte 3 → 5 + Vite 4 → 7 would break the app for no benefit while unpublished. Dismiss alerts as "vulnerable code not reachable" instead. Never `npm audit fix --force`.
- Repo owner confirmed the DATA spreadsheets and deradImgs photos are **not sensitive** and were public during the site's life — no history rewrite needed.
- npm cache is a shared 3 GB `~/.npm/_cacache`; keeping it. Svelte 3/Vite 4 tarballs are not cached, so a rebuild pulls them from the registry.
