# Lesson 01-02 Task: Add a `completedCount` Signal

## Feature to build

Display a number on the page that comes from a signal. No interactivity yet — the displayed value is always `0`.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. Open `src/app/app.ts`. Import `signal` from `@angular/core`:

   ```ts
   import { Component, signal } from '@angular/core';
   ```

2. Add one field to the `App` class:

   ```ts
   protected readonly completedCount = signal(0);
   ```

3. Open `src/app/app.html`. Add a paragraph that renders the signal:

   ```html
   <p>Topics completed: {{ completedCount() }}</p>
   ```

Final `app.ts`:

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly completedCount = signal(0);
}
```

Final `app.html`:

```html
<h1>Angular 21 Learning Tracker</h1>
<p>A tiny app for learning modern Angular 21 one concept at a time.</p>
<p>Topics completed: {{ completedCount() }}</p>
```

## Prediction

What will the page show? What happens if you forget the parentheses and write `{{ completedCount }}` instead?

## Verify

- The page shows `Topics completed: 0`.
- The console shows no template errors.
- Try `{{ completedCount }}` for a moment to see what Angular renders, then restore the call form.

## Reflect

- Why does `protected` make the signal visible to the template?
- What does `readonly` protect against?
- How is reading `completedCount()` different from reading `count.value` in Vue or `count` in React?
