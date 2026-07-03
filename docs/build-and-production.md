# Build And Production Reference

This page is reference reading for the Angular 22 learning tracker. It is not a micro-lesson because it does not add a new visible app slice.

## Build command

Run:

```powershell
npm run build
```

The Angular builder compiles TypeScript, checks Angular templates, optimizes assets, and writes the production output under `dist/`.

## What changes in production

Production builds optimize and minify the browser bundle. Development serving keeps source maps and faster rebuild behavior.

## Lazy loading and deferrable views

Route-level `loadComponent` creates lazy chunks for routed pages. Template-level `@defer` can create a lazy chunk for a deferred dependency such as the topic notes panel. Both features are useful teaching examples because the app behavior stays the same while the loading boundary changes.
