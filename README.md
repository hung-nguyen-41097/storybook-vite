# storybook-vite

A small Vite + React + Storybook starter used for component development and tests. It includes utility scripts to scaffold new components, a consolidated SCSS color system, and Storybook + Vitest integration for interaction tests.

This README covers how to set up the project, run Storybook, run tests, and use the component generator.

## Requirements

- Node.js 24+ (or your project's preferred Node version)
- Yarn or npm

## Install

Install dependencies:

```bash
yarn install
# or
npm install
```

## Useful scripts

- `yarn storybook` — run Storybook (Vite) locally at http://localhost:6006
- `yarn test` — run the project's tests (Vitest + Storybook integration)
- `yarn create-component <Name>` — run the project script to scaffold a new component under `src/stories/<Name>`

Examples:

```bash
yarn create-component MyWidget
```

The generator creates a component file, a SCSS file, a Storybook story, and an `index.ts` that re-exports the component. Templates live in `scripts/templates/` and the generator is `scripts/create_component.sh`.

## Project structure (high level)

- `src/` — source files and stories
  - `stories/` — UI components and Storybook stories
  - `styles/` — global SCSS, color tokens
- `scripts/` — helper scripts and templates (component generator)
- `.storybook/` — Storybook config
- `vite.config.ts` — Vite config including a test-time plugin (stubs styles when running Vitest)

## Styles & design tokens

This project centralizes colors and tokens in `src/styles/colors.scss`. We consolidated the palette into a limited set of tokens (20 base tokens) and provided legacy aliases so existing SCSS keeps working. SCSS files use the modern SASS module system via `@use "..." as *` to preserve existing variable names during migration.

If you plan to change tokens, prefer editing the base `$c-*` tokens at the top of `src/styles/colors.scss` and keep aliases for compatibility.

## Fonts

Fonts are expected in the `public/fonts/` folder so Storybook and Vite serve them at `/fonts/...`. If you see 404s for fonts (e.g. `Lato-Bold.woff2`), ensure the files exist at `public/fonts/lato/` or update `src/styles/commons.scss` `@font-face` paths to point to the actual locations.

## Tests

This repo uses Vitest with the Storybook testing integration. Tests for stories run in a browser provider (Playwright) and can execute Storybook interaction tests.

Key files:

- `vite.config.ts` — contains the `storybookTest` plugin setup for the test project
- `.storybook/vitest.setup.ts` — test setup helpers (imported by Vitest)

Note: during tests we stub CSS/SCSS imports to reduce noise and avoid SASS compilation errors. The Vite config contains a small test-only plugin that replaces style imports with an empty module when running under Vitest.

## Component generator

Use `yarn create-component ComponentName` to scaffold a new component under `src/stories/ComponentName`.

Options:

- `--no-scss` — do not create the SCSS file
- `--no-index` — do not create the `index.ts` re-export
- `--no-story` — do not create the story file

Templates are under `scripts/templates/` and the generator script is `scripts/create_component.sh`.

If you change templates, the script will render placeholders `{{NAME}}` and `{{kebab}}` with the PascalCase name and kebab-case name respectively.

## Recommended improvements / notes

- Consider moving to namespaced `@use 'colors' as colors;` and reference variables as `colors.$primary` for long-term clarity.
- Prefer using refs for chart/container libraries (amCharts, etc.) instead of hard-coded IDs to avoid collisions when multiple instances mount.
- Keep tests focused on behavior; mock heavy chart libraries (amCharts) in unit tests and run a limited set of integration tests in Storybook/Playwright.

## Contributing

1. Fork and create a branch for your change
2. Run `yarn install` and `yarn test` locally
3. Open a PR with a concise description and test coverage notes

## License

MIT — see LICENSE file

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
