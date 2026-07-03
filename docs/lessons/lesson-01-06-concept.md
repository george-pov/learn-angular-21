# Lesson 01-06 Concept: Two-Way Text Input With a Signal

## Goal

Add a text input. Whatever the user types is mirrored live below the input. The mirrored value is held in a signal.

## The single new concept

Property binding plus event binding together produce two-way data flow without any directive:

```html
<input type="text" [value]="currentTitle()" (input)="currentTitle.set($any($event.target).value)" />

<p>You typed: {{ currentTitle() }}</p>
```

Two distinct directions:

- `[value]="currentTitle()"` — Angular writes the signal value into the DOM (signal → DOM).
- `(input)="currentTitle.set(...)"` — the DOM event writes the value back into the signal (DOM → signal).

That is what "two-way binding" actually is: one binding for each direction.

`$event` is the native event object. `$event.target` is the element. `$any(...)` is a template cast to tell Angular's template type checker to skip the type narrowing for this read; it is the smallest possible escape hatch.

## Prior knowledge assumed

- Lesson 01-02: signals.
- Lesson 01-03: event binding and `.set` / `.update`.

## Why do it the hard way?

Modules 02 and 04 will introduce more structured options:

- Lesson 04-01 keeps this baseline and names the mechanics clearly.
- Lesson 04-02 replaces it with reactive `[formControl]`.
- Lessons 04-07 and 04-08 compare it with stable Signal Forms.

Doing it manually here makes the mechanics obvious: a binding for each direction, no magic. Every higher-level form API is built on top of this.

## Comparison callout

In React, this is a controlled input: `<input value={x} onChange={e => setX(e.target.value)} />`. Same two directions, same shape. Vue collapses both into `v-model` by default. Module 04 compares this raw loop with Angular reactive forms and Signal Forms.
