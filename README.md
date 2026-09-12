# WealthWise — Hero Section

The hero experience for the WealthWise landing page: a session-based boot
sequence (loader → logo reveal) into a full-bleed, mouse-reactive hero.
Built for Code Fusion 2.0 by Team Apex Innovators.

Visual/interaction reference: [kprverse.com](https://kprverse.com).

## Stack

- **React 18 + Vite** — component-based UI, fast dev server
- **CSS Modules** — styles scoped per component, no global bleed
- **Plain JS hooks** — boot sequence and canvas logic isolated from render code

No UI framework/component library — the design is custom enough (canvas
network background, liquid logo morph) that a kit would fight us more than
help.

## Getting started

```bash
npm install
npm run dev       # starts the Vite dev server
npm run build      # production build to /dist
npm run preview    # serve the production build locally
```

## Structure

```
src/
  components/
    Hero/           Hero section: headline, canvas bg, reticle
    Loader/          Boot sequence loading screen
    LogoReveal/      Logo morph transition between loader and hero
    Nav/             Fixed top nav, tracks its own scroll state
    shared/
      LogoMark.jsx   WealthWise wordmark icon (SVG)
  hooks/
    useBootSequence.js    loading -> logo -> ready phase state
    useNetworkCanvas.js   animated node-network canvas background
  styles/
    tokens.css       CSS custom properties (color, type)
    tokens.js        Same values as JS constants, for canvas/SVG use
    global.css       Reset + base styles, imports tokens.css
  utils/
    color.js         hex -> rgba helper for canvas drawing
```

## Behavior notes

- The boot sequence plays in full on every load and every reload —
  it's not persisted, by design.
- `NetworkCanvas` and `Reticle` both respect `prefers-reduced-motion`.
- Colors/fonts live in **one place** (`styles/tokens.css` + `tokens.js`) —
  update there, not per-component.

## Not included yet

This is the hero only, scoped intentionally. Sections below the fold
(problem, solution, product preview, audience, market, CTA, footer) are a
separate piece of work — see project chat for the full section plan when
we're ready to build them out.
