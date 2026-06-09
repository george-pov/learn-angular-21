# Lesson 01-01 Concept: Read a Standalone Component

## Goal

Read and understand the minimal `App` component that ships in this repository. No code changes to TypeScript yet — only the template and the app title.

## The single new concept

A **standalone Angular component** is a class decorated with `@Component`. The decorator tells Angular three things:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

- `selector` — the HTML tag the component matches. `<app-root>` in `index.html` is rendered as this component.
- `templateUrl` — the HTML file Angular renders for this component.
- `styleUrl` — the SCSS file scoped to this component.

The class is empty for now. Everything visible comes from the template file. There is no `@NgModule` and no `imports` array yet, because this component does not use anything from another component.

## Prior knowledge assumed

- You have run `npm start` at least once and seen the placeholder page in the browser.

## What you will edit

Only the template (`app.html`) and the app title text. No TypeScript code.

## Why this matters

Every later lesson edits `App` and its template. Knowing what each piece of `@Component` does is the foundation.
