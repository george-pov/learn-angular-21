# Lesson 05-04 Task: Add Computed Derived State to the Service

## Feature to build

Move completed count, total count, progress label, and completion status into `TopicStore`.

## Starting point

`TopicStore` owns the writable `topicsSignal`, and `Dashboard` reads `store.topics()`. Any topic-derived computed values still live in `Dashboard`.

## Files to edit

- `src/app/topic-store.ts`
- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `topic-store.ts`, add `computed` to the Angular import:

   ```ts
   import { computed, Injectable, signal } from '@angular/core';
   ```

2. Add computed signals to `TopicStore`:

   ```ts
   readonly completedCount = computed(
     () => this.topicsSignal().filter((topic) => topic.done).length,
   );
   readonly totalCount = computed(() => this.topicsSignal().length);
   readonly progressLabel = computed(
     () => `${this.completedCount()} of ${this.totalCount()} topics complete`,
   );
   readonly allTopicsComplete = computed(
     () => this.totalCount() > 0 && this.completedCount() === this.totalCount(),
   );
   ```

3. In `dashboard.ts`, remove local computed values that derive from topics.

4. In `dashboard.html`, read the derived values from the store:

   ```html
   <p class="progress">{{ store.progressLabel() }}</p>

   @if (store.allTopicsComplete()) {
     <p>All topics complete.</p>
   } @else {
     <p>Keep going.</p>
   }
   ```

5. Leave the Signal Forms model and form tree in `Dashboard`.

6. Leave `TopicStore.addTopic()` and `TopicStore.toggleTopic()` unchanged. This lesson only moves derived state.

7. If `Dashboard` no longer uses `computed`, remove it from the Angular import.

## Prediction

Before running the app, predict what changes in the UI. Which class now knows how progress is calculated?

## Verify

- The progress label still starts at `1 of 3 topics complete`.
- Toggling topics updates the progress label.
- Adding a topic updates the total count.
- `Dashboard` no longer imports `computed`.
- `TopicStore` owns both source state and derived state.
- `Dashboard` no longer filters `topics` to calculate completed count.
- `TopicStore` does not use `effect()` yet.

## Reflection

- Why should `progressLabel` live beside `topicsSignal`?
- What makes `computed()` update when a topic changes?
- What responsibility remains in `Dashboard` after this move?
