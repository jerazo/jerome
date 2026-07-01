# ESLint atomic component structure

This project enforces [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) folder placement with a custom ESLint plugin. Components must live under the correct folder (`atoms`, `molecules`, or `organisms`), file names must match the exported component name, and imports must reference the matching folder.

## Rule: `atomic-structure/atomic-component-path`

Provided by the local plugin [`eslint-plugin-atomic-structure`](../../eslint-plugin-atomic-structure/index.ts).

The rule reads component categories from [`src/config/atomic-structure.json`](../src/config/atomic-structure.json) and reports:

1. **Import path mismatch** — a mapped component is imported from the wrong atomic folder (for example, importing `Header` from `molecules` when it is an organism).
2. **Atomic barrel misuse** — non-atom components imported from `@/components/atomic` (the barrel is atoms-only).
3. **File placement mismatch** — a component file lives in the wrong folder for its mapped category.
4. **File name mismatch** — the file name does not match the primary exported component name.

Import path violations are **auto-fixable** with ESLint `--fix`.

## Configuration

[`src/config/atomic-structure.json`](../src/config/atomic-structure.json) defines:

| Field | Purpose |
| --- | --- |
| `categories` | Maps logical categories (`atom`, `molecule`, `organism`) to folder names |
| `components` | Maps each component name to its category |
| `exemptions.importPaths` | Import paths excluded from folder checks (for example `@/components/atomic`) |
| `exemptions.files` | Non-component files under atomic folders (for example `buttonStyles.ts`) |
| `exemptions.components` | Component names skipped by the rule |

### Adding a component

1. Create the file under the correct folder, named after the exported component (`Button.tsx` exports `Button`).
2. Add an entry to `components` in `atomic-structure.json`.
3. For atoms, re-export from `src/components/atomic/index.ts` when the component should be part of the public atom barrel.
4. Run `npm run lint`.

### Exemptions

Use exemptions sparingly. Prefer fixing placement or updating the mapping.

**Skip a component**

```json
{
  "exemptions": {
    "components": ["LegacyWidget"]
  }
}
```

**Allow a non-standard import path**

```json
{
  "exemptions": {
    "importPaths": ["@/components/atomic", "@/legacy/components"]
  }
}
```

**Ignore utility files in atomic folders**

```json
{
  "exemptions": {
    "files": ["buttonStyles.ts"]
  }
}
```

## Commands

```bash
# Check compliance
npm run lint

# Auto-fix import paths
npm run lint:fix

# Move misplaced component files, then auto-fix imports
npm run lint:atomic:fix
```

`lint:atomic:fix` runs [`src/scripts/eslint-fix-atomic.sh`](../src/scripts/eslint-fix-atomic.sh), which:

1. Reads `atomic-structure.json`
2. Moves `.tsx`/`.ts` component files into the folder that matches their mapped category
3. Runs `npm run lint:fix` to rewrite import paths

## CI

The CI workflow runs `npm run lint:fix` before `npm run lint` so import paths are normalized and the tree must pass with zero ESLint errors.

## Plugin layout

```text
eslint-plugin-atomic-structure/
  index.ts                          # plugin entry
  rules/atomic-component-path.ts    # rule implementation
  lib/utils.ts                      # config loading and path helpers
```

The plugin is linked as a local devDependency (`file:eslint-plugin-atomic-structure`) and enabled in [`eslint.config.js`](../../eslint.config.js) for `src/**/*.{ts,tsx}`.
