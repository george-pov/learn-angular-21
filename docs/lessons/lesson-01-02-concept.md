# Lesson 01-02 Concept: Introduce `signal`

## Goal

Store a number in a **signal** and read it in the template. The on-screen value is `0`. No buttons or interactivity yet.

## The single new concept

A signal is a function that holds a reactive value:

```ts
import { Component, signal } from '@angular/core';

@Component({ /* ... */ })
export class App {
  protected readonly completedCount = signal(0);
}
```

`signal(0)` creates a signal whose current value is `0`. You read it by **calling it like a function**:

```html
<p>{{ completedCount() }}</p>
```

The parentheses matter. `completedCount` is the signal object; `completedCount()` is its current value. Forgetting the `()` is the most common beginner mistake.

`protected` means the field is visible to the template but not to outside code. `readonly` means the signal reference itself never changes (the value it holds will).

## Prior knowledge assumed

- Lesson 01-01: the `App` component and its template.

## Why "call to read"?

Angular needs to know which signals a template (or a `computed`) depends on, so it knows what to re-render. The call is what registers that dependency. Plain class fields would not give Angular that information.

## Comparison callout

In React, `useState(0)` returns `[value, setValue]`. In Angular, `signal(0)` returns one value that you both read (`value()`) and write (`value.set(...)`). Vue's `ref(0)` is closer — you read it as `value.value` and write it as `value.value = 1`. Angular makes both directions function calls.
