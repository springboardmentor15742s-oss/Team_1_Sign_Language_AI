# SignFlow AI — Prototype

## Setup
```
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173) — it opens on the index page with links to all screens.

## Structure
- `pages/` — each screen as a standalone HTML file (Tailwind CDN + Google Fonts, no build dependencies needed)
- `index.html` — landing page linking to all screens
- `vite.config.js` — configured as a Vite multi-page app so every page in `pages/` is bundled on `npm run build`
