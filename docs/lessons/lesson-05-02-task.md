# Lesson 05-02 Task: Inject the Service With `inject()`

## Feature to build

Inject `TopicStore` in `Dashboard` and render the greeting from the service.

## Starting point

`TopicStore` should exist with `@Injectable({ providedIn: 'root' })` and `getGreeting()`. The dashboard should still own the topic state and form from Module 04.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, add `inject` to the Angular import:

   ```ts
   import { Component, inject } from '@angular/core';
   ```

2. Import `TopicStore`:

   ```ts
   import { TopicStore } from '../topic-store';
   ```

3. Add the injected service field to `Dashboard`:

   ```ts
   protected readonly store = inject(TopicStore);
   ```

   Use `protected` because the template will read this field.

4. In `dashboard.html`, render the greeting near the top of the dashboard:

   ```html
   <p>{{ store.getGreeting() }}</p>
   ```

5. Leave topic state and form submission in `Dashboard`.

## Prediction

Before running the app, predict where the greeting will appear. Will the topic list or form behavior change?

## Verify

- The dashboard renders `Hello from TopicStore`.
- The topic list still renders.
- Toggling topics still works.
- Submitting the form still adds a topic.
- `TopicStore` still contains only `getGreeting()`.
- `Dashboard` does not call `new TopicStore()`.
- `Dashboard` still owns `topics`, `toggleTopic`, and the form submit handler.

## Reflection

- What token did `inject(TopicStore)` ask Angular for?
- Why does `Dashboard` not call `new TopicStore()`?
- How does this compare with constructor injection from Angular v15?
