# Lesson 02-02 Task: Render a List of Topics

## Feature to build

Replace the counter and `markOneComplete` button with a real array of topics. Render the titles in a list. Derive the progress label from the array.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, import the `Topic` type:

   ```ts
   import { Topic } from './topic';
   ```

2. Remove the `completedCount`, `totalTopics`, and `markOneComplete` declarations.

3. Add the topics signal:

   ```ts
   protected readonly topics = signal<Topic[]>([
     { id: 1, title: 'Standalone components', done: true },
     { id: 2, title: 'Signals', done: false },
     { id: 3, title: 'Template control flow', done: false },
   ]);
   ```

4. Replace `progressLabel` so it derives from the array:

   ```ts
   protected readonly progressLabel = computed(() => {
     const total = this.topics().length;
     const done = this.topics().filter((topic) => topic.done).length;
     return `${done} of ${total} topics complete`;
   });
   ```

5. Replace the `@if (completedCount() === totalTopics())` condition with a comparable test:

   ```html
   @if (topics().every((topic) => topic.done)) {
     <p>All topics complete.</p>
   } @else {
     <p>Keep going.</p>
   }
   ```

6. Remove the `<button>` line entirely.

7. Add the list:

   ```html
   <ul>
     @for (topic of topics(); track topic.id) {
       <li>{{ topic.title }}</li>
     }
   </ul>
   ```

The text input and echo from Lesson 01-06 stay where they are. The list goes above them, the completion message stays where it is.

## Prediction

What will the page render? What will the label say on first load?

## Verify

- The page lists three topics.
- The label reads `1 of 3 topics complete` (because the first topic is `done: true`).
- The "Keep going." / "All topics complete." message reflects the seed data.
- The button is gone.
- The text input still works.

## Reflect

- Why must `track topic.id` be there?
- What would change if you used `track $index` instead? Why is that fragile?
- How is `track` related to React's `key`?
