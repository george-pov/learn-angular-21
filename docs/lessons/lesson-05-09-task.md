# Lesson 05-09 Task: Persist State With `effect`

## Feature to build

Persist `TopicStore` topics to `localStorage` and reload them on browser refresh.

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
       return JSON.parse(raw) as Topic[];
     } catch {
       return SEED_TOPICS;
     }
   }
   ```

6. Keep the existing `addTopic`, `toggleTopic`, and computed values unchanged.

## Prediction

Before running the app, predict what will happen after you add a topic, refresh the browser, and return to `/`.

## Verify

- Adding a topic still updates the list.
- Refreshing the browser keeps the added topic.
- Toggling a checkbox, refreshing, and returning to `/` keeps the checkbox state.
- Clearing the `learn-angular-21-topics` item from browser storage restores the seed topics on the next refresh.
- No HTTP code has been added. That starts in Module 06.

## Reflection

- Why is persistence an `effect()` instead of a `computed()`?
- Which signal read causes the effect to rerun?
- Why does `loadTopics()` fall back to `SEED_TOPICS` when parsing fails?

## End-of-module checkpoint

After this lesson the dashboard is backed by a root `TopicStore`. The store owns topic state, derived progress state, update methods, a configuration token, and local persistence. The app also demonstrates root providers, component providers, `useClass`, `useValue`, and `useFactory`. Module 06 will replace local-only data changes with HTTP calls.
