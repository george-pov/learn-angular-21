# Lesson 02-01 Concept: Introduce a Typed Model

## Goal

Define a `Topic` type in its own file. No UI change yet — this is a pure types lesson.

## The single new concept

Domain types belong in their own file so any component that touches the domain can import them:

```ts
// src/app/topic.ts
export type Topic = {
  id: number;
  title: string;
  done: boolean;
};
```

A TypeScript `type` alias is a compile-time-only construct. It does not generate any JavaScript. It just lets the compiler check that everywhere a `Topic` is expected, the right shape is passed.

## Prior knowledge assumed

- Lesson 01-02 to 01-06: signals.

## Why introduce a type now?

Module 01 worked with primitive signals: `signal(0)`, `signal('')`. From Lesson 02-02 onwards the dashboard stores a *list of topics*, and that list needs a shape. Putting the shape in its own file keeps the type out of the way of the rest of the lesson.

There is no behavior change yet. The file exists and is empty in effect until the next lesson imports it.
