# Lesson 05-04 Concept: Add Computed Derived State to the Service

## Goal

Move derived topic state into `TopicStore` so the service owns both the source signal and the computations based on it.

## The single new concept

Computed signals can live in services:

```ts
readonly completedCount = computed(
  () => this.topicsSignal().filter((topic) => topic.done).length,
);

readonly totalCount = computed(() => this.topicsSignal().length);

readonly progressLabel = computed(
  () => `${this.completedCount()} of ${this.totalCount()} topics complete`,
);
```

When `topicsSignal` changes, these computed values update automatically. Any component that reads them receives the new values.

## Prior knowledge assumed

- Lesson 01-04: `computed()` derives values from signals.
- Lesson 05-03: `TopicStore` owns `topicsSignal`.

## Why derived state belongs with source state

If `TopicStore` owns the topic list, it should also own facts about that list:

- completed count
- total count
- progress label
- whether all topics are complete

That keeps components simpler. `Dashboard` renders state and sends user actions to the store; it does not recalculate topic facts.

## Comparison callout

This is the same principle as colocating selectors with Redux state, computed getters with a Pinia store, or derived values inside a React context provider. Angular's `computed()` gives the store cached, dependency-tracked derived state without manually subscribing.
