# Lesson 02-05 Concept: Pass Data With `input()`

## Goal

Stop duplicating the topic array. `App` becomes the owner of the data and passes it into `TopicsList` as an input.

## The single new concept

Signal-based component inputs declared with the `input()` and `input.required()` functions:

```ts
import { Component, input } from '@angular/core';
import { Topic } from '../topic';

@Component({ /* ... */ })
export class TopicsList {
  readonly topics = input.required<Topic[]>();
}
```

`input.required<T>()` declares a required input. The compiler refuses to render `<app-topics-list />` without a `[topics]="..."` binding. `input<T>()` (without `required`) declares an optional input that can have a default.

The returned value is **a signal**. Read it like any other signal:

```html
@for (topic of topics(); track topic.id) {
  ...
}
```

The parent binds it the same way as in v15:

```html
<app-topics-list [topics]="topics()" />
```

The brackets `[…]` mark this as a property binding. Without them, Angular treats the value as a string literal.

## Prior knowledge assumed

- Lesson 02-02 to 02-04: signals, `@for`, child components.

## How is this different from `@Input()`?

Angular v15 used a decorator:

```ts
@Input() topics: Topic[] = [];
```

Signal inputs replace it with a function call:

```ts
readonly topics = input.required<Topic[]>();
```

The big practical difference: signal inputs are **signals**, so `computed()` and `effect()` can depend on them automatically. With decorator inputs you needed `ngOnChanges` to react to changes.

## Comparison callout

Same role as typed props in React (`function TopicsList({ topics }: { topics: Topic[] })`) or Vue's `defineProps`. The runtime semantics are equivalent; the syntax is Angular-specific.
