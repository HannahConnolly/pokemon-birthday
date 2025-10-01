# Pokémon Birthday

A small Vite + React + TypeScript app that maps a month/day to a Pokémon and shows that Pokémon's basic info from the public PokéAPI. It's year-agnostic: only the month and day matter.

This README contains quick start steps, deployment instructions (GitHub Pages), a component overview, and troubleshooting notes.

---

## Quick start

Requirements

- Node.js 18+ (or a modern LTS)
- npm (or yarn/pnpm)

Install & run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

Build and preview

```bash
npm run build
npm run preview
```

---

## Deploying to GitHub Pages

This project can be deployed either by publishing the `dist/` folder to a `gh-pages` branch or by building into a `docs/` folder and serving that from the `main` branch.

A — Deploy with `gh-pages` (current `package.json` script):

```bash
npm run build
npm run deploy
```

## License

This repository is licensed under the MIT License — see the `LICENSE` file for details.

---

If you'd like, I can also:

- add CI/deploy GitHub Actions to automate build + `gh-pages` deploy
- add tests for the ID computation and `PokemonCard` behavior
- add example screenshots to the README

Tell me which of those you'd like next and I can implement it.
