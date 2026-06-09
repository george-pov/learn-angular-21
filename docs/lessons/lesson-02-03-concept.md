# Lesson 02-03 Concept: Toggle a List Item Immutably

## Goal

Add a checkbox next to each topic. Clicking it flips that topic's `done`. Progress and the completion message update automatically.

## The single new concept

Updating an array signal with `.update`, returning a **new array** rather than mutating in place:

```ts
protected toggleTopic(id: number): void {
  this.topics.update((current) =>
    current.map((topic) =>
      topic.id === id ? { ...topic, done: !topic.done } : topic,
    ),
  );
}
```

Three rules behind this shape:

1. **New array, not push/splice.** `current.map(...)` returns a fresh array. Signals notify dependents when the *reference* changes; mutating the old array would not.
2. **New object for the changed row.** `{ ...topic, done: !topic.done }` creates a new object for the toggled row. Other rows keep their old object identity. This works well with `track topic.id` and lets future optimizations (like `OnPush`-style change detection) stay correct.
3. **Use `.update`, not `.set`**, so you receive the latest value as the function argument.

## Prior knowledge assumed

- Lesson 01-03: event binding and `.update`.
- Lesson 02-02: `@for` and `track`.

## Template binding

```html
<input
  type="checkbox"
  [checked]="topic.done"
  (change)="toggleTopic(topic.id)"
/>
```

`[checked]="topic.done"` writes the model state into the DOM. `(change)="toggleTopic(topic.id)"` writes the click back into the signal. Same two-direction pattern as Lesson 01-06's text input.

## Why immutability?

If the next reactive primitive you encounter assumes "the same array reference means nothing changed," mutation breaks it silently. Signals do follow that rule. Adopting the immutable pattern from day one means you never have to debug a missing re-render.
