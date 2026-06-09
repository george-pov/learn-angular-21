# Lesson 01-01 Task: Personalize the App Title

## Feature to build

Update the placeholder page so it shows a real tracker title plus one sentence of intro copy. No new TypeScript.

## Files to edit

- `src/app/app.html`

## Steps

1. Open `src/app/app.html`.
2. Confirm the current content is a single `<h1>Angular 21 Learning Tracker</h1>`.
3. Add a paragraph below the heading: `<p>A tiny app for learning modern Angular 21 one concept at a time.</p>`.

Final template:

```html
<h1>Angular 21 Learning Tracker</h1>
<p>A tiny app for learning modern Angular 21 one concept at a time.</p>
```

## Prediction

Before running the app: what will appear on screen? What part of the change is HTML the browser renders directly, and what part is Angular's responsibility?

## Verify

- The browser shows the heading and the new paragraph.
- No errors appear in the dev server output.
- `npm run build` still succeeds.

## Reflect

- What would happen if you removed `selector: 'app-root'` from `app.ts`? (Hint: look at `src/index.html`.)
- In Angular v15, where would you typically declare this component? In Angular v21, why is no module needed?
