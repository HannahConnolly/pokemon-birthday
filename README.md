# Pokémon Birthday

A small Vite + React + TypeScript app that maps a month/day to a Pokémon and shows that Pokémon's basic info from the public PokéAPI. It's year-agnostic: only the month and day matter.

This README explains how to run and develop the project, how the main components work, and common troubleshooting steps.

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

## What this project contains

- `index.html` — Vite entry file
- `src/main.tsx` — React bootstrap
- `src/App.tsx` — Page layout and two main sections (DatePicker + PokemonCard)
- `src/components/DatePicker.tsx` — Date picker UI (uses react-day-picker)
- `src/components/PokemonCard.tsx` — Fetches Pokémon data and renders it
- `src/index.css`, `src/App.css` — global CSS and Tailwind directives
- `vite.config.ts`, `package.json` — project configuration and scripts

---

## How it works (core logic)

1. The user picks a date (month and day) in the `DatePicker` component.
2. The app computes a numeric ID from the month and day using the formula:

	 rawId = month * 100 + day

	 Example: January 1 => 1*100 + 1 = 101.

3. If `rawId` is greater than the configured maximum Pokémon ID, the app marks a "rollover" and wraps the ID into the valid range before calling the PokéAPI.

4. `PokemonCard` requests `https://pokeapi.co/api/v2/pokemon/{id}` and displays name, sprite, types, height and weight.

Notes:
- The project currently uses a `MAX_POKEMON_ID` constant in `src/components/PokemonCard.tsx` (set to 1025). Change this constant if you want a different cap or to match future PokéAPI expansions.
- When a rollover occurs, the UI shows a visible message to explain the wrap.

---

## Components & Props (quick reference)

- DatePicker (`src/components/DatePicker.tsx`)
	- Props:
		- `selectedDate: Date | undefined`
		- `onDateChange: (date: Date | undefined) => void`
	- Behavior: uses `react-day-picker` with `mode="single"`. It passes the selected date (or `undefined`) back through `onDateChange`.

- PokemonCard (`src/components/PokemonCard.tsx`)
	- Props:
		- `selectedDate: Date | undefined`
	- Behavior: computes an ID from `selectedDate`, optionally detects rollover, fetches from PokéAPI, and renders a short card with the Pokémon's info. Shows loading and error states.

---

## Styling / Tailwind

- This project uses Tailwind utility classes inside component JSX and includes Tailwind via `@import "tailwindcss"` in `src/App.css`.
- Vite is configured with a Tailwind plugin in `vite.config.ts`. If Tailwind utilities don't appear, try restarting the dev server.

If you want the card to be full-bleed (edge-to-edge), remove or adjust the `max-width` set on `#root` in `src/App.css` (it currently has `max-width: 1280px;`).

---

## Layout & responsive behavior

- The app uses Tailwind responsive classes. By default the main content container centers vertically/horizontally and the DatePicker + PokemonCard stack on mobile and sit side-by-side on medium+ screens.
- To change breakpoints: edit the responsive prefixes (`sm:`, `md:`, `lg:`) in `src/App.tsx`.

---

## Troubleshooting

- Content not centered:
	- Check `src/index.css` and `src/App.tsx` wrapper classes. We use `min-h-screen flex items-center justify-center` to center content vertically and horizontally.
	- Browser caching can hide CSS updates; try a hard reload.

- DatePicker doesn't update or returns `undefined`:
	- `onDateChange` receives `undefined` when the selection is cleared. Ensure the parent accepts `Date | undefined` and handles that case.

- TypeScript errors when passing `setSelectedDate`:
	- The DatePicker expects `(date: Date | undefined) => void`. Passing `setSelectedDate` directly works if your state was declared `useState<Date | undefined>`, but wrapping is safer: `onDateChange={(d) => setSelectedDate(d)}`.

- API errors / CORS:
	- The app uses the public PokéAPI. If fetches fail check network, or API status at https://pokeapi.co.

---

## Development tips

- Add a `components/index.ts` barrel file to simplify imports if you add more components.
- Add tests for `computeId` and the `PokemonCard` fetch behavior. A simple unit test can assert rawId generation and rollover logic.
- Consider caching API results if the same date is frequently requested.

---

If you'd like, I can:
- add a CONTRIBUTING.md with lint/format rules,
- add tests and a simple test runner setup, or
- add a short dev checklist (pre-commit hooks, lint, test commands).

If you want any of those, tell me which and I'll add them.

---

Happy building! ⚡

