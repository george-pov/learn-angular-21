# Lesson 02-04 Task: Extract a `TopicsList` Component

## Feature to build

A new `TopicsList` standalone component that renders the topic list. The visible UI does not change. State and toggling stay in `App` for now; the list temporarily owns its own copy of the data.

## Files to create

- `src/app/topics-list/topics-list.ts`
- `src/app/topics-list/topics-list.html`
- `src/app/topics-list/topics-list.scss`

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. Create `src/app/topics-list/topics-list.scss` empty.

2. Create `src/app/topics-list/topics-list.html`:

   ```html
   <ul>
     @for (topic of topics; track topic.id) {
       <li>
         <label>
           <input type="checkbox" [checked]="topic.done" disabled />
           {{ topic.title }}
         </label>
       </li>
     }
   </ul>
   ```

   Note the missing `()` after `topics` — for this lesson the child holds the array as a plain field (no signal yet) and the checkbox is `disabled`. Both come back to life in Lessons 02-05 and 02-06.

3. Create `src/app/topics-list/topics-list.ts`:

   ```ts
   import { Component } from '@angular/core';
   import { Topic } from '../topic';

   @Component({
     selector: 'app-topics-list',
     templateUrl: './topics-list.html',
     styleUrl: './topics-list.scss',
   })
   export class TopicsList {
     protected readonly topics: Topic[] = [
       { id: 1, title: 'Standalone components', done: true },
       { id: 2, title: 'Signals', done: false },
       { id: 3, title: 'Template control flow', done: false },
     ];
   }
   ```

4. In `app.ts`, import and register `TopicsList`:

   ```ts
   import { TopicsList } from './topics-list/topics-list';

   @Component({
     selector: 'app-root',
     templateUrl: './app.html',
     styleUrl: './app.scss',
     imports: [TopicsList],
   })
   ```

5. In `app.html`, remove the `<ul>...@for...</ul>` block from `App`. Replace it with:

   ```html
   <app-topics-list />
   ```

`App` still owns the `topics` signal, the `progressLabel` computed, and the `toggleTopic` method. They will be reconnected in 02-05 and 02-06. For this lesson the dashboard's progress label reads from `App.topics()` (its own copy), and the visible list comes from `TopicsList.topics` (its hardcoded copy). They happen to match because both arrays start identical.

## Prediction

What will the UI look like? Why is the checkbox disabled?

## Verify

- The page shows the same three topics.
- Each checkbox is grayed out (disabled).
- The progress label still works as before.
- No console errors.

## Reflect

- Why does `App` need `imports: [TopicsList]` to use `<app-topics-list />`?
- Why are the checkboxes intentionally disabled in this lesson?
- What would a React developer recognize as the equivalent of this step?
