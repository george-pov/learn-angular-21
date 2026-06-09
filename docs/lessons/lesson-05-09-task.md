# Lesson 05-09 Task: Persist State With `effect`

## Feature to build

Persist `TopicStore` topics to `localStorage` and reload them on browser refresh.

## Starting point

`TopicStore` owns the topic signal, derived state, update methods, and injected `STORAGE_KEY`. Persistence does not exist yet.

## Files to edit

- `src/app/topic-store.ts`

## Steps

1. In `topic-store.ts`, add `effect` to the Angular import:

   ```ts
   import { computed, effect, inject, Injectable, signal } from '@angular/core';
   ```

2. Make sure the injected storage key is declared before `topicsSignal`:

   ```ts
   readonly storageKey = inject(STORAGE_KEY);
   ```

   Field order matters here because `topicsSignal` will call `loadTopics()`, and `loadTopics()` reads `this.storageKey`.

3. Change the topic signal so it loads from storage:

   ```ts
   private readonly topicsSignal = signal<Topic[]>(this.loadTopics());
   ```

4. Add a constructor with an effect:

   ```ts
   constructor() {
     effect(() => {
       localStorage.setItem(
         this.storageKey,
         JSON.stringify(this.topicsSignal()),
       );
     });
   }
   ```

5. Add a private loader method:

   ```ts
   private loadTopics(): Topic[] {
     const raw = localStorage.getItem(this.storageKey);

     if (!raw) {
       return SEED_TOPICS;
     }

     try {
       const parsed: unknown = JSON.parse(raw);
       return Array.isArray(parsed) ? (parsed as Topic[]) : SEED_TOPICS;
     } catch {
       return SEED_TOPICS;
     }
   }
   ```

6. Keep the existing `addTopic`, `toggleTopic`, and computed values unchanged.

7. If `storageKey` was public only for the Lesson 05-07 diagnostic, you may keep it public for now or make it private and remove the diagnostic paragraph from the dashboard. The persistence behavior does not depend on rendering the key.

8. Do not add HTTP code. Module 06 owns API loading and saving.

## Prediction

Before running the app, predict what will happen after you add a topic, refresh the browser, and return to `/`.

## Verify

- Adding a topic still updates the list.
- Refreshing the browser keeps the added topic.
- Toggling a checkbox, refreshing, and returning to `/` keeps the checkbox state.
- Clearing the `learn-angular-21-topics` item from browser storage restores the seed topics on the next refresh.
- No HTTP code has been added. That starts in Module 06.
- Invalid JSON in that storage item falls back to the seed topics.
- Progress computed values still update from `topicsSignal`.

## Reflection

- Why is persistence an `effect()` instead of a `computed()`?
- Which signal read causes the effect to rerun?
- Why does `loadTopics()` fall back to `SEED_TOPICS` when parsing fails?

## End-of-module checkpoint

After this lesson the dashboard is backed by a root `TopicStore`. The store owns topic state, derived progress state, update methods, a configuration token, and local persistence. The app also demonstrates root providers, component providers, `useClass`, `useValue`, and `useFactory`. Module 06 will replace local-only data changes with HTTP calls.
