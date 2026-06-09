# Lesson 02-06 Task: Emit a Toggle Event From the List

## Feature to build

Re-enable the per-topic checkbox. `TopicsList` emits the clicked topic id; `App` handles the toggle.

## Files to edit

- `src/app/topics-list/topics-list.ts`
- `src/app/topics-list/topics-list.html`
- `src/app/app.html`

## Steps

1. In `topics-list.ts`, add the output and a handler method:

   ```ts
   import { Component, input, output } from '@angular/core';
   import { Topic } from '../topic';

   @Component({ /* unchanged */ })
   export class TopicsList {
     readonly topics = input.required<Topic[]>();
     readonly toggle = output<number>();

     protected onToggle(id: number): void {
       this.toggle.emit(id);
     }
   }
   ```

2. In `topics-list.html`, remove `disabled` and wire `(change)`:

   ```html
   <input
     type="checkbox"
     [checked]="topic.done"
     (change)="onToggle(topic.id)"
   />
   ```

3. In `app.html`, bind the output:

   ```html
   <app-topics-list
     [topics]="topics()"
     (toggle)="toggleTopic($event)"
   />
   ```

## Prediction

Click the second topic's checkbox. What changes? Who handles the click — `App` or `TopicsList`? Where does the state actually live?

## Verify

- All three checkboxes are interactive again.
- Toggling any topic updates the progress label and the completion message.
- `App.topics()` and the rendered list stay in sync.
- The text input from Module 01 still works.

## Reflect

- Why does the child re-emit the click rather than calling `App`'s `toggleTopic` directly?
- What value does `$event` hold in `(toggle)="toggleTopic($event)"`?
- How does this two-way pattern (data down via `input()`, events up via `output()`) compare with React callback props?
- What does Vue's `defineEmits` map to in Angular?

## End-of-module checkpoint

After this lesson the app shows: title, intro, progress label, completion message, interactive topic list (in its own component), text input, and live echo. State lives in `App`; `TopicsList` is purely presentational. Module 03 will introduce routing.
