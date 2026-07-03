# Lesson 02-06 Concept: Emit Events With `output()`

## Goal

Re-enable the per-topic checkbox. When the user clicks a checkbox in `TopicsList`, the child emits the topic id; `App` handles the toggle.

## The single new concept

Signal-based outputs declared with `output<T>()`:

```ts
import { Component, input, output } from '@angular/core';
import { Topic } from '../topic';

@Component({
  /* ... */
})
export class TopicsList {
  readonly topics = input.required<Topic[]>();
  readonly toggle = output<number>();

  protected onToggle(id: number): void {
    this.toggle.emit(id);
  }
}
```

`output<number>()` returns an emitter. The child calls `.emit(value)` to send an event; the parent subscribes with `(toggle)="handler($event)"`.

In the parent:

```html
<app-topics-list [topics]="topics()" (toggle)="toggleTopic($event)" />
```

`$event` is the value passed to `.emit(...)`. Here it is the topic id.

## Prior knowledge assumed

- Lesson 02-03: `toggleTopic` and immutable signal updates.
- Lesson 02-05: signal inputs.

## How is this different from `@Output()` and `EventEmitter`?

Angular v15:

```ts
@Output() toggle = new EventEmitter<number>();
```

Angular v22:

```ts
readonly toggle = output<number>();
```

`output<T>()` exposes only `.emit(value)` and a `subscribe`-like interface internally — it intentionally hides the rest of `EventEmitter`'s surface. That keeps consumers honest: outputs are one-way notifications, not full streams.

## Comparison callout

Identical to a React callback prop:

```jsx
<TopicsList topics={topics} onToggle={(id) => toggleTopic(id)} />
```

Or to Vue's `defineEmits`:

```ts
const emit = defineEmits<{ toggle: [id: number] }>();
```

## End-of-module shape

After this lesson `App` owns the `topics` signal and `toggleTopic`. `TopicsList` owns the rendering and the user interaction. Data flows down via `[topics]`, events flow up via `(toggle)`. This is the canonical pattern for any parent/child component pair in modern Angular.
