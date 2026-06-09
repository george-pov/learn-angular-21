# Lesson 05-03 Task: Move a Signal Into the Service

## Feature to build

Move `topics`, `toggleTopic`, and topic appending from `Dashboard` into `TopicStore`.

## Files to edit

- `src/app/topic-store.ts`
- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `topic-store.ts`, import `signal` and `Topic`:

   ```ts
   import { Injectable, signal } from '@angular/core';
   import { Topic } from './topic';
   ```

2. Add seed topics above the class:

   ```ts
   const SEED_TOPICS: Topic[] = [
     {
       id: 1,
       title: 'Standalone components',
       description: 'Understand component metadata and standalone imports.',
       done: true,
     },
     {
       id: 2,
       title: 'Signals',
       description: 'Use signals for local reactive state.',
       done: false,
     },
     {
       id: 3,
       title: 'Template control flow',
       description: 'Render branches and lists with modern template syntax.',
       done: false,
     },
   ];
   ```

3. Replace the `TopicStore` body with state and methods:

   ```ts
   @Injectable({ providedIn: 'root' })
   export class TopicStore {
     private readonly topicsSignal = signal<Topic[]>(SEED_TOPICS);

     readonly topics = this.topicsSignal.asReadonly();

     getGreeting(): string {
       return 'Hello from TopicStore';
     }

     toggleTopic(id: number): void {
       this.topicsSignal.update((current) =>
         current.map((topic) =>
           topic.id === id ? { ...topic, done: !topic.done } : topic,
         ),
       );
     }

     addTopic(title: string, description: string): void {
       this.topicsSignal.update((current) => [
         ...current,
         {
           id: Math.max(0, ...current.map((topic) => topic.id)) + 1,
           title,
           description,
           done: false,
         },
       ]);
     }
   }
   ```

4. In `dashboard.ts`, remove the local `topics` signal and `toggleTopic` method.

5. Update `Dashboard.addTopic()` so it delegates to the store:

   ```ts
   const value = this.topicForm.getRawValue();
   this.store.addTopic(value.title, value.description);
   this.topicForm.reset({ title: '', description: '' });
   ```

6. Keep any dashboard `computed` values for now, but make them read from `this.store.topics()` instead of `this.topics()`. They move into the store in Lesson 05-04.

7. In `dashboard.html`, update bindings:

   ```html
   <app-topics-list
     [topics]="store.topics()"
     (toggle)="store.toggleTopic($event)"
   />
   ```

## Prediction

Before running the app, predict whether the visible UI changes. Which class now owns the topic array?

## Verify

- The same three seed topics render.
- Toggling a checkbox still updates the row.
- Submitting the form still adds a new topic.
- `Dashboard` no longer declares a `topics` signal.
- `TopicStore` exposes `readonly topics = this.topicsSignal.asReadonly()`.

## Reflection

- Why expose a readonly signal instead of the writable signal?
- Why should `toggleTopic` live beside the signal it mutates?
- How is this similar to moving state into a React context or Vue store?
