# Lesson 01-03 Task: Increment the Counter With a Button

## Feature to build

A "Mark one complete" button that increments the counter on each click.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, add a method below the `completedCount` field:

   ```ts
   protected markOneComplete(): void {
     this.completedCount.update((current) => current + 1);
   }
   ```

2. In `app.html`, add a button below the counter:

   ```html
   <button type="button" (click)="markOneComplete()">Mark one complete</button>
   ```

Final `app.html`:

```html
<h1>Angular 21 Learning Tracker</h1>
<p>A tiny app for learning modern Angular 21 one concept at a time.</p>
<p>Topics completed: {{ completedCount() }}</p>
<button type="button" (click)="markOneComplete()">Mark one complete</button>
```

## Prediction

What will the counter show after three clicks? What would change if you used `.set(this.completedCount() + 1)` instead of `.update(c => c + 1)`?

## Verify

- The page shows the counter at `0`.
- Each click increments the counter.
- No console errors.

## Reflect

- Why does Angular re-render the `<p>` when `completedCount` changes, but not other paragraphs?
- What is the difference between `(click)="markOneComplete"` (no parens) and `(click)="markOneComplete()"`?
