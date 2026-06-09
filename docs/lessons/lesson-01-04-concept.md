# Lesson 01-04 Concept: Derive State With `computed`

## Goal

Show a progress label like `"2 of 4 topics complete"`. The label is **derived** from two signals — never stored, never updated by hand.

## The single new concept

`computed()` creates a signal whose value is the result of a function:

```ts
import { Component, computed, signal } from '@angular/core';

export class App {
  protected readonly completedCount = signal(0);
  private readonly totalTopics = signal(4);

  protected readonly progressLabel = computed(
    () => `${this.completedCount()} of ${this.totalTopics()} topics complete`,
  );
}
```

Read it the same way as any other signal: `progressLabel()`.

The function passed to `computed` is run **only when one of the signals it reads has changed**, and **only when something asks for the value**. Angular detects the dependencies automatically by watching which signals get called inside the function.

## Prior knowledge assumed

- Lesson 01-02: signals as state.
- Lesson 01-03: updating signals.

## The mental model

- Source signals: `completedCount`, `totalTopics`. You write to these.
- Derived signal: `progressLabel`. You **never** write to it. It always reflects the current source values.

If you ever feel like manually keeping a derived value in sync, that is a sign it should be a `computed`.

## Comparison callout

`computed()` is React's `useMemo` with no dependency array — dependencies are tracked automatically, so they can never go out of sync with the function body. Vue's `computed()` works the same way.
