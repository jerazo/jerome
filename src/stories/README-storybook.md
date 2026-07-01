# Storybook — atomic components

Interactive documentation for atoms and molecules under `src/components/atoms` and `src/components/molecules`.

## Run locally

```bash
npm run storybook
```

Opens the dev server at [http://localhost:6006](http://localhost:6006).

## Build static site

```bash
npm run build-storybook
```

Output is written to `storybook-static/`.

## CI

The GitHub Actions workflow runs `npm run build-storybook` on every push and pull request. The build must complete without errors or warnings.

## Publish to GitHub Pages (optional)

To publish the static build to the `gh-pages` branch:

```bash
npm run build-storybook
npx gh-pages -d storybook-static
```

Configure your repository Pages source to the `gh-pages` branch if you want a hosted reference at `https://<user>.github.io/<repo>/`.
