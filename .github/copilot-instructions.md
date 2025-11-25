# Copilot Instructions for AI Agents

## Project Overview
- **Framework:** React 19 + Vite (see `vite.config.js`)
- **Entry Point:** `src/main.jsx` renders `App` into `#root` in `index.html`.
- **App Structure:**
  - Main component: `src/App.jsx`
  - Styles: `src/App.css`, `src/index.css`
  - Static assets: `src/assets/`, `public/`

## Developer Workflows
- **Start Dev Server:** `npm run dev` (hot module reload enabled)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint, config in `eslint.config.js`)

## Patterns & Conventions
- **Component Files:** Use `.jsx` for React components.
- **Asset Imports:** Images (e.g., SVGs) are imported directly in components.
- **CSS:** Import CSS files at the top of each component as needed.
- **React StrictMode:** Enabled in `src/main.jsx` for highlighting potential problems.
- **No TypeScript:** This template is JavaScript-only. For TS, see Vite's React TS template.

## Integration & Dependencies
- **Vite Plugins:** Uses `@vitejs/plugin-react` for React Fast Refresh.
- **React 19:** Ensure compatibility with React 19 APIs.
- **No custom backend or API integration** in this template.

## Examples
- See `src/App.jsx` for component and asset import patterns.
- See `vite.config.js` for plugin setup.

## Notes
- This is a minimal template. Add new components in `src/` and import them in `App.jsx`.
- For advanced configuration, refer to Vite and React docs linked in `README.md`.
