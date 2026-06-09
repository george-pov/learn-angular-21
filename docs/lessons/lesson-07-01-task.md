# Lesson 07-01 Task: Defer a Panel on Interaction

## Feature to build

Add a `TopicNotes` panel on the details page and render it only after clicking `Open notes`.

## Files to create

- `src/app/topic-notes/topic-notes.ts`
- `src/app/topic-notes/topic-notes.html`
- `src/app/topic-notes/topic-notes.scss`

## Files to edit

- `src/app/topic-details/topic-details.ts`
- `src/app/topic-details/topic-details.html`

## Steps

1. Create `TopicNotes` as a standalone component with a required signal input:

   ```ts
   import { Component, input } from '@angular/core';

   @Component({
     selector: 'app-topic-notes',
     templateUrl: './topic-notes.html',
     styleUrl: './topic-notes.scss',
   })
   export class TopicNotes {
     readonly topicId = input.required<string>();
   }
   ```

2. Give the notes component a small template:

   ```html
   <aside>
     <h2>Topic notes</h2>
     <p>Deferred notes for topic {{ topicId() }} render only after interaction.</p>
   </aside>
   ```

3. Import `TopicNotes` in `TopicDetails` and add it to the component `imports`.

4. In `topic-details.html`, add the interaction trigger and deferred block:

   ```html
   <button #openNotes type="button">Open notes</button>

   @defer (on interaction(openNotes)) {
     <app-topic-notes [topicId]="id()" />
   }
   ```

## Prediction

Before running the app, predict what `/topics/1` shows before and after clicking `Open notes`.

## Verify

- `/topics/1` shows the topic id immediately.
- The notes panel is not visible before interaction.
- Clicking `Open notes` renders `Topic notes`.
- The notes panel displays the route id.
- The dashboard route still works.

## Reflection

- What work did `@defer` delay?
- Why did the trigger button need a template reference variable?
- How is this different from conditionally rendering the panel with `@if`?
