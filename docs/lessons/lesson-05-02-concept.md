# Lesson 05-02 Concept: Inject the Service With `inject()`

## Goal

Ask Angular for the `TopicStore` instance from inside `Dashboard` and render a greeting from the service.

## The single new concept

`inject()` reads a dependency from Angular's current injection context:

```ts
import { Component, inject } from '@angular/core';
import { TopicStore } from '../topic-store';

export class Dashboard {
  protected readonly store = inject(TopicStore);
}
```

Once injected, `store` is an ordinary TypeScript property. The template can read a method from it:

```html
<p>{{ store.getGreeting() }}</p>
```

## Prior knowledge assumed

- Lesson 05-01: `TopicStore` exists and is provided in root.
- Lesson 03-02: `Dashboard` is the routed component that owns the tracker UI.

## Why `inject()` instead of a constructor?

Angular v15 often taught this shape:

```ts
constructor(private readonly store: TopicStore) {}
```

Modern Angular can use this field initializer instead:

```ts
private readonly store = inject(TopicStore);
```

Both ask the injector for the same thing. `inject()` keeps dependencies close to the fields that use them and works well with standalone components, functions, and provider factories.

## Comparison callout

`inject()` may look like a React hook because it is a function call near the top of a component class. It is not component-local state. It reads from Angular's injector tree. Vue's `inject()` is closer in name, but Angular's version is tied to provider resolution and class/service creation.
