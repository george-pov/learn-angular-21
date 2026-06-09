# Lesson 01-04 Task: Add a Derived Progress Label

## Feature to build

Replace the raw counter line with a derived progress label that reads `"X of Y topics complete"`.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, import `computed`:

   ```ts
   import { Component, computed, signal } from '@angular/core';
   ```

2. Add a `totalTopics` signal (private, since the template will not read it directly):

   ```ts
   private readonly totalTopics = signal(4);
   ```

3. Add the `progressLabel` computed:

   ```ts
   protected readonly progressLabel = computed(
     () => `${this.completedCount()} of ${this.totalTopics()} topics complete`,
   );
   ```

4. In `app.html`, replace the `<p>Topics completed: ...</p>` line with:

   ```html
   <p>{{ progressLabel() }}</p>
   ```

## Prediction

What will the label show on first render? After clicking "Mark one complete" three times? What happens if the counter exceeds `totalTopics`?

## Verify

- The label starts at `0 of 4 topics complete`.
- Each click of the button advances it: `1 of 4`, `2 of 4`, etc.
- `progressLabel` is never written to in your code.

## Reflect

- If you added a fifth signal that did not appear in `progressLabel`'s function body, would changing it re-run the computed?
- What is the relationship between `computed` and `useMemo`'s dependency array?
