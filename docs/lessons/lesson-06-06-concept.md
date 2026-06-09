# Lesson 06-06 Concept: Bridge an Observable to a Signal With `toSignal`

## Goal

Expose one HTTP observable as a signal so the dashboard can read it like other signal-backed store state.

## The single new concept

`toSignal()` converts an observable into a signal:

```ts
import { toSignal } from '@angular/core/rxjs-interop';

readonly apiPreview = toSignal(this.http.get<Topic[]>(API_URL), {
  initialValue: [] as Topic[],
});
```

The template reads it like any other signal:

```html
<p>API preview count: {{ store.apiPreview().length }}</p>
```

## Prior knowledge assumed

- Lesson 01-02: signals are read with `()`.
- Lesson 06-03: `HttpClient.get<T>()` returns an observable.

## Why use a preview instead of replacing the main store flow?

The main `topicsSignal` is writable because the app also appends new topics and toggles checkboxes. A raw `toSignal(this.http.get(...))` is a read-only view of one HTTP request. Replacing the whole store with it would make local updates harder.

So this lesson adds a narrow `apiPreview` signal. It demonstrates the interop API without rewriting the store around observables.

## When to keep manual subscriptions

Manual subscriptions still make sense when you need to:

- write into an existing signal
- handle success and error paths differently
- perform an imperative action after a request
- combine HTTP with local update methods

`toSignal()` fits when the template or computed state wants to read an observable value directly as a signal.

## Comparison callout

Angular v15 did not have signals, so this bridge was not part of everyday Angular code. React learners can compare this with a hook that exposes request data as state. Vue learners can compare it with converting a stream into a `ref`.
