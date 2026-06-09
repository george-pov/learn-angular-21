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

## Mental model

If a signal is the source of truth, facts derived from that signal should usually live near it:

```text
topicsSignal -> completedCount
topicsSignal -> totalCount
completedCount + totalCount -> progressLabel
completedCount + totalCount -> allTopicsComplete
```

The service owns this graph. The component renders the graph.

## Why derived state belongs with source state

If `TopicStore` owns the topic list, it should also own facts about that list:

- completed count
- total count
- progress label
- whether all topics are complete

That keeps components simpler. `Dashboard` renders state and sends user actions to the store; it does not recalculate topic facts.

## What `computed()` tracks

A computed signal tracks the signals it reads while running:

```ts
readonly completedCount = computed(
  () => this.topicsSignal().filter((topic) => topic.done).length,
);
```

The read of `this.topicsSignal()` is the dependency. When `toggleTopic()` or `addTopic()` updates that signal, Angular marks `completedCount` stale and recalculates it when it is read again.

`progressLabel` reads other computed signals:

```ts
readonly progressLabel = computed(
  () => `${this.completedCount()} of ${this.totalCount()} topics complete`,
);
```

That is still a normal signal dependency chain.

## Why not hide calculations in rendering code

Avoid pushing list calculations into rendering code just to keep the service small. For example, do not add a dashboard helper whose only job is to recalculate the completed count for the template:

```ts
protected completedCountFromTemplate(): number {
  return this.store.topics().filter((topic) => topic.done).length;
}
```

That hides business meaning in the component and repeats logic if multiple components need the same fact.

The store computed signal gives the fact a name:

```html
{{ store.progressLabel() }}
```

It also keeps the calculation in Angular's signal graph instead of running an ad hoc method during rendering.

## A small tradeoff

`progressLabel` is a display string, so some teams would keep only numeric computed values in the store and build the final label in the component. This lesson keeps the label in the store to make the ownership shift visible and small.

The important rule is not "all labels belong in services." The important rule is "derived state should have one clear owner."

## What does not belong in `computed()`

Do not write to storage, log to the console, or update another signal inside `computed()`. Computed signals should return values. Lesson 05-09 introduces `effect()` for side effects.

## Reading dependency chains

When you read a computed declaration, ask two questions:

1. Which signal reads create the dependency?
2. What value does the computed return?

For `allTopicsComplete`, the dependencies are explicit:

```ts
readonly allTopicsComplete = computed(
  () => this.totalCount() > 0 && this.completedCount() === this.totalCount(),
);
```

It reads `totalCount()` and `completedCount()`. If either changes, the completion status can change.

## Comparison callout

This is the same principle as colocating selectors with Redux state, computed getters with a Pinia store, or derived values inside a React context provider. Angular's `computed()` gives the store cached, dependency-tracked derived state without manually subscribing.

## Vocabulary checkpoint

- **Source signal:** the signal that holds the underlying data.
- **Derived signal:** a readonly value calculated from other signals.
- **Dependency tracking:** Angular records signal reads during a computation.
- **Selector:** a common state-management name for a derived fact.
