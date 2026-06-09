# Lesson 01-05 Task: Show a Completion Message With `@if`

## Feature to build

Add a conditional message under the progress label that flips between "Keep going." and "All topics complete." based on the counter.

## Files to edit

- `src/app/app.html`

## Steps

1. In `app.html`, after the `<p>{{ progressLabel() }}</p>` line and before the button, add:

   ```html
   @if (completedCount() === totalTopics()) {
     <p>All topics complete.</p>
   } @else {
     <p>Keep going.</p>
   }
   ```

2. Open `app.ts` and change `totalTopics` from `private` to `protected` so the template can read it:

   ```ts
   protected readonly totalTopics = signal(4);
   ```

## Prediction

What message will show on first render? After exactly four clicks? After five clicks?

## Verify

- The page starts with "Keep going."
- After four clicks the message flips to "All topics complete."
- A fifth click leaves the message as "Keep going." (the equality fails again).
- No imports are needed for `@if`.

## Reflect

- Why does Angular re-evaluate the `@if` expression when `completedCount` changes?
- How would the same condition look with `*ngIf` in Angular v15?
- How does this compare with React's ternary in JSX?
