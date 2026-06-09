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

## Mental model

`inject(TopicStore)` means:

```text
Starting from the current injection context, find the nearest provider for TopicStore.
```

For `Dashboard`, Angular creates an injection context while constructing the component. Field initializers run inside that context, so this is legal:

```ts
protected readonly store = inject(TopicStore);
```

The same call would not be legal in an arbitrary helper function or a click handler called later, because Angular would not know which injector is current.

Useful places for this curriculum:

- field initializers in components and services
- constructors of classes Angular is creating
- provider factories in `app.config.ts`

Places to avoid in this curriculum:

- event handler bodies
- standalone utility functions called from anywhere
- methods that run long after construction

## Why the field is `protected`

The template reads `store.getGreeting()`, so the field must be visible to the template. In this project, component fields that templates read are usually `protected`:

```ts
protected readonly store = inject(TopicStore);
```

Fields used only inside the TypeScript class can be `private`.

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

Constructor injection is still valid Angular. This curriculum uses `inject()` because it makes provider lookup visible as an expression and prepares the learner for factory providers in Lesson 05-08.

## What changes in the app

This lesson creates the first visible proof that the root provider works:

1. `Dashboard` asks for `TopicStore`.
2. Angular finds the root provider from `providedIn: 'root'`.
3. Angular creates the service instance.
4. The template renders a string from that service.

The topic list, form, and progress logic still belong to `Dashboard`. The service is present, but it is not yet the state owner.

## Injection does not mean rendering

Injecting the service creates or retrieves the service instance. Rendering the greeting is a separate template choice.

This line changes the component's dependencies:

```ts
protected readonly store = inject(TopicStore);
```

It does not automatically display anything. The template displays data only because it reads:

```html
{{ store.getGreeting() }}
```

## Common mistakes

Do not call the service class like a function:

```ts
// Wrong.
protected readonly store = TopicStore();
```

Do not create it manually:

```ts
// Wrong.
protected readonly store = new TopicStore();
```

Do not make the field `private` if the template reads it. The Angular template compiler needs access to members used by the template.

## Comparison callout

`inject()` may look like a React hook because it is a function call near the top of a component class. It is not component-local state. It reads from Angular's injector tree. Vue's `inject()` is closer in name, but Angular's version is tied to provider resolution and class/service creation.

## Vocabulary checkpoint

- **Injection context:** the runtime moment when Angular knows which injector is current.
- **Consumer:** the class asking for a dependency.
- **Dependency:** the value returned by the injector.
