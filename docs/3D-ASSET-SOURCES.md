# 3D asset sources — Darling MarTech

Self-hosted GLB files live under **`/public/models/`**. Optional textures live under **`/public/textures/`**. Load in R3F with `useGLTF("/models/your-file.glb")` from `@react-three/drei` (client components only; lazy-load).

## Current layout

- Add downloaded `.glb` files to `public/models/` and commit (watch file size; prefer Draco-compressed assets when available).
- Reference in code with absolute paths from the site root, e.g. `/models/circuit-board.glb`.

## Free and community libraries (verify license per asset)

### Poly Pizza

- **URL:** [https://poly.pizza](https://poly.pizza)
- **API (example):** `https://poly.pizza/api/models?filter=geometric`
- **Use for:** Low-poly geometry, abstract tech shapes.
- **License:** Varies by model — read each asset page before shipping.

### Kenney

- **URL:** [https://kenney.nl/assets](https://kenney.nl/assets)
- **Use for:** Modular kits, simple props, game-style tech blocks.
- **License:** Mostly **CC0** — still confirm on the pack download page.

### Three.js examples (reference GLBs)

- **URL:** [https://threejs.org/examples/models/gltf/](https://threejs.org/examples/models/gltf/)
- **Use for:** Learning layouts, lighting tests, non-production experiments.
- **License:** MIT (Three.js project) — confirm for each model if used in production.

### Spline community

- **URL:** [https://app.spline.design/community](https://app.spline.design/community)
- **Use for:** Animated scenes exported as `.splinecode` for `@splinetool/react-spline`.
- **License:** Per scene — many authors require attribution; read terms before publishing.

## Workflow

1. Pick a source and confirm **license + attribution** requirements.
2. Download `.glb` (or use a Spline-hosted scene URL).
3. Place under `public/models/` (or wire Spline by URL).
4. Load in a **client** component; keep SSR off for heavy viewers (`next/dynamic` with `ssr: false` when appropriate).
